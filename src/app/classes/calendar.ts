export class Calendar {
  static get thisAndNextYear(): Date[] {
    let dates: Date[] = new Array(365 * 2);
    const thisYear = new Date().getFullYear();
    const firstDay = new Date(thisYear, 0, 1, 0,0,0,0);
    for (let i = 0; i < dates.length; i++) {
      dates[i] = new Date(firstDay.getTime() + 1000 * 60 * 60 * 24 * Number(i));
    }
    return dates;
  }

  static months: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  static isSameDate(a: Date, b: Date) {
    if (a.getFullYear() !== b.getFullYear()) return false;
    if (a.getMonth() !== b.getMonth()) return false;
    if (a.getDate() !== b.getDate()) return false;
    return true;
  }
}
