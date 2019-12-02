import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {TodolistComponent} from './components/todolist/todolist.component';
import {TaskComponent} from './components/task/task.component';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        AppComponent,
        TodolistComponent,
        TaskComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
