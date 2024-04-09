import { useNode } from "@craftjs/core";
// import ColorPicker from "material-ui-color-picker";
import { SketchPicker } from "react-color";

export const ImageCard = ({
  background,
  padding,
  colSpanMobile,
  colSpanDesktop,
  children,
  ...props
}: any) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const mobileClass = `col-span-${colSpanMobile}`;
  const desktopClass = `lg:col-span-${colSpanDesktop}`;
  const className = `${mobileClass} ${desktopClass}`;
  return (
    <div
      {...props}
      ref={(ref: any) => connect(drag(ref))}
      style={{ backgroundColor: background }}
      className={className}
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
    colSpanMobile,
    colSpanDesktop,
    actions: { setProp },
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding,
    tailwindCss: node.data.props.tailwindCss,
    colSpanMobile: node.data.props.colSpanMobile,
    colSpanDesktop: node.data.props.colSpanDesktop,
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
      <div className="w-full my-4">
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
      <div className="w-full my-4">
        <label className="block text-sm font-medium text-gray-700">
          columns in mobile view
        </label>
        <input
          type="text"
          value={colSpanMobile || "1"}
          onChange={(e) => {
            setProp(
              (props: any) => (props.colSpanMobile = e.target.value),
              1000
            );
          }}
          className="w-full"
        />
      </div>
      <div className="w-full my-4">
        <label className="block text-sm font-medium text-gray-700">
          columns in destop view
        </label>
        <input
          type="text"
          value={colSpanDesktop || "3"}
          onChange={(e) => {
            setProp(
              (props: any) => (props.colSpanDesktop = e.target.value),
              1000
            );
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export const ContainerDefaultProps = {
  background: "gray",
  padding: 3,
  colSpanMobile: 1,
  colSpanDesktop: 1,
};

ImageCard.craft = {
  displayName: "Tailwind sub card container",
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
