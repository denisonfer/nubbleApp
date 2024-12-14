import { sub } from 'date-fns';

import { formatDateRelative } from '../formatDateRelative';

describe('formatDateRelative', () => {
  const mockCurrentDate = new Date('2024-02-14T10:00:00.000Z');
  const createDateISO = (date: Date) => date.toISOString();

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockCurrentDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return seconds when difference is less than a minute', () => {
    const date30Seconds = sub(mockCurrentDate, { seconds: 30 });
    expect(formatDateRelative(createDateISO(date30Seconds))).toBe('30 s');
  });

  it('should return minutes when difference is less than an hour', () => {
    const date30Minutes = sub(mockCurrentDate, { minutes: 30 });
    const date1Minute = sub(mockCurrentDate, { minutes: 1 });

    expect(formatDateRelative(createDateISO(date30Minutes))).toBe('30 min');
    expect(formatDateRelative(createDateISO(date1Minute))).toBe('1 min');
  });

  it('should return hours when difference is less than a day', () => {
    const date2Hours = sub(mockCurrentDate, { hours: 2 });
    const date1Hour = sub(mockCurrentDate, { hours: 1 });

    expect(formatDateRelative(createDateISO(date2Hours))).toBe('2 h');
    expect(formatDateRelative(createDateISO(date1Hour))).toBe('1 h');
  });

  it('should return days when difference is less than a week', () => {
    const date3Days = sub(mockCurrentDate, { days: 3 });
    const date1Day = sub(mockCurrentDate, { days: 1 });

    expect(formatDateRelative(createDateISO(date3Days))).toBe('3 d');
    expect(formatDateRelative(createDateISO(date1Day))).toBe('1 d');
  });

  it('should return weeks when difference is less than a month', () => {
    const date2Weeks = sub(mockCurrentDate, { weeks: 2 });
    const date1Week = sub(mockCurrentDate, { weeks: 1 });

    expect(formatDateRelative(createDateISO(date2Weeks))).toBe('2 sem');
    expect(formatDateRelative(createDateISO(date1Week))).toBe('1 sem');
  });

  it('should return months when difference is less than a year', () => {
    const date6Months = sub(mockCurrentDate, { months: 6 });
    const date1Month = sub(mockCurrentDate, { months: 1 });

    expect(formatDateRelative(createDateISO(date6Months))).toBe('6 m');
    expect(formatDateRelative(createDateISO(date1Month))).toBe('1 m');
  });

  it('should return formatted date when difference is more than a year', () => {
    const date2Years = sub(mockCurrentDate, { years: 2 });
    expect(formatDateRelative(createDateISO(date2Years))).toBe('14/02/2022');
  });
});
