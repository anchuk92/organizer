import {Injectable} from "@angular/core";
import * as moment from 'moment';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<any> = new BehaviorSubject(moment());

  changeMonth(num: number) {
    const value = this.date.value.add(num, 'month');
    this.date.next(value);
  }

  changeDate(date: moment.Moment) {
    console.log(this.date.value)
    const value = this.date.value.set({
      date: date.date(),
      month: date.month(),
    });
    this.date.next(value);
  }

}
