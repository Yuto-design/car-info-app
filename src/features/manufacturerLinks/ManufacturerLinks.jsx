import { getManufacturersByRegion } from '../../data/manufacturers';
import './ManufacturerLinks.css';

function ManufacturerLinks() {
  const { domestic, overseas } = getManufacturersByRegion();

  const renderList = (list, ariaLabel) => (
    <ul className="manufacturer-links-list" aria-label={ariaLabel}>
      {list.map((m) => (
        <li key={`${m.region}-${m.name}`} className="manufacturer-links-item">
          <a
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="manufacturer-links-link"
          >
            <span className="manufacturer-links-name">{m.name}</span>
            {m.nameEn && (
              <span className="manufacturer-links-name-en">{m.nameEn}</span>
            )}
            <span className="manufacturer-links-icon" aria-hidden>
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="manufacturer-links">
      <p className="manufacturer-links-intro">
        国内・海外の自動車メーカー公式サイトへのリンク一覧です。新車情報・カタログ・販売店検索などは各サイトをご確認ください。
      </p>
      <section className="manufacturer-links-section" aria-labelledby="manufacturer-links-domestic">
        <h2 id="manufacturer-links-domestic" className="manufacturer-links-heading">国内</h2>
        {renderList(domestic, '国内メーカー公式サイト一覧')}
      </section>
      <section className="manufacturer-links-section" aria-labelledby="manufacturer-links-overseas">
        <h2 id="manufacturer-links-overseas" className="manufacturer-links-heading">海外</h2>
        {renderList(overseas, '海外メーカー公式サイト一覧')}
      </section>
    </div>
  );
}

export default ManufacturerLinks;
