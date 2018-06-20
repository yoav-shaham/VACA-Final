# -----------------------imports-----------------
import Voice_Recognition as streaming
import pyttsx
import zerorpc
import httplib
import threading
import ast
from multiprocessing import Process
import sys
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

class api(object):
    checking_thread=None
    commands=[
    {"commandName":"hey there"}
    ]
    url='18.221.254.75:3000'
    def run_file(self, file):
        execfile("scripts/"+file)
        return
    def initiating_listening(self):
        zerorpc.heartbeat.gevent.sleep(0)
        while True:
            command = streaming.main()
            yield command
    def check_for_command(self):
        print ( "initiating listeninng thread")
        self.checking_thread=Process(target=self.check_for_command_thread,args=())
        self.checking_thread.start()
    def check_for_command_thread(self):
        output=self.initiating_listening()
        for phrase in output:
            for command in self.commands:
                if command["commandName"].upper() in phrase.upper():
                   self.perform_command(command)
                   print command
    def perform_command(self,command):
        try:
            print command
            exec(command["commandScript"])
        except:
            engine=pyttsx.init()
            engine.say("Could not run the"+command["commandName"]+"command script")
            engine.runAndWait()
    def update_commands(self):
        print ( "Shutting Down Thread")
        wasAlive=self.shutdown_thread()
        print ( "entered update commands")

        conn=httplib.HTTPConnection(self.url)
        conn.request('GET','/command')
        response=conn.getresponse().read()
        conn.close()
        response=ast.literal_eval(response)
        print ( type(response))
        self.commands=response["commands"]
        print ( self.commands)
        if (wasAlive):
            print ( "Turning on thread")

            self.check_for_command()
            print ( "turned on")

        return "Succes"
    def shutdown_thread(self):
        if self.checking_thread.is_alive():
            self.checking_thread.terminate()
            self.checking_thread.join()
            print ( "closed")
            return True
        else:
            print ( "Already Closed")

def main():
    print ( "Already Closed")
    sys.stdout.flush()
    s = zerorpc.Server(api(),heartbeat=1000)
    s.bind("tcp://0.0.0.0:4242")
    s.run()

if __name__ == '__main__':
    main()
  