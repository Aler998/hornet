import { ReactNode, useState } from "react";
import Menu from "../Menu/Menu";
import MobileMenu from "../Menu/MobileMenu";
import Loader from "../Loader/Loader";
import { User } from "../../features/auth/types";

function MeLayout({
  title,
  children,
  isLoading = false,
  me,
}: {
  title: string;
  children: ReactNode;
  isLoading: boolean;
  me: User | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <title>{title}</title>
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]"></div>
      {isLoading ? <Loader isLoading={isLoading} /> : ""}

      <div className="relative w-full min-w-screen min-h-screen sm:pt-8">
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        <Menu me={me} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="max-w-5xl mx-auto px-4 sm:px-0">{children}</div>
      </div>
    </>
  );
}

export default MeLayout;
