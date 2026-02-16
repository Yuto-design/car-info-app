import { Link } from 'react-router-dom';
import '../styles/HomeHeroIcons.css';

const RADIUS = 200;
const CX = 300;
const CY = 300;
const ICON_HALF = 60;

function polar(angleDeg, r = RADIUS) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function edgeToEdge(a, b, margin = ICON_HALF) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy);
  if (d < 1e-6) return { x1: a.x, y1: a.y, x2: a.x, y2: a.y };
  const ux = dx / d;
  const uy = dy / d;
  return {
    x1: a.x + ux * margin,
    y1: a.y + uy * margin,
    x2: b.x - ux * margin,
    y2: b.y - uy * margin,
  };
}

function HomeHeroIcons() {
  const listPos = polar(0);
  const favoritesPos = polar(72);
  const comparisonPos = polar(144);
  const garagePos = polar(215);
  const manufacturersPos = polar(288);

  const branchRadius = 200;
  const branchAngleLeft = (240 * Math.PI) / 180;
  const branchAngleRight = (300 * Math.PI) / 180;
  const registerPos = {
    x: listPos.x + branchRadius * Math.cos(branchAngleLeft),
    y: listPos.y + branchRadius * Math.sin(branchAngleLeft),
  };
  const editPos = {
    x: listPos.x + branchRadius * Math.cos(branchAngleRight),
    y: listPos.y + branchRadius * Math.sin(branchAngleRight),
  };
  const exportPos = polar(105, 370);

  const stroke = 'rgba(255,255,255,0.18)';
  const center = { x: CX, y: CY };

  return (
    <div className="home-hero-spider" aria-hidden="true">
      <div className="home-hero-spider-inner">
        <svg className="home-hero-spider-lines" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
          <line {...edgeToEdge(center, listPos)} stroke={stroke} strokeWidth="1" />
          <line {...edgeToEdge(center, favoritesPos)} stroke={stroke} strokeWidth="1" />
          <line {...edgeToEdge(center, comparisonPos)} stroke={stroke} strokeWidth="1" />
          <line {...edgeToEdge(center, garagePos)} stroke={stroke} strokeWidth="1" />
          <line {...edgeToEdge(center, manufacturersPos)} stroke={stroke} strokeWidth="1" />
          <line {...edgeToEdge(listPos, registerPos)} stroke={stroke} strokeWidth="1" />
          <line {...edgeToEdge(listPos, editPos)} stroke={stroke} strokeWidth="1" />
          <line {...edgeToEdge(favoritesPos, exportPos)} stroke={stroke} strokeWidth="1" />
          <line {...edgeToEdge(comparisonPos, exportPos)} stroke={stroke} strokeWidth="1" />
        </svg>

        <div className="home-hero-spider-main" style={{ left: CX, top: CY }}>
          <span className="home-hero-icon-orb" />
          <span className="home-hero-icon">
            <i className="fa-solid fa-car-on"></i>
          </span>
        </div>

        <div className="home-hero-spider-node" style={{ left: listPos.x, top: listPos.y }}>
          <div className="home-hero-sub-icon-cell">
            <Link to="/list" className="home-hero-sub-icon home-hero-sub-icon--list" title="車一覧">
              <i className="fa-solid fa-list"></i>
            </Link>
            <span className="home-hero-sub-icon-label">車一覧</span>
          </div>
        </div>
        <div className="home-derivation-icons">
          <div className="home-hero-spider-node home-hero-spider-node--branch" style={{ left: registerPos.x, top: registerPos.y }}>
            <div className="home-hero-sub-icon-cell">
              <Link to="/admin/register" className="home-hero-sub-icon home-hero-sub-icon--register" title="車登録">
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
              <span className="home-hero-sub-icon-label">車登録</span>
            </div>
          </div>
          <div className="home-hero-spider-node home-hero-spider-node--branch" style={{ left: editPos.x, top: editPos.y }}>
            <div className="home-hero-sub-icon-cell">
              <Link to="/admin/cars" className="home-hero-sub-icon home-hero-sub-icon--edit" title="編集・削除">
                <i className="fa-solid fa-pen"></i>
              </Link>
              <span className="home-hero-sub-icon-label">編集・削除</span>
            </div>
          </div>
        </div>
        <div className="home-hero-spider-node" style={{ left: favoritesPos.x, top: favoritesPos.y }}>
          <div className="home-hero-sub-icon-cell">
            <Link to="/favorites" className="home-hero-sub-icon home-hero-sub-icon--favorites" title="お気に入り">
              <i className="fa-solid fa-heart"></i>
            </Link>
            <span className="home-hero-sub-icon-label">お気に入り</span>
          </div>
        </div>
        <div className="home-hero-spider-node" style={{ left: comparisonPos.x, top: comparisonPos.y }}>
          <div className="home-hero-sub-icon-cell">
            <Link to="/comparison" className="home-hero-sub-icon home-hero-sub-icon--comparison" title="比較">
              <i className="fa-solid fa-scale-balanced"></i>
            </Link>
            <span className="home-hero-sub-icon-label">比較</span>
          </div>
        </div>

        <div className="home-hero-spider-node home-hero-spider-node--branch" style={{ left: exportPos.x, top: exportPos.y }}>
          <div className="home-hero-sub-icon-cell">
            <div className="home-hero-sub-icon home-hero-sub-icon--export-favorites" title="お気に入り・比較をエクスポート">
              <i className="fa-solid fa-file-export"></i>
            </div>
            <span className="home-hero-sub-icon-label">エクスポート</span>
          </div>
        </div>

        <div className="home-hero-spider-node" style={{ left: garagePos.x, top: garagePos.y }}>
          <div className="home-hero-sub-icon-cell">
            <Link to="/my-garage" className="home-hero-sub-icon home-hero-sub-icon--my-garage" title="マイガレージ">
              <i className="fa-solid fa-warehouse"></i>
            </Link>
            <span className="home-hero-sub-icon-label">マイガレージ</span>
          </div>
        </div>

        <div className="home-hero-spider-node" style={{ left: manufacturersPos.x, top: manufacturersPos.y }}>
          <div className="home-hero-sub-icon-cell">
            <Link to="/manufacturers" className="home-hero-sub-icon home-hero-sub-icon--manufacturers" title="公式HP">
              <i className="fa-solid fa-globe"></i>
            </Link>
            <span className="home-hero-sub-icon-label">公式HP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHeroIcons;
