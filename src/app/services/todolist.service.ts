import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todolist} from '../interfaces/interface';

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
            });
    }

}
