import { ReactNode } from "react";
import Logo from "../Logo";
import Loader from "../Loader/Loader";

function EmptyLayout({
  title,
  children,
  h1,
  isLoading = false,
}: {
  title: string;
  children: ReactNode;
  h1?: boolean;
  isLoading?: boolean;
}) {
  return (
    <>
      <title>{title}</title>
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]"></div>
      <div className="w-wull min-w-screen text-gray-900 font-oswald">
        {isLoading ? <Loader isLoading={isLoading} /> : ""}

        {h1 ? (
          <div className="w-full mx-auto max-w-full md:max-w-2/3 lg:max-w-1/3 flex flex-col items-center md-8 sm:mb-16">
            <Logo classes="w-20 h-20" />
            <h1 className="text-6xl my-4">{title}</h1>
          </div>
        ) : (
          ""
        )}
        <div className="min-w-screen min-h-screen">{children}</div>
      </div>
    </>
  );
}

export default EmptyLayout;
