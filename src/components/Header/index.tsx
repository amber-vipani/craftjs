import { Element, useNode } from "@craftjs/core";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../configs/firebase";
import { Button } from "../Button";
import {
  ContainerDefaultProps,
  ContainerSettings
} from "../Container";
import { Text } from "../Text";
import { HeaderContainer } from "./HeaderContainer";
import { LogoContainer } from "./LogoContainer";
// import { TailwindSubCardContainer } from "./HeaderSubContainer";
// import { ImageCard } from "./ImageCard";

export const HeaderTop = ({ children, ...props }:any) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      {...props}
      ref={connect}
      className="text-only p-4 mb-4 border-b border-gray-300 flex flex-col items-start"
    >
      {children}
    </div>
  );
};

HeaderTop.craft = {
  rules: {
    canMoveIn: (incomingNodes:any) =>
      incomingNodes.every((incomingNode:any) => incomingNode.data.type === Text),
  },
};

export const HeaderBottom = ({ children, ...props }:any) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div {...props} className="p-4" ref={connect}>
      {children}
    </div>
  );
};

HeaderBottom.craft = {
  rules: {
    canMoveIn: (incomingNodes:any) =>
      incomingNodes.every((incomingNode:any) => incomingNode.data.type === Button),
  },
};

export const Header = ({ background, tailwindCss, padding = 20, ...props }:any) => {
  // const [productDetails, setHeaderDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);
  // const businessId = "O7YlGlcvULAgcDlxMYvw";
  const docRef = doc(db, `/products`, "rbqNOlnqhx3uhxbqn9Kj");
  useEffect(() => {
    const fetch = async () => {
      const snapShot = await getDoc(docRef);
      console.log(snapShot?.data())
      // setHeaderDetails(snapShot?.data());
      setLoading(false);
    };
    fetch();
  }, []);
  // const handleClick = async () => {
  //   const docRef = doc(db, `/products/users/collection`, "cart");
  //   const res = await setDoc(docRef, {
  //     cart: arrayUnion(productDetails),
  //   });
  // };
  if (loading) return <h1>Loading</h1>;
  return (
    <HeaderContainer
      {...props}
      background={background}
      tailwindCss={tailwindCss}
    >
      <Element
        canvas
        id="heading"
        is={LogoContainer}
        tailwindCss={"max-w-screen-md mb-8 lg:mb-16"}
        background={"#00000000"}
      />
      
    </HeaderContainer>
  );
};

Header.craft = {
  displayName: "Tailwind card container",
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
