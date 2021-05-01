import { Component, OnInit } from '@angular/core';
import { Chore } from './classes/chore';
import { Calendar } from './classes/calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sb-chores-calendar';

  currentYear: number = 2021;
  currentMonth: number = new Date().getMonth();
  chores: Chore[] = [];
  thisYear: Date[] = [];
  months: number[] = Calendar.months;
  displayedMonth: number = 0;

  ngOnInit(): void {
    this.chores.push(
      //weekly
      new Chore(
        'Pulire bagno, polvere e aspirapolvere',
        1,
        new Date(2021, 3, 3)
      ),
      //not weekly
      new Chore('Cambiare lenzuola e federe', 4, new Date(2021, 3, 3)),
      new Chore('Cambiare le federe', 4, new Date(2021, 3, 17)),
      new Chore('Lavare i pavimenti', 2, new Date(2021, 3, 3)),
      new Chore('Pulire la doccia', 6, new Date(2021, 3, 10)),
      new Chore('Pulire doccia e muro', 6, new Date(2021, 4, 1)),
      new Chore('Pulire il grasso in cucina', 12, new Date(2021, 3, 24)),
      new Chore('Pulire le griglie', 8, new Date(2021, 4, 22)),
      new Chore('Cambiare asciugamani e stracci', 4, new Date(2021, 3, 10))
    );

    this.thisYear = Calendar.thisAndNextYear;
    this.displayedMonth = this.currentMonth;
  }

  showMonth(month: number): void {
    this.displayedMonth = month;
  }
  calendarMonth(month: number, year: number): Date[] {
    return this.thisYear.filter(
      (_) => _.getMonth() == month && _.getFullYear() == year
    );
  }
  monthToDate(month: number, year: number): Date {
    return new Date(year, month, 1);
  }
  hasChore(date: Date): boolean {
    for (let chore of this.chores) {
      for (let day of chore.executionDates) {
        if (Calendar.isSameDate(day, date)) return true;
      }
    }
    return false;
  }
  isToday(chore: Chore, date: Date): boolean {
    let todo = chore.executionDates.some((_) => Calendar.isSameDate(_, date));
    return todo;
  }
}
