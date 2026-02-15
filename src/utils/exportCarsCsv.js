const CSV_HEADERS = [
  'メーカー',
  '車名',
  'セグメント',
  '燃料',
  '価格(万円)',
  '車長(mm)',
  '車幅(mm)',
  '車高(mm)',
  '車重(kg)',
  '説明',
];

function carToCsvRow(car) {
  return [
    car.maker ?? '',
    car.name ?? '',
    car.segment ?? '',
    car.fuelType ?? '',
    car.price != null && car.price !== '' ? String(car.price) : '',
    car.lengthMm != null ? String(car.lengthMm) : '',
    car.widthMm != null ? String(car.widthMm) : '',
    car.heightMm != null ? String(car.heightMm) : '',
    car.weightKg != null ? String(car.weightKg) : '',
    (car.description ?? '').replace(/[\r\n"]/g, ' '),
  ];
}

function escapeCsvCell(value) {
  const s = String(value ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function triggerCsvDownload(rows, filenamePrefix) {
  const bom = '\uFEFF';
  const blob = new Blob([bom + rows.join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filenamePrefix}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * 車一覧をCSVでダウンロードする
 * @param {Array} cars - 車オブジェクトの配列
 * @param {string} filenamePrefix - ファイル名のプレフィックス（例: 'お気に入り一覧', '比較一覧'）
 */
export function downloadCarsCsv(cars, filenamePrefix = '車一覧') {
  const rows = [CSV_HEADERS.map(escapeCsvCell).join(',')];
  cars.forEach((car) => {
    rows.push(carToCsvRow(car).map(escapeCsvCell).join(','));
  });
  triggerCsvDownload(rows, filenamePrefix);
}

function getComparisonSpecValuesForCar(car, key) {
  const dash = '\u2014';
  if (key === 'price') return car?.price != null && car.price > 0 ? `${Number(car.price).toLocaleString()}万円` : dash;
  if (key === 'size') {
    if (!car || (car.lengthMm == null && car.widthMm == null && car.heightMm == null)) return dash;
    const parts = [];
    if (car.lengthMm != null) parts.push(`全長 ${Number(car.lengthMm).toLocaleString()}mm`);
    if (car.widthMm != null) parts.push(`全幅 ${Number(car.widthMm).toLocaleString()}mm`);
    if (car.heightMm != null) parts.push(`全高 ${Number(car.heightMm).toLocaleString()}mm`);
    return parts.join(' / ');
  }
  if (key === 'weightKg') return car?.weightKg != null && car.weightKg > 0 ? `${Number(car.weightKg).toLocaleString()}kg` : dash;
  if (key === 'wheelbaseMm') return car?.wheelbaseMm != null && car.wheelbaseMm > 0 ? `${Number(car.wheelbaseMm).toLocaleString()}mm` : dash;
  if (key === 'minTurningRadiusM') return car?.minTurningRadiusM != null && car.minTurningRadiusM > 0 ? `${car.minTurningRadiusM}m` : dash;
  if (key === 'maxPower') {
    if (!car) return dash;
    const ps = car.maxPowerPs != null && car.maxPowerPs > 0 ? `${car.maxPowerPs}PS` : '';
    const kw = car.maxPowerKw != null && car.maxPowerKw > 0 ? `${car.maxPowerKw}kW` : '';
    return [ps, kw].filter(Boolean).join(' / ') || dash;
  }
  if (key === 'maxTorqueNm') return car?.maxTorqueNm != null && car.maxTorqueNm > 0 ? `${car.maxTorqueNm}N・m` : dash;
  if (key === 'displacementL') return car?.displacementL != null && car.displacementL > 0 ? `${car.displacementL}L` : dash;
  if (key === 'fuelConsumption') return car?.fuelConsumption ? String(car.fuelConsumption) : dash;
  if (key === 'image') return car?.image ? String(car.image) : dash;
  const v = car?.[key];
  return v != null && v !== '' ? String(v) : dash;
}

const COMPARISON_SPEC_LABELS = [
  { key: 'image', label: '画像' },
  { key: 'maker', label: 'メーカー' },
  { key: 'name', label: '車名' },
  { key: 'segment', label: 'セグメント' },
  { key: 'fuelType', label: '燃料' },
  { key: 'driveType', label: '駆動方式' },
  { key: 'price', label: '価格' },
  { key: 'size', label: '寸法（全長×全幅×全高）' },
  { key: 'weightKg', label: '車両重量' },
  { key: 'wheelbaseMm', label: 'ホイールベース' },
  { key: 'minTurningRadiusM', label: '最小回転半径' },
  { key: 'maxPower', label: '最高出力（PS/kW）' },
  { key: 'maxTorqueNm', label: '最大トルク（N・m）' },
  { key: 'displacementL', label: '排気量（L）' },
  { key: 'fuelConsumption', label: '燃費（燃料消費率）' },
  { key: 'description', label: '概要' },
];

/**
 * 比較表形式（項目×車）でCSVをダウンロードする
 * @param {Array} cars - 車オブジェクトの配列
 * @param {string} filenamePrefix - ファイル名のプレフィックス（例: '比較表'）
 */
export function downloadComparisonTableCsv(cars, filenamePrefix = '比較表') {
  if (!cars || cars.length === 0) return;
  const carNames = cars.map((c) => [c.maker, c.name].filter(Boolean).join(' ').trim() || '\u2014');
  const rows = [['項目', ...carNames].map(escapeCsvCell).join(',')];
  COMPARISON_SPEC_LABELS.forEach(({ key, label }) => {
    const values = cars.map((car) => getComparisonSpecValuesForCar(car, key));
    rows.push([label, ...values].map(escapeCsvCell).join(','));
  });
  triggerCsvDownload(rows, filenamePrefix);
}
