import { useNode } from "@craftjs/core";

export const Button = ({
  size,
  variant,
  color,
  text,
  onClick,
  productDetails,
  ...props
}:any) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  // Determine the Tailwind CSS classes based on the props
  let sizeClass = "";
  let variantClass = "";
  let colorClass = "";

  switch (size) {
    case "small":
      sizeClass = "px-2 py-1 text-sm";
      break;
    case "medium":
      sizeClass = "px-3 py-2 text-base";
      break;
    case "large":
      sizeClass = "px-4 py-3 text-lg";
      break;
    default:
      sizeClass = "px-3 py-2 text-base";
  }

  switch (variant) {
    case "text":
      variantClass = "text-gray-700 bg-transparent border border-gray-500";
      break;
    case "outlined":
      variantClass = "text-gray-700 bg-transparent border border-gray-700";
      break;
    case "contained":
    default:
      variantClass = "text-white bg-blue-500 hover:bg-blue-600 border-none";
  }

  switch (color) {
    case "default":
      colorClass = "";
      break;
    case "primary":
      colorClass = "bg-blue-500 hover:bg-blue-600";
      break;
    case "secondary":
      colorClass = "bg-green-500 hover:bg-green-600";
      break;
    default:
      colorClass = "";
  }
  async function handleClick() {
    // if (inNodeContext) return;
    // const docRef = doc(db, `/products/users/collection`, "cart");
    // const res = await setDoc(docRef, {
    //   cart: arrayUnion(productDetails),
    // });
  }
  return (
    <button
      onClick={handleClick}
      ref={(ref:any) => connect(drag(ref))}
      className={`inline-block ${sizeClass} ${variantClass} ${colorClass} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
      {...props}
    >
      {text}
    </button>
  );
};

export const ButtonSettings = () => {
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
        onChange={(e) => setProp((props:any) => (props.text = e.target.value))}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
      />

      <fieldset className="mt-4">
        <legend className="block text-sm font-medium text-gray-700">
          Size
        </legend>
        <div className="mt-2 space-x-2">
          <div>
            <input
              type="radio"
              id="size-small"
              name="size"
              value="small"
              checked={props.size === "small"}
              onChange={(e) =>
                setProp((props:any) => (props.size = e.target.value))
              }
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label
              htmlFor="size-small"
              className="ml-2 block text-sm text-gray-900"
            >
              Small
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="size-medium"
              name="size"
              value="medium"
              checked={props.size === "medium"}
              onChange={(e) =>
                setProp((props:any) => (props.size = e.target.value))
              }
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label
              htmlFor="size-medium"
              className="ml-2 block text-sm text-gray-900"
            >
              Medium
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="size-large"
              name="size"
              value="large"
              checked={props.size === "large"}
              onChange={(e) =>
                setProp((props:any) => (props.size = e.target.value))
              }
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label
              htmlFor="size-large"
              className="ml-2 block text-sm text-gray-900"
            >
              Large
            </label>
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="block text-sm font-medium text-gray-700">
          Variant
        </legend>
        <div className="mt-2 space-x-2">
          <div>
            <input
              type="radio"
              id="variant-text"
              name="variant"
              value="text"
              checked={props.variant === "text"}
              onChange={(e) =>
                setProp((props:any) => (props.variant = e.target.value))
              }
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label
              htmlFor="variant-text"
              className="ml-2 block text-sm text-gray-900"
            >
              Text
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="variant-outlined"
              name="variant"
              value="outlined"
              checked={props.variant === "outlined"}
              onChange={(e) =>
                setProp((props:any) => (props.variant = e.target.value))
              }
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label
              htmlFor="variant-outlined"
              className="ml-2 block text-sm text-gray-900"
            >
              Outlined
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="variant-contained"
              name="variant"
              value="contained"
              checked={props.variant === "contained"}
              onChange={(e) =>
                setProp((props:any) => (props.variant = e.target.value))
              }
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label
              htmlFor="variant-contained"
              className="ml-2 block text-sm text-gray-900"
            >
              Contained
            </label>
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="block text-sm font-medium text-gray-700">
          Color
        </legend>
        <div className="mt-2 space-x-2">
          <div>
            <input
              type="radio"
              id="color-default"
              name="color"
              value="default"
              checked={props.color === "default"}
              onChange={(e) =>
                setProp((props:any) => (props.color = e.target.value))
              }
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label
              htmlFor="color-default"
              className="ml-2 block text-sm text-gray-900"
            >
              Default
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="color-primary"
              name="color"
              value="primary"
              checked={props.color === "primary"}
              onChange={(e) =>
                setProp((props:any) => (props.color = e.target.value))
              }
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label
              htmlFor="color-primary"
              className="ml-2 block text-sm text-gray-900"
            >
              Primary
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="color-secondary"
              name="color"
              value="secondary"
              checked={props.color === "secondary"}
              onChange={(e) =>
                setProp((props:any) => (props.color = e.target.value))
              }
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
            />
            <label
              htmlFor="color-secondary"
              className="ml-2 block text-sm text-gray-900"
            >
              Secondary
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export const ButtonDefaultProps = {
  size: "small",
  variant: "contained",
  color: "primary",
  text: "Click me",
  onClick: () => {},
};

Button.craft = {
  props: ButtonDefaultProps,
  related: {
    settings: ButtonSettings,
  },
};
