import { Component, OnInit } from '@angular/core';
import { Calendar } from 'src/app/classes/calendar';
import { Chore } from 'src/app/classes/chore';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styles: [
    `
      .toggle-group-container {
        padding: 5px;
        margin: 0px;
        display: flex;
        justify-content: center;
      }
      .days-container {
        display: flex;
        flex-flow: row wrap;
        align-items: stretch;
      }
      .tasks-container {
        margin: 5px;
        width: 260px;
      }
    `,
  ],
})
export class CalendarViewComponent implements OnInit {
  constructor() {}

  currentYear: number = 2021;
  currentMonth: number = new Date().getMonth();
  chores: Chore[] = [];
  thisYear: Date[] = [];
  months: number[] = Calendar.months;
  displayedMonth?: number = 0;

  ngOnInit(): void {
    this.thisYear = Calendar.thisAndNextYear;
    this.displayedMonth = this.currentMonth;

    this.initializeChores();
  }

  private initializeChores() {
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
  }

  calendarMonth(year: number, month?: number): Date[] {
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
