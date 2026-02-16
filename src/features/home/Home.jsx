import HomeHeroIcons from './HomeHeroIcons';
import HomeSiteDescList from './HomeSiteDescList';
import HomeFeatured from './HomeFeatured';
import '../styles/Home.css';

function Home() {
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
          <HomeHeroIcons />
          <HomeSiteDescList />
        </div>
      </section>

      <HomeFeatured />
    </div>
  );
}

export default Home;
