import React, { Dispatch, ReactNode } from "react";
import Loader from "../Loader/Loader";
import { TabItem } from "../../utils/types";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

interface LayoutProps {
  title: string;
  tabs: TabItem[];
  selectedTab: TabItem;
  setSelectedTab: Dispatch<React.SetStateAction<TabItem>>;
  isLoading?: boolean;
  children: ReactNode;
}

function Layout({
  title,
  children,
  tabs,
  selectedTab,
  setSelectedTab,
  isLoading = false,
}: LayoutProps) {
  return (
    <>
      <title>{title}</title>
      {isLoading ? <Loader isLoading={isLoading} /> : ""}

      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]"></div>
      <div className="w-full h-svh max-h-screen overflow-hidden text-gray-900 dark:text-white">
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              id={selectedTab.label ? selectedTab.label : ""}
              className="w-full h-[calc(100svh-var(--navbar-height))] flex flex-col justify-center items-center"
              key={selectedTab.label ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <nav className="w-full fixed h-[var(--navbar-height)] flex items-center justify-center">
          <ul className="flex justify-center items-center list-none">
            {tabs.map((item) => (
              <motion.li
                key={item.label}
                className="list-style-none relative pb-4"
                initial={false}
                animate={{
                  color: item === selectedTab ? "#99a1af" : "#000",
                }}
                onClick={() => setSelectedTab(item)}
              >
                {item.nav}
                {item === selectedTab ? (
                  <motion.div
                    style={underline}
                    layoutId="underline"
                    id="underline"
                  />
                ) : null}
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
const underline: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 2,
  background: "var(--gray-secondary)",
};
export default Layout;
