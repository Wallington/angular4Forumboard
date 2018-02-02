//loading in Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { appRouting } from './app.routing';
import { CookieModule } from 'ngx-cookie'
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
import { AuthComponent } from './auth/auth.component';
import { GCaptchaDirective } from './gCaptcha/gCaptcha.directive';
import { ThreadBoardComponent } from './threadBoard/threadBoard.component';
import { DBStarterComponent } from './dbStarter/dbStarter.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule
({
    
    declarations: 
    [
        MainComponent,
        AuthComponent,
        GCaptchaDirective,
        ThreadBoardComponent,
        DBStarterComponent,
        DialogComponent
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
    MatTooltipModule,
    ],
    bootstrap: 
    [
        MainComponent
    ],
    entryComponents:
    [
        AuthComponent,
        ThreadBoardComponent,
        DBStarterComponent,
        DialogComponent
    ],
    providers:
    [
        AuthComponent,
        ThreadBoardComponent,
        DBStarterComponent,
        DialogComponent
    ]
})
export class AppModule 
{

}