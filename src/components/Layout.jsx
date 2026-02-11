import './Layout.css';

function Layout({ children, title }) {
  return (
    <div className="layout">
      <header className="layout-header">
        <a href="/" className="layout-brand">
          <span className="layout-brand-icon">
              <i className="fa-solid fa-car"></i>
          </span>
          <span className="layout-brand-text">Car Info</span>
        </a>
        <nav className="layout-nav">
          <a href="/" className="layout-nav-link layout-nav-link--active">ホーム</a>
          <a href="/list" className="layout-nav-link">車一覧</a>
          <a href="/favorites" className="layout-nav-link">お気に入り</a>
          <a href="/comparison" className="layout-nav-link">比較</a>
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
