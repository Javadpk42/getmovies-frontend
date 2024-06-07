
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import { Movie } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";

interface SliderSectionProps {
  movies: Movie[];
  loading: boolean;
}

const SliderSection = ({ movies, loading }: SliderSectionProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="rounded-2xl overflow-hidden">
      {loading ? (
        <div className="w-full">
          <Skeleton height={600} className="rounded-2xl bg-gray-300 overflow-hidden" />
        </div>
      ) : (
        movies.length > 0 && (
          <Slider {...settings} className="w-full rounded-2xl">
            {movies.slice(0, 4).map((movie, index) => (
              <div
                key={index}
                className="relative flex flex-col items-start px-8 py-3 md:px-16 lg:px-20 lg:py-6 w-full text-sm text-white h-[380px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
              >
                <img
                  loading="lazy"
                  src={movie.slider_image}
                  alt={movie.title}
                  className="rounded-lg object-cover absolute inset-0 w-full h-full"
                />
                <h2 className="relative mt-32 sm:mt-40 md:mt:40 lg:mt-56 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold w-full sm:w-[250px] lg:w-[404px]">
                  {movie.title}
                </h2>
                <p className="relative mt-2 w-full lg:w-[376px] text-xs sm:text-sm md:text-base lg:text-lg">
                  {movie.discription}
                </p>
                <button className="flex relative gap-2 items-center px-3 py-2 mt-4 mb-4 font-bold bg-white text-black rounded-lg shadow-sm text-xs sm:text-sm md:text-base lg:text-lg">
                  <FontAwesomeIcon icon={faPlayCircle} className="w-4 sm:w-5 text-rose-600" />
                  <span>Watch trailer</span>
                </button>
              </div>
            ))}
          </Slider>
        )
      )}
    </div>
  );
};

export default SliderSection;
