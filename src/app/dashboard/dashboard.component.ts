
/*
	* @Author Sean O'Brien
	* @Version 0.0.1
	* @Copyright : © Copyright 2008 openlanguages.net
	* @Desicription: this control the dashboard page
*/

import 
{
    Component,
    AfterViewInit,
    NgZone
} from '@angular/core'

import { CookieService } from 'ngx-cookie'

//import the our components, class, and JSON files
import
{
    AudioMode
} from '../audioMode/audioMode';

import { MainComponent } from '../main/main.component';

var textFile = require('../intertaviceText/interactiveTextEn-US.json');

@Component
({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['../main/main.styles.scss'],
    providers:
    [
        AudioMode
    ],
    host: {'(window:keydown)': 'KeyEvent($event)'},
})

export class DashboardComponent implements AfterViewInit
{
    constructor
    (
        public CookieServ : CookieService,
        public AudioMode : AudioMode,
        public MainComp: MainComponent,
        public ngZone : NgZone
    ){
        this.MainComp.showMenu = true;
        this.MainComp.SelectPage('dashboard');
    }
    ngAfterViewInit()
    {
        if(this.CookieServ.get('AudioMode') == "true")
        {
            this.AudioMode.audioModeConfig.audioMode = true;
            this.AudioMode.Online(textFile.pageName[1].text)
        }
        
       
    }
}