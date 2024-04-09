import { Element, useNode } from "@craftjs/core";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../configs/firebase";
import { Button } from "../Button";
import {
  Container,
  ContainerDefaultProps,
  ContainerSettings,
} from "../Container";
import { ImageSelector } from "../ImageSelector";
import { Text } from "../Text";
import { ImageCard } from "./ImageCard";
import { TailwindCardContainer } from "./TailwindCardContainer";
import { TailwindSubCardContainer } from "./TailwindCardSubContainer";

export const TailwindCardTop = ({ children, ...props }: any) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      {...props}
      ref={connect}
      className="text-only p-4 mb-4 border-b border-gray-300 flex flex-col items-start"
    >
      {children}
    </div>
  );
};

TailwindCardTop.craft = {
  rules: {
    canMoveIn: (incomingNodes: any) =>
      incomingNodes.every(
        (incomingNode: any) => incomingNode.data.type === Text
      ),
  },
};

export const TailwindCardBottom = ({ children, ...props }: any) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div {...props} className="p-4" ref={connect}>
      {children}
    </div>
  );
};

TailwindCardBottom.craft = {
  rules: {
    canMoveIn: (incomingNodes: any) =>
      incomingNodes.every(
        (incomingNode: any) => incomingNode.data.type === Button
      ),
  },
};

export const TailwindCard = ({
  background,
  tailwindCss,
  padding = 20,
  ...props
}: any) => {
  // const [productDetails, setTailwindCardDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);
  // const businessId = "O7YlGlcvULAgcDlxMYvw";
  const docRef = doc(db, `/products`, "rbqNOlnqhx3uhxbqn9Kj");
  useEffect(() => {
    const fetch = async () => {
      const snapShot = await getDoc(docRef);
      console.log(snapShot?.data());
      // setTailwindCardDetails(snapShot?.data());
      setLoading(false);
    };
    fetch();
  }, []);
  // const handleClick = async () => {
  //   const docRef = doc(db, `/products/users/collection`, "cart");
  //   const res = await setDoc(docRef, {
  //     cart: arrayUnion(productDetails),
  //   });
  //   console.log(res)
  // };
  if (loading) return <h1>Loading</h1>;
  return (
    <TailwindCardContainer
      {...props}
      background={background}
      tailwindCss={tailwindCss}
    >
      <Element
        canvas
        id="heading"
        is={Container}
        tailwindCss={"max-w-screen-md mb-8 lg:mb-16"}
        background={"#00000000"}
      >
        <Text
          text={`Designed for business teams like yours`}
          fontSize={20}
          tailwindCss={
            "mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          }
        />
        <Text
          text={` Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.`}
          fontSize={20}
          tailwindCss={"text-gray-500 sm:text-xl dark:text-gray-400"}
        />
      </Element>
      {/* <div className="max-w-screen-md mb-8 lg:mb-16">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Designed for business teams like yours
        </h2>
        <p className="text-gray-500 sm:text-xl dark:text-gray-400">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
      </div> */}
      <Element
        canvas
        id="body"
        is={TailwindSubCardContainer}
        background={"#00000000"}
      >
        <Element canvas id="body" is={ImageCard} background={"#00000000"}>
          <Element
            canvas
            id="body"
            is={Container}
            tailwindCss={
              "flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            }
            background={"#00000000"}
          >
            {/* <img src="/png.png" alt="image" className="w-10 h-8" /> */}
            <ImageSelector tailwindCss={"w-10 h-8"} />
          </Element>
          <Text
            text={`Marketing`}
            fontSize={20}
            tailwindCss={"mb-2 text-xl font-bold dark:text-white"}
          />
          <Text
            text={`
            Plan it, create it, launch it. Collaborate seamlessly with all the
            organization and hit your marketing goals every month with our
            marketing plan.`}
            fontSize={20}
            tailwindCss={"text-gray-500 dark:text-gray-400"}
          />
        </Element>

        <Element canvas id="body" is={ImageCard} background={"#00000000"}>
          <Element
            canvas
            id="body"
            is={Container}
            tailwindCss={
              "flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            }
            background={"#00000000"}
          >
            {/* <img src="/png.png" alt="image" className="w-10 h-8" /> */}
            <ImageSelector tailwindCss={"w-10 h-8"} />
          </Element>
          <Text
            text={`Marketing`}
            fontSize={20}
            tailwindCss={"mb-2 text-xl font-bold dark:text-white"}
          />
          <Text
            text={`
            Plan it, create it, launch it. Collaborate seamlessly with all the
            organization and hit your marketing goals every month with our
            marketing plan.`}
            fontSize={20}
            tailwindCss={"text-gray-500 dark:text-gray-400"}
          />
        </Element>

        <Element canvas id="body" is={ImageCard} background={"#00000000"}>
          <Element
            canvas
            id="body"
            is={Container}
            tailwindCss={
              "flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            }
            background={"#00000000"}
          >
            {/* <img src="/png.png" alt="image" className="w-10 h-8" /> */}
            <ImageSelector tailwindCss={"w-10 h-8"} />
          </Element>
          <Text
            text={`Marketing`}
            fontSize={20}
            tailwindCss={"mb-2 text-xl font-bold dark:text-white"}
          />
          <Text
            text={`
            Plan it, create it, launch it. Collaborate seamlessly with all the
            organization and hit your marketing goals every month with our
            marketing plan.`}
            fontSize={20}
            tailwindCss={"text-gray-500 dark:text-gray-400"}
          />
        </Element>

        <Element canvas id="body" is={ImageCard} background={"#00000000"}>
          <Element
            canvas
            id="body"
            is={Container}
            tailwindCss={
              "flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            }
            background={"#00000000"}
          >
            {/* <img src="/png.png" alt="image" className="w-10 h-8" /> */}
            <ImageSelector tailwindCss={"w-10 h-8"} />
          </Element>
          <Text
            text={`Marketing`}
            fontSize={20}
            tailwindCss={"mb-2 text-xl font-bold dark:text-white"}
          />
          <Text
            text={`
            Plan it, create it, launch it. Collaborate seamlessly with all the
            organization and hit your marketing goals every month with our
            marketing plan.`}
            fontSize={20}
            tailwindCss={"text-gray-500 dark:text-gray-400"}
          />
        </Element>

        <Element canvas id="body" is={ImageCard} background={"#00000000"}>
          <Element
            canvas
            id="body"
            is={Container}
            tailwindCss={
              "flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            }
            background={"#00000000"}
          >
            {/* <img src="/png.png" alt="image" className="w-10 h-8" /> */}
            <ImageSelector tailwindCss={"w-10 h-8"} />
          </Element>
          <Text
            text={`Marketing`}
            fontSize={20}
            tailwindCss={"mb-2 text-xl font-bold dark:text-white"}
          />
          <Text
            text={`
            Plan it, create it, launch it. Collaborate seamlessly with all the
            organization and hit your marketing goals every month with our
            marketing plan.`}
            fontSize={20}
            tailwindCss={"text-gray-500 dark:text-gray-400"}
          />
        </Element>

        <Element canvas id="body" is={ImageCard} background={"#00000000"}>
          <Element
            canvas
            id="body"
            is={Container}
            tailwindCss={
              "flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            }
            background={"#00000000"}
          >
            {/* <img src="/png.png" alt="image" className="w-10 h-8" /> */}
            <ImageSelector tailwindCss={"w-10 h-8"} />
          </Element>
          <Text
            text={`Marketing`}
            fontSize={20}
            tailwindCss={"mb-2 text-xl font-bold dark:text-white"}
          />
          <Text
            text={`
            Plan it, create it, launch it. Collaborate seamlessly with all the
            organization and hit your marketing goals every month with our
            marketing plan.`}
            fontSize={20}
            tailwindCss={"text-gray-500 dark:text-gray-400"}
          />
        </Element>

        <Element canvas id="body" is={ImageCard} background={"#00000000"}>
          <Element
            canvas
            id="body"
            is={Container}
            tailwindCss={
              "flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            }
            background={"#00000000"}
          >
            {/* <img src="/png.png" alt="image" className="w-10 h-8" /> */}
            <ImageSelector tailwindCss={"w-10 h-8"} />
          </Element>
          <Text
            text={`Marketing`}
            fontSize={20}
            tailwindCss={"mb-2 text-xl font-bold dark:text-white"}
          />
          <Text
            text={`
            Plan it, create it, launch it. Collaborate seamlessly with all the
            organization and hit your marketing goals every month with our
            marketing plan.`}
            fontSize={20}
            tailwindCss={"text-gray-500 dark:text-gray-400"}
          />
        </Element>

        <Element canvas id="body" is={ImageCard} background={"#00000000"}>
          <Element
            canvas
            id="body"
            is={Container}
            tailwindCss={
              "flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            }
            background={"#00000000"}
          >
            {/* <img src="/png.png" alt="image" className="w-10 h-8" /> */}
            <ImageSelector tailwindCss={"w-10 h-8"} />
          </Element>
          <Text
            text={`Marketing`}
            fontSize={20}
            tailwindCss={"mb-2 text-xl font-bold dark:text-white"}
          />
          <Text
            text={`
            Plan it, create it, launch it. Collaborate seamlessly with all the
            organization and hit your marketing goals every month with our
            marketing plan.`}
            fontSize={20}
            tailwindCss={"text-gray-500 dark:text-gray-400"}
          />
        </Element>

        <Element canvas id="body" is={ImageCard} background={"#00000000"}>
          <Element
            canvas
            id="body"
            is={Container}
            tailwindCss={
              "flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900"
            }
            background={"#00000000"}
          >
            {/* <img src="/png.png" alt="image" className="w-10 h-8" /> */}
            <ImageSelector tailwindCss={"w-10 h-8"} />
          </Element>
          <Text
            text={`Marketing`}
            fontSize={20}
            tailwindCss={"mb-2 text-xl font-bold dark:text-white"}
          />
          <Text
            text={`
            Plan it, create it, launch it. Collaborate seamlessly with all the
            organization and hit your marketing goals every month with our
            marketing plan.`}
            fontSize={20}
            tailwindCss={"text-gray-500 dark:text-gray-400"}
          />
        </Element>
      </Element>
      {/* <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <img src="/png.png" alt="image" className="w-10 h-8" />
          </div>
          <h3 className="mb-2 text-xl font-bold dark:text-white">Marketing</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Plan it, create it, launch it. Collaborate seamlessly with all the
            organization and hit your marketing goals every month with our
            marketing plan.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <img src="/png.png" alt="image" className="w-10 h-8" />
          </div>
          <h3 className="mb-2 text-xl font-bold dark:text-white">Legal</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Protect your organization, devices and stay compliant with our
            structured workflows and custom permissions made for you.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <img src="/png.png" alt="image" className="w-10 h-8" />
          </div>
          <h3 className="mb-2 text-xl font-bold dark:text-white">
            Business Automation
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Auto-assign tasks, send Slack messages, and much more. Now power up
            with hundreds of new templates to help you get started.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <img src="/png.png" alt="image" className="w-10 h-8" />
          </div>
          <h3 className="mb-2 text-xl font-bold dark:text-white">Finance</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Audit-proof software built for critical financial operations like
            month-end close and quarterly budgeting.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <img src="/png.png" alt="image" className="w-10 h-8" />
          </div>
          <h3 className="mb-2 text-xl font-bold dark:text-white">
            Enterprise Design
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Craft beautiful, delightful experiences for both marketing and
            product with real cross-company collaboration.
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <img src="/png.png" alt="image" className="w-10 h-8" />
          </div>
          <h3 className="mb-2 text-xl font-bold dark:text-white">Operations</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Keep your company’s lights on with customizable, iterative, and
            structured workflows built for all efficient teams and individual.
          </p>
        </div>
      </div> */}
    </TailwindCardContainer>
  );
};

TailwindCard.craft = {
  displayName: "Tailwind card container",
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
