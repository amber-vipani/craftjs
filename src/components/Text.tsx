import { useNode } from "@craftjs/core";
import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";

export const Text = ({
  text,
  fontSize,
  textAlign,
  tailwindCss,
  ...props
}: any) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
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
    <div
    {...props}
    ref={(ref:any) => connect(drag(ref))}
    onClick={() => selected && setEditable(true)}
  >
    <ContentEditable
      html={text}
      disabled={!editable}
      onChange={(e) =>
        setProp(
          (props:any) =>
            (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')),
          500
        )
      }
      tagName="p"
      style={{ fontSize: `${fontSize}px`, textAlign }}
    />
  </div>

    // <h1
    //   {...props}
    //   ref={(ref: any) => connect(drag(ref))}
    //   onClick={() => selected && setEditable(true)}
    //   className={tailwindCss}
    //   contentEditable={editable}
    //   onKeyDown={(e) => {
    //     setProp((props: any) => (props.text = e.target.innerText), 1000);
    //   }}
    // >
    //   {text}
    // </h1>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    tailwindCss,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    tailwindCss: node.data.props.tailwindCss,
  }));

  return (
    <>
      <label className="block text-sm font-medium text-gray-700">
        Font size
      </label>
      <input
        type="range"
        value={fontSize || 20}
        min={1}
        max={50}
        onChange={(e) => {
          setProp(
            (props: any) => (props.fontSize = parseInt(e.target.value)),
            1000
          );
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

export const TextDefaultProps = {
  text: "Hi",
  fontSize: 20,
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
