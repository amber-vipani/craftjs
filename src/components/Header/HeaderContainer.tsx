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
    <div
    onClick={(e)=>e.stopPropagation()}
      {...props}
      ref={(ref: any) => connect(drag(ref))}
      style={{ backgroundColor: background }}
      className={'w-full'}
      // className={`p-${padding}   h-full m-5 p-5`}
    >
      {children}
    </div>
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
          onChangeComplete={(color) => {
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
  background: "gray",
  padding: 3,
  tailwindCss: "h-64",
};

HeaderContainer.craft = {
  displayName: "Tailwind card container",
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
