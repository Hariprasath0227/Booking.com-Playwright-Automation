export const pad = (n: number) => String(n).padStart(2, '0');

export function addDays(base: Date, delta: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + delta);
  return d;
}

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function computeDates(offsetDays: number, nights: number) {
  const today = new Date();
  const checkin = addDays(today, Math.max(1, offsetDays)); // ensure future day
  const checkout = addDays(checkin, nights);
  return {
    checkinISO: toISODate(checkin),
    checkoutISO: toISODate(checkout),
    nights
  };
}
