import 
{
    Component,
    OnInit
} from '@angular/core';
//import { HttpClient } from '@angular/common/http'
import 
{
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations'

import { MainComponent } from '../main/main.component'



@Component
({
    selector: 'AuthComponent',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.styles.scss'],
    animations: 
    [
        trigger ('hideProfileAnimation',
        [
          state('off', style
          ({
              opacity: '1',
              transform: 'scale(1)'
          })),
          state('on', style
          ({
             opacity: '0',
             display: 'none',
             transform: 'scale(0)'
          })),
          transition('off => on', animate('600ms ease-out')),
          transition('on => off', animate('300ms ease-in'))
        ]),
        trigger ('hideBotTestAnimation',
        [
          state('off', style
          ({
              opacity: '1',
              transform: 'scale(1.0)'
          })),
          state('on', style
          ({
             opacity: '0',
             display: 'none',
             transform: 'scale(0)'
          })),
          transition('off => on', animate('600ms ease-out')),
          transition('on => off', animate('300ms ease-in'))
        ]),
        trigger ('hideSuccessMessage',
        [
            state('off', style
            ({
                opacity: '1',
                transform: 'scale(1)'
            })),
            state('on', style
            ({
               opacity: '0',
               display: 'none',
               transform: 'scale(0)'
            })),
            transition('off => on', animate('600ms ease-out')),
            transition('on => off', animate('300ms ease-in'))
        ]),
        trigger ('hideErrorMessage',
        [
            state('off', style
            ({
                opacity: '1',
                transform: 'scale(1)'
            })),
            state('on', style
            ({
               opacity: '0',
               display: 'none',
               transform: 'scale(0)'
            })),
            transition('off => on', animate('600ms ease-out')),
            transition('on => off', animate('300ms ease-in'))
        ]),
        trigger ('hideBotErrorMessage',
        [
            state('off', style
            ({
                opacity: '1',
                transform: 'scale(1)'
            })),
            state('on', style
            ({
               opacity: '0',
               display: 'none',
               transform: 'scale(0)'
            })),
            transition('off => on', animate('600ms ease-out')),
            transition('on => off', animate('300ms ease-in'))
        ]),
        trigger ('hideLoadingMessage',
        [
            state('off', style
            ({
                opacity: '1'
            })),
            state('on', style
            ({
               opacity: '0',
               display: 'none'
               
            })),
            transition('off => on', animate('600ms ease-out')),
            transition('on => off', animate('300ms ease-in'))
        ]),
        trigger ('hideGCaptcha',
        [
            state('off', style
            ({
                opacity: '1',
                transform: 'scale(1)'
            })),
            state('on', style
            ({
               opacity: '0',
               display: 'none',
               transform: 'scale(0)'
            })),
            transition('off => on', animate('600ms ease-out')),
            transition('on => off', animate('300ms ease-in'))
        ])

    ]
})

export class AuthComponent implements OnInit
{
         
    public hideProfileState = 'off'; // show the each of the account to log into
    public hideTestOfBotState = 'on'; //show the google reCaptcha and the profile they selected
    public hideSuccessMessage = 'on'; //show the successful message
    public hideErrorMessage  = 'on'; //show the validation has time out 
    public hideBotErrorMessage = 'on'; //show that the validation detected a Robot
    public hideLoadingMessage = 'on'; //show the loading of the validation
    public hideGCaptcha = 'off'; //show the google reCaptcha and submit button
   
    
    constructor
    (
        private MainComp: MainComponent
    ){}

    public selectedProfile =
    {
        "email":"",
        "name":"",
        "birthdate":"",
        "avatar":"",
        "rank": "" 
    };
    
    //our sign in accounts for the user to log into
    accounts =
    [
        {
            "email":"wall.e@exapleprofile.com",
            "name":"Wall-E",
            "birthdate":"2008",
            "avatar":"images\/profilePic_09.png",
            "rank": "Member"
        },
        {
            "email":"clank@exampleprofile.com",
            "name":"Clank",
            "birthdate":"2002",
            "avatar":"images\/profilePic_01.png",
            "rank": "Moderator"
            
        },
        {
            "email":"cyerman@exampleprofile.com",
            "name":"Cyerman",
            "birthdate":"1966",
            "avatar":"images\/profilePic_02.png",
            "rank": "Member"
        },
        {
            "email":"cylon@exampleprofile.com",
            "name":"Cylon",
            "birthdate":"1978",
            "avatar":"images\/profilePic_03.jpg",
            "rank": "Member"
        },
        {
            "email":"marvin@exampleprofile.com",
            "name":"Marvin",
            "birthdate":"1978",
            "avatar":"images\/profilePic_04.png",
            "rank": "Member"
        },
        {
            "email":"wheatley@exampleprofile.com",
            "name":"Wheatley",
            "birthdate":"2011",
            "avatar":"images\/profilePic_05.png",
            "rank": "Member"
        },
        {
            "email":"miles.monroe@exampleprofile.com",
            "name":"Miles Monroe",
            "birthdate":"1973",
            "avatar":"images\/profilePic_06.png",
            "rank": "Member"
        },
        {
            "email":"Maschinenmensch@exampleprofile.com",
            "name":"Maschinenmensch",
            "birthdate":"1927",
            "avatar":"images\/profilePic_07.png",
            "rank": "Member"
        },
        {
            "email":"optimus.prime@exampleprofile.com",
            "name":"Optimus Prime",
            "birthdate":"1984",
            "avatar":"images\/profilePic_08.png",
            "rank": "Moderator"
        }
    ]
   
    ngOnInit()
    {
        this.MainComp.hideMainMenu = true;
    }

    SelectedProfileAction(localSelectedProfile)
    {
        this.selectedProfile = localSelectedProfile;
        this.hideProfileState = this.hideProfileState === 'on' ? 'off' : 'on';
        this.hideTestOfBotState = this.hideTestOfBotState === 'on' ? 'off' : 'on';
    }

    ToggleMenu()
    {
        this.hideProfileState = this.hideProfileState === 'on' ? 'off' : 'on';
        this.hideTestOfBotState = this.hideTestOfBotState === 'on' ? 'off' : 'on';
    }

    
    
    
}


