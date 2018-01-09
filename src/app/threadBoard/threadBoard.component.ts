import 
{
     Component,
     OnInit
} from "@angular/core";

import { MainComponent } from '../main/main.component'
import { Http} from '@angular/http';
import { CookieService } from 'ngx-cookie'
import { Params, ActivatedRoute } from '@angular/router'

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
        private CookieServ: CookieService,
        private Http : Http,
        private ActivatedRoute : ActivatedRoute
    ){}

    // decalaring the name of the board
    forumboardName = '';
    // decalaring the id of the board
    forumboardID = '';

    ngOnInit()
    {
        this.MainCom.DisplayProfile( this.CookieServ.getObject('profile'));
        this.MainCom.hideMainMenu = false;
        this.ActivatedRoute.params.subscribe ((parms: Params) =>
        {
            this.Http.get('http://localhost:8081/db/get/forumboard/byid/' + parms['forumboardID']).subscribe (data =>
            {
                let forumData = JSON.parse(data["_body"]);
                this.forumboardID = forumData["_id"];
                this.forumboardName = forumData["name"];
            });
        });
    }
}