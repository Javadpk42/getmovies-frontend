import { ChangeEvent } from "react";

export interface Movie {
    id: number;
    title: string;
    banner_image: string;
    slider_image: string;
    discription: string;
    year: string;
    genre: string;
  }

  export interface HeaderProps {
    searchQuery: string;
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  }

  export interface MoviesGridProps {
    movies: Movie[];
    favorites: Movie[];
    toggleFavorite: (movie: Movie) => void;
    loading:boolean
  }