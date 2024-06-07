
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Movie } from "../types";

interface ToggleFavoriteButtonProps {
  isFavorite: boolean;
  toggleFavorite: (movie: Movie) => void;
  movie: Movie;
}

const ToggleFavoriteButton = ({ isFavorite, toggleFavorite, movie }: ToggleFavoriteButtonProps) => (
  <div
    onClick={() => toggleFavorite(movie)}
    className={`absolute top-2 right-2 flex justify-center items-center p-1 sm:p-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer ${
      isFavorite ? "bg-white text-red-600" : "bg-[#ffffffa4] text-gray-300"
    }`}
  >
    <FontAwesomeIcon icon={faHeart} className="w-3 sm:w-4" />
  </div>
);

export default ToggleFavoriteButton;
