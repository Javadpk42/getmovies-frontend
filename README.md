# Get Movies

## Project Overview

This is a web application that interacts with a list of movies. The application includes a backend service to handle API requests using Node and MongoDB and a frontend interface to display and manage the movie data. The design is implemented based on the provided UI design.

## Features

- **Display Movies:** Fetch and display a list of movies from the backend, which are stored in MongoDB Atlas.
  
- **Search Functionality:** Provide a search functionality to filter movies by title, allowing users to quickly find their desired movies.

- **Favourites:** Allow users to mark movies as favorites and display a list of their favorite movies. This functionality uses local storage to save favorites.

- **Responsive Design:** Ensure the application is fully responsive, providing an optimal viewing experience across different devices.

- **Loading Indicator:** Implement a loader to indicate loading state while fetching movie data from the backend API.

## Getting Started

To set up the frontend locally, follow these steps:

### Prerequisites

- Node.js installed on your machine.
- Git installed on your machine.
- An internet connection to fetch dependencies.

### Installation Steps

1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/Javadpk42/getmovies-frontend.git
    ```

2. Navigate to the project directory:
    ```sh
    cd getmovies-frontend
    ```

3. Install the required dependencies:
    ```sh
    npm install
    ```

4. Set Up Environment Variables:
    Create a `.env` file in the root directory and define the following environment variables:
    ```env
    VITE_API_BASE_URL=<your-backend-api-base-url>
    ```

5. Start the development server:
    ```sh
    npm run dev
    ```

## Backend Repository

For the backend repository, please visit: [Get Movies Backend](https://github.com/Javadpk42/getmovies-backend).

