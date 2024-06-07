
import { Link } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/Header";
import MoviesGrid from "../components/MoviesGrid";
import { Movie } from "../types";

const FavouritesPage = () => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie: Movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFavQuery, setSearchFavQuery] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFavQuery(e.target.value);
  };

  const regex = new RegExp(`^${searchFavQuery}`, 'i');
  const filteredMovies = favorites.filter(movie =>
    regex.test(movie.title)
  );

  return (
    <div className="bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        resetSearch={() => setSearchQuery('')}
      />
      <div className="px-6 md:px-12 lg:px-24 py-10">
        <div className="flex flex-wrap gap-10 items-center justify-between">
          <div className="flex">
            <Link to='/'>
              <div className="mt-0 flex justify-center items-center p-2 w-8 h-8 rounded-full border border-solid border-black">
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 text-black" />
              </div>
            </Link>
            <h2 className="text-2xl font-bold mb-1 ml-3">My Favourites</h2>
          </div>
          <div className="flex">
            <form className="px-2 bg-white rounded-lg border border-gray-300 shadow-sm w-full min-w-52 lg:ml-auto max-w-[6cm]">
              <label htmlFor="searchInput" className="sr-only">Search from favourites</label>
              <div className="flex gap-2 w-full">
                <FontAwesomeIcon icon={faSearch} className="w-5 mt-2 text-gray-500" />
                <input type="text" id="searchInput" value={searchFavQuery} placeholder="Search from favourites" className="w-full py-1 pl-2 border-none focus:outline-none" onChange={handleSearchChange} />
              </div>
            </form>
          </div>
        </div>
        {filteredMovies.length === 0 && (
          <div className="text-center mt-10 text-gray-600">
            No favorites added yet. <Link to="/" className="text-rose-600">Discover movies here</Link>
          </div>
        )}
        <MoviesGrid movies={filteredMovies} favorites={favorites} toggleFavorite={toggleFavorite} loading={false} />
        
      </div>
    </div>
  );
};

export default FavouritesPage;




