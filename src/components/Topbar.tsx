import { useEditor } from "@craftjs/core";
import copy from "copy-to-clipboard";
import { doc, updateDoc } from "firebase/firestore";
import lz from "lzutf8";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../configs/firebase";

export const Topbar = () => {
  const { actions, query, enabled, canUndo, canRedo } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: state.options.enabled && query.history.canUndo(),
      canRedo: state.options.enabled && query.history.canRedo(),
    })
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>();
  const [stateToLoad, setStateToLoad] = useState<any>(null);
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);
  const [webPageName, setWebPageName] = useState<any>(paths[0] ?? "home");
  const saveAndCopy = async () => {
    const json = query.serialize();
    copy(lz.encodeBase64(lz.compress(json)));
    localStorage.setItem("loadState", lz.encodeBase64(lz.compress(json)));
    //saving in firebase
    const businessId = "O7YlGlcvULAgcDlxMYvw";
    const docRef = doc(db, `websites/${businessId}/crafts`, "website-1");
    await updateDoc(docRef, {
      [webPageName]: {
        loadState: lz.encodeBase64(lz.compress(json)),
        webPageName: webPageName,
      },
    });
    setSnackbarMessage("State copied to clipboard");
  };

  return (
    <div className="px-1 py-1 mt-3 mb-1 bg-blue-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <label htmlFor="enable-disable-toggle" className="mr-2">
              Enable
            </label>
            <input
              id="enable-disable-toggle"
              type="checkbox"
              checked={enabled}
              onChange={(e) =>
                actions.setOptions(
                  (options) => (options.enabled = e.target.checked)
                )
              }
              className="form-checkbox"
            />
            <button
              className={`copy-state-btn btn btn-sm btn-outline-secondary ${
                canUndo ? "bg-green-500" : "bg-gray-300"
              } mx-6 p-2`}
              disabled={!canUndo}
              onClick={() => actions.history.undo()}
            >
              Undo
            </button>
            <button
              className={`copy-state-btn btn btn-sm btn-outline-secondary ${
                canRedo ? "bg-green-500" : "bg-gray-300"
              } p-2`}
              disabled={!canRedo}
              onClick={() => actions.history.redo()}
            >
              Redo
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="web page name"
              value={webPageName}
              onChange={(e) => setWebPageName(e.target.value)}
            />
          </div>
          <div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={saveAndCopy}
            >
              Save and copy
            </button>
            <button
              className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
              onClick={() => setDialogOpen(true)}
            >
              Load
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center">
          <div
            className={`z-50 dialog-container ${
              dialogOpen ? "block" : "hidden"
            }`}
          >
            <div className="dialog-overlay fixed inset-0 bg-black opacity-50"></div>
            <div className="dialog-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg">
              <h1 className="text-lg font-semibold mb-4">Load state</h1>
              <textarea
                className="w-full h-32 resize-none border border-gray-300 rounded p-2 mb-4"
                placeholder='Paste the contents that was copied from the "Copy Current State" button'
                value={stateToLoad || ""}
                onChange={(e) => setStateToLoad(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setDialogOpen(false);
                    const json = lz.decompress(lz.decodeBase64(stateToLoad));
                    actions.deserialize(json);
                    setSnackbarMessage("State loaded");
                  }}
                >
                  Load
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {snackbarMessage && (
        <div className="toast toast-success mt-4">
          <button
            className="btn btn-clear float-right"
            onClick={() => setSnackbarMessage("")}
          ></button>
          {snackbarMessage}
        </div>
      )}
    </div>
  );
};
