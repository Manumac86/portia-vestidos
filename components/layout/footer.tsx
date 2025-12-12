import Link from "next/link";

import { getMenu } from "lib/shopify";
import Image from "next/image";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = currentYear;
  const skeleton = "w-full h-6 animate-pulse rounded-sm bg-muted";
  const menu = await getMenu("next-js-frontend-footer-menu");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="text-sm text-muted-foreground font-oswald bg-white/80">
      <div className="mx-auto flex justify-center w-full max-w-7xl flex-col items-center gap-6 px-6 py-8 text-sm md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link
            className="flex items-center gap-2 text-foreground md:pt-1"
            href="/"
          >
            <Image
              src="/assets/portia_logo.png"
              alt="Logo"
              width={100}
              height={100}
            />
            {/* <span className="uppercase">{SITE_NAME}</span> */}
          </Link>
        </div>
        <p className="text-center text-muted-foreground text-xs">
          &copy; {copyrightDate} {copyrightName}
          {copyrightName.length && !copyrightName.endsWith(".") ? "." : ""}{" "}
          Todos los derechos reservados.
        </p>
        {/* <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense> */}
      </div>
      {/* <div className="border-t border-border py-6 text-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p className="text-center text-muted-foreground text-xs">
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            Todos los derechos reservados.
          </p>
        </div>
      </div> */}
    </footer>
  );
}
