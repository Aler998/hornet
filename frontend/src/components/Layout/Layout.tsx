import { ReactNode } from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import Logo from "../Logo";
import Loader from "../Loader/Loader";

export enum templates {
  default,
  clear,
  noLoader,
}

function Layout({
  title,
  isLoading = false,
  template,
  children,
}: {
  title?: string;
  isLoading?: boolean;
  template: templates;
  children?: ReactNode;
}) {
  switch (template) {
    case templates.clear:
      return (
        <>
          <title>{title}</title>
          <Loader isLoading={isLoading} />
          {children}
        </>
      );
      break;
    case templates.noLoader:
      return (
        <>
          <title>{title}</title>
          <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]"></div>
          <div className="w-full min-w-screen py-8 px-4 flex justify-end align-center">
            <ThemeSwitcher />
          </div>
          <div className="w-wull min-w-screen text-neutral-700 font-oswald">
            <div className="w-full mx-auto max-w-full md:max-w-2/3 lg:max-w-1/3 flex flex-col items-center md-8 sm:mb-16">
              <Logo classes="w-20 h-20" />
              <h1 className="text-6xl my-4 dark:text-honda">{title}</h1>
            </div>
            <div className="max-w-3xl mx-auto px-4">{children}</div>
          </div>
        </>
      );
      break;

    default:
      return (
        <>
          <title>{title}</title>
          <Loader isLoading={isLoading} />
          <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]"></div>
          <div className="w-full min-w-screen py-8 px-4 flex justify-end align-center">
            <ThemeSwitcher />
          </div>
          <div className="w-wull min-w-screen text-neutral-700 font-oswald">
            <div className="w-full mx-auto max-w-full md:max-w-2/3 lg:max-w-1/3 flex flex-col items-center md-8 sm:mb-16">
              <Logo classes="w-20 h-20" />
              <h1 className="text-6xl my-4 dark:text-honda">{title}</h1>
            </div>
            <div className="max-w-3xl mx-auto px-4">{children}</div>
          </div>
        </>
      );
      break;
  }
}

export default Layout;
