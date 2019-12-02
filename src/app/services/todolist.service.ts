import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todolist} from '../interfaces/interface';
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


    getTasks(todolistId) {
        return this.http.get(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todolistId}/tasks`, {
            withCredentials: true,
            headers: new HttpHeaders({
                'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1'
            })
        })
            .pipe(
                map((res: any) => {
                    return res.items;
                })
            );
    }
}
