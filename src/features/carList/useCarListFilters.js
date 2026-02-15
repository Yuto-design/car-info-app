import { useState, useMemo } from 'react';
import { getAllCars } from '../../data/cars';
import { filterCars } from './carListUtils';

/**
 * 全車取得 + フィルタ状態 + フィルタ結果を提供するフック
 * @returns {{ allCars: Array, filters: Object, setFilters: Function, filteredCars: Array }}
 */
export function useCarListFilters() {
  const allCars = useMemo(() => getAllCars(), []);
  const [filters, setFilters] = useState({});

  const filteredCars = useMemo(
    () => filterCars(allCars, filters),
    [allCars, filters]
  );

  return { allCars, filters, setFilters, filteredCars };
}
