
import { Movie } from "../types";
import MovieCard from "./MovieCard";
import Skeleton from "react-loading-skeleton";

interface MoviesGridProps {
  movies: Movie[];
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  loading:boolean
}

const MoviesGrid = ({ movies, favorites, toggleFavorite,loading }: MoviesGridProps) => (
  <section className="mt-10 w-full">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
      {!loading ? (
        movies.map((movie, index) => {
          const isFavorite = favorites.some((fav) => fav.id === movie.id);
          return <MovieCard key={index} movie={movie} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />;
        })
      ) : (
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="relative w-full">
            <Skeleton height={400} width="100%" className="bg-gray-200" />
          </div>
        ))
      )}
    </div>
  </section>
);

export default MoviesGrid;

