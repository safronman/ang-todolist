import {Component, OnInit, Input} from '@angular/core';
import {TodolistService} from '../../services/todolist.service';
import {Task} from 'src/app/interfaces/interface';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    @Input() todolistId: string;

    tasks: Task[];

    constructor(private todolistService: TodolistService) {
    }

    ngOnInit() {
        this.getTasks(this.todolistId);
    }

    getTasks(todolistId) {
        this.todolistService.getTasks(todolistId)
            .subscribe((tasks: Task[]) => {
                this.tasks = tasks;
            });
    }

}
