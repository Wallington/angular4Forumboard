import 
{
    Component,
    AfterViewInit
} from '@angular/core';

import { AudioMode } from '../audioMode/audioMode';
import { MainComponent } from '../main/main.component';
import { CookieService } from 'ngx-cookie';

var textFile = require('../intertaviceText/interactiveTextEn-US');

@Component
({
    selector: 'app-activityLession',
    templateUrl: './activityLessons.component.html',
})

export class ActivityLessonsComponent implements AfterViewInit
{
    constructor
    (
        public AudioMode : AudioMode,
        public MainComp: MainComponent,
        public CookieServ : CookieService
        
    ){
        this.MainComp.showMenu = true;
        this.MainComp.SelectPage('activityLessons');
    }

    ngAfterViewInit()
    {
        if(this.CookieServ.get('AudioMode') == "true")
        {
            this.AudioMode.audioModeConfig.audioMode = true;
            this.AudioMode.Online(textFile.pageName[2].text)
        }
        
       
    }
}