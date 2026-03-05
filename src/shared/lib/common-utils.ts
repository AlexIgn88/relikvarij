import 'datejs';

export const parseIsoDate = (isoString: string): string => {
  return new Date(isoString)?.toLocaleString('ru-RU');
};
