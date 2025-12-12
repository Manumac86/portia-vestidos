import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-md border border-primary-200 text-black transition-colors hover:border-primary-300 dark:border-primary-800 dark:text-white dark:hover:border-primary-700">
      <ShoppingCartIcon
        className={clsx(
          "h-4 transition-all ease-in-out hover:scale-110",
          className
        )}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-sm bg-primary-600 dark:bg-primary-400 text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
