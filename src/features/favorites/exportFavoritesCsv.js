import { downloadCarsCsv } from '../../utils/exportCarsCsv';

/**
 * お気に入り車一覧をCSVでダウンロードする
 * @param {Array} cars - 車オブジェクトの配列
 */
export function downloadCsv(cars) {
  downloadCarsCsv(cars, 'お気に入り一覧');
}
