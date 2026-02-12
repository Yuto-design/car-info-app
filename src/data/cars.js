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

/** スラッグまたはIDで車を取得（URL用）。スラッグを優先して検索し、なければIDで検索 */
export const getCarBySlugOrId = (slugOrId) => {
    const all = readAll();
    const bySlug = all.find((car) => car.slug === slugOrId);
    if (bySlug) return bySlug;
    return all.find((car) => car.id === slugOrId) ?? null;
};

export const getFeaturedCars = () => readAll().slice(0, 4);

/** 名前からURL用スラッグを生成（英数字・ハイフンのみ）。空の場合は undefined */
function slugFromName(name) {
    if (!name || typeof name !== 'string') return undefined;
    const s = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return s || undefined;
}

export function addCar(input) {
    const all = readAll();
    const rawSlug = input?.slug != null && String(input.slug).trim() !== '' ? String(input.slug).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : undefined;
    const slug = rawSlug || slugFromName(input?.name);
    const next = {
        id: input?.id ?? generateId(),
        slug: slug || undefined,
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
    const slugNorm = patch.slug != null && String(patch.slug).trim() !== ''
        ? String(patch.slug).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        : undefined;
    const patchWithSlug = { ...patch };
    if ('slug' in patch) patchWithSlug.slug = slugNorm ?? undefined;
    const nextCars = all.map((car) => (car.id === id ? { ...car, ...patchWithSlug } : car));
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