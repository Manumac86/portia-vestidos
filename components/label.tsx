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
      className={clsx("flex w-full p-2 ", {
        "": position === "center",
      })}
    >
      <div className="w-full h-full flex flex-col gap-2 items-start justify-center font-semibold text-muted dark:text-muted">
        <h3 className="line-clamp-2 grow leading-none tracking-tight text-muted font-normal text-lg">
          {title}
        </h3>
        <Price
          className="flex-none text-muted font-normal text-lg"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
