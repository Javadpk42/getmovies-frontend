
import { useState, useEffect, ChangeEvent } from "react";
import { fetchMovies, searchMovies } from "../api/MovieApi";
import MoviesGrid from "../components/MoviesGrid";
import Header from "../components/Header";
import { Movie } from "../types";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  useEffect(() => {
    const searchForMovies = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const searchData = await searchMovies(searchQuery);
          setMovies(searchData);
          setLoading(false);
        } catch (error) {
          console.error("Error searching for movies:", error);
          setLoading(false);
        }
      } else {
        fetchData();
      }
    };

    searchForMovies();
  }, [searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        resetSearch={() => setSearchQuery('')}
        
      />
      <main className="flex flex-col px-6 md:px-12 lg:px-24 mt-10">
        <h2 className="mt-5 text-xl md:text-3xl font-bold text-black">Search</h2>
        <p className="mt-4 text-md font-semibold ">
          {searchQuery.trim() !== "" &&
            (movies.length > 0
              ? `${movies.length} result${movies.length !== 1 ? 's' : ''} found`
              : "No results found")}
        </p>
        
          <MoviesGrid movies={movies} favorites={favorites} toggleFavorite={toggleFavorite} loading={loading} />
        
      </main>
    </div>
  );
};

export default SearchPage;
