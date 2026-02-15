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

/**
 * お気に入り車一覧をCSVでダウンロードする
 * @param {Array} cars - 車オブジェクトの配列
 */
export function downloadCsv(cars) {
  const rows = [CSV_HEADERS.map(escapeCsvCell).join(',')];
  cars.forEach((car) => {
    rows.push(carToCsvRow(car).map(escapeCsvCell).join(','));
  });
  const bom = '\uFEFF';
  const blob = new Blob([bom + rows.join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `お気に入り一覧_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
