import './HomeSiteDescList.css';

function HomeSiteDescList() {
  return (
    <ul className="home-hero-site-desc-list" aria-label="各サイトの説明">
      <li><strong>車一覧</strong>：条件で絞り込んで車種を探す</li>
      <li><strong>車登録</strong>：車種を登録</li>
      <li><strong>編集・削除</strong>：車種を編集・削除</li>
      <li><strong>お気に入り</strong>：気になる車を保存して比較</li>
      <li><strong>比較</strong>：複数車種を並べてスペック比較</li>
      <li><strong>エクスポート</strong>：CSVエクスポート、印刷用レイアウトで表示</li>
      <li><strong>公式HP</strong>：メーカー公式サイトへのリンク一覧</li>
    </ul>
  );
}

export default HomeSiteDescList;
