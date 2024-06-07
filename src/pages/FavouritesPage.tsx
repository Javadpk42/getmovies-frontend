


// import { useEffect, useState, ChangeEvent } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faHeart, faFilm, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// import { Movie } from "../types";



// const FavouritesPage = () => {
//   const [moviesData, setMoviesData] = useState<Movie[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   useEffect(() => {
//     const savedFavorites = localStorage.getItem("favorites");
//     if (savedFavorites) {
//       setMoviesData(JSON.parse(savedFavorites));
//     }
//   }, []);

//   const filteredMovies = moviesData.filter(movie =>
//     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleRemoveFavorite = (movieId: number) => {
//     const updatedFavorites = moviesData.filter(movie => movie.id !== movieId);
//     setMoviesData(updatedFavorites);
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   };

//   return (
//     <div className="flex flex-col pb-20 bg-neutral-100">
//       <header className="flex flex-col lg:flex-row gap-5 justify-between  px-6 md:px-12 lg:px-24 py-5 bg-white">
//         <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center lg:w-auto">
//           <div className="flex justify-between w-full lg:w-auto">
//             <Link to="/">
//               <div className="flex gap-2 items-center">
//                 <div className="flex justify-center items-center p-2 w-8 h-8 bg-rose-600 rounded-full">
//                   <FontAwesomeIcon icon={faFilm} className="w-4 text-white " />
//                 </div>
//                 <h1 className="text-lg font-bold text-black uppercase">
//                   Get Movies
//                 </h1>
//               </div>
//             </Link>
//           </div>
//           <div className="flex justify-start">
//             <Link to="/search">
//               <form className="flex justify-start mt-0  py-1 px-1  bg-white rounded-lg border border-gray-300 shadow-sm">
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
//       </header>
//       <main className="flex flex-col px-6 md:px-12 lg:px-24 mt-10">
//         <div className="flex flex-wrap gap-10">
//           <div className="flex gap-2 items-center">
//             <Link to='/'>
//             <div className="mt-1 flex justify-center items-center p-2 w-8 h-8  rounded-full border border-solid border-black">
//               <FontAwesomeIcon icon={faChevronLeft} className="w-4 text-black" />
//             </div>
//             </Link>
//             <h2 className=" text-xl  md:text-3xl font-bold text-black ml-3">My Favourites</h2>
//           </div>
//           <form className="flex flex-1 px-2 py-1  bg-white rounded-lg border border-gray-300 shadow-sm w-full min-w-52 lg:ml-auto max-w-[6cm] ">
//             <label htmlFor="searchInput" className="sr-only">Search from favourites</label>
//             <div className="flex gap-2 w-full">
//               <FontAwesomeIcon icon={faSearch} className="w-5 mt-1 text-gray-500" />
//               <input type="text" id="searchInput" placeholder="Search from favourites" className="w-full border-none focus:outline-none" onChange={handleSearchChange} />
//             </div>
//           </form>
//         </div>

//         {filteredMovies.length === 0 && (
//           <div className="text-center mt-10 text-gray-600">
//             No favorites added yet. <Link to="/" className="text-rose-600">Discover movies here</Link>
//           </div>
//         )}

//         <section className="mt-10 w-full">
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
//             {filteredMovies.map((movie, index) => {
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
//                           onClick={() => handleRemoveFavorite(movie.id)}
//                           className="absolute top-2 right-2 flex justify-center items-center p-1 sm:p-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer bg-white"
//                         >
//                           <FontAwesomeIcon icon={faHeart} className="w-3 sm:w-4 text-red-600 " />
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

import { Link } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/Header";
import MoviesGrid from "../components/MoviesGrid";
import { Movie } from "../types";

const FavouritesPage = () => {
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    setLoading(true)
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });


  // const toggleFavorite = (movie: Movie) => {
  //   const isFavorite = favorites.some((fav) => fav.id === movie.id);
  //   if (isFavorite) {
  //     setFavorites(favorites.filter((fav) => fav.id !== movie.id));
  //   } else {
  //     setFavorites([...favorites, movie]);
  //   }
  // };

  const toggleFavorite = (movie: Movie) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some((fav) => fav.id === movie.id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
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
        <MoviesGrid movies={filteredMovies} favorites={favorites} toggleFavorite={toggleFavorite} loading={loading} />
        
      </div>
    </div>
  );
};

export default FavouritesPage;




