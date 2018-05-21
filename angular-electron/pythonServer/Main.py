# -----------------------imports-----------------

import Voice_Recognition as streaming
import pyttsx
import zerorpc
# -----------------------------------------------
"""
 was not sure wether to use sphinx or google cloud decided on google because sphinx was very bad
"""
# ------------------------variables--------------
name = "Amy"
key="AIzaSyBZh4ZPUWldAfTciUCIVaFA9NsTaFjcVw4"
commands=[
    {"commandName":"hey there"}
    ]
# -----------------------------------------------


# ------------------------commands---------------
class command_class(object):
    def __init__(self, command):
        self.engine=pyttsx.init()
        self.command = command
        self.command_analyzer()

    def command_analyzer(self):
        if name + " say hello world" in self.command:
            self.hello_world()

    ###TODO create function to analyze the command and send it on its way example: internal something that doesnt use internet
    def hello_world(self):
        self.engine.say("Hey There")
        self.engine.runAndWait()
#--------------------------------------------------

class api(object):
    def initiating_listening(self):
        zerorpc.heartbeat.gevent.sleep(0)
        while True:
            command = streaming.main()
            yield command
    def check_for_command(self):
        output=self.initiating_listening()
        for phrase in output:
            for command in commands:
                if command["commandName"] in phrase:
                   self.perform_command(command)
    def perform_command(self,command):
        print "fuckeds you over"
def main():
    
    s = zerorpc.Server(api(),heartbeat=1000)
    s.bind("tcp://0.0.0.0:4242")
    s.run()

if __name__ == '__main__':
    main()
  