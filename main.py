''' LISTENER - For Sumo Robot
This boiler-plate code has 3 separate states, and a forever loop.
state 1 is the "start state" where we do the LED functions
State 2 is auto, where we run for 30seconds without driver input
State 3 is where we place radio commands for driver control.

When A is pressed, the start state function begins counting down. 
After the countdown is complete, it sets "auto_mode" True. 
then in the forever loop, while auto_mode is true, it runs auto code. 
Then, after 30s, auto mode sets driver mode true, and automode false. 
Back in the forever, with driver mode true, it runs the radio commands. 
'''

# Init variables
radio.set_group(1) # Set radio group
auto_mode = False
driver_mode = False
start_auto_time = 0
end_auto_time = 0

def start_state():
    # the code for our start battle state goes here
    # start countdown - Turn on LED here
    basic.show_number(3)
    basic.show_number(2)
    basic.show_number(1)
    # Turn on different LED here

def auto_state():
    auto_mode_countdown(False) # Controls 30sec timer. Don't Change. 
    
    # Your auto code here
    line_sensor = pins.analog_read_pin(AnalogPin.P0)

def driver_state():
    # Your Driver code here
    def on_received_number(receivedNumber):
        pass
    radio.on_received_number(on_received_number)


def on_forever():
    global auto_mode, driver_mode
    # A button "On start" event
    if input.button_is_pressed(Button.A):
        start_state() # run start state code
        auto_mode_countdown(True) # Starts 30s timer
    if auto_mode:
        auto_mode_countdown(False) # checks 30s timer
        auto_state() # run auto state code
    elif driver_mode:
        driver_state() # run driver state code
basic.forever(on_forever)



def auto_mode_countdown(initiate):
    # function to control 30s timer for Auto mode
    global auto_mode, start_auto_time, end_auto_time, driver_mode, auto_mode
    # don't change this function
    if initiate:
        auto_mode = True # setup boolean variable to run auto mode code
        #For controlling a 30second auto time:
        start_auto_time = control.millis() # gets the current time in ms since the start of the program
        end_auto_time = start_auto_time + 30000 # Add 30sec to our "timer"
    else:
        now = control.millis() # get current time
        if now > end_auto_time:
                # more than 30s has now elapsed, turn off auto mode
                auto_mode = False
                # stop motors & show 5s countdown
                driver_mode = True