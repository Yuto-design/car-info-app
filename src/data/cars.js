const STORAGE_KEY = 'carInfoApp.cars.v1';

export const cars = [];

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

export const getAllCars = () => readAll();

export const getCarById = (id) => readAll().find((car) => car.id === id);

export const getFeaturedCars = () => readAll().slice(0, 4);

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

export function updateCar(id, patch) {
    const all = readAll();
    const nextCars = all.map((car) => (car.id === id ? { ...car, ...patch } : car));
    writeAll(nextCars);
    return nextCars.find((c) => c.id === id) ?? null;
}

export function deleteCar(id) {
    const all = readAll();
    const nextCars = all.filter((car) => car.id !== id);
    writeAll(nextCars);
    return nextCars;
}

export function resetCarsToSeed() {
    if (!canUseLocalStorage()) return;
    writeAll([...cars]);
}