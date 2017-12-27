import 
{
     Component,
     OnInit
} from "@angular/core";

import { MainComponent } from '../main/main.component'

import { CookieService } from 'ngx-cookie'

@Component
({
    selector: 'ThreadBoardComponent',
    templateUrl: './threadBoard.component.html',
    styleUrls: ['./threadBoard.styles.scss'],
})

export class ThreadBoardComponent implements OnInit
{

    constructor
    (
        private MainCom : MainComponent,
        private CookieServ: CookieService
    ){}


    ngOnInit()
    {
        this.MainCom.DisplayProfile( this.CookieServ.getObject('profile'));
        this.MainCom.hideMainMenu = false;
    }
}