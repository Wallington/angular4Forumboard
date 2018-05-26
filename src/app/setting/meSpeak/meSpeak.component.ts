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
    selector: 'app-meSpeakSetting',
    templateUrl: './meSpeak.component.html',
})


export class MeSpeakSettingComponent implements AfterViewInit
{
    constructor
    (
        public AudioMode : AudioMode,
        public MainComp: MainComponent,
        public CookieServ : CookieService
        
    ){
        this.MainComp.showMenu = true;
        this.MainComp.SelectPage('meSpeakSetting');
    }

    ngAfterViewInit()
    {
        if(this.CookieServ.get('AudioMode') == "true")
        {
            this.AudioMode.audioModeConfig.audioMode = true;
            this.AudioMode.Online(textFile.pageName[5].text)
        }
        
       
    }
}