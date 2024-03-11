import {Injectable} from '@angular/core';
import {AppComponent} from "../app.component";
import {DatePipe} from "@angular/common";
import getUserLocale from "get-user-locale";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  static readonly week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  static readonly year = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  static getTodayDate(): string {
    let formatter: DatePipe = new DatePipe(getUserLocale(), Intl.DateTimeFormat().resolvedOptions().timeZone);
    return formatter.transform(new Date(), "MMM d, y, HH:mm:ss") || "00-00-0000 00:00:00";
  }

  static getAmountOfDaysInMonth(): number[] {
    let today = new Date();
    let daysInMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    let array = [];
    for (let i = 1; i <= daysInMonth; i++) {
      array[i - 1] = i;
    }
    return array;
  }

  static getYearPeriod(number: number | undefined): string {
    switch (number) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        return '-';
    }
  }

  static getMonthPeriod(number: number | undefined): string {
    if (number == null || number == 0) {
      return "-";
    }
    let date = new Date();
    date.setDate(number);
    return AppComponent.formatDate(date) ?? "-";
  }

  static getWeekPeriod(number: number | undefined): string {
    switch (number) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      case 7:
        return 'Sunday';
      default:
        return '-';
    }
  }

  static getColor(value: number): string {
    if (value <= 60) {
      return 'red';
    } else if (value >= 90) {
      return 'green';
    }
    return 'yellow';
  }

  static getSleepColor(value: number): string {
    if (value <= 30) {
      return 'green';
    } else if (value >= 70) {
      return 'red';
    }
    return 'yellow';
  }
}
