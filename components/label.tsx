import clsx from "clsx";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div
      className={clsx(
        "absolute -bottom-6 left-0 flex w-full py-2 @container/label",
        {
          "": position === "center",
        }
      )}
    >
      <div className="w-full pt-6 flex flex-col items-start justify-start text-xs font-semibold text-black dark:text-white">
        <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight text-foreground font-normal text-[16px]">
          {title}
        </h3>
        <Price
          className="flex-none p-2 text-foreground font-normal text-sm"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
