import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task, Todolist} from '../interfaces/interface';
import {delay, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TodolistService {

    constructor(private http: HttpClient) {
    }

    getTodolists(): Observable<Todolist[]> {
        return this.http.get<Todolist[]>('https://social-network.samuraijs.com/api/1.0/todo-lists',
            {
                withCredentials: true,
                headers: new HttpHeaders({
                    'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1'
                })
            })
            .pipe(delay(1500));
    }

    createTodolist(title): Observable<Todolist> {
        return this.http.post<Todolist>('https://social-network.samuraijs.com/api/1.0/todo-lists', {title}, {
            withCredentials: true,
            headers: new HttpHeaders({
                'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1'
            })
        })
            .pipe(
                map((res: any) => {
                    return res.data.item;
                })
            );
    }

    deleteTodolist(todoId) {
        return this.http.delete<void>(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todoId}`, {
            withCredentials: true,
            headers: new HttpHeaders({
                'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1'
            })
        });
    }


    getTasks(todolistId): Observable<Task[]> {
        return this.http.get<Task[]>(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}/tasks`, {
            withCredentials: true,
            headers: new HttpHeaders({
                'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1'
            })
        })
            .pipe(
                delay(1500),
                map((res: any) => {
                    return res.items;
                })
            );
    }

    createTask(todolistId, title): Observable<Task> {
        return this.http.post<Task>(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}/tasks`, {title}, {
            withCredentials: true,
            headers: new HttpHeaders({
                'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1'
            })
        })
            .pipe(
                map((res: any) => {
                    return res.data.item;
                })
            );
    }

    deleteTask(taskId) {
        return this.http.delete<void>(`https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/${taskId}`, {
            withCredentials: true,
            headers: new HttpHeaders({
                'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1'
            })
        });
    }

    updateTodoTitle(todoId, title) {
        return this.http.put(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todoId}`, {title}, {
            withCredentials: true,
            headers: new HttpHeaders({
                'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1'
            })
        });
    }
}
