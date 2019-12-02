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

    constructor(private todolistService: TodolistService) {
    }

    ngOnInit() {
        debugger
        this.todolistService.getTodolists()
            .subscribe((res) => {
                console.log(res);
                debugger
                this.todolists = res;
            });
    }

}
