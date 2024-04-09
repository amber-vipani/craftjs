import { useNode } from "@craftjs/core";
import { useEffect, useState } from "react";

export const ImageSelector = ({
  src,
  alt,
  width,
  height,
  tailwindCss,
  ...props
}:any) => {
  const {
    connectors: { connect, drag },
    selected,
    // actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      ref={(ref:any) => connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
      className={tailwindCss}
      contentEditable={editable}
    />
  );
};

const ImageSelectorSettings = () => {
  const {
    actions: { setProp },
    // src,
    alt,
    width,
    height,
    tailwindCss,
  } = useNode((node) => ({
    src: node.data.props.src,
    alt: node.data.props.alt,
    width: node.data.props.width,
    height: node.data.props.height,
    tailwindCss: node.data.props.tailwindCss,
  }));

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event?.target?.result;
      setProp((props:any) => (props.src = imageUrl), 1000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <label className="block text-sm font-medium text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full"
      />
      <label className="block text-sm font-medium text-gray-700">
        Alt Text
      </label>
      <input
        type="text"
        value={alt || ""}
        onChange={(e) => {
          setProp((props:any) => (props.alt = e.target.value), 1000);
        }}
        className="w-full"
      />
      <label className="block text-sm font-medium text-gray-700">Width</label>
      <input
        type="number"
        value={width || ""}
        onChange={(e) => {
          setProp((props:any) => (props.width = e.target.value), 1000);
        }}
        className="w-full"
      />
      <label className="block text-sm font-medium text-gray-700">Height</label>
      <input
        type="number"
        value={height || ""}
        onChange={(e) => {
          setProp((props:any) => (props.height = e.target.value), 1000);
        }}
        className="w-full"
      />
      <label className="block text-sm font-medium text-gray-700">
        Tailwind css
      </label>
      <input
        type="text"
        value={tailwindCss || ""}
        onChange={(e) => {
          setProp((props:any) => (props.tailwindCss = e.target.value), 1000);
        }}
        className="w-full"
      />
    </>
  );
};

export const ImageSelectorDefaultProps = {
  src: "../../png.png",
  alt: "Image",
  width: 200,
  height: 200,
};

ImageSelector.craft = {
  props: ImageSelectorDefaultProps,
  related: {
    settings: ImageSelectorSettings,
  },
};
