import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './features/home/Home';
import CarList from './features/carList/CarList';
import CarAdminRegister from './features/admin/CarAdminRegister';
import CarAdminCars from './features/admin/CarAdminCars';
import CarDetail from './features/carDetail/CarDetail';
import Favorites from './features/favorites/Favorites';
import Comparison from './features/comparison/Comparison';
import MyGarage from './features/myGarage/MyGarage';
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
          : location.pathname === '/my-garage'
            ? 'マイガレージ'
            : location.pathname === '/manufacturers'
            ? 'Maker Official Site'
            : location.pathname === '/admin/register'
              ? '車登録'
              : location.pathname === '/admin/cars'
                ? '登録車の編集・削除'
                : null;

  return (
    <Layout title={title}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<CarList />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/my-garage" element={<MyGarage />} />
        <Route path="/manufacturers" element={<ManufacturerLinks />} />
        <Route path="/admin/register" element={<CarAdminRegister />} />
        <Route path="/admin/cars" element={<CarAdminCars />} />
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
