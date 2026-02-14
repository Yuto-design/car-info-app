import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './features/home/Home';
import CarList from './features/carList/CarList';
import CarAdmin from './features/admin/CarAdmin';
import CarDetail from './features/carDetail/CarDetail';
import Favorites from './features/favorites/Favorites';
import Comparison from './features/comparison/Comparison';
import ManufacturerLinks from './features/manufacturerLinks/ManufacturerLinks';
import './App.css';

function AppContent() {
  const location = useLocation();
  const title =
    location.pathname === '/list'
      ? 'Car List'
      : location.pathname === '/favorites'
        ? 'Favorite'
        : location.pathname === '/comparison'
          ? 'Comparison'
          : location.pathname === '/manufacturers'
            ? 'Maker Official Site'
            : location.pathname.startsWith('/admin')
              ? 'Car Registration'
              : null;

  return (
    <Layout title={title}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<CarList />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/manufacturers" element={<ManufacturerLinks />} />
        <Route path="/admin" element={<CarAdmin />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
