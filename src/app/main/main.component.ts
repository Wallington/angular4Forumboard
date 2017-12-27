//import 
import 
{
  Component,
  NgZone,

} from '@angular/core';
import '../../stylesheets/app';

import { CookieService } from 'ngx-cookie'

import { Router } from '@angular/router';


@Component
({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.styles.scss']
})

export class MainComponent 
{

    constructor
    (
        private NgZone: NgZone,
        private CookieServ: CookieService,
        private Router: Router
    ){}

    public hideMainMenu = false;
    public profile =
    {
       avatar: '',
       name: ''
    }

    DisplayProfile(profileObject)
    {
        
        this.NgZone.run(()=>
        {
            this.profile.avatar = profileObject.avatar,
            this.profile.name = profileObject.name
            
        })
      
    }

    SignOff()
    {
        this.CookieServ.removeAll();
        this.Router.navigate(['/auth']);
    }
}
    

