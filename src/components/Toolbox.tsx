import { Element, useEditor } from "@craftjs/core";

import { Button } from "./Button";
import { Card } from "./Card";
import { Container } from "./Container";
import { Text } from "./Text";
import { Product } from "./Product";
import { TailwindCard } from "./TailwindCard";
import { ImageSelector } from "./ImageSelector";
import { Header } from "./Header";

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className="px-2 py-2 sticky">
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="pb-2">Drag to add</p>
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            ref={(ref:any) =>
              connectors.create(ref, <Button text="Click me" size="small" />)
            }
            data-cy="toolbox-button"
          >
            Button
          </button>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            ref={(ref:any) => connectors.create(ref, <Text text="Hi world" />)}
            data-cy="toolbox-text"
          >
            Text
          </button>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            ref={(ref:any) =>
              connectors.create(
                ref,
                <Element canvas is={Container} padding={20} />
              )
            }
            data-cy="toolbox-container"
          >
            Container
          </button>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            ref={(ref:any) => connectors.create(ref, <Card />)}
            data-cy="toolbox-card"
          >
            Card
          </button>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            ref={(ref:any) => connectors.create(ref, <Product />)}
            data-cy="toolbox-product-card"
          >
            Product
          </button>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            ref={(ref:any) =>
              connectors.create(
                ref,
                <TailwindCard
                  background={"#fef9c3"}
                  tailwindCss={`w-full  px-16 py-16`}
                />
              )
            }
            data-cy="toolbox-product-card"
          >
            Tailwind card
          </button>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            ref={(ref:any) =>
              connectors.create(
                ref,
                <ImageSelector text="Hi world" src={"/png.png"} />
              )
            }
            data-cy="toolbox-text"
          >
            Image
          </button>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            ref={(ref:any) =>
              connectors.create(
                ref,
                <Header text="Hi world" src={"/png.png"} />
              )
            }
            data-cy="toolbox-text"
          >
            Header
          </button>
        </div>
      </div>
    </div>
  );
};
