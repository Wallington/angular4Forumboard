/*
	* @Author Sean O'Brien
	* @Version 0.0.1
	* @Copyright : © Copyright 2008 openlanguages.net
	* @Desicription: mian accpation is render in this component
*/

//import 
import '../../stylesheets/app.scss';
import 
{
  Component,
  OnInit,
  NgZone
} from '@angular/core';

import { Router } from '@angular/router';

//import our scripts, component, and json
import { AudioMode } from '../audioMode/audioMode';


@Component
({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.styles.scss'],
    providers:
    [
        AudioMode
    ]
})

export class MainComponent implements OnInit
{
    
    constructor
    (
        public AudioMode : AudioMode,
        public ngZone : NgZone,
        public Router : Router
    )
    {}
    ngOnInit()
    {
        this.AudioMode.Start();
        this.SetMenuStyle();
    }

    account = 
    {
        firstName: 'Sean',
        lastName: 'OBrien',
        avatar: ''
    }

    showQuickMenu = false;

    menuSize = "200px"
    menuStyles : {};
    contentStyles : {}
    showMenu = false;
    //each menu
    menu =
    {
        dashboard:
        {
            active : false,
            class : ''
        },
        activityLessons:
        {
            active : false,
            class : ''
        },
        analytics:
        {
            active : false,
            class : ''
        },
        accountSetting :
        {
            active : false,
            class: ''
        },
        activitySetting:
        {
            active : false,
            class: ''
        },
        meSpeakSetting:
        {
            active : false,
            class : ''
        }
    }

    SelectPage(name)
    {
        this.ngZone.run(()=>
        {
            console.log(name);
            switch(name)
            {
                case 'dashboard':
                {
                    this.menu.dashboard.active = true;
                    this.menu.dashboard.class = 'activeMenu';
                    //deactive other menu
                    this.menu.activityLessons.active = false;
                    this.menu.activityLessons.class = '';
                    this.menu.analytics.active = false;
                    this.menu.analytics.class = '';
                    this.menu.accountSetting.active = false;
                    this.menu.accountSetting.class = '';
                    this.menu.activitySetting.active = false;
                    this.menu.activitySetting.class = '';
                    this.menu.meSpeakSetting.active = false;
                    this.menu.meSpeakSetting.class = '';
                    this.Router.navigate(['dashboard']);
                    break;
                }
                case 'activityLessons':
                {
                    this.menu.activityLessons.active = true;
                    this.menu.activityLessons.class = 'activeMenu';
                    //deactive other menu
                    this.menu.dashboard.active = false;
                    this.menu.dashboard.class = '';
                    this.menu.analytics.active = false;
                    this.menu.analytics.class = '';
                    this.menu.accountSetting.active = false;
                    this.menu.accountSetting.class = '';
                    this.menu.activitySetting.active = false;
                    this.menu.activitySetting.class = '';
                    this.menu.meSpeakSetting.active = false;
                    this.menu.meSpeakSetting.class = '';
                    this.Router.navigate(['activity']);
                    break;
                }
                case 'analytics':
                {
                    this.menu.analytics.active = true;
                    this.menu.analytics.class = 'activeMenu';
                    //deactive other menu
                    this.menu.dashboard.active = false;
                    this.menu.dashboard.class = '';
                    this.menu.activityLessons.active = false;
                    this.menu.activityLessons.class = '';
                    this.menu.accountSetting.active = false;
                    this.menu.accountSetting.class = '';
                    this.menu.activitySetting.active = false;
                    this.menu.activitySetting.class = '';
                    this.menu.meSpeakSetting.active = false;
                    this.menu.meSpeakSetting.class = '';
                    this.Router.navigate(['analytics']);
                    break;
                }
                case 'accountSetting':
                {
                    this.menu.accountSetting.active = true;
                    this.menu.accountSetting.class = 'activeMenu';
                    //deactive other menu
                    this.menu.dashboard.active = false;
                    this.menu.dashboard.class = '';
                    this.menu.activityLessons.active = false;
                    this.menu.activityLessons.class = '';
                    this.menu.analytics.active = false;
                    this.menu.analytics.class = '';
                    this.menu.activitySetting.active = false;
                    this.menu.activitySetting.class = '';
                    this.menu.meSpeakSetting.active = false;
                    this.menu.meSpeakSetting.class = '';
                    this.Router.navigate(['setting/account']);
                    break;
                }
                case 'activitySetting':
                {
                    this.menu.activitySetting.active = true;
                    this.menu.activitySetting.class = 'activeMenu';
                    //deactive other menu
                    this.menu.dashboard.active = false;
                    this.menu.dashboard.class = '';
                    this.menu.activityLessons.active = false;
                    this.menu.activityLessons.class = '';
                    this.menu.analytics.active = false;
                    this.menu.analytics.class = '';
                    this.menu.accountSetting.active = false;
                    this.menu.accountSetting.class = '';
                    this.menu.meSpeakSetting.active = false;
                    this.menu.meSpeakSetting.class = '';
                    this.Router.navigate(['setting/activity']);
                    break;
                }
                case 'meSpeakSetting':
                {
                    this.menu.meSpeakSetting.active = true;
                    this.menu.meSpeakSetting.class = 'activeMenu';
                    //deactive other menu
                    this.menu.dashboard.active = false;
                    this.menu.dashboard.class = '';
                    this.menu.activityLessons.active = false;
                    this.menu.activityLessons.class = '';
                    this.menu.analytics.active = false;
                    this.menu.analytics.class = '';
                    this.menu.accountSetting.active = false;
                    this.menu.accountSetting.class = '';
                    this.menu.activitySetting.active = false;
                    this.menu.activitySetting.class = '';
                    this.Router.navigate(['setting/meSpeak']);
                    break;
                }
            }
        })
        
    }

    toggleQucickAccountMenu()
    {
        this.showQuickMenu = !this.showQuickMenu
    }
    
    //CSS Functions
    SetMenuStyle()
    {
        this.ngZone.run(()=>
        {
            this.menuStyles =
            {
                'width' : (this.menuSize == "60px") ? '60px':'200px'
            }
        });
    }
    SetContentStyles()
    {
        this.ngZone.run(()=>
        {
            this.contentStyles =
            {
                'margin-left' : (this.menuSize == "60px") ? '60px':'200px'
            }
        });
    }
    ToggleMenuSize()
    {
        if(this.menuSize == '200px')
        {
            this.menuSize = '60px';
        }
        else
        {
            this.menuSize = '200px';
        }
        this.SetMenuStyle();
        this.SetContentStyles();
    }
    SetMenuMin()
    {
        this.menuSize = "60px";
        this.SetMenuStyle();
        this.SetContentStyles();
    }
    SetMenuMax()
    {
        this.menuSize = '200px';
        this.SetMenuStyle();
        this.SetContentStyles();
    }

}
    

