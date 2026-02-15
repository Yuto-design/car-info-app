import { downloadComparisonTableCsv } from '../../utils/exportCarsCsv';

/**
 * 比較表をCSVファイルでダウンロードする（項目×車の表形式）
 * @param {Array} cars - 車オブジェクトの配列
 * @param {string} filenamePrefix - ファイル名のプレフィックス
 */
export function downloadComparisonCsv(cars, filenamePrefix = '比較表') {
  downloadComparisonTableCsv(cars, filenamePrefix);
}
