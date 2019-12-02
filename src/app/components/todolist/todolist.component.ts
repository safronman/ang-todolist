import {Component, OnInit} from '@angular/core';
import {TodolistService} from '../../services/todolist.service';
import {Todolist} from '../../interfaces/interface';

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

    todolists: Todolist[];
    todolistTitle = '';

    constructor(private todolistService: TodolistService) {
    }

    ngOnInit() {
        this.todolistService.getTodolists()
            .subscribe((res) => {
                this.todolists = res;
            });
    }

    addTodolist() {
        this.todolistService.createTodolist(this.todolistTitle)
            .subscribe((todo: Todolist) => {
                this.todolists.unshift(todo);
            });
    }
}
