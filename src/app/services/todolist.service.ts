import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task, Todolist} from '../interfaces/interface';
import {delay, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TodolistService {


    baseUrl = 'https://social-network.samuraijs.com/api/1.0/todo-lists';

    headers = new HttpHeaders(
        {
            'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1'
        }
    );

    options = {
        withCredentials: true,
        headers: this.headers
    };


    constructor(private http: HttpClient) {
    }

    getTodolists(): Observable<Todolist[]> {
        return this.http.get<Todolist[]>(this.baseUrl, this.options)
            .pipe(delay(1500));
    }

    createTodolist(title): Observable<Todolist> {
        return this.http.post<Todolist>(this.baseUrl, {title}, this.options)
            .pipe(
                map((res: any) => {
                    return res.data.item;
                })
            );
    }

    deleteTodolist(todoId) {
        return this.http.delete<void>(`${this.baseUrl}/${todoId}`, this.options);
    }


    getTasks(todolistId): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.baseUrl}/${todolistId}/tasks`, this.options)
            .pipe(
                delay(1500),
                map((res: any) => {
                    return res.items;
                })
            );
    }

    createTask(todolistId, title): Observable<Task> {
        return this.http.post<Task>(`${this.baseUrl}/${todolistId}/tasks`, {title}, this.options)
            .pipe(
                map((res: any) => {
                    return res.data.item;
                })
            );
    }

    deleteTask(taskId) {
        return this.http.delete<void>(`${this.baseUrl}/tasks/${taskId}`, this.options);
    }

    updateTodoTitle(todoId, title) {
        return this.http.put(`${this.baseUrl}/${todoId}`, {title}, this.options);
    }

    updateTask(task): Observable<Task> {
        return this.http.put(`${this.baseUrl}/tasks`, task, this.options)
            .pipe(
                map((res: any) => {
                    return res.data.item;
                })
            );
    }
}
