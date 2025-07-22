import ThemeSwitcher from "../ThemeSwitcher";
import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DesktopMenu from "./DesktopMenu";
import * as motion from "motion/react-client";
import { Dispatch } from "react";
import { CgMenuRight } from "react-icons/cg";
import { User } from "../../features/auth/types";
import { Variants, Variant, cubicBezier } from "framer-motion";

function Menu({
  setIsOpen,
  isOpen,
  me,
}: {
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  me: User | undefined;
}) {
  const navigate = useNavigate();
  const buttonVariant : Variants = {
    opened: {
      top: "-100",
      transition: {
        delay: 0.15,
        duration: 1.1,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    } as Variant,
    closed: {
      top: "1rem",
      transition: {
        delay: 0.15,
        duration: 1.1,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    } as Variant,
  };

  return (
    <div className="w-full mx-auto max-w-5xl sm:rounded mb-8 md: mb-10 sm:h-96 bg-white sm:shadow-lg overflow-hidden relative">
      <div className="hidden sm:flex z-10 absolute w-full py-8 px-8 justify-end align-center">
        <ThemeSwitcher />
        <MdHome
          onClick={() => navigate("/")}
          className="text-slate-400 w-5 h-5 ml-4 cursor-pointer"
        />
      </div>
      <motion.div
        animate={isOpen ? "opened" : "closed"}
        variants={buttonVariant}
        className="absolute right-4 sm:hidden"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer bg-transparent border-none"
        >
          <CgMenuRight className="w-8 h-8 text-white" />
        </button>
      </motion.div>
      <img
        src={
          me?.cover
            ? `${import.meta.env.VITE_ASSETS_URL}${me.cover}`
            : "https://picsum.photos/1200/300?grayscale"
        }
        className="w-full h-60 sm:h-72 object-cover"
      />
      <DesktopMenu />
      <div className="absolute top-1/2 sm:top-auto left-1/2 -translate-y-1/2 flex flex-col items-center sm:absolute sm:top-auto sm:translate-y-0 sm:bottom-0 left-1/2 -translate-x-1/2 sm:pb-4">
        <img
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-solid border-white border-4 object-cover"
          src={
            me?.profile
              ? `${import.meta.env.VITE_ASSETS_URL}${me.profile}`
              : "https://picsum.photos/200"
          }
        />
        <h4 className="text-center text-xl mb-4 sm:mb-0 text-white sm:text-gray-900">
          gattopio
        </h4>
      </div>
    </div>
  );
}

export default Menu;
