import { Element, useNode } from "@craftjs/core";
import { Button } from "./Button";
import {
  Container,
  ContainerDefaultProps,
  ContainerSettings,
} from "./Container";
import { Text } from "./Text";

export const CardTop = ({ children, ...props }:any) => {
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

CardTop.craft = {
  rules: {
    canMoveIn: (incomingNodes:any) =>
      incomingNodes.every((incomingNode:any) => incomingNode.data.type === Text),
  },
};

export const CardBottom = ({ children, ...props }:any) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div {...props} className="p-4" ref={connect}>
      {children}
    </div>
  );
};

CardBottom.craft = {
  rules: {
    canMoveIn: (incomingNodes:any) =>
      incomingNodes.every((incomingNode:any) => incomingNode.data.type === Button),
  },
};

export const Card = ({ background, padding = 20, ...props }:any) => {
  return (
    <Container {...props} background={background} padding={padding}>
      <Element canvas id="text" is={CardTop}>
        <Text text="Only texts" fontSize={20} />
        <Text text="are allowed up here" fontSize={15} />
      </Element>
      <Element canvas id="buttons" is={CardBottom}>
        <Button size="small" text="Only buttons down here" />
      </Element>
    </Container>
  );
};

Card.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
