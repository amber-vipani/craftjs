import { Element, Frame } from "@craftjs/core";
import lz from "lzutf8";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import EditorWrapper from "../components/EditorWrapper";
// import jsonData from "./json";
("");

function Renderer() {
  const [json, setJson] = useState();
  const [loading, setLoading] = useState(true);

  // Load save state from server on page load
  useEffect(() => {
    const fetch = async () => {
      const businessId = "O7YlGlcvULAgcDlxMYvw";
      const docRef = doc(
        db,
        `websites/${businessId}/crafts`,
        "365cmb0Eio393mWBcR1j"
      );
      const snapShot = await getDoc(docRef);
      const { loadState }:any = snapShot.data();
      const json = lz.decompress(lz.decodeBase64(loadState));
      setJson(json);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="mx-auto ">
      {/* <a href="/">edit</a>
      <h5 className="text-center text-lg my-4">Basic Page Editor</h5> */}
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Frame data={json}>
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
      )}
    </div>
  );
}

export default EditorWrapper(Renderer, { enabled: false });
