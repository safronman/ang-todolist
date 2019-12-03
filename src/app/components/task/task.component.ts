import {Component, Input, OnInit} from '@angular/core';
import {TodolistService} from '../../services/todolist.service';
import {Task} from 'src/app/interfaces/interface';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    @Input() todolistId: string;

    tasks: Task[] = [];
    taskTitle = '';
    isTaskLoading: boolean;
    taskTitleEditMode = false;

    constructor(private todolistService: TodolistService) {
    }

    ngOnInit() {
        this.getTasks(this.todolistId);
    }

    getTasks(todolistId) {
        this.isTaskLoading = true;
        this.todolistService.getTasks(todolistId)
            .subscribe((tasks: Task[]) => {
                this.tasks = tasks;
                this.isTaskLoading = false;
            });
    }

    createTask(title) {
        this.todolistService.createTask(this.todolistId, title)
            .subscribe((task: Task) => {
                this.tasks.unshift(task);
                this.taskTitle = '';
            });
    }

    deleteTask(taskId) {
        this.todolistService.deleteTask(taskId)
            .subscribe(res => {
                this.tasks = this.tasks.filter((task) => {
                    return task.id !== taskId;
                });
            });
    }

    changeTaskTitle(e, taskId) {
        const newTaskTitle = e.currentTarget.value;
        this.updateTask({title: newTaskTitle}, taskId);
    }

    changeCompletedTaskStatus(e, taskId) {
        const newStatus = e.currentTarget.checked;
        this.updateTask({completed: newStatus}, taskId);
    }


    updateTask(obj, taskId) {
        const task = this.tasks.find((t: Task) => {
            return t.id === taskId;
        });
        const newTask = {...task, ...obj};

        this.todolistService.updateTask(newTask)
            .subscribe(res => {
                this.taskTitleEditMode = false;
            });
    }

    changeTaskTitleEditMode() {
        this.taskTitleEditMode = true;
    }
}
