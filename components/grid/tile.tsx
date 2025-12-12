import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div className="relative h-full w-full">
      <div
        className={clsx(
          `group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-transparent hover:border-primary dark:bg-black`,
          {
            relative: label,
            "border-2 border-border": active,
            "border-neutral-200 dark:border-neutral-800": !active,
          }
        )}
      >
        {props.src ? (
          <Image
            className={clsx("relative h-full w-full object-cover", {
              "transition duration-300 ease-in-out group-hover:scale-105":
                isInteractive,
            })}
            {...props}
          />
        ) : null}
        {label ? (
          <div className="absolute w-full h-16 bottom-0 bg-primary/50 backdrop-blur-sm">
            <div className="flex justify-center items-center">
              <Label
                title={label.title}
                amount={label.amount}
                currencyCode={label.currencyCode}
                position={label.position}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
