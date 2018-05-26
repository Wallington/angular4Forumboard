//loading in Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { appRouting } from './app.routing';
import { CookieModule } from 'ngx-cookie';
import { HttpModule } from '@angular/http'
import 
{
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule
} from '@angular/material';


//loading in Components
import { MainComponent } from "./main/main.component";
import { SignInComponent } from './auth/signin/signIn.component';
import { AudioMode } from './audioMode/audioMode';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivityLessonsComponent } from './activityLesson/activityLessons.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AccountSettingComponent } from './setting/account/account.component';
import { ActivitySettingComponent } from './setting/activity/activity.component';
import { MeSpeakSettingComponent } from './setting/meSpeak/meSpeak.component';

@NgModule
({
    
    declarations: 
    [
        MainComponent,
        SignInComponent,
        DashboardComponent,
        ActivityLessonsComponent,
        AnalyticsComponent,
        AccountSettingComponent,
        ActivitySettingComponent,
        MeSpeakSettingComponent
    ],
    imports: 
    [
        BrowserModule,
        HttpModule,
        FormsModule,
        appRouting,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        CookieModule.forRoot()
    ],
    exports: 
    [
    //RouterModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
    ],
    bootstrap: 
    [
        MainComponent
    ],
    entryComponents:
    [
        SignInComponent,
        DashboardComponent,
        ActivityLessonsComponent,
        AnalyticsComponent,
        AccountSettingComponent,
        ActivitySettingComponent,
        MeSpeakSettingComponent
    ],
    providers:
    [
        SignInComponent,
        AudioMode,
        DashboardComponent,
        ActivityLessonsComponent,
        AnalyticsComponent,
        AccountSettingComponent,
        ActivitySettingComponent,
        MeSpeakSettingComponent
    ]
})
export class AppModule 
{

}