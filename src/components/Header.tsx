
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faHeart, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetSearch: () => void;
}

const Header = ({ searchQuery, onSearchChange, resetSearch }: HeaderProps) => {
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';


  return (
    <header className="flex flex-col lg:flex-row gap-5 justify-between px-6 md:px-12 lg:px-24 py-5 bg-white">
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center lg:w-auto">
        <div className="flex justify-between w-full lg:w-auto">
          <Link to="/">
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center p-2 w-8 h-8 bg-rose-600 rounded-full">
                <FontAwesomeIcon icon={faFilm} className="w-4 text-white " />
              </div>
              <h1 className="text-lg font-bold text-black uppercase">Get Movies</h1>
            </div>
          </Link>
          <Link to="/favourites" className="block lg:hidden">
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center p-2 w-8 h-8 bg-gray-200 rounded-full">
                <FontAwesomeIcon icon={faHeart} className="w-4 text-white" />
              </div>
            </div>
          </Link>
        </div>
        <div className="flex justify-start">
          <Link to="/search" onClick={resetSearch}>
            <form className="flex justify-start mt-0 py-1 px-1 bg-white rounded-lg border border-gray-300 shadow-sm">
              <label htmlFor="searchInput" className="sr-only">Search movies and series</label>
              <div className="flex gap-2">
                <FontAwesomeIcon icon={faSearch} className="w-5 mt-1 text-gray-500" />
                <input
                  type="text"
                  id="searchInput"
                  value={searchQuery}
                  onChange={onSearchChange}
                  placeholder="Search movies and series"
                  className="w-auto lg:w-[350px] border-none focus:outline-none"
                />
                {isSearchPage && (
                  <Link to="/" className="px-2">
                    <FontAwesomeIcon icon={faTimes} className="text-gray-500 cursor-pointer" />
                  </Link>
                )}
              </div>
            </form>
          </Link>
        </div>
      </div>
      <div className="justify-end hidden lg:flex">
        <button className="flex gap-2 items-center lg:px-4 text-sm font-semibold text-white bg-rose-600 rounded-lg shadow-sm">
          <Link to="/favourites" className="w-full">
            <FontAwesomeIcon icon={faHeart} className="w-5" />
            <span>My favourites</span>
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
