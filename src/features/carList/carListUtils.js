/**
 * 車リストをフィルタ条件で絞り込む
 * @param {Array} cars - 車データの配列
 * @param {{ segment?: string, maker?: string, fuelType?: string }} filters - フィルタ条件
 * @returns {Array} 絞り込み後の車配列
 */
export function filterCars(cars, filters = {}) {
  const { segment, maker, fuelType } = filters;

  return cars.filter((car) => {
    if (segment && car.segment !== segment) return false;
    if (maker && car.maker !== maker) return false;
    if (fuelType && car.fuelType !== fuelType) return false;
    return true;
  });
}

/**
 * 車データから指定キーのユニークな値のリストを取得（フィルタの選択肢用）
 * @param {Array} cars - 車データの配列
 * @param {string} key - プロパティ名（segment, maker, fuelType など）
 * @returns {string[]} ソート済みのユニークな値の配列
 */
export function getUniqueValues(cars, key) {
  const set = new Set(cars.map((car) => car[key]).filter(Boolean));
  return [...set].sort((a, b) => a.localeCompare(b, 'ja'));
}