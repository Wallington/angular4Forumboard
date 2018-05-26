
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema
({
    email :
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    firstName:
    {
        type: String
    },
    lastName:
    {
        type: String
    }, 
    activitySetting :
    {
        topText: 
        {
            type : Number,
            default: 1 // can be set 0 to 2 which hide, show, or answer
        },
        topAudio:
        {
            type: Number,
            default: 1 // can be set 0 to 1 which mean 0 : hide voice 1: show voice
        },
        topAudioType:
        {
            type: Number,
            default: 1 // can be set 0 to 1 which mean 0 : record voice 1: meSpeak voice
        }, 
        image:
        {
            type: Number,
            default: 1 // can be set 0 to 2 which mean 0 : cover 1: show 2 : answer
        },
        bottomText:
        {
            type: Number,
            default: 1 // can be set 0 to 2 which hide, show, or answer
        },
        bottomAudio:
        {
            type: Number,
            default: 1 // can be set 0 to 1 which mean 0 : hide voice 1: show voice
        },
        bottomAudioType:
        {
            type: Number,
            default: 1 // can be set 0 to 1 which mean 0 : record voice 1: meSpeak voice
        }
    },
    meSpeakVoiceSetting:
    {
        speed:
        {
            type: Number,
            default: 175
        },
        variant:
        {
            type: String,
            default: 'none'
        },
        pitch:
        {
            type: Number,
            default: 50
        },
        amplitude:
        {
            type: Number,
            default: 100
        }
    },
    autoDrillVoiceSpeedDelaySetting:
    {
        x: 
        {
            type: Number,
            default: 1  // can be set 1 to 6 which 4 second to 200 milliseconds of delay
        },
        y:
        {
            type: Number,
            default: 1 // can be set 1 to 6 which 4 second to 200 milliseconds of delay
        }
    }
});

module.exports = mongoose.model('Account', schema);