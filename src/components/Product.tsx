import { Element, useNode } from "@craftjs/core";
import { Button } from "./Button";
import {
  Container,
  ContainerDefaultProps,
  ContainerSettings,
} from "./Container";
import { Text } from "./Text";
import { useEffect, useState } from "react";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

export const ProductCardTop = ({ children, ...props }:any) => {
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

ProductCardTop.craft = {
  rules: {
    canMoveIn: (incomingNodes:any) =>
      incomingNodes.every((incomingNode:any) => incomingNode.data.type === Text),
  },
};

export const ProductCardBottom = ({ children, ...props }:any) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div {...props} className="p-4" ref={connect}>
      {children}
    </div>
  );
};

ProductCardBottom.craft = {
  rules: {
    canMoveIn: (incomingNodes:any) =>
      incomingNodes.every((incomingNode:any) => incomingNode.data.type === Button),
  },
};

export const Product = ({ background, padding = 20, ...props }:any) => {
  const [productDetails, setProductDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);
  // const businessId = "O7YlGlcvULAgcDlxMYvw";
  const docRef = doc(db, `/products`, "rbqNOlnqhx3uhxbqn9Kj");
  useEffect(() => {
    const fetch = async () => {
      const snapShot = await getDoc(docRef);
      setProductDetails(snapShot?.data());
      setLoading(false);
    };
    fetch();
  }, []);
  const handleClick = async () => {
    const docRef = doc(db, `/products/users/collection`, "cart");
    const res = await setDoc(docRef, {
      cart: arrayUnion(productDetails),
    });
    console.log(res)
  };
  if (loading) return <h1>Loading</h1>;
  return (
    <Container {...props} background={background} padding={padding}>
      <Element canvas id="text" is={ProductCardTop}>
        <Text
          text={productDetails.productName}
          fontSize={20}
          className="mb-2"
        />
        <Text text={productDetails.category} fontSize={15} className="mb-2" />
        <Text
          text={productDetails.price.toString()}
          fontSize={15}
          className="mb-2"
        />
      </Element>
      <Element canvas id="buttons" is={ProductCardBottom}>
        <Button
          onClick={handleClick}
          productDetails={productDetails}
          size="small"
          text="Add to Cart"
          // className="w-full"
        />
      </Element>
    </Container>
  );
};

Product.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
