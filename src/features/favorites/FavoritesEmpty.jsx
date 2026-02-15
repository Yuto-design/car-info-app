import { Link } from 'react-router-dom';
import Button from '../../components/Button';

function FavoritesEmpty() {
  return (
    <div className="favorites-empty">
      <span className="favorites-empty-icon" aria-hidden>
        <i className="fa-regular fa-heart"></i>
      </span>
      <p className="favorites-empty-text">お気に入り登録された車種はありません</p>
      <p className="favorites-empty-hint">車種詳細ページから「お気に入りに追加」で登録できます。</p>
      <Button as={Link} to="/list" variant="primary">
        車一覧を見る
      </Button>
    </div>
  );
}

export default FavoritesEmpty;
