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
import { DBStarterComponent } from './dbStarter/dbStarter.component';
//import { postBoardComponent } from './postBoard/postBoard.component';

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
        path: 'threadboard/:forumboardID',
        component: ThreadBoardComponent   
    },
    {
        path: 'db',
        component: DBStarterComponent
    }/*,
    {
        path: 'postBoard/:forumBoardName/:threadName',
        component: postBoardComponent
    },
    */,
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