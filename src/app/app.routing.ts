import { ModuleWithProviders } from '@angular/core';
import 
{
    Routes,
    RouterModule
} from '@angular/router';

//importing the pages we want load in our SPA
import { MainComponent } from './main/main.component';
import { SignInComponent } from './auth/signin/signIn.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivityLessonsComponent } from './activityLesson/activityLessons.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AccountSettingComponent } from './setting/account/account.component';
import { ActivitySettingComponent } from './setting/activity/activity.component';
import { MeSpeakSettingComponent } from './setting/meSpeak/meSpeak.component';

//define our SPA routes to what component want show to the user
const appRoutes: Routes =
[
    
    {
        path: 'index',
        component: MainComponent
    },
    {
        path: "",
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path:  "auth/signin",
        component: SignInComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'activity',
        component: ActivityLessonsComponent
    },
    {
        path: 'analytics',
        component: AnalyticsComponent
    },
    {
        path: 'setting/account',
        component : AccountSettingComponent
    },
    {
        path: 'setting/activity',
        component : ActivitySettingComponent
    },
    {
        path: 'setting/meSpeak',
        component : MeSpeakSettingComponent
    }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot
(
    appRoutes,
    { enableTracing : true } //debuging only  
);