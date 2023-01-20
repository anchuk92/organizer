import {Component, OnInit} from '@angular/core';
import {DateService} from "../shared/date.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Task, TasksService} from "../shared/tasks.service";
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });
  public tasks: Task[] = [];

  constructor(
    public dateService: DateService,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onSubmit() {
    const title = this.form.value['title'];
    const task: Task = {
      id: 'one',
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };

    this.tasksService.addTask(task).subscribe(()=> {
      this.tasks.push(task);
      this.form.reset();
    });
  }

  onRemove(task: Task) {
    this.tasksService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    });
  }

}
