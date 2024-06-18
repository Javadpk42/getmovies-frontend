
import { MoviesGridProps } from "../types";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const MoviesGrid = ({ movies, favorites, toggleFavorite,loading }: MoviesGridProps) => 
  
  (
  <section className="mt-10 w-full">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
      {!loading ? (
        movies.map((movie) => {
          const isFavorite = favorites.some((fav) => fav.id === movie.id);
          return <article className="flex flex-col">
          <div className="text-sm text-neutral-500">
            <div className="relative mb-4 aspect-[0.68] w-full">
              <img
                loading="lazy"
                src={movie.banner_image}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                alt={movie.title}
              />
              <div
                onClick={() => toggleFavorite(movie)}
                className={`absolute top-2 right-2 flex justify-center items-center p-1 sm:p-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer ${
                  isFavorite ? "bg-white text-red-600" : "bg-[#ffffffa4] text-gray-300"
                }`}
              >
                <FontAwesomeIcon icon={faHeart} className="w-3 sm:w-4" />
              </div>
            </div>
            <span className="text-xs sm:text-sm">{movie.year}</span>
            <h3 className="mt-1 text-base sm:text-lg font-bold text-gray-900">{movie.title}</h3>
            <p className="mt-2 sm:mt-4 text-xs sm:text-sm">{movie.genre}</p>
          </div>
        </article>;
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