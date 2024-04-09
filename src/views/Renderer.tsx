import { Element, Frame, useEditor } from "@craftjs/core";
import { doc, getDoc } from "firebase/firestore";
import lz from "lzutf8";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "../components/Container";
import EditorWrapper from "../components/EditorWrapper";
import { db } from "../configs/firebase";
// import jsonData from "./json";
("");

function Renderer() {
  const { actions } = useEditor();
  // const [json, setJson] = useState();
  // const [loading, setLoading] = useState(true);
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);
  // Load save state from server on page load
  useEffect(() => {
    const fetch = async () => {
      const businessId = "O7YlGlcvULAgcDlxMYvw";
      const docRef = doc(db, `websites/${businessId}/crafts`, "website-1");
      const snapShot = await getDoc(docRef);
      const webPages: any = snapShot.data();
      console.log(webPages);
      const json = lz.decompress(
        lz.decodeBase64(webPages[(paths[1] as string) ?? "home"]?.loadState)
      );
      // setJson(json);
      if (json) actions.deserialize(json);
      // setLoading(false);
    };
    fetch();
  }, []);
  return (
    <div className="mx-auto ">
      {/* <a href="/">edit</a>
      <h5 className="text-center text-lg my-4">Basic Page Editor</h5> */}
      <Frame>
        <Element
          is={Container}
          id="root"
          // canvas
          padding={5}
          background="#ffff"
          tailwindCss="h-full"
          data-cy="root-container"
        />
      </Frame>
    </div>
  );
}

export default EditorWrapper(Renderer, { enabled: false });
