// Datum RRRR-MM-DD v místním čase (new Date('RRRR-MM-DD') by ho bralo jako UTC a západně od UTC ukázalo předchozí den)
export const parseLocalDate = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const isToday = (dateToCheck: Date): boolean => {
  const today = new Date();
  return (
    dateToCheck.getDate() === today.getDate() &&
    dateToCheck.getMonth() === today.getMonth() &&
    dateToCheck.getFullYear() === today.getFullYear()
  );
};

export const getDescriptionFromIcon = (icon: string): string => {
  const iconCode = icon.slice(0, 2);

  const descriptions: Record<string, string> = {
    '01': 'jasno',
    '02': 'polojasno',
    '03': 'oblačno',
    '04': 'zataženo',
    '09': 'přeháňky',
    '10': 'déšť',
    '11': 'bouřka',
    '13': 'sněžení',
    '50': 'mlha',
  };

  return descriptions[iconCode] || '';
};
