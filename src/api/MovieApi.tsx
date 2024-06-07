import axios from 'axios';
import { Movie } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
console.log('sadfsadfsadfsadfsadf',API_BASE_URL );


export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get<Movie[]>(`${API_BASE_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the movie data!", error);
    throw error;
  }
};

export const searchMovies = async (title: string): Promise<Movie[]> => {
    try {
      const response = await axios.get<Movie[]>(`${API_BASE_URL}/movies/search?title=${title}`);
      return response.data;
    } catch (error) {
      console.error("Error searching for movies:", error);
      throw error;
    }
  };
