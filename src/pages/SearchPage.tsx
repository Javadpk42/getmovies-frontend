



// import { useState, useEffect, useRef, ChangeEvent } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faHeart, faFilm, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { Link } from "react-router-dom";

// import { Movie } from "../types";
// import { searchMovies } from "../api/MovieApi";




// const SearchPage = () => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [searchResults, setSearchResults] = useState<Movie[]>([]);
//   const inputRef = useRef<HTMLInputElement>(null);
  
//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);
  
//   const [favorites, setFavorites] = useState<Movie[]>(() => {
//     return JSON.parse(localStorage.getItem("favorites") || "[]");
//   });

//   const toggleFavorite = (movie: Movie) => {
//     const storedFavorites: Movie[] = JSON.parse(localStorage.getItem("favorites") || "[]");
//     const isFavorite = storedFavorites.some((fav) => fav.id === movie.id);
//     const updatedFavorites = isFavorite
//       ? storedFavorites.filter((fav) => fav.id !== movie.id)
//       : [...storedFavorites, movie];

//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//     setFavorites(updatedFavorites);
//   };

//   const handleSearchInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
//     const title = event.target.value;
//     setSearchQuery(title);
//     if (title.trim() !== "") {
//       try {
//         const results = await searchMovies(title);
//         setSearchResults(results);
//       } catch (error) {
//         console.error("Error searching for movies:", error);
//       }
//     } else {
//       setSearchResults([]);
//     }
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
//             <Link to="/favourites" className="block lg:hidden">
//               <div className="flex gap-2 items-center">
//                 <div className="flex justify-center items-center p-2 w-8 h-8 bg-gray-200 rounded-full">
//                   <FontAwesomeIcon icon={faHeart} className="w-4 text-white" />
//                 </div>
//               </div>
//             </Link>
//           </div>
//           <div className="flex justify-start">
//             <form className="flex justify-start mt-0  py-1 px-1  bg-white rounded-lg border border-gray-300 shadow-sm">
//               <label htmlFor="searchInput" className="sr-only">
//                 Search movies and series
//               </label>
//               <div className="flex gap-2">
//                 <FontAwesomeIcon
//                   icon={faSearch}
//                   className="w-5 mt-1 text-gray-500"
//                 />
//                 <input
//                   ref={inputRef}
//                   value={searchQuery}
//                   onChange={handleSearchInputChange}
//                   type="text"
//                   id="searchInput"
//                   placeholder="Search movies and series"
//                   className="w-auto lg:w-[350px] border-none focus:outline-none"
//                 />
//                 <Link to="/" className="px-2">
//                   <FontAwesomeIcon icon={faTimes} className="text-gray-500 cursor-pointer" />
//                 </Link>
//               </div>
//             </form>
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
//       <main className="flex flex-col px-6 md:px-12 lg:px-24 mt-10">
//         <h2 className="mt-5 text-xl md:text-3xl font-bold text-black">Search</h2>
//         <p className="mt-4 text-md font-semibold ">
//           {searchQuery.trim() !== "" &&
//             (searchResults.length > 0
//               ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} found`
//               : "No results found")}
//         </p>
//         <section className="mt-10 w-full">
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-14 lg:gap-16">
//             {searchResults.map((movie, index) => {
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
//                           className={`absolute top-2 right-2 flex justify-center items-center p-1 sm:p-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer ${isFavorite
//                               ? "bg-white text-red-600"
//                               : "bg-[#ffffffa4] text-gray-300"
//                             }`}
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
// import { useState, useEffect, ChangeEvent } from "react";
// import { fetchMovies, searchMovies } from "../api/MovieApi";
// import MoviesGrid from "../components/MoviesGrid";
// import Header from "../components/Header";
// import { Movie } from "../types";

// const SearchPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [favorites, setFavorites] = useState<Movie[]>(() => {
//     const savedFavorites = localStorage.getItem("favorites");
//     return savedFavorites ? JSON.parse(savedFavorites) : [];
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const moviesData = await fetchMovies();
//         setMovies(moviesData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }, [favorites]);

//   const toggleFavorite = (movie: Movie) => {
//     const isFavorite = favorites.some((fav) => fav.id === movie.id);
//     if (isFavorite) {
//       setFavorites(favorites.filter((fav) => fav.id !== movie.id));
//     } else {
//       setFavorites([...favorites, movie]);
//     }
//   };

//   useEffect(() => {
//     const searchForMovies = async () => {
//       if (searchQuery) {
//         setLoading(true);
//         try {
//           const searchData = await searchMovies(searchQuery);
//           setMovies(searchData);
//           setLoading(false);
//         } catch (error) {
//           console.error("Error searching for movies:", error);
//           setLoading(false);
//         }
//       } else {
//         fetchData();
//       }
//     };

//     searchForMovies();
//   }, [searchQuery]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const moviesData = await fetchMovies();
//       setMovies(moviesData);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50">
//       <Header
//         searchQuery={searchQuery}
//         onSearchChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
//         resetSearch={() => setSearchQuery('')}
//       />
//       <main className="flex flex-col px-6 md:px-12 lg:px-24 mt-10">
//         <h2 className="mt-5 text-xl md:text-3xl font-bold text-black">Search</h2>
//         <p className="mt-4 text-md font-semibold ">
//           {searchQuery.trim() !== "" &&
//             (movies.length > 0
//               ? `${movies.length} result${movies.length !== 1 ? 's' : ''} found`
//               : "No results found")}
//         </p>
  
//           <MoviesGrid movies={movies} favorites={favorites} toggleFavorite={toggleFavorite} />
      
//       </main>
//     </div>
//   );
// };

// export default SearchPage;


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
