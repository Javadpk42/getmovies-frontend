
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ChangeEvent, useRef } from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="flex justify-start mt-0 py-1 px-1 bg-white rounded-lg border border-gray-300 shadow-sm">
      <label htmlFor="searchInput" className="sr-only">Search movies and series</label>
      <div className="flex gap-2">
        <FontAwesomeIcon icon={faSearch} className="w-5  mt-1 text-gray-500" />
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={onSearchChange}
          type="text"
          id="searchInput"
          placeholder="Search movies and series"
          className="w-auto lg:w-[350px] border-none focus:outline-none"
        />
        <Link to="/" className="px-2">
          <FontAwesomeIcon icon={faTimes} className="text-gray-500 cursor-pointer" />
        </Link>
      </div>
    </form>
    
  );
};

export default SearchBar;
