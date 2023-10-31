//  LISTENER
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
    //  Turn on different LED here
    // setup for Auto mode
    auto_mode = true
    //  setup boolean variable to run auto mode code
    start_auto_time = control.millis()
    //  gets the current time in ms since the start of the program
    end_auto_time = start_auto_time + 30000
}

//  Add 30sec to our "timer"
function auto_state() {
    let driver_mode: boolean;
    
    //  the code for our autonomous mode goes here
    let now = control.millis()
    //  get current time
    if (now > end_auto_time) {
        //  more than 30s has now elapsed, turn off auto mode
        auto_mode = false
        //  stop motors & show 5s countdown
        driver_mode = true
    } else {
        // run auto mode sense, think, act code here
        
    }
    
}

function driver_state() {
    //  the code for our driver state goes here
    
}

//  replace this pass with your code
//  run driver state code
basic.forever(function on_forever() {
    
    //  A button "On start" event
    if (input.buttonIsPressed(Button.A)) {
        start_state()
    }
    
    //  run start state code
    if (auto_mode) {
        auto_state()
    } else if (driver_mode) {
        //  run auto state code
        driver_state()
    }
    
})
