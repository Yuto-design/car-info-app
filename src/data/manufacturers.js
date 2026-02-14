export const manufacturers = [
  // Domestic
  { name: 'いすゞ', nameEn: 'Isuzu', region: 'Domestic', url: 'https://www.isuzu.co.jp/' },
  { name: 'スズキ', nameEn: 'Suzuki', region: 'Domestic', url: 'https://www.suzuki.co.jp/' },
  { name: 'スバル', nameEn: 'Subaru', region: 'Domestic', url: 'https://www.subaru.jp/' },
  { name: 'ダイハツ', nameEn: 'Daihatsu', region: 'Domestic', url: 'https://www.daihatsu.co.jp/' },
  { name: 'トヨタ', nameEn: 'Toyota', region: 'Domestic', url: 'https://toyota.jp/' },
  { name: '日産', nameEn: 'Nissan', region: 'Domestic', url: 'https://www.nissan.co.jp/' },
  { name: 'ホンダ', nameEn: 'Honda', region: 'Domestic', url: 'https://www.honda.co.jp/' },
  { name: 'マツダ', nameEn: 'Mazda', region: 'Domestic', url: 'https://www.mazda.co.jp/' },
  { name: '三菱', nameEn: 'Mitsubishi', region: 'Domestic', url: 'https://www.mitsubishi-motors.co.jp/' },
  { name: 'レクサス', nameEn: 'Lexus', region: 'Domestic', url: 'https://www.lexus.jp/' },
  // Overseas
  { name: 'アウディ', nameEn: 'Audi', region: 'Overseas', url: 'https://www.audi.co.jp/' },
  { name: 'アルファロメオ', nameEn: 'Alfa Romeo', region: 'Overseas', url: 'https://www.alfaromeo.jp/' },
  { name: 'BMW', nameEn: 'BMW', region: 'Overseas', url: 'https://www.bmw.co.jp/' },
  { name: 'シボレー', nameEn: 'Chevrolet', region: 'Overseas', url: 'https://www.chevrolet.com/' },
  { name: 'シトロエン', nameEn: 'Citroën', region: 'Overseas', url: 'https://www.citroen.jp/' },
  { name: 'フィアット', nameEn: 'Fiat', region: 'Overseas', url: 'https://www.fiat.jp/' },
  { name: 'フォード', nameEn: 'Ford', region: 'Overseas', url: 'https://www.ford.co.jp/' },
  { name: 'ヒュンダイ', nameEn: 'Hyundai', region: 'Overseas', url: 'https://www.hyundai-motor.co.jp/' },
  { name: 'ジャガー', nameEn: 'Jaguar', region: 'Overseas', url: 'https://www.jaguar.co.jp/' },
  { name: 'ジープ', nameEn: 'Jeep', region: 'Overseas', url: 'https://www.jeep.co.jp/' },
  { name: 'キア', nameEn: 'Kia', region: 'Overseas', url: 'https://www.kia.com/jp' },
  { name: 'ランドローバー', nameEn: 'Land Rover', region: 'Overseas', url: 'https://www.landrover.co.jp/' },
  { name: 'マセラティ', nameEn: 'Maserati', region: 'Overseas', url: 'https://www.maserati.com/japan/' },
  { name: 'メルセデス・ベンツ', nameEn: 'Mercedes-Benz', region: 'Overseas', url: 'https://www.mercedes-benz.co.jp/' },
  { name: 'MINI', nameEn: 'MINI', region: 'Overseas', url: 'https://www.mini.co.jp/' },
  { name: 'プジョー', nameEn: 'Peugeot', region: 'Overseas', url: 'https://www.peugeot.jp/' },
  { name: 'ポルシェ', nameEn: 'Porsche', region: 'Overseas', url: 'https://www.porsche.com/japan/' },
  { name: 'ルノー', nameEn: 'Renault', region: 'Overseas', url: 'https://www.renault.co.jp/' },
  { name: 'テスラ', nameEn: 'Tesla', region: 'Overseas', url: 'https://www.tesla.com/ja_jp' },
  { name: 'フォルクスワーゲン', nameEn: 'Volkswagen', region: 'Overseas', url: 'https://www.volkswagen.co.jp/' },
  { name: 'ボルボ', nameEn: 'Volvo', region: 'Overseas', url: 'https://www.volvocars.com/jp/' },
];

export function getAllManufacturers() {
  return [...manufacturers];
}

export function getManufacturersByRegion() {
  const all = getAllManufacturers();
  const domestic = all.filter((m) => m.region === 'Domestic');
  const overseas = all.filter((m) => m.region === 'Overseas');
  return { domestic, overseas };
}
