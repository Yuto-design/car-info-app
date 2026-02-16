import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

function Layout({ children, title }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="layout">
      <header className="layout-header">
        <Link to="/" className="layout-brand">
          <span className="layout-brand-icon">
              <i className="fa-solid fa-car"></i>
          </span>
          <span className="layout-brand-text">Car Info</span>
        </Link>
        <button
          type="button"
          className="layout-hamburger"
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="layout-hamburger-bar" />
          <span className="layout-hamburger-bar" />
          <span className="layout-hamburger-bar" />
        </button>
        <nav className={`layout-nav ${menuOpen ? 'layout-nav--open' : ''}`} aria-hidden={!menuOpen}>
          <Link to="/" className={`layout-nav-link ${isActive('/') && location.pathname === '/' ? 'layout-nav-link--active' : ''}`} onClick={closeMenu}>Home</Link>
          <Link to="/list" className={`layout-nav-link ${isActive('/list') ? 'layout-nav-link--active' : ''}`} onClick={closeMenu}>Car List</Link>
          <Link to="/favorites" className={`layout-nav-link ${isActive('/favorites') ? 'layout-nav-link--active' : ''}`} onClick={closeMenu}>Favorite</Link>
          <Link to="/comparison" className={`layout-nav-link ${isActive('/comparison') ? 'layout-nav-link--active' : ''}`} onClick={closeMenu}>Comparison</Link>
          <Link to="/my-garage" className={`layout-nav-link ${isActive('/my-garage') ? 'layout-nav-link--active' : ''}`} onClick={closeMenu}>マイガレージ</Link>
          <Link to="/manufacturers" className={`layout-nav-link ${isActive('/manufacturers') ? 'layout-nav-link--active' : ''}`} onClick={closeMenu}>Maker Official Site</Link>
        </nav>
      </header>
      {menuOpen && (
        <button
          type="button"
          className="layout-overlay"
          aria-label="メニューを閉じる"
          onClick={closeMenu}
        />
      )}
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
