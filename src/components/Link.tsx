import { useNode } from "@craftjs/core";

export const Link = ({ color, text, url, ...props }: any) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <a
      href="javascript:void(0)"
      ref={(ref: any) => connect(drag(ref))}
      {...props}
    >
      {text}
    </a>
  );
};

export const LinkSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div>
      <label htmlFor="text" className="block text-sm font-medium text-gray-700">
        Text
      </label>
      <input
        id="text"
        type="text"
        value={props.text}
        onChange={(e) => setProp((props: any) => (props.text = e.target.value))}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
      />

      <label htmlFor="text" className="block text-sm font-medium text-gray-700">
        URL
      </label>
      <input
        id="text"
        type="text"
        value={props.url}
        onChange={(e) => setProp((props: any) => (props.url = e.target.value))}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
      />
    </div>
  );
};

export const LinkDefaultProps = {
  text: "Click me",
  url: "#",
};

Link.craft = {
  props: LinkDefaultProps,
  related: {
    settings: LinkSettings,
  },
};
