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
    taskTitleEditModeId = '';
    filterValue = 'All';
    isTaskTitleError = false;

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

    checkTitle() {
        if (this.taskTitle.trim()) {
            this.isTaskTitleError = false;
            this.createTask();
        } else {
            this.isTaskTitleError = true;
        }
    }

    createTask() {
        this.todolistService.createTask(this.todolistId, this.taskTitle)
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
        this.taskTitleEditModeId = '';
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
            .subscribe(() => {
            });
    }

    changeTaskTitleEditMode(id) {
        this.taskTitleEditModeId = id;
    }

    getFilteredTasks(): Task[] {
        switch (this.filterValue) {
            case 'All': {
                return this.tasks;
            }

            case 'Completed': {
                return this.tasks.filter((task: Task) => {
                    return task.completed;
                });

            }
            case 'Active': {
                return this.tasks.filter((task: Task) => {
                    return !task.completed;
                });
            }
        }
    }

    checkAllTasks() {
        this.tasks.map((task: Task) => {
            const completedTask = {...task, completed: true};
            this.todolistService.updateTask(completedTask)
                .subscribe(() => {
                    task.completed = true;
                });

        });
    }

    getActiveTasks() {
        const completedTasks = this.tasks.filter((task: Task) => {
            return !task.completed;
        });
        return completedTasks.length;
    }
}


