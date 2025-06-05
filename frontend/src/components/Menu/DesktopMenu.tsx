import { Link } from "react-router-dom";
import { getDividedNavItems } from "./NavItems";

function DesktopMenu() {
  const divided = getDividedNavItems();
  return (
    <div className="hidden sm:grid w-full grid-cols-2 sm:gap-40 md:gap-44 lg:gap-60 my-6 sm:my-0">
      <div className="col-span-2 sm:col-span-1 flex px-8 sm:pr-0 sm:pl-8 md:pl-16 lg:pl-24 justify-between items-center sm:h-24">
        {divided.first.map((item, index) => (
          <Link key={index}
            className="no-underline text-sm font-inter font-bold text-gray-900 hover:text-gray-400 duration-300"
            to={item.link}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="col-span-2 sm:col-span-1 flex px-8 sm:pl-0 sm:pr-8 md:pr-16 lg:pr-24 justify-between items-center sm:h-24">
        {divided.second.map((item, index) => (
          <Link key={index}
            className="no-underline text-sm font-inter font-bold text-gray-900 hover:text-gray-400 duration-300"
            to={item.link}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DesktopMenu;
