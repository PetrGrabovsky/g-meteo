import { useAppDispatch } from '@/store/hooks';
import { setIsScrolled } from '@/store/slices/ui-slice';
import { useEffect } from 'react';
import { throttle } from 'lodash';

const SCROLL_THRESHOLD = 300;

export const useDetectScroll = (isMobile: boolean) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isMobile) {
      const handleScroll = throttle(() => {
        const isScrolled = window.scrollY > SCROLL_THRESHOLD;
        dispatch(setIsScrolled(isScrolled));
      }, 300);

      handleScroll();

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [dispatch, isMobile]);
};
