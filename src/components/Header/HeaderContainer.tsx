import { useNode } from "@craftjs/core";
// import ColorPicker from "material-ui-color-picker";
import { SketchPicker } from "react-color";

export const HeaderContainer = ({
  background,
  padding,
  tailwindCss,
  children,
  ...props
}: any) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <header
      {...props}
      ref={(ref) => connect(drag(ref as any))}
      style={{ backgroundColor: background }}
      // className={tailwindCss}
    >
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {children}
        </div>
      </nav>
    </header>
  );
};
// export const ContainerSettings = ({ isDeletable = false }) => {
export const ContainerSettings = () => {
  const {
    background,
    padding,
    tailwindCss,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
    tailwindCss: node.data.props.tailwindCss,
  }));
  return (
    <div>
      <div className="w-full my-4">
        <label htmlFor="background-color" className="block">
          Background
        </label>
        <SketchPicker
          color={background}
          onChangeComplete={(color: any) => {
            setProp((props: any) => (props.background = color.hex), 500);
          }}
        />
      </div>
      <div className="w-full my-4">
        <label htmlFor="padding" className="block">
          Padding
        </label>
        <input
          type="range"
          min="0"
          max="20"
          value={padding}
          onChange={(e) =>
            setProp(
              (props: any) => (props.padding = parseInt(e.target.value)),
              500
            )
          }
          className="w-full"
        />
      </div>
      <label className="block text-sm font-medium text-gray-700">
        Tailwind css
      </label>
      <input
        type="text"
        value={tailwindCss || ""}
        onChange={(e) => {
          setProp((props: any) => (props.tailwindCss = e.target.value), 1000);
        }}
        className="w-full"
      />
    </div>
  );
};

export const ContainerDefaultProps = {
  background: "white",
  padding: 3,
};

HeaderContainer.craft = {
  displayName: "Tailwind header",
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
