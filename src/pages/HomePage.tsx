
import { useState, useEffect } from "react";
import { Movie } from "../types";
import { fetchMovies } from "../api/MovieApi";
import Header from "../components/Header";
import SliderSection from "../components/SliderSection";
import MoviesGrid from "../components/MoviesGrid";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
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


  return (
     <>
      <Header
        searchQuery={''}
        onSearchChange={() => {}}
      />
      <div className="bg-gray-50 mt-32 md:mt-20">
      <div className="px-6 md:px-12 lg:px-24 py-10">
        <SliderSection movies={movies} loading={loading} />
        <h2 className="mt-20 text-3xl font-bold text-black">Movies</h2>
        <MoviesGrid movies={movies} favorites={favorites} toggleFavorite={toggleFavorite} loading={loading} />
      </div>
    </div>
     </>
  );
};

export default HomePage;