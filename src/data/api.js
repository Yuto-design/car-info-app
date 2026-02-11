import { getAllCars } from './cars';

export async function fetchCarDraftByName(rawName) {
  const name = String(rawName ?? '').trim();
  if (!name) throw new Error('車名を入力してください');

  await new Promise((r) => setTimeout(r, 250));

  const all = getAllCars();
  const hit = all.find((c) => c.name === name || `${c.maker} ${c.name}` === name);
  if (!hit) {
    throw new Error('現在はAI自動入力は未実装です（既存の車名なら自動入力できます）');
  }

  const { id, ...draft } = hit;
  return draft;
}
