/*
	* @Author Sean O'Brien
	* @Version 0.0.1
	* @Copyright : © Copyright 2008 openlanguages.net
	* @Desicription: Signin page is were allow users to Sign in or Sign up
*/

//import
import 
{
  Component,
  NgZone,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import 
{
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { Router } from '@angular/router';

import 
{ 
    FormControl,
    Validators
} from "@angular/forms";

import
{
    CookieService
} from 'ngx-cookie'

import 
{
    AudioMode
} from '../../audioMode/audioMode';

import { Http } from '@angular/http';
import { setTimeout } from 'timers';

var Config = require('../../config');
var textFile = require('../../intertaviceText/interactiveTextEn-US.json');

@Component
({
    selector: 'app-signin',
    templateUrl: './signIn.component.html',
    styleUrls: ['../../main/main.styles.scss', './signIn.component.css'],
    providers:
    [
        AudioMode
    ],
    host: {'(window:keydown)': 'KeyEvent($event)'},
    animations: 
    [
        trigger ('hideSignIn',
        [
          state('false', style
          ({
              opacity: '1',
              transform: 'scale(1)'
          })),
          state('true', style
          ({
             opacity: '0',
             display: 'none',
             transform: 'scale(0)'
          })),
          transition('true => false', animate('600ms ease-out')),
          transition('false => true', animate('300ms ease-in'))
        ]),
        trigger ('hideErrorMessage',
        [
            state('false', style
            ({
                opacity: '1',
                transform: 'scale(1)'
            })),
            state('true', style
            ({
               opacity: '0',
               display: 'none',
               transform: 'scale(0)'
            })),
            transition('true => false', animate('600ms ease-out')),
            transition('false => true', animate('300ms ease-in'))
        ]),
        trigger ('hideLoadingMessage',
        [
            state('false', style
            ({
                opacity: '1'
            })),
            state('true', style
            ({
               opacity: '0',
               display: 'none'
               
            })),
            transition('true => false', animate('600ms ease-out')),
            transition('false => true', animate('300ms ease-in'))
        ])

    ]
})

export class SignInComponent implements OnInit
{
    errorMesssage = ''; //the text we want show the user if they get an error
    hideErrorMessage = 'true'; //this state in a string that hides the error message at the start
    hideLoadingMessage = 'true'; //this state in a stirng that hide the loading message at the start
    hideSignIn = 'false'; //this state in a string to not hide at the start
    AudioModeIntecator = false;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);

    @ViewChild('emailFeild') emailElement: ElementRef;
    @ViewChild('passwordFeild') passwordElement: ElementRef;


    //delcaring other class from other scripts
    constructor
    (
        public ngZone: NgZone,
        public AudioMode: AudioMode,
        public CookieServ: CookieService,
        public HTTP : Http,
        public Router : Router
    )
    {}

    ngOnInit()
    {
        
        if(this.CookieServ.get('AudioMode') == "true")
        {
            this.AudioMode.audioModeConfig.audioMode = true;
            this.AudioMode.Online(textFile.pageName[0].text)
        }
        else
        {
            this.AudioMode.OfflineGreeting();
        }
        

    }

    KeyEvent(event)
    {
        //if ctrl + a is press we want toggle audio mode
        if(event.keyCode == 65 && event.ctrlKey)
        {
            event.preventDefault();
            this.AudioMode.ToggleAudioMode();

            if(this.AudioMode.audioModeConfig.audioMode)
            {
                this.CookieServ.put('AudioMode', "true");
            }
            else
            {
                this.CookieServ.put('AudioMode', "false");
            }
            
            
        }
        //if up arrow is press we want focus the email element
        if(event.keyCode == 38)
        {
            event.preventDefault();
            
            this.AudioMode.Talk(textFile.signIn.input[0].email);
            this.emailElement.nativeElement.focus();
        }
        //if down arrow is press we want focus the password element
        if(event.keyCode == 40)
        {
            event.preventDefault();
            this.AudioMode.Talk(textFile.signIn.input[1].password);
            this.passwordElement.nativeElement.focus();
        }
        //if enter key is press will trigger the submit process
        if(event.keyCode == 13)
        {
            event.preventDefault();
            this.SignIn();
        }
        //if f1 is press, we want audiomode to speak the page help json
        if(event.keyCode == 112)
        {
            event.preventDefault();
            this.AudioMode.Talk(textFile.signIn.help);
        }

        if(event.keyCode == 113)
        {
            event.preventDefault();
            this.AudioMode.Talk(textFile.signIn.navtigationOptions);
        }
    }

    //validation our email address through angular Material API from getErrorMessage
    // also validating our password by making sure user enter one
    getErrorMessage()
    {
        if(this.email.hasError('required'))
        {
            
            return "You must enter a value";
        }
        else if (this.email.hasError('email'))
        {
            return "Not a valid email";
        }
        
        if (this.password.hasError('required'))
        {
            return "You must enter a password";
        }
    }

    

    SignIn()
    {
        //if any field has any type of error or not enter we send a message by text and audio to the user
        if(!this.email.hasError('required') && !this.password.hasError('required') && !this.email.hasError('email'))
        {
             let auth = btoa(this.password.value);
             this.hideLoadingMessage = 'false';
             this.hideSignIn = 'true';
             let minTime = Math.ceil(2000);
             let maxTime = Math.floor(4000);
             let randLoadTime = Math.floor(Math.random() * (maxTime - minTime) + 1 ) + minTime;
             let obj : object =
             [{
                 text: "Searching..."
             }];

             this.AudioMode.Talk(obj);
             setTimeout(() =>
            {
                //console.log(auth);
                this.HTTP.get(Config.httpAddress + "/auth/account/" + this.email.value + "/" + auth).subscribe(data =>
                {
                    data = JSON.parse(data['_body']);
                    if(data !== null)
                    {
                        
                        this.CookieServ.put('id',data['_id']);
                        this.CookieServ.putObject('meSeapkSetting',data['meSpeakVoiceSetting']);
                        this.CookieServ.putObject('activitySetting', data['activitySetting']);
                        this.CookieServ.putObject('autoDrillVoiceSpeedDelaySetting', data['autoDrillVoiceSpeedDelaySetting']);
                        this.Router.navigate(['/dashboard']); // send user to dashboard after set the cookie data
                    }
                    else
                    {
                        this.hideLoadingMessage = 'true';
                        this.hideSignIn = 'false';
                        this.hideErrorMessage = 'false';
                        this.errorMesssage = textFile.signIn.error[4].server[0].text;
                        this.AudioMode.Talk(textFile.signIn.error[4].server);
                    }
                    
                });
            }, randLoadTime) ;
            
        }
        else
        {
            this.ngZone.run(()=>
            {
                
                if(this.email.hasError('required') && this.password.hasError('required'))
                {
                    this.errorMesssage = textFile.signIn.error[3].emailAndPasswordReq[0].text;
                    this.AudioMode.Talk(textFile.signIn.error[3].emailAndPasswordReq);
                    this.hideErrorMessage = 'false';
                    
                }
                else if(this.email.hasError('required'))
                {
                    this.errorMesssage = textFile.signIn.error[0].emailReq[0].text;
                    this.AudioMode.Talk(textFile.signIn.error[0].emailReq);
                    this.hideErrorMessage = 'false';
                }
                else if(this.email.hasError('email'))
                {
                    this.errorMesssage = textFile.signIn.error[1].emailInval[0].text;
                    this.AudioMode.Talk(textFile.signIn.error[1].emailInval);
                    this.hideErrorMessage = 'false';
                }
                else if(this.password.hasError('required'))
                {
                    this.errorMesssage = textFile.signIn.error[2].passwordReq[0].text;
                    this.AudioMode.Talk(textFile.signIn.error[2].passwordReq);
                    this.hideErrorMessage = 'false';
                }
                
                
            });
            
            
        }

    }

    
    
}