export const cycleMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function cycleMonthLabel(month: number | null | undefined): string {
  return month && month >= 1 && month <= 12
    ? cycleMonthNames[month - 1]
    : "Month to be decided";
}
