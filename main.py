# LISTENER

# Init variables
radio.set_group(1) # Set radio group
auto_mode = False
driver_mode = False
start_auto_time = 0
end_auto_time = 0

def start_state():
    # the code for our start battle state goes here
    global auto_mode, start_auto_time, end_auto_time

    # start countdown - Turn on LED here
    basic.show_number(3)
    basic.show_number(2)
    basic.show_number(1)
    # Turn on different LED here

    #setup for Auto mode
    auto_mode = True # setup boolean variable to run auto mode code
    start_auto_time = control.millis() # gets the current time in ms since the start of the program
    end_auto_time = start_auto_time + 30000 # Add 30sec to our "timer"

def auto_state():
    global auto_mode, start_auto_time, end_auto_time
    # the code for our autonomous mode goes here
    now = control.millis() # get current time
    if now > end_auto_time:
        # more than 30s has now elapsed, turn off auto mode
        auto_mode = False 
        # stop motors & show 5s countdown
        driver_mode = True
    else:
        #run auto mode sense, think, act code here
        pass

def driver_state():
    # the code for our driver state goes here
    pass # replace this pass with your code


def on_forever():
    global auto_mode, driver_mode
    # A button "On start" event
    if input.button_is_pressed(Button.A):
        start_state() # run start state code
    if auto_mode:
        auto_state() # run auto state code
    elif driver_mode:
        driver_state() # run driver state code
basic.forever(on_forever)
