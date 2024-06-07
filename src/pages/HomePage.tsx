
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSearch,
//   faHeart,
//   faFilm,
//   faPlayCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// import { Movie } from "../types";
// import { fetchMovies } from "../api/MovieApi";

// const HomePage = () => {
//   const [moviesData, setMoviesData] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState<Movie[]>(() => {
//     return JSON.parse(localStorage.getItem("favorites") || "[]") as Movie[];
//   });

//   useEffect(() => {
//     const getMovies = async () => {
//       try {
//         const movies = await fetchMovies();
//         setMoviesData(movies);
//       } catch (error) {
//         console.error("Failed to fetch movies", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getMovies();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   const toggleFavorite = (movie: Movie) => {
//     const storedFavorites: Movie[] = JSON.parse(localStorage.getItem("favorites") || "[]");
//     const isFavorite = storedFavorites.some((fav) => fav.id === movie.id);
//     const updatedFavorites = isFavorite
//       ? storedFavorites.filter((fav) => fav.id !== movie.id)
//       : [...storedFavorites, movie];

//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//     setFavorites(updatedFavorites);
//   };

//   return (
//     <div className="flex flex-col pb-20 bg-neutral-100">
//       <header className="flex flex-col lg:flex-row gap-5 justify-between px-6 md:px-12 lg:px-24 py-5 bg-white">
//         <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center lg:w-auto">
//           <div className="flex justify-between w-full lg:w-auto">
//             <div className="flex gap-2 items-center">
//               <div className="flex justify-center items-center p-2 w-8 h-8 bg-rose-600 rounded-full">
//                 <FontAwesomeIcon icon={faFilm} className="w-4 text-white " />
//               </div>
//               <h1 className="text-lg font-bold text-black uppercase">
//                 Get Movies
//               </h1>
//             </div>
//             <Link to="/favourites" className="block lg:hidden">
//               <div className="flex gap-2 items-center">
//                 <div className="flex justify-center items-center p-2 w-8 h-8 bg-gray-200 rounded-full">
//                   <FontAwesomeIcon icon={faHeart} className="w-4 text-white" />
//                 </div>
//               </div>
//             </Link>
//           </div>
//           <div className="flex justify-start">
//             <Link to="/search">
//               <form className="flex justify-start mt-0 py-1 px-1 bg-white rounded-lg border border-gray-300 shadow-sm">
//                 <label htmlFor="searchInput" className="sr-only">
//                   Search movies and series
//                 </label>
//                 <div className="flex gap-2">
//                   <FontAwesomeIcon
//                     icon={faSearch}
//                     className="w-5 mt-1 text-gray-500"
//                   />
//                   <input
//                     type="text"
//                     id="searchInput"
//                     placeholder="Search movies and series"
//                     className="w-auto lg:w-[350px] border-none focus:outline-none"
//                   />
//                 </div>
//               </form>
//             </Link>
//           </div>
//         </div>
//         <div className="justify-end hidden lg:flex">
//           <button className="flex gap-2 items-center lg:px-4 text-sm font-semibold text-white bg-rose-600 rounded-lg shadow-sm">
//             <Link to="/favourites" className="w-full">
//               <FontAwesomeIcon icon={faHeart} className="w-5" />
//               <span>My favourites</span>
//             </Link>
//           </button>
//         </div>
//       </header>
//       <main className="flex flex-col px-6 md:px-12 lg:px-24 mt-7 ">
//         <div className="rounded-2xl overflow-hidden">
//         {loading ? (
//           <div className="w-full">
//             <Skeleton height={600} className="rounded-2xl bg-gray-200 overflow-hidden" />
//           </div>
//         ) : (
//           <>
//             {moviesData.length > 0 && (
//               <Slider {...settings} className="w-full rounded-2xl">
//                 {moviesData.slice(0, 4).map((movie, index) => (
//                   <div
//                     key={index}
//                     className="relative flex flex-col items-start px-8 py-3 md:px-16  lg:px-20 lg:py-6 w-full text-sm text-white h-[380px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
//                   >
//                     <img
//                       loading="lazy"
//                       src={movie.slider_image}
//                       alt={movie.title}
//                       className="rounded-lg object-cover absolute inset-0 w-full h-full"
//                     />
//                     <h2 className="relative mt-32 sm:mt-40 md:mt:40  lg:mt-56 text-2xl sm:text-3xl md:text-4xl  lg:text-5xl font-bold w-full sm:w-[250px]  lg:w-[404px]">
//                       {movie.title}
//                     </h2>
//                     <p className="relative mt-2 w-full lg:w-[376px] text-xs sm:text-sm md:text-base lg:text-lg">
//                       {movie.discription}
//                     </p>
//                     <button className="flex relative gap-2 items-center px-3 py-2 mt-4 mb-4 font-bold bg-white text-black rounded-lg shadow-sm text-xs sm:text-sm md:text-base lg:text-lg">
//                       <FontAwesomeIcon
//                         icon={faPlayCircle}
//                         className="w-4 sm:w-5 text-rose-600"
//                       />
//                       <span>Watch trailer</span>
//                     </button>
//                   </div>
//                 ))}
//               </Slider>
//             )}
//           </>
//         )}
//         </div>

//         <h2 className="mt-20 text-3xl font-bold text-black">Movies</h2>
//         <section className="mt-10 w-full">
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
//             {moviesData.map((movie, index) => {
//               const isFavorite = favorites.some((fav) => fav.id === movie.id);

//               return (
//                 <article key={index} className="flex flex-col">
//                   <div className="text-sm text-neutral-500">
//                     <div className="relative">
//                       <div className="relative mb-4 aspect-[0.68] w-full">
//                         <img
//                           loading="lazy"
//                           src={movie.banner_image}
//                           className="absolute inset-0 w-full h-full object-cover rounded-2xl"
//                           alt={movie.title}
//                         />
//                         <div
//                           onClick={() => toggleFavorite(movie)}
//                           className={`absolute top-2 right-2 flex justify-center items-center p-1 sm:p-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer ${
//                             isFavorite
//                               ? "bg-white text-red-600"
//                               : "bg-[#ffffffa4] text-gray-300"
//                           }`}
//                         >
//                           <FontAwesomeIcon icon={faHeart} className="w-3 sm:w-4" />
//                         </div>
//                       </div>
//                     </div>
//                     <span className="text-xs sm:text-sm">{movie.year}</span>
//                     <h3 className="mt-1 text-base sm:text-lg font-bold text-gray-900">
//                       {movie.title}
//                     </h3>
//                     <p className="mt-2 sm:mt-4 text-xs sm:text-sm">{movie.genre}</p>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  return (
    <div className="bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        resetSearch={() => setSearchQuery('')}
      />
      
      <div className="px-6 md:px-12 lg:px-24 py-10">
        <SliderSection movies={movies} loading={loading} />
        <h2 className="mt-20 text-3xl font-bold text-black">Movies</h2>
        <MoviesGrid movies={filteredMovies} favorites={favorites} toggleFavorite={toggleFavorite} loading={loading} />
      </div>
    </div>
  );
};

export default HomePage;
