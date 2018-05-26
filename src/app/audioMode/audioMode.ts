	/*
	* @Author Sean O'Brien
	* @Version 0.0.1
	* @Copyright : © Copyright 2008 openlanguages.net
	* @Desicription: MeSpeak system where application can access the MeSpeak program to talk to blind user or just user as well
    */
    

    declare const meSpeak: any;

    declare global
    {
        interface Window
        {
            meSpeak : any
        }
    };

    var textFile = require('../intertaviceText/interactiveTextEn-US.json');

    export class AudioMode
    {
        
         //import path to json files we want string path so meSpeak look up path HTTP then just importing
        configFile = '/meSpeak/mespeak_config.json';
        
        //all the config option for the voice of MeSpeak
        audioModeConfig =
        {
            audioMode : false, //we auto the audio mode off but will say how activate it when user visit the sign in
            readingSpeed : 155,
            primaryVoice : '/meSpeak/voices/en/en-us.json',
             
        }

        
    
        //initialize the MeSpeak Component
        Start()
        {
            meSpeak.loadConfig(this.configFile);
            meSpeak.loadVoice(this.audioModeConfig.primaryVoice);
            console.log('loaded');
        }

        //this stop meSpeak speak protcal to STOP [aka Shut Up Navi!] 
        Stop()
        {
            meSpeak.stop();
        }

        Talk (messageJSON)
        {
            if(this.audioModeConfig.audioMode)
            {
                meSpeak.stop();
                meSpeak.speakMultipart(messageJSON, { "speed": this.audioModeConfig.readingSpeed });
            }
            
        }

        //this only time we want meSpeak regarless audio mode is offline when user log in
        OfflineGreeting()
        {
            meSpeak.speakMultipart(textFile.intro, { "speed": this.audioModeConfig.readingSpeed });
        }

        Online(pageName)
        {
            let obj = 
            [
                {
                    "text" : "Location: " + pageName
                },
                {
                    "text" : textFile.online[1].text
                }
            ];
            this.Talk(obj)
        }

        ToggleAudioMode()
        {
            this.audioModeConfig.audioMode = !this.audioModeConfig.audioMode;
            if(this.audioModeConfig.audioMode)
            {
                this.Talk(textFile.online);
            }
            else
            {
                this.Stop();
            }
        }
    }