/**
 * Pure countdown and date utility for the birthday milestone
 */

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
  isToday: boolean;
  isPassed: boolean;
}

/**
 * Calculates the time remaining between a reference time and the target birthday
 */
export function calculateTimeRemaining(
  targetDate: Date | string,
  currentDate: Date = new Date()
): TimeRemaining {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const current = currentDate;

  const totalMilliseconds = target.getTime() - current.getTime();

  // Check if today is the birthday (matching month and day, or target reached within the birthday 24h window)
  const isSameDay =
    current.getFullYear() === target.getFullYear() &&
    current.getMonth() === target.getMonth() &&
    current.getDate() === target.getDate();

  if (totalMilliseconds <= 0) {
    // If it's the exact day or within the day
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMilliseconds: Math.max(0, totalMilliseconds),
      isToday: isSameDay || totalMilliseconds > -86400000,
      isPassed: totalMilliseconds <= -86400000,
    };
  }

  const seconds = Math.floor((totalMilliseconds / 1000) % 60);
  const minutes = Math.floor((totalMilliseconds / 1000 / 60) % 60);
  const hours = Math.floor((totalMilliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMilliseconds,
    isToday: isSameDay,
    isPassed: false,
  };
}

/**
 * Formats a two-digit number with leading zero
 */
export function padZero(num: number): string {
  return num < 10 ? `0${Math.max(0, num)}` : `${num}`;
}
