import 
{
    Directive,
    Input,
    OnInit,
    NgZone,
    HostListener,
    
} from '@angular/core';


import { Http } from '@angular/http';

//importing the Auth Component 
import { AuthComponent } from '../auth/auth.component';


declare const grecaptcha : any;

declare global 
{
  interface Window 
  {
    grecaptcha : any;
    GCaptchaLoad : () => void
  }
}

export interface GCaptchaConfig
{
    theme?: 'dark' | 'light';
    type?: 'audio' | 'image';
    size?: 'compact' | 'normal';
    tabindex? : number;
}

@Directive
({
    selector: '[appGoogleReCaptcha]'
})
export class GCaptchaDirective implements OnInit
{
    /*
    *   We have 3 inputs Public Key, a Config, and optional User Language
    */

    @Input() key: string;
    @Input() config: GCaptchaConfig = {};
    @Input() lang: string;

    @HostListener('document:submit', ['$event']) onsubmit()
    {
        this.OnSubmit();
    }

    public widgetID;
    private token : string;

    constructor
    (
        private http : Http,
        private ngZone : NgZone,
        private AuthComponent: AuthComponent
    ){}

    ngOnInit()
    {
        this.AddScript();
        this.RegisterGCaptchaCallback();
    }

    RegisterGCaptchaCallback()
    {
        const localConfig = 
        {
            
            ...this.config,
            'sitekey': this.key,
            'callback': this.OnSuccess.bind(this),
            'expired-callback': this.OnExpired.bind(this)
        }
        window.GCaptchaLoad = () =>
        {
            this.widgetID =  this.Render(document.getElementById('gCaptchaZone'), localConfig);
        }
        
    }
    
    

    /*
    * We want to render the google captcha funtion "grecaptcha" 
    * We want to return the ID of the new render widget
    */
    private Render(element: HTMLElement, RLocalConfig) : Number
    {
        return grecaptcha.render(element,RLocalConfig);
    }

    /*
    *   this will insert the reCaptcha scripts
    */
    AddScript()
    {
        let script = document.createElement('script');
        
        const lang = this.lang ? '&hl=' + this.lang : '';

        script.src= `https://www.google.com/recaptcha/api.js?onload=GCaptchaLoad&render=explicit${lang}`;

        script.async = true;

        script.defer = true;
        
        document.body.appendChild(script);
    }

   /*
    *   On this function call we want 
    */
    OnSuccess( token : string)
    {

        this.ngZone.run(() =>
        {
            this.token = token;
        });
    }
    
    /*
    *   On this function call we want stop any Event Emition
    */
    OnExpired()
    {
        this.ngZone.run(() =>
        {
            this.token = 'timeout';
        });
        
    }

    /*
    *   On Click of submit from the auth page we want valdeate the ReCaptcha from google and animate the thinking time
    */
    OnSubmit()
    {
        this.AuthComponent.hideLoadingMessage = 'off';
        this.AuthComponent.hideErrorMessage = 'on';
        this.AuthComponent.hideGCaptcha = 'on';
        if(this.token != 'timeout')
        {
            
            this.http.get('http://localhost:8081/auth/valdate/' + this.token).subscribe(data =>
            {
                if(data)
                {
                    setTimeout(() =>
                    {
                        
                            this.AuthComponent.hideLoadingMessage = 'on';
                            this.AuthComponent.hideErrorMessage = 'on';
                            this.AuthComponent.hideGCaptcha = 'on';
                            this.AuthComponent.hideBotErrorMessage = 'on';
                            this.AuthComponent.hideSuccessMessage = 'off';
                        
                        
                    }, 3000);
                    
                    
                }
                else
                {
                    this.AuthComponent.hideLoadingMessage = 'on';
                    this.AuthComponent.hideErrorMessage = 'on';
                    this.AuthComponent.hideGCaptcha = 'on';
                    this.AuthComponent.hideBotErrorMessage = 'off';
                }
            })
        }
        else
        {
            this.AuthComponent.hideLoadingMessage = 'on';
            this.AuthComponent.hideErrorMessage = 'off';
            this.AuthComponent.hideGCaptcha = 'off';
        }
    }
    
}
