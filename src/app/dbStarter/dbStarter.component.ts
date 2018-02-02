import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component 
({
    selector: 'DBStarterComponent',
    templateUrl: './dbStarter.component.html',
})

export class DBStarterComponent 
{
    constructor
    (
        private HTTP: Http
    ){}

    //this create a fresh forum board data into the forum db table
    CreateForumboard()
    {
        this.HTTP.head('http://localhost:8081/db/create/forumboard/Main Board').subscribe();
    }
    //this check and output the console on express node to check the table in forum db 
    CheckForumboard()
    {
        this.HTTP.head('http://localhost:8081/db/check/forumboard/').subscribe();
    }
    
    //this cresate a fresh thread data into our threads inside our selected forum 
    CreateThreads()
    {
        this.HTTP.head('http://localhost:8081/db/create/threads/Main Board').subscribe();
    }

    CheckThreads()
    {
        this.HTTP.head('http://localhost:8081/db/check/threads/').subscribe();
    }

    RemoveThreads()
    {
        this.HTTP.head('http://localhost:8081/db/remove/threads/').subscribe();
    }
}