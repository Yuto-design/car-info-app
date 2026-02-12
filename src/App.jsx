import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './features/home/Home';
import CarList from './features/carList/CarList';
import CarAdmin from './features/admin/CarAdmin';
import CarDetail from './features/carDetail/CarDetail';
import './App.css';

function AppContent() {
  const location = useLocation();
  const title =
    location.pathname === '/list'
      ? '車一覧'
      : location.pathname.startsWith('/admin')
        ? '車種登録'
        : null;

  return (
    <Layout title={title}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<CarList />} />
        <Route path="/car/:id" element={<CarDetail />} />
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
