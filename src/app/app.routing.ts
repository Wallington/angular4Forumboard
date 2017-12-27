import { ModuleWithProviders } from '@angular/core';
import 
{
    Routes,
    RouterModule
} from '@angular/router';

//importing the pages we want load in our SPA
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { ThreadBoardComponent } from './threadBoard/threadBoard.component';
//import { postBoardComponent } from './postBoard/postBoard.component';
//import { dbComponent } from './db/db.component';
//define our SPA routes to what component want show to the user
const appRoutes: Routes =
[
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'index',
        component: MainComponent
    },
    {
        path: 'threadboard/:forumBoardName',
        component: ThreadBoardComponent   
    }/*,
    {
        path: 'postBoard/:forumBoardName/:threadName',
        component: postBoardComponent
    },
    {
        path: 'db',
        component: dbComponent
    }*/,
    {
        path: "",
        redirectTo: '/',
        pathMatch: 'full'
    }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot
(
    appRoutes,
    { enableTracing : true } //debuging only  
);