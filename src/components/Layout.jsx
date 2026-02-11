import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

function Layout({ children, title }) {
  const location = useLocation();
  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  return (
    <div className="layout">
      <header className="layout-header">
        <Link to="/" className="layout-brand">
          <span className="layout-brand-icon">
              <i className="fa-solid fa-car"></i>
          </span>
          <span className="layout-brand-text">Car Info</span>
        </Link>
        <nav className="layout-nav">
          <Link to="/" className={`layout-nav-link ${isActive('/') && location.pathname === '/' ? 'layout-nav-link--active' : ''}`}>ホーム</Link>
          <Link to="/list" className={`layout-nav-link ${isActive('/list') ? 'layout-nav-link--active' : ''}`}>車一覧</Link>
          <Link to="/admin" className={`layout-nav-link ${isActive('/admin') ? 'layout-nav-link--active' : ''}`}>登録</Link>
          <Link to="/favorites" className={`layout-nav-link ${isActive('/favorites') ? 'layout-nav-link--active' : ''}`}>お気に入り</Link>
          <Link to="/comparison" className={`layout-nav-link ${isActive('/comparison') ? 'layout-nav-link--active' : ''}`}>比較</Link>
        </nav>
      </header>
      <main className="layout-main">
        {title && <h1 className="layout-title">{title}</h1>}
        {children}
      </main>
      <footer className="layout-footer">
        <p>© Car Info - 自動車情報まとめサイト</p>
      </footer>
    </div>
  );
}

export default Layout;
