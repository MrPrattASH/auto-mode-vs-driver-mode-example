/**  LISTENER - For Sumo Robot
This boiler-plate code has 3 separate states, and a forever loop.
state 1 is the "start state" where we do the LED functions
State 2 is auto, where we run for 30seconds without driver input
State 3 is where we place radio commands for driver control.

When A is pressed, the start state function begins counting down. 
After the countdown is complete, it sets "auto_mode" True. 
then in the forever loop, while auto_mode is true, it runs auto code. 
Then, after 30s, auto mode sets driver mode true, and automode false. 
Back in the forever, with driver mode true, it runs the radio commands. 

 */
//  Init variables
radio.setGroup(1)
//  Set radio group
let auto_mode = false
let driver_mode = false
let start_auto_time = 0
let end_auto_time = 0
function start_state() {
    //  the code for our start battle state goes here
    //  start countdown - Turn on LED here
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
}

//  Turn on different LED here
function auto_state() {
    auto_mode_countdown(false)
    //  Controls 30sec timer. Don't Change. 
    //  Your auto code here
    let line_sensor = pins.analogReadPin(AnalogPin.P0)
}

function driver_state() {
    //  Your Driver code here
    radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
        
    })
}

//  run driver state code
basic.forever(function on_forever() {
    
    //  A button "On start" event
    if (input.buttonIsPressed(Button.A)) {
        start_state()
        //  run start state code
        auto_mode_countdown(true)
    }
    
    //  Starts 30s timer
    if (auto_mode) {
        auto_mode_countdown(false)
        //  checks 30s timer
        auto_state()
    } else if (driver_mode) {
        //  run auto state code
        driver_state()
    }
    
})
function auto_mode_countdown(initiate: boolean) {
    let now: number;
    //  function to control 30s timer for Auto mode
    
    //  don't change this function
    if (initiate) {
        auto_mode = true
        //  setup boolean variable to run auto mode code
        // For controlling a 30second auto time:
        start_auto_time = control.millis()
        //  gets the current time in ms since the start of the program
        end_auto_time = start_auto_time + 30000
    } else {
        //  Add 30sec to our "timer"
        now = control.millis()
        //  get current time
        if (now > end_auto_time) {
            //  more than 30s has now elapsed, turn off auto mode
            auto_mode = false
            //  stop motors & show 5s countdown
            driver_mode = true
        }
        
    }
    
}

