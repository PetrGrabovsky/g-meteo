'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchCoordinates } from '@/store/thunks/fetch-coordinates';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector((state) => state.geo.coordinates);
  const loading = useAppSelector((state) => state.geo.loading);

  useEffect(() => {
    dispatch(fetchCoordinates());
  }, [dispatch]);

  return (
    <section>
      {loading ? (
        <p>Načítání polohy...</p>
      ) : (
        coordinates && (
          <p>
            Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
          </p>
        )
      )}
    </section>
  );
}
