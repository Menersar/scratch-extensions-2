/*
This is the Scratch 3 extension to remotely control an
Arduino Uno, ESP-8666, or Raspberry Pi


 Copyright (c) 2019 Alan Yorinks All rights reserved.

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 Version 3 as published by the Free Software Foundation; either
 or (at your option) any later version.
 This library is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 General Public License for more details.

 You should have received a copy of the GNU AFFERO GENERAL PUBLIC LICENSE
 along with this library; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

 /*
__________________________________________________________________________________________________________________________
Extension Dependencies:
*/

// Boiler plate from the Scratch Team
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const formatMessage = require('format-message');
const log = require('../../util/log');


require('sweetalert');










 /*
__________________________________________________________________________________________________________________________
Extension Constants:
*/

// The following are constants used within the extension
//const blockIconURI = './Download.png';
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjIgKDY3MTQ1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5FeHRlbnNpb25zL1NvZnR3YXJlL1RleHQtdG8tU3BlZWNoLUJsb2NrPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkV4dGVuc2lvbnMvU29mdHdhcmUvVGV4dC10by1TcGVlY2gtQmxvY2siIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1vcGFjaXR5PSIwLjE1Ij4KICAgICAgICA8ZyBpZD0idGV4dDJzcGVlY2giIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIj4KICAgICAgICAgICAgPHBhdGggZD0iTTExLjUsMTcuNjY5MzQzNSBDMTEuNSwxNi42NTM5MjY5IDEwLjAwNjAxNDUsMTYuMDg0NDI3NCA5LjExMjU2MDI0LDE2Ljg4ODMgTDYuNDEyNTYwMjQsMTkuMDUwNzE0IEM1LjM5MzQ2NzU1LDE5Ljg2Njg5OTQgNC4wNzQ5NzM1MSwyMC4zMzE3NTc1IDIuNywyMC4zMzE3NTc1IEwyLjMsMjAuMzMxNzU3NSBDMS4yNjUxOTIzMywyMC4zMzE3NTc1IDAuNSwyMS4wMjEyMDAzIDAuNSwyMS45MDQwNzEgTDAuNSwyNi4xMzg3OTg2IEMwLjUsMjcuMDIxNjY5MyAxLjI2NTE5MjMzLDI3LjcxMTExMiAyLjMsMjcuNzExMTEyIEwyLjcsMjcuNzExMTEyIEM0LjE1NzU1NjgyLDI3LjcxMTExMiA1LjQ1MzcyMzIyLDI4LjEzMzUyNzEgNi41MTk3MjA5OCwyOC45OTggTDkuMTE4NDAyOTMsMzEuMTU5MzIxNiBDMTAuMDI2MTg1NSwzMS45MDkwNzkzIDExLjUsMzEuMzQ3MjY4OSAxMS41LDMwLjI4MzQyNTUgTDExLjUsMTcuNjY5MzQzNSBaIiBpZD0ic3BlYWtlciIgZmlsbD0iIzRENEQ0RCI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjEuNjQzNjA2NiwxNi41IEMxOS45NzcwMDk5LDE4LjQzNzAyMzQgMTcuMTA1MDI3NSwxOS45Mjg1NzE0IDE1LjY2NjY2NjcsMTkuOTI4NTcxNCBDMTUuNTEyNjM5NywxOS45Mjg1NzE0IDE1LjMxNjYyOTIsMTkuODk1OTAzIDE1LjEwOTcyNjUsMTkuNzkyNDUxNyBDMTQuNzM3NjAzOSwxOS42MDYzOTA0IDE0LjUsMTkuMjQ5OTg0NiAxNC41LDE4Ljc2MTkwNDggQzE0LjUsMTguNjU2ODA0MSAxNC41MTcwNTU1LDE4LjU1NDUwNzYgMTQuNTQ5NDQ2NywxOC40NTQwODQ0IEMxNC42MjU3NTQ1LDE4LjIxNzUwNjMgMTUuMTczNTcyMSwxNy40Njc1MzEgMTUuMjc3MjA3MSwxNy4yODA5ODgxIEMxNS41NDYzNTI2LDE2Ljc5NjUyNjEgMTUuNzM5MDI1LDE2LjIwNjM1NjEgMTUuODQzMjg5MSwxNS40MTYwMDM0IEMxMy4xODk3MDA1LDEzLjkyNjgzNjkgMTEuNSwxMS4xMTM5NjY4IDExLjUsOCBDMTEuNSwzLjMwNTU3OTYzIDE1LjMwNTU3OTYsLTAuNSAyMCwtMC41IEwyNCwtMC41IEMyOC42OTQ0MjA0LC0wLjUgMzIuNSwzLjMwNTU3OTYzIDMyLjUsOCBDMzIuNSwxMi42OTQ0MjA0IDI4LjY5NDQyMDQsMTYuNSAyNCwxNi41IEwyMS42NDM2MDY2LDE2LjUgWiIgaWQ9InNwZWVjaCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';

// Digital Modes
const DIGITAL_INPUT = 1;
const DIGITAL_OUTPUT = 2;
const PWM = 3;
const SERVO = 4;
const TONE = 5;
const SONAR = 6;
const ANALOG_INPUT = 7;
const LEDPIN = 12;










 /*
__________________________________________________________________________________________________________________________
Extension Variables:
*/

// an array to save the current pin mode
// this is common to all board types since it contains enough
// entries for all the boards.
// Modes are listed above - initialize to invalid mode of -1
let pin_modes = new Array(30).fill(-1);

// has an websocket message already been received
let alerted = false;

let connection_pending = false;

// general outgoing websocket message holder
let msg = null;

// the pin assigned to the sonar trigger
// initially set to -1, an illegal value
let sonar_report_pin = -1;

// flag to indicate if the user connected to a board
let connected = false;

// arrays to hold input values
let digital_inputs = new Array(32);
let analog_inputs = new Array(8);

// flag to indicate if a websocket connect was
// ever attempted.
let connect_attempt = false;

// an array to buffer operations until socket is opened
let wait_open = [];

let the_locale = null;

//!! let ws_ip_address = '127.0.0.1';
let ws_ip_address = 'localhost';










/*
__________________________________________________________________________________________________________________________
Extension Alert Labels:
*/

// General Alert
const FormWSClosed = {
    'en': "WebSocket Connection Is Closed.",
    'de': "WebSocket-Verbindung geschlossen.",
};

// ESP-8266 Alert
const FormAlrt = {
    'en': {
        title: "Reminder",
        text: "Enter the IP Address of the ESP-8266 Into The IP Address Block",
        icon: "info",
    },
    'de': {
        title: "Wichtig",
        text: "Trage die IP-Adresse des ESP-8266 im Blcok IP-Adresse ein",
        icon: "info",
    },
};










/*
__________________________________________________________________________________________________________________________
Extension Block Labels:
*/

// ESP-8266 specific
const FormIPBlockE = {
    'en': 'ESP-8266 IP Address [IP_ADDR]',
    'de': 'ESP-8266 IP-Adresse [IP_ADDR]',
};

// Raspbery Pi Specific
const FormIPBlockR = {
    'en': 'Remote IP Address: [IP_ADDR]',
    'de': 'Remote-IP-Adresse des Raspberry Pi: [IP_ADDR]',
};

// common
const FormDigitalWrite = {
    'en': 'Write Digital Pin [PIN] [ON_OFF]',
    'de': 'Setze digitalen Pin [PIN] [ON_OFF]',
};

const FormPwmWrite = {
    'en': 'Write PWM Pin [PIN] [VALUE]%',
    'de': 'Setze PWM-Pin [PIN] [VALUE]%',
};

const FormTone = {
    'en': 'Tone Pin [PIN] [FREQ] Hz [DURATION] ms',
    'de': 'Spiele Ton am Pin [PIN] [FREQ] Hz [DURATION] ms',
};

const FormServo = {
    'en': 'Write Servo Pin [PIN] [ANGLE] Deg.',
    'de': 'Setze Servo-Pin [PIN] [ANGLE]°',
};

const FormAnalogRead = {
    'en': 'Read Analog Pin [PIN]',
    'de': 'Lies analogen Pin [PIN]',
};

const FormDigitalRead = {
    'en': 'Read Digital Pin [PIN]',
    'de': 'Lies digitalen Pin [PIN]',
};

const FormSonarRead = {
    'en': 'Read SONAR  T [TRIGGER_PIN]  E [ECHO_PIN]',
    'de': 'Lies Sonar T [TRIGGER_PIN]  E [ECHO_PIN]',
};

////////////////////////////////////////
const FormSetLed = {
    'en': 'Set LED Number [LED_NUMBER] [RED_GREEN]',
    'de': 'Setze LED [LED_NUMBER] [RED_GREEN]',
};
////////////////////////////////////////

const FormDetectHandEntersBox = {
    'en': "Hand enters Box [BOX_NUMBER].",
    'de': "Hand greift in Box [BOX_NUMBER].",
};










/*
__________________________________________________________________________________________________________________________
Extension Class:
*/

class Scratch3Test1 {
    constructor(runtime) {
        the_locale = this._setLocale();
        this.runtime = runtime;
    }

    getInfo() {
        the_locale = this._setLocale();
        //this.connect();
        return {
            id: 'test1id',
            color1: '#0C5986',
            color2: '#34B0F7',
            name: 'Test 1 Name',
            blockIconURI: blockIconURI,










/*
__________________________________________________________________________________________________________________________
Extension Blocks:
*/

            blocks: [
                {
                    opcode: 'ip_address',
                    blockType: BlockType.COMMAND,
                    //text: 'Write Digital Pin [PIN] [ON_OFF]',
                    text: FormIPBlockR[the_locale],

                    arguments: {
                        IP_ADDR: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '',
                            //menu: "digital_pins"
                        },

                    }

                },
                {
                    opcode: 'digital_write',
                    blockType: BlockType.COMMAND,
                    text: FormDigitalWrite[the_locale],

                    arguments: {
                        PIN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '4',
                            menu: "digital_pins"
                        },
                        ON_OFF: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0',
                            menu: "on_off"
                        }
                    }
                },
                {
                    opcode: 'pwm_write',
                    blockType: BlockType.COMMAND,
                    text: FormPwmWrite[the_locale],
                    arguments: {
                        PIN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '4',
                            menu: 'pwm_pins'
                        },
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50',
                        }
                    }
                },
                '---',
                {
                    opcode: 'tone_on',
                    blockType: BlockType.COMMAND,
                    text: FormTone[the_locale],
                    arguments: {
                        PIN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '4',
                            menu: 'digital_pins'
                        },
                        FREQ: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100,
                        },
                        DURATION: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50,
                        }
                    }
                },

                '---',
                {
                    opcode: 'servo',
                    blockType: BlockType.COMMAND,
                    text: FormServo[the_locale],
                    arguments: {
                        PIN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '4',
                            menu: 'digital_pins'
                        },
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 90,
                        },

                    }
                },

                '---',
                {
                    opcode: 'digital_read',
                    blockType: BlockType.REPORTER,
                    text: FormDigitalRead[the_locale],
                    arguments: {
                        PIN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '4',
                            menu: 'digital_pins'
                        },
                    }
                },
                '---',
                {
                    opcode: 'sonar_read',
                    blockType: BlockType.REPORTER,
                    text: FormSonarRead[the_locale],

                    arguments: {
                        TRIGGER_PIN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '4',
                            menu: 'digital_pins'
                        },
                        ECHO_PIN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '5',
                            menu: 'digital_pins'
                        }
                    }
                },
               /* '---',

                ///////////////////////////////////////////////////////
                {
                    opcode: 'set_led_on',
                    blockType: BlockType.COMMAND,
                    text: FormSetLed[the_locale],
                    arguments: {
                        LED_NUMBER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1',
                            menu: "led_numbers"
                        }
                    }
                },

                '---',

                {
                    opcode: 'detect_hand_enters_box',
                    blockType: BlockType.HAT,
                    text: FormDetectHandEntersBox[the_locale],

                    arguments: {
                        BOX_NUMBER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1',
                            menu: "box_numbers"
                        },
                    }
                },
                */
            ],










/*
__________________________________________________________________________________________________________________________
Extension Block Menus:
*/

            menus: {

                digital_pins: {
                    acceptReporters: true,
                    items: ['2', '3', '4', '5', '6', '7', '8', '9',
                        '10', '11', '12', '13', '14', '15', '16',
                        '17', '18', '19', '20',
                        '21', '22', '23', '24', '25', '26', '27']
                },
                
                pwm_pins: {
                    acceptReporters: true,
                    items: ['2', '3', '4', '5', '6', '7', '8', '9',
                        '10', '11', '12', '13', '14', '15', '16',
                        '17', '18', '19', '20',
                        '21', '22', '23', '24', '25', '26', '27']
                },

                //////////////////////////////////////////////////////////////////////////////////////////
                led_numbers: {
                    acceptReporters: true,
                    items: ['1', '2', '3', '4', '5','6', '7', '8', '9']
                },

                red_green: {
                    acceptReporters: true,
                    items: ['red', 'green']
                },
                //////////////////////////////////////////////////////////////////////////////////////////

                on_off: {
                    acceptReporters: true,
                    items: ['0', '1']
                },

                box_numbers: {
                    acceptReporters: true,
                    items: ['1', '2', '3', '4', '5','6', '7', '8', '9']
                },
            }
        };
    }










/*
__________________________________________________________________________________________________________________________
Extension Block Operation Code (Function which implements the Block operations):
*/

    // The block handlers

    // command blocks

    ip_address(args) {
        if (args['IP_ADDR']) {
            ws_ip_address = args['IP_ADDR'];
            if (!connected) {
                if (!connection_pending) {
                    this.connect();
                    connection_pending = true;
                }
            }

        }

    }

    digital_write(args) {
        if (!connected) {
            if (!connection_pending) {
                this.connect();
                connection_pending = true;
            }

        }

        if (!connected) {
            let callbackEntry = [this.digital_write.bind(this), args];
            wait_open.push(callbackEntry);
        } else {
            let pin = args['PIN'];
            pin = parseInt(pin, 10);

            if (pin_modes[LEDPIN] !== DIGITAL_OUTPUT) {
                pin_modes[LEDPIN] = DIGITAL_OUTPUT;
                msg = { "command": "set_mode_digital_output", "pin": LEDPIN };
                msg = JSON.stringify(msg);
                window.socketr.send(msg);
            }
            let value = args['ON_OFF'];
            value = parseInt(value, 10);
            msg = { "command": "digital_write", "led-number": pin, "value": value };
            msg = JSON.stringify(msg);
            window.socketr.send(msg);
        }
    }

////////////////////////////////////////////////////////////////////////////////////
    set_led_on(args) {
      //  if (!connected) {
      //      if (!connection_pending) {
      //          this.connect();
       //         connection_pending = true;
       //     }

     //   }

      //  if (!connected) {
            let callbackEntry = [this.set_led_on.bind(this), args];
            wait_open.push(callbackEntry);
       // } else {
            let ledPin = args['LED_NUMBER'];
            ledPin = parseInt(ledPin, 10);

           //!! if (pin_modes[ledPin] !== DIGITAL_OUTPUT) {
            if (pin_modes[ledPin] !== DIGITAL_OUTPUT) {
                pin_modes[ledPin] = DIGITAL_OUTPUT;
                msg = { "command": "set_mode_digital_output", "led_number": ledPin };
                msg = JSON.stringify(msg);
                log.log(msg);
              //  window.socketr.send(msg);
            }
            let color = args['RED_GREEN'];
           // color = parseInt(color, 10);
            msg = { "command": "set_led_on", "led_number": ledPin, "color": color };
            msg = JSON.stringify(msg);
            log.log(msg);
            //window.socketr.send(msg);
    //    }
    }
////////////////////////////////////////////////////////////////////////////////////


    //pwm
    pwm_write(args) {
        if (!connected) {
            if (!connection_pending) {
                this.connect();
                connection_pending = true;
            }
        }

        if (!connected) {
            let callbackEntry = [this.pwm_write.bind(this), args];
            wait_open.push(callbackEntry);
        } else {
            let pin = args['PIN'];
            // maximum value for RPi and Arduino
            let the_max = 255;
            pin = parseInt(pin, 10);

            let value = args['VALUE'];
            value = parseInt(value, 10);

            // calculate the value based on percentage
            value = the_max * (value / 100);
            value = Math.round(value);
            if (pin_modes[pin] !== PWM) {
                pin_modes[pin] = PWM;
                msg = { "command": "set_mode_pwm", "pin": pin };
                msg = JSON.stringify(msg);
                window.socketr.send(msg);
            }
            msg = { "command": "pwm_write", "pin": pin, "value": value };
            msg = JSON.stringify(msg);
            window.socketr.send(msg);

        }
    }

    tone_on(args) {
        if (!connected) {
            if (!connection_pending) {
                this.connect();
                connection_pending = true;
            }
        }

        if (!connected) {
            let callbackEntry = [this.tone_on.bind(this), args];
            wait_open.push(callbackEntry);
        } else {
            let pin = args['PIN'];
            pin = parseInt(pin, 10);
            let freq = args['FREQ'];
            freq = parseInt(freq, 10);
            let duration = args['DURATION'];
            duration = parseInt(duration, 10);
            // make sure duration maximum is 5 seconds
            if (duration > 5000) {
                duration = 5000;
            }


            if (pin_modes[pin] !== TONE) {
                pin_modes[pin] = TONE;
                msg = { "command": "set_mode_tone", "pin": pin };
                msg = JSON.stringify(msg);
                window.socketr.send(msg);
            }
            msg = { "command": "play_tone", "pin": pin, 'freq': freq, 'duration': duration };
            msg = JSON.stringify(msg);
            window.socketr.send(msg);

        }
    }

    // move servo
    servo(args) {
        if (!connected) {
            if (!connection_pending) {
                this.connect();
                connection_pending = true;
            }
        }
        if (!connected) {
            let callbackEntry = [this.servo.bind(this), args];
            wait_open.push(callbackEntry);
        } else {
            let pin = args['PIN'];
            pin = parseInt(pin, 10);
            let angle = args['ANGLE'];
            angle = parseInt(angle, 10);


            if (pin_modes[pin] !== SERVO) {
                pin_modes[pin] = SERVO;
                msg = { "command": "set_mode_servo", "pin": pin };
                msg = JSON.stringify(msg);
                window.socketr.send(msg);
            }
            msg = {
                'command': 'servo_position', "pin": pin,
                'position': angle
            };
            msg = JSON.stringify(msg);
            window.socketr.send(msg);

        }
    }

    // reporter blocks


    digital_read(args) {
        if (!connected) {
            if (!connection_pending) {
                this.connect();
                connection_pending = true;
            }
        }
        if (!connected) {
            let callbackEntry = [this.digital_read.bind(this), args];
            wait_open.push(callbackEntry);
        } else {
            let pin = args['PIN'];
            pin = parseInt(pin, 10);

            if (pin_modes[pin] !== DIGITAL_INPUT) {
                pin_modes[pin] = DIGITAL_INPUT;
                msg = { "command": "set_mode_digital_input", "pin": pin };
                msg = JSON.stringify(msg);
                window.socketr.send(msg);
            }
            return digital_inputs[pin];

        }
    }

    sonar_read(args) {
        if (!connected) {
            if (!connection_pending) {
                this.connect();
                connection_pending = true;
            }
        }
        if (!connected) {
            let callbackEntry = [this.sonar_read.bind(this), args];
            wait_open.push(callbackEntry);
        } else {
            let trigger_pin = args['TRIGGER_PIN'];
            trigger_pin = parseInt(trigger_pin, 10);
            sonar_report_pin = trigger_pin;
            let echo_pin = args['ECHO_PIN'];
            echo_pin = parseInt(echo_pin, 10);


            if (pin_modes[trigger_pin] !== SONAR) {
                pin_modes[trigger_pin] = SONAR;
                msg = { "command": "set_mode_sonar", "trigger_pin": trigger_pin, "echo_pin": echo_pin };
                msg = JSON.stringify(msg);
                window.socketr.send(msg);
            }
            return digital_inputs[sonar_report_pin];
        }
    }

    detect_hand_enters_box(args) {
        var rtn = this.changed && (!this.lasthat);
        this.changed = false;
        this.lasthat = rtn;
        return rtn;
    }










/*
__________________________________________________________________________________________________________________________
Extension Class Functions:
*/

    _setLocale() {
        let now_locale = '';
        switch (formatMessage.setup().locale) {
            case 'en':
                now_locale = 'en';
                break;
            case 'de':
                now_locale = 'de';
                break;
            default:
                now_locale = 'en';
                break;
        }
        return now_locale;
    }

    // end of block handlers

    // helpers
    connect() {
        if (connected) {
            // ignore additional connection attempts
            return;
        } else {
            connect_attempt = true;

            //!! let url = "ws://" + ws_ip_address + ":9001";
            //!!
            // let url = "ws://" + ws_ip_address + ":42001";
            

            
            console.log(url);
            //window.socketr = new WebSocket("ws://127.0.0.1:9001");
            window.socketr = new WebSocket(url);
            msg = JSON.stringify({ "id": "to_rpi_gateway" });
        }


        // websocket event handlers
        window.socketr.onopen = function () {

            digital_inputs.fill(0);
            analog_inputs.fill(0);
            // connection complete
            connected = true;
            connect_attempt = true;
            // the message is built above
            try {
                //ws.send(msg);
                window.socketr.send(msg);

            } catch (err) {
                // ignore this exception
            }
            for (let index = 0; index < wait_open.length; index++) {
                let data = wait_open[index];
                data[0](data[1]);
            }
        };

        window.socketr.onclose = function () {
            digital_inputs.fill(0);
            analog_inputs.fill(0);
            pin_modes.fill(-1);
            if (alerted === false) {
                alerted = true;
                alert(FormWSClosed[the_locale]);
            }
            connected = false;
        };

        // reporter messages from the board
        window.socketr.onmessage = function (message) {
            msg = JSON.parse(message.data);
            let report_type = msg["report"];
            let pin = null;
            let value = null;

            // types - digital, analog, sonar
            if (report_type === 'digital_input') {
                pin = msg['pin'];
                pin = parseInt(pin, 10);
                value = msg['value'];
                digital_inputs[pin] = value;
            } else if (report_type === 'analog_input') {
                pin = msg['pin'];
                pin = parseInt(pin, 10);
                value = msg['value'];
                analog_inputs[pin] = value;
            } else if (report_type === 'sonar_data') {
                value = msg['value'];
                digital_inputs[sonar_report_pin] = value;
            }
        };
    }


}










/*
__________________________________________________________________________________________________________________________
Extension Module Definition:
*/

module.exports = Scratch3Test1;
