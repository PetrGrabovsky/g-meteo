import clsx from 'clsx';

export default function Footer() {
  return (
    <footer
      className={clsx(
        'mt-auto rounded-t-lg bg-gradient-to-t from-blue-900 to-blue-700 py-6 text-gray-300 shadow-inner'
      )}
    >
      <div className="container text-right">
        <p>&copy; 2024 Petr Grabovský</p>
      </div>
    </footer>
  );
}
