import { AnimatePresence, Variants, Variant, cubicBezier, easeOut, easeInOut } from "motion/react";
import * as motion from "motion/react-client";
import { Link } from "react-router-dom";
import { navItems } from "./NavItems";
import { Dispatch } from "react";
import { IoClose } from "react-icons/io5";
import Logo from "../Logo";
import SearchBar from "../SearchBar";

function MobileMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const mobileMenuVariant : Variants = {
    opened: {
      y: "0%",
      transition: {
        delay: 0.15,
        duration: 1.1,
        ease: cubicBezier(0.74, 0, 0.19, 1.02),
      },
    } as Variant,
    closed: {
      y: "-100%",
      transition: {
        delay: 0.35,
        duration: 0.63,
        ease: cubicBezier(0.74, 0, 0.19, 1.02),
      },
    } as Variant,
  };
  const ulVariant : Variants = {
    opened: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.18,
      },
    } as Variant,
    closed: {
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    } as Variant,
  };

  const liVariant : Variants = {
    opened: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.65,
        ease: easeOut,
      },
    } as Variant,
    closed: {
      opacity: 0,
      y: "100%",
      transition: {
        duration: 0.25,
        ease: easeInOut,
      },
    } as Variant,
  };

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.nav
          animate={isOpen ? "opened" : "closed"}
          className="sm:hidden"
        >
          <motion.div
            variants={mobileMenuVariant}
            className="fixed h-100svh left-0 top-0 shadow-lg w-screen bg-white overflow-hidden z-40"
          >
            <motion.div
              className="w-full h-full relative"
              animate={isOpen ? "opened" : "closed"}
            >
              <button
                className="absolute top-4 right-4 bg-transparent border-0"
                onClick={() => setIsOpen(false)}
              >
                <IoClose className="w-8 h-8" />
              </button>
              <motion.div className="p-8">
                <Logo complete={true} classes="h-12" />
              </motion.div>
              <div className="px-10">
                <motion.ul className="w-full list-none mb-8" variants={ulVariant}>
                  {navItems.map((item, index) => (
                    <motion.li
                      key={index}
                      className="w-full mb-2"
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div variants={liVariant}>
                        <Link
                          className="font-inter text-lg text-gray-900 no-underline hover:text-gray-600"
                          to={item.link}
                        >
                          {item.title}
                        </Link>
                      </motion.div>
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div variants={liVariant} className="w-full">
                  <SearchBar classes="sm:hidden"/>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.nav>
      </AnimatePresence>
    </>
  );
}

export default MobileMenu;
