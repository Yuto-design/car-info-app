import { Link } from 'react-router-dom';
import { getFeaturedCars } from '../../data/cars';
import Card from '../../components/Card';
import Button from '../../components/Button';
import './Home.css';

function Home() {
  const featuredCars = getFeaturedCars();

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-hero-label">Car Information Summary</p>
          <h2 className="home-hero-title">
            欲しいクルマが、もっと見つかる。
          </h2>
          <p className="home-hero-desc">
            国内の人気車種のスペック・価格・燃費をまとめて比較。<br />
            お気に入り登録や並べ比べで、選びやすく。
          </p>
        </div>
        <div className="home-hero-visual">
          <div className="home-hero-icon-wrap" aria-hidden="true">
            <span className="home-hero-icon-orb" />
            <span className="home-hero-icon">
              <i className="fa-solid fa-car-on"></i>
            </span>
          </div>
          <div className="home-hero-connector" aria-hidden="true">
            <svg className="home-hero-connector-svg" viewBox="0 0 24 400" preserveAspectRatio="none">
              <line x1="0" y1="200" x2="24" y2="40" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <line x1="0" y1="200" x2="24" y2="150" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <line x1="0" y1="200" x2="24" y2="250" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              <line x1="0" y1="200" x2="24" y2="360" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            </svg>
          </div>
          <div className="home-hero-sub-icons">
            <div className="home-hero-sub-icon-row">
              <Link to="/list" className="home-hero-sub-icon home-hero-sub-icon--list" title="車一覧">
                <i className="fa-solid fa-list"></i>
              </Link>
              <span className="home-hero-sub-icon-connector" aria-hidden="true">
                <svg className="home-hero-sub-icon-connector-svg" viewBox="0 0 24 100" preserveAspectRatio="none">
                  <line x1="0" y1="50" x2="24" y2="50" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                </svg>
              </span>
              <Link to="/admin" className="home-hero-sub-icon home-hero-sub-icon--admin" title="車登録">
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </div>
            <Link to="/favorites" className="home-hero-sub-icon home-hero-sub-icon--favorites" title="お気に入り">
              <i className="fa-solid fa-heart"></i>
            </Link>
            <Link to="/comparison" className="home-hero-sub-icon home-hero-sub-icon--comparison" title="比較">
              <i className="fa-solid fa-scale-balanced"></i>
            </Link>
            <Link to="/manufacturers" className="home-hero-sub-icon home-hero-sub-icon--manufacturers" title="公式HP">
              <i className="fa-solid fa-globe"></i>
            </Link>
          </div>
          <div className="home-hero-visual-desc">
            <p className="home-hero-visual-desc-item">
              <strong>車一覧</strong>：条件で絞り込んで車種を探す　→　<strong>車登録</strong>：車種を登録・編集
            </p>
            <p className="home-hero-visual-desc-item">
              <strong>お気に入り</strong>：気になる車を保存して比較
            </p>
            <p className="home-hero-visual-desc-item">
              <strong>比較</strong>：複数車種を並べてスペック比較
            </p>
            <p className="home-hero-visual-desc-item">
              <strong>公式HP</strong>：メーカー公式サイトへのリンク一覧
            </p>
          </div>
        </div>
      </section>

      <section className="home-featured">
        <h3 className="home-section-title">Featured Cars</h3>
        <p className="home-section-desc">人気の車種をピックアップしました。</p>
        <div className="home-featured-grid">
          {featuredCars.map((car) => (
            <Card key={car.id} as={Link} to={`/car/${car.slug || car.id}`} className="card--car">
              {car.image ? (
                <img src={car.image} alt={car.name} className="card-image" />
              ) : (
                <div className="card-image card-image--placeholder" aria-hidden="true">
                  <span>{car.maker} {car.name}</span>
                </div>
              )}
              <div className="card-body">
                <h4 className="card-title">{car.maker} {car.name}</h4>
                <p className="card-meta">{car.segment} / {car.fuelType}</p>
                <p className="card-description">{car.description}</p>
                {car.price != null && car.price > 0 && (
                <p className="card-price">価格: {Number(car.price).toLocaleString()}万円</p>
              )}
              </div>
            </Card>
          ))}
        </div>
        <div className="home-featured-actions">
          <Button as={Link} to="/list" variant="secondary">
            すべての車種を見る
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Home;
