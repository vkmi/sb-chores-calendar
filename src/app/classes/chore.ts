export class Chore{

  readonly frequency: number;
  startDate: Date;
  color?: string;

  get realStartDate(): Date {
    return this.startDate;
  }

  get executionDates(): Date[] {
    let x = this.startDate;
    const executionDates: Date[] = [];

    const today = new Date();
    const nextYear = new Date(today.getFullYear()+1,today.getMonth(),today.getDate());
    while (x < nextYear){
      executionDates.push(x);
      x = new Date(x.getTime()+(1000*60*60*24*7*this.frequency));
    }

    return executionDates;
  }

  constructor( public name: string, weekFrequency?: number, startOn?: Date){
    this.name = name;

    if (!!startOn)
    this.startDate = startOn;
    else
    this.startDate = new Date();

    if (!!weekFrequency){
      this.frequency = weekFrequency;
      return;
    }
    this.frequency = 1;
  }

  setColor(color: string){
    this.color = color;
  }

}
