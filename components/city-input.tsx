import { useEffect, useRef } from 'react';
import { fetchAllCities } from '@/store/thunks/fetch-all-cities';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import clsx from 'clsx';

export default function CityInput() {
  const dispatch = useAppDispatch();
  const allCities = useAppSelector((state) => state.city.allCities);
  const loading = useAppSelector((state) => state.city.loading);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!allCities.length) {
      dispatch(fetchAllCities());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  return (
    <div className="relative w-48">
      <input
        ref={inputRef}
        type="text"
        placeholder={loading ? 'Načítám města...' : 'Zadejte město...'}
        disabled={loading}
        maxLength={20}
        className={clsx(
          loading && 'cursor-not-allowed opacity-50',
          'w-full rounded-lg bg-blue-500 bg-opacity-50 p-2 text-white placeholder-white transition',
          'duration-200 focus:bg-opacity-100 focus:shadow-lg focus:outline-none focus:ring-4',
          'text-center text-sm hover:scale-105 focus:scale-105 focus:ring-blue-400'
        )}
      />
    </div>
  );
}
