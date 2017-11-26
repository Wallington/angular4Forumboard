import 
{ 
    Directive, 
    Input, 
    OnInit, 
    AfterViewInit,
    NgZone,
    Injector
} from "@angular/core";

import { ElementDef } from "@angular/core/src/view";
import 
{
    ControlValueAccessor,
    FormControl,
    NgControl
} from "@angular/forms";
import { Validators } from "@angular/forms/src/validators";



export interface GCaptchaConfig
{
    theme?: 'dark' | 'light';
    type?: 'audio' | 'image';
    size?: 'compact' | 'normal';
    tabIndex?: number
}



@Directive
({
    selector: '[gCaptcha]'
})
export class GCaptchaDirective implements OnInit, AfterViewInit, ControlValueAccessor 
{
    /*
    *   We have 3 inputs Public Key, a Config, and optional User Language
    */

    @Input() key: string;
    @Input() config: GCaptchaConfig = {};
    @Input() lang: string;


    private widgetID: number;
    private OnChange : (value : string) => void;
    private OnTouched : (value: string) => void;
    private control : FormControl

    constructor 
    (
        private element: ElementDef,
        private ngZone : NgZone,
        private injector: Injector
    )
    {}

    ngOnInit()
    {
        this.RegisterGCaptchaCallback();
        this.AddScript();
    }

    ngAfterViewInit()
    {
        this.control = this.injector.get(NgControl).control;
        this.SetValidator();
    }

    private SetValidator()
    {
        this.control.setValidators(Validators.required);
        this.control.updateValueAndValidity();
    }

    writeValue(obj: any) : void{}

    registerOnChange(fn: any): void
    {
        this.OnChange = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.OnTouched = fn;
    }

    OnExpired()
    {
        this.ngZone.run(()=>
        {
            this.OnChange(null);
            this.OnTouched(null);
        });
    }

    OnSuccess()
    {
        this.ngZone.run(() =>
        {
           this.OnChange(token);
           this.OnTouched(token);  
        });
    }

    RegisterGCaptchaCallback()
    {
        window.gCaptchaLoad = () =>
        {
            const config =
            {
                ...this.config,
                'sitekey': this.key,
                'callback': this.OnSuccess.bind(this),
                'expired-callback': this.OnExpired.blind(this)
            }
        };

        this.widgetID = this.render(this.element.nativeElement, config);
    }

    private render(element: HTMLElement, config) : number
    {
        return grecaptcha.render(element, config);
    }

    /*
    *   this will insert the reCaptcha scripts
    */
    AddScript()
    {
        let script = document.createElement('script');
        
        const lang = this.lang ? '&hl=' + this.lang : '';

        script.src= `https://www.google.com/recaptcha/api.js?onload=gCaptchaLoad&render=explicit${lang}`;

        script.async = true;

        script.defer = true;
        
        document.body.appendChild(script);
    }
}

declare const grecaptcha : any;

declare global 
{
  interface Window 
  {
    grecaptcha : any;
    gCaptchaLoad : () => void
  }
}