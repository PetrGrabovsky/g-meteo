import clsx from 'clsx';
import { useDetectScroll } from '@/hooks/use-detect-scroll';
import { useDetectMobile } from '@/hooks/use-detect-mobile';
import { useAppSelector } from '@/store/hooks';
import Logo from './logo';
import Link from 'next/link';

export default function Footer() {
  useDetectMobile();
  const isMobile = useAppSelector((state) => state.ui.isMobile);
  useDetectScroll(isMobile);

  return (
    <footer
      className={clsx(
        'mt-auto rounded-t-lg bg-gradient-to-t from-blue-900 to-blue-700 py-6 text-gray-300 shadow-inner'
      )}
    >
      <div className="container flex items-center justify-start text-right">
        <Link target="_blank" href="https://github.com/PetrGrabovsky" passHref>
          <Logo className="h-7 animate-fadeIn transition-all duration-200 hover:scale-125" />
        </Link>
        <p className="ml-auto animate-fadeIn">&copy; 2024 Petr Grabovský</p>
      </div>
    </footer>
  );
}
