import { useNode } from "@craftjs/core";
import { useEffect } from "react";

export const LogoContainer = ({
  src,
  // alt,
  // width,
  // height,
  // tailwindCss,
}: any) => {
  const { selected } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));
  // const [editable, setEditable] = useState(false);
  useEffect(() => {
    if (selected) {
      return;
    }

    // setEditable(false);
  }, [selected]);

  return (
    <a onClick={() => null} href="#" className="flex items-center">
      <img src={src} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
        Flowbite
      </span>
    </a>
  );
};

const LogoContainerSettings = () => {
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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event?.target?.result;
      setProp((props: any) => (props.src = imageUrl), 1000);
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
          setProp((props: any) => (props.alt = e.target.value), 1000);
        }}
        className="w-full"
      />
      <label className="block text-sm font-medium text-gray-700">Width</label>
      <input
        type="number"
        value={width || ""}
        onChange={(e) => {
          setProp((props: any) => (props.width = e.target.value), 1000);
        }}
        className="w-full"
      />
      <label className="block text-sm font-medium text-gray-700">Height</label>
      <input
        type="number"
        value={height || ""}
        onChange={(e) => {
          setProp((props: any) => (props.height = e.target.value), 1000);
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
          setProp((props: any) => (props.tailwindCss = e.target.value), 1000);
        }}
        className="w-full"
      />
    </>
  );
};

export const LogoContainerDefaultProps = {
  src: "https://flowbite.com/docs/images/logo.svg",
  alt: "logo",
  width: 200,
  height: 200,
};

LogoContainer.craft = {
  props: LogoContainerDefaultProps,
  related: {
    settings: LogoContainerSettings,
  },
};
