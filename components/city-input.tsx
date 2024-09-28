import { useEffect } from 'react';
import { fetchAllCities } from '@/store/thunks/fetch-all-cities';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import clsx from 'clsx';

export default function CityInput() {
  const dispatch = useAppDispatch();
  const allCities = useAppSelector((state) => state.city.allCities);
  const loading = useAppSelector((state) => state.city.loading);

  useEffect(() => {
    if (!allCities.length) {
      dispatch(fetchAllCities());
    }
  }, [dispatch]);

  return (
    <div className="relative w-48">
      <input
        type="text"
        placeholder={loading ? 'Načítám města...' : 'Zadejte město...'}
        disabled={loading}
        className={clsx(
          loading && 'cursor-not-allowed opacity-50',
          'w-full rounded-lg bg-blue-500 bg-opacity-50 p-2 text-white placeholder-white transition',
          'duration-200 focus:bg-opacity-100 focus:shadow-lg focus:outline-none focus:ring-4',
          'text-center text-sm focus:ring-blue-400'
        )}
      />
    </div>
  );
}
