import {Component, OnInit} from '@angular/core';
import {TodolistService} from '../../services/todolist.service';
import {Todolist} from '../../interfaces/interface';

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

    todolists: Todolist[] = [];
    todolistTitle = '';
    loadingTodolists = false;
    todoTitleEditModeId = '';
    isTodolistTitleError = false;

    constructor(private todolistService: TodolistService) {
    }

    ngOnInit() {
        this.getTodolists();
    }

    getTodolists() {
        this.loadingTodolists = true;
        this.todolistService.getTodolists()
            .subscribe((res) => {
                this.todolists = res;
                this.loadingTodolists = false;
            });
    }

    addTodolist() {
        if (this.todolistTitle.trim()) {
            this.isTodolistTitleError = false;
            this.todolistService.createTodolist(this.todolistTitle)
                .subscribe((todo: Todolist) => {
                    this.todolists.unshift(todo);
                    this.todolistTitle = '';
                });
        } else {
            this.isTodolistTitleError = true;
        }
    }

    deleteTodolist(todoId: string) {
        this.todolistService.deleteTodolist(todoId)
            .subscribe(res => {
                this.todolists = this.todolists.filter((todo: Todolist) => {
                    return todo.id !== todoId;
                });
            });
    }

    updateTodoTitle(todoId: string, title: string) {
        this.todoTitleEditModeId = '';
        this.todolistService.updateTodoTitle(todoId, title)
            .subscribe(() => {
            });
    }

    changeTodoTitleEditMode(id) {
        this.todoTitleEditModeId = id;
    }
}
