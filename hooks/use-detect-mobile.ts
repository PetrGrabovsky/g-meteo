import { useAppDispatch } from '@/store/hooks';
import { setIsMobile } from '@/store/slices/ui-slice';
import { throttle } from 'lodash';
import { useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export const useDetectMobile = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = throttle(() => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      dispatch(setIsMobile(isMobile));
    }, 300);

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);
};
