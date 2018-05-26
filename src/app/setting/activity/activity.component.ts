import 
{
    Component,
    AfterViewInit
} from '@angular/core';


import { CookieService } from 'ngx-cookie'

import { AudioMode } from '../../audioMode/audioMode';
import { MainComponent } from '../../main/main.component';

var textFile = require('../../intertaviceText/interactiveTextEn-US');

@Component
({
    selector: 'app-activitySetting',
    templateUrl: './activity.component.html',
})


export class ActivitySettingComponent implements AfterViewInit
{
    constructor
    (
        public AudioMode : AudioMode,
        public MainComp: MainComponent,
        public CookieServ : CookieService
        
    ){
        this.MainComp.showMenu = true;
        this.MainComp.SelectPage('activitySetting');
    }

    ngAfterViewInit()
    {
        if(this.CookieServ.get('AudioMode') == "true")
        {
            this.AudioMode.audioModeConfig.audioMode = true;
            this.AudioMode.Online(textFile.pageName[4].text)
        }
        
       
    }
}