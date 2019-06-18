import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"]
})
export class ScheduleComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.setCalendar(new Date());
  }
  thisMonth: Date;
  ListDays: Date[] = [];
  ListWeek: Number[] = [1,2,3,4,5,6,7];
  FirstDay: Date;
  setCalendar(date: Date) {
    this.thisMonth = date;

    const nbr = new Date(
      this.thisMonth.getFullYear(),
      this.thisMonth.getMonth() + 1,
      0
    ).getDate();
    this.FirstDay = new Date(
    this.thisMonth.getFullYear(),
    this.thisMonth.getMonth(),
    1
  );
    console.log(this.FirstDay)
    for (let index = 1; index <= nbr; index++) {
      this.ListDays.push(new Date(this.thisMonth.getFullYear(),this.thisMonth.getMonth(),index));
    }
  }

  nextMonth() {
    let nextdate: Date;
    if (this.thisMonth.getMonth() == 11) {
      nextdate = new Date(this.thisMonth.getFullYear() + 1, 0, 1);
    } else {
      nextdate = new Date(
        this.thisMonth.getFullYear(),
        this.thisMonth.getMonth() + 1,
        1
      );
    }
    this.setCalendar(nextdate);
  }

  PreviousMonth() {
    let previousdate: Date;
    if (this.thisMonth > new Date()) {
      if (this.thisMonth.getMonth() == 1) {
        previousdate = new Date(this.thisMonth.getFullYear() - 1, 12, 31);
      } else {
        previousdate = new Date(
          this.thisMonth.getFullYear(),
          this.thisMonth.getMonth() - 1,
          1
        );
      }
      this.setCalendar(previousdate);
    }
  }
}
