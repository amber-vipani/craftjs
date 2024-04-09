import { Element, Frame, useEditor } from "@craftjs/core";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { doc, getDoc } from "firebase/firestore";
import lz from "lzutf8";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "../components/Container";
import EditorWrapper from "../components/EditorWrapper";
import { SettingsPanel } from "../components/SetttingsPanel";
import { Toolbox } from "../components/Toolbox";
import { Topbar } from "../components/Topbar";
import { db } from "../configs/firebase";

function CraftEditor() {
  const { actions } = useEditor();
  const [elements, setElements] = useState<any>([]);
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);
  console.log(paths[0]);

  useEffect(() => {
    const fetch = async () => {
      const businessId = "O7YlGlcvULAgcDlxMYvw";
      const docRef = doc(db, `websites/${businessId}/crafts`, "website-1");
      const snapShot = await getDoc(docRef);
      const webPages: any = snapShot.data();
      console.log(webPages);
      const json = lz.decompress(
        lz.decodeBase64(webPages?.[(paths[0] as string) ?? "home"]?.loadState)
      );

      const parseJson = JSON.parse(json || "{}");
      function buildHierarchy(parentId: any): any {
        const parent = parseJson[parentId];
        const children = Object.keys(parseJson)
          .filter((nodeId) => parseJson[nodeId].parent === parentId)
          .map((childId) => buildHierarchy(childId));
        return {
          id: parentId,
          type: parent?.type.resolvedName,
          displayName: parent?.displayName,
          props: parent?.props,
          children: children,
        };
      }
      const hierarchy = buildHierarchy("ROOT");
      console.log([hierarchy]);
      setElements([hierarchy]);

      if (json) actions.deserialize(json);
      actions.history.clear();
    };
    fetch();
  }, []);

  const [expanded, setExpanded] = useState({});
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <>
            <h1>Name</h1>
          </>
        ),
        cell: ({ row }: any) => {
          console.log(row.original.displayName);
          return (
            <h1
              style={{
                paddingLeft: `${row.depth * 2}rem`,
              }}
            >
              {row.original.displayName}
            </h1>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: elements,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children as any,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  return (
    <div className="mx-auto w-800">
      <a href={"/preview/" + paths[0] ?? 'home'}>preview</a>
      <h5 className="text-2xl mt-4 text-center">Basic Page Editor</h5>
      <Topbar />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-0 mt-5 bg-red-50">
        <div className="col-span-3">
          <Frame>
            <Element
              id="root"
              canvas
              is={Container}
              padding={5}
              background="#ffff"
              tailwindCss="h-full"
              data-cy="root-container"
            />
          </Frame>
        </div>
        <div className="col-span-1">
          <div className="p-0 bg-gray-100 top-0 relative sticky">
            <Toolbox />
            <SettingsPanel />
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            onClick={row.getToggleExpandedHandler()}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorWrapper(CraftEditor);
