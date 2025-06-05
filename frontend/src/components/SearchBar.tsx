
function SearchBar({classes} : {classes: string}) {
  return (
    <div className={classes + " max-w-md mx-auto"}>
      <div className="relative shadow flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="border-0 peer h-full font-inter w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Cerca Amici..."
        />

        <button className="h-12 px-4 border-0 bg-gray-900 text-white font-inter cursor-pointer">
          Vai
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
