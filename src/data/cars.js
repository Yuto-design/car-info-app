// src/data/cars.js
// - 初期データ（seed）はこのファイル内で管理
// - 実データは localStorage に保存（手入力・編集・削除に対応）

const STORAGE_KEY = 'carInfoApp.cars.v1';

export const cars = [
    {
        id: '1',
        name: 'プリウス',
        maker: 'トヨタ',
        segment: 'セダン',
        bodyType: 'ハッチバック',
        priceMin: 275,
        priceMax: 359,
        fuelType: 'ハイブリッド',
        image: 'https://placehold.co/400x240/1a1a2e/eee?text=Prius',
        description: '世界で愛されるハイブリッドの代表格。燃費と実用性を両立。',
        lengthMm: 4520,
        widthMm: 1780,
        heightMm: 1470,
    },
    {
        id: '2',
        name: 'ノート',
        maker: '日産',
        segment: 'コンパクト',
        bodyType: 'ハッチバック',
        priceMin: 198,
        priceMax: 259,
        fuelType: 'ハイブリッド',
        image: 'https://placehold.co/400x240/1a1a2e/eee?text=Note',
        description: 'コンパクトで燃費の良い日産のハイブリッド車。',
        lengthMm: 4045,
        widthMm: 1695,
        heightMm: 1520,
    },
    {
        id: '3',
        name: 'フィット',
        maker: 'ホンダ',
        segment: 'コンパクト',
        bodyType: 'ハッチバック',
        priceMin: 199,
        priceMax: 259,
        fuelType: 'ガソリン',
        image: 'https://placehold.co/400x240/1a1a2e/eee?text=Fit',
        description: '使い勝手の良いコンパクトカー。',
        lengthMm: 3995,
        widthMm: 1695,
        heightMm: 1535,
    },
    {
        id: '4',
        name: 'RAV4',
        maker: 'トヨタ',
        segment: 'SUV',
        bodyType: 'SUV',
        priceMin: 280,
        priceMax: 420,
        fuelType: 'ハイブリッド',
        image: 'https://placehold.co/400x240/1a1a2e/eee?text=RAV4',
        description: '人気のコンパクトSUV。広い室内と燃費を両立。',
        lengthMm: 4600,
        widthMm: 1855,
        heightMm: 1685,
    },
];

function canUseLocalStorage() {
    try {
        return typeof window !== 'undefined' && !!window.localStorage;
    } catch {
        return false;
    }
}

function generateId() {
    try {
        return crypto.randomUUID();
    } catch {
        return String(Date.now());
    }
}

function ensureInitialized() {
    if (!canUseLocalStorage()) return;
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

function readAll() {
    if (!canUseLocalStorage()) return [...cars];
    ensureInitialized();
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...cars];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [...cars];
    } catch {
        return [...cars];
    }
}

function writeAll(nextCars) {
    if (!canUseLocalStorage()) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCars));
}

/** 全車種を取得（Car List用） */
export const getAllCars = () => readAll();

export const getCarById = (id) => readAll().find((car) => car.id === id);

export const getFeaturedCars = () => readAll().slice(0, 4);

/** 車種を追加 */
export function addCar(input) {
    const all = readAll();
    const next = {
        id: input?.id ?? generateId(),
        name: input?.name ?? '',
        maker: input?.maker ?? '',
        segment: input?.segment ?? '',
        bodyType: input?.bodyType ?? '',
        priceMin: Number(input?.priceMin ?? 0),
        priceMax: Number(input?.priceMax ?? 0),
        fuelType: input?.fuelType ?? '',
        image: input?.image ?? 'https://placehold.co/400x240/1a1a2e/eee?text=Car',
        description: input?.description ?? '',
        lengthMm: input?.lengthMm != null && input.lengthMm !== '' ? Number(input.lengthMm) : undefined,
        widthMm: input?.widthMm != null && input.widthMm !== '' ? Number(input.widthMm) : undefined,
        heightMm: input?.heightMm != null && input.heightMm !== '' ? Number(input.heightMm) : undefined,
    };
    writeAll([next, ...all]);
    return next;
}

/** 車種を更新 */
export function updateCar(id, patch) {
    const all = readAll();
    const nextCars = all.map((car) => (car.id === id ? { ...car, ...patch } : car));
    writeAll(nextCars);
    return nextCars.find((c) => c.id === id) ?? null;
}

/** 車種を削除 */
export function deleteCar(id) {
    const all = readAll();
    const nextCars = all.filter((car) => car.id !== id);
    writeAll(nextCars);
    return nextCars;
}

/** localStorage の全データを seed に戻す（開発用） */
export function resetCarsToSeed() {
    if (!canUseLocalStorage()) return;
    writeAll([...cars]);
}