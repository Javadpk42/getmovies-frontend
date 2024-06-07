import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import FavouritesPage from './pages/FavouritesPage';

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>

    </Router>
  );
}
export default App;

