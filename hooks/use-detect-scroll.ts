import { useAppDispatch } from '@/store/hooks';
import { setIsScrolled } from '@/store/slices/ui-slice';
import { useEffect } from 'react';
import { throttle } from 'lodash';

export const useDetectScroll = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = throttle(() => {
      const isScrolled = window.scrollY > 100;
      dispatch(setIsScrolled(isScrolled));
    }, 300);

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);
};
