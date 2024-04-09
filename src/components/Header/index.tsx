import { Element } from "@craftjs/core";
import {
  Container,
  ContainerDefaultProps,
  ContainerSettings,
} from "../Container";
import { HeaderContainer } from "./HeaderContainer";
import { LogoContainer } from "./LogoContainer";

export const Header = ({
  background,
  tailwindCss,
  padding = 20,
  ...props
}: any) => {
  return (
    <HeaderContainer {...props}>
      <Element
        canvas
        id="heading"
        is={Container}
        tailwindCss={"w-[80%] flex justify-between p-4 gap-2"}
      >
        <Element
          canvas
          id="logo"
          is={LogoContainer}
          tailwindCss={"  "}
          background={"red"}
        />
      </Element>
    </HeaderContainer>
  );
};

Header.craft = {
  displayName: "Tailwind header container",
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
