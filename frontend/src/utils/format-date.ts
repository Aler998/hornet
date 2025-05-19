import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function formatMinutes(minutes: number): string {
  const dur = dayjs.duration(minutes, 'minutes');
  const hours = dur.hours();
  const mins = dur.minutes();
  return `${hours}h${mins}m`;
}
