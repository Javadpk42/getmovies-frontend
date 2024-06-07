
import { useState, useEffect, ChangeEvent } from "react";
import { fetchMovies } from "../api/MovieApi";
import SliderSection from "../components/SliderSection";
import MoviesGrid from "../components/MoviesGrid";
import Header from "../components/Header";
import { Movie } from "../types";

const HomePage = () => {
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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  return (
     <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        resetSearch={() => setSearchQuery('')}
      />
      <div className="bg-gray-50 mt-32 lg:mt-20">
      <div className="px-6 md:px-12 lg:px-24 py-10">
        <SliderSection movies={movies} loading={loading} />
        <h2 className="mt-20 text-3xl font-bold text-black">Movies</h2>
        <MoviesGrid movies={filteredMovies} favorites={favorites} toggleFavorite={toggleFavorite} loading={loading} />
      </div>
    </div>
     </>
  );
};

export default HomePage;
