import { Editor } from "@craftjs/core";
import { Text } from "./Text";
import { Container } from "./Container";
import { Card, CardBottom, CardTop } from "./Card";
import { Product, ProductCardBottom, ProductCardTop } from "./Product";
import { Button } from "./Button";
import {
  TailwindCard,
  TailwindCardBottom,
  TailwindCardTop,
} from "./TailwindCard";
import { ImageSelector } from "./ImageSelector";
import { TailwindCardContainer } from "./TailwindCard/TailwindCardContainer";
import { TailwindSubCardContainer } from "./TailwindCard/TailwindCardSubContainer";
import { ImageCard } from "./TailwindCard/ImageCard";
import { Header } from "./Header";
import { LogoContainer } from "./Header/LogoContainer";
const EditorWrapper =
  (Component:any, childProp = { enabled: true }) =>
  (props:any) => {
    return (
      <Editor
        enabled={childProp?.enabled}
        resolver={{
          Card,
          Button,
          Text,
          Container,
          CardTop,
          CardBottom,
          Product,
          ProductCardTop,
          ProductCardBottom,
          TailwindCard,
          TailwindCardTop,
          TailwindCardBottom,
          ImageSelector,
          TailwindCardContainer,
          TailwindSubCardContainer,
          ImageCard,
          Header,
          LogoContainer
        }}
      >
        <Component {...props} />
      </Editor>
    );
  };

export default EditorWrapper;
