import {
  Disclosure,
  DisclosureContent,
  useDisclosureState,
} from "ariakit/disclosure";
import { AlertTriangle, ChevronDown, Info } from "lucide-react";

import { AnimateHeight } from "@/components/animation/AnimateHeight";
import { cx } from "@/lib/cx";

type CalloutProps = {
  intent: "info" | "danger" | "default";
  children: React.ReactNode;
  heading?: string;
  dropdown?: boolean;
};

export function Callout(props: CalloutProps) {
  const disclosure = useDisclosureState();
  const icon =
    props.intent === "danger" ? (
      <AlertTriangle className="w-4 h-5 shrink-0" />
    ) : props.intent === "info" ? (
      <Info className="w-5 h-5 shrink-0" />
    ) : null;

  return props.dropdown ? (
    <aside
      className={cx(
        "p-3 w-full rounded-xl my-6",
        props.intent === "danger" &&
          "bg-red-dark-2 border-2 border-red-dark-4 text-red-dark-11",
        props.intent === "info" &&
          "bg-indigo-dark-2 border-2 border-indigo-dark-4 !text-indigo-dark-11",
        props.intent === "default" &&
          "bg-shark-600 border-shark-500 border-2 text-silver-600"
      )}
    >
      <div className="flex flex-col">
        <Disclosure
          state={disclosure}
          className="flex items-center justify-between w-full"
        >
          <div className={cx("flex items-center gap-2 text-xl font-semibold")}>
            {icon}
            <p className="m-0">{props.heading}</p>
          </div>

          <div
            className={cx(
              "rounded-full bg-indigo-dark-3 p-1 border-2 border-indigo-dark-4",
              props.intent === "danger" &&
                "bg-red-dark-3  border-2 border-red-dark-4",
              props.intent === "default" && "bg-shark-400 p-1 border-shark-300"
            )}
          >
            <ChevronDown
              className={cx(
                "w-5 h-5",
                disclosure.open
                  ? "rotate-180 duration-300"
                  : "rotate-0 duration-300"
              )}
            />
          </div>
        </Disclosure>
        <DisclosureContent
          state={disclosure}
          as={AnimateHeight}
          isVisible={disclosure.open}
        >
          <div className="flex flex-col gap-6 mt-4 text-lg">
            {" "}
            {props.children}
          </div>
        </DisclosureContent>
      </div>
    </aside>
  ) : (
    <aside
      className={cx(
        "p-3 w-full rounded-xl ",
        props.intent === "danger" &&
          "bg-red-dark-2 border-2 border-red-dark-4 text-red-dark-11",
        props.intent === "info" &&
          "bg-indigo-dark-2 border-2 border-indigo-dark-4 !text-indigo-dark-11",
        props.intent === "default" &&
          "bg-shark-600 border-shark-500 border-2 text-silver-600"
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-bold">
          {icon}
          <p className="m-0">{props.heading}</p>
        </div>
        <div className="flex flex-col gap-2 text-lg"> {props.children}</div>
      </div>
    </aside>
  );
}
