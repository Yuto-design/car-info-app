import { Link } from 'react-router-dom';
import './HomeHeroIcons.css';

function HomeHeroIcons() {
  return (
    <>
      <div className="home-hero-icon-wrap" aria-hidden="true">
        <span className="home-hero-icon-orb" />
        <span className="home-hero-icon">
          <i className="fa-solid fa-car-on"></i>
        </span>
      </div>
      <div className="home-hero-connector" aria-hidden="true">
        <svg className="home-hero-connector-svg" viewBox="0 0 24 520" preserveAspectRatio="none">
          <line x1="0" y1="260" x2="24" y2="50" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="0" y1="260" x2="24" y2="260" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="0" y1="260" x2="24" y2="390" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="0" y1="260" x2="24" y2="520" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        </svg>
      </div>
      <div className="home-hero-sub-icons">
        <div className="home-hero-sub-icon-item home-hero-sub-icon-item--list-branch">
          <div className="home-hero-sub-icon-cell">
            <Link to="/list" className="home-hero-sub-icon home-hero-sub-icon--list" title="車一覧">
              <i className="fa-solid fa-list"></i>
            </Link>
            <span className="home-hero-sub-icon-label">車一覧</span>
          </div>
          <span className="home-hero-sub-icon-connector home-hero-sub-icon-connector--branch" aria-hidden="true">
            <svg className="home-hero-sub-icon-connector-svg" viewBox="0 0 24 260" preserveAspectRatio="none">
              <line x1="0" y1="250" x2="24" y2="110" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <line x1="0" y1="250" x2="24" y2="400" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            </svg>
          </span>
          <div className="home-hero-sub-icon-branch">
            <div className="home-hero-sub-icon-cell">
              <Link to="/admin/register" className="home-hero-sub-icon home-hero-sub-icon--register" title="車登録">
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
              <span className="home-hero-sub-icon-label">車登録</span>
            </div>
            <div className="home-hero-sub-icon-cell">
              <Link to="/admin/cars" className="home-hero-sub-icon home-hero-sub-icon--edit" title="編集・削除">
                <i className="fa-solid fa-pen"></i>
              </Link>
              <span className="home-hero-sub-icon-label">編集・削除</span>
            </div>
          </div>
        </div>
        <div className="home-hero-sub-icon-item">
          <div className="home-hero-sub-icon-cell">
            <Link to="/favorites" className="home-hero-sub-icon home-hero-sub-icon--favorites" title="お気に入り">
              <i className="fa-solid fa-heart"></i>
            </Link>
            <span className="home-hero-sub-icon-label">お気に入り</span>
          </div>
        </div>
        <div className="home-hero-sub-icon-item">
          <div className="home-hero-sub-icon-cell">
            <Link to="/comparison" className="home-hero-sub-icon home-hero-sub-icon--comparison" title="比較">
              <i className="fa-solid fa-scale-balanced"></i>
            </Link>
            <span className="home-hero-sub-icon-label">比較</span>
          </div>
        </div>
        <div className="home-hero-sub-icon-item">
          <div className="home-hero-sub-icon-cell">
            <Link to="/manufacturers" className="home-hero-sub-icon home-hero-sub-icon--manufacturers" title="公式HP">
              <i className="fa-solid fa-globe"></i>
            </Link>
            <span className="home-hero-sub-icon-label">公式HP</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeHeroIcons;
