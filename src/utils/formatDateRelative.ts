import { differenceInSeconds, format, parseISO } from 'date-fns';

export function formatDateRelative(dateISO: string): string {
  const date = parseISO(dateISO);
  const now = new Date();

  const diffInSeconds = differenceInSeconds(now, date);

  if (diffInSeconds < 60) {
    // Menos de 1 minuto
    return `${diffInSeconds} s`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    // Menos de 1 hora
    return `${diffInMinutes} min`;
  }

  const diffInHours = Math.floor(diffInSeconds / (60 * 60));

  if (diffInHours < 24) {
    // Menos de 1 dia
    return `${diffInHours} h`;
  }

  const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

  if (diffInDays < 7) {
    // Menos de 1 semana
    return `${diffInDays} d`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks < 4) {
    // Menos de 1 mês
    return `${diffInWeeks} sem`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths < 12) {
    // Menos de 1 ano
    return `${diffInMonths} m`;
  }

  return format(date, 'dd/MM/yyyy');
}
