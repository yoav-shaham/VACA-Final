# -----------------------imports-----------------

import Voice_Recognition as streaming
import pyttsx
import zerorpc
import httplib
import threading
import ast
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
    commands=[
    {"commandName":"hey there"}
    ]
    url='127.0.0.1:3000'
    def initiating_listening(self):
        zerorpc.heartbeat.gevent.sleep(0)
        while True:
            command = streaming.main()
            yield command
    def check_for_command(self):
        checking_thread=threading.Thread(target=self.check_for_command_thread,args=[])
        checking_thread.start()
    def check_for_command_thread(self):
        output=self.initiating_listening()
        for phrase in output:
            for command in self.commands:
                if command["commandName"].upper() in phrase.upper():
                   self.perform_command(command)
    def perform_command(self,command):
        exec(command["commandScript"])
    def update_commands(self):
        print "entered update commands"
        conn=httplib.HTTPConnection(self.url)
        conn.request('GET','/command')
        response=conn.getresponse().read()
        conn.close()
        response=ast.literal_eval(response)
        print type(response)
        self.commands=response["commands"]
        print self.commands
        return "Succes"
def main():
    
    s = zerorpc.Server(api(),heartbeat=1000)
    s.bind("tcp://0.0.0.0:4242")
    s.run()

if __name__ == '__main__':
    main()
  