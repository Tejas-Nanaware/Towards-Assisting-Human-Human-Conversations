from rosieAPI.pb_py.main import Pandorabots
import json
from random import randint
import config

host = config.host
botname = config.botname
app_id = config.app_id
user_key = config.user_key
botkey = config.botkey

API = Pandorabots(user_key, app_id, host, botname, botkey)

# Bot path specific parameters
usebotkey = True # Not used for the http response input
sessionid = str(randint(100,1000)) # unique sessionid for a session
# trace = True # Generate AIML style trace data
reset = True # Resets bot memory like first time chat
# that = 'Hello' # Override 'that' section of AIML traceback
# topic = 'greetings' # Override 'topic' section of AIML traceback
recent = True # If bot is not compiled then use old version instead of throwing error
reload = True # Force reload bot into memory
extra = True # Returns extra information

# Create a API response wrapper
input_object = {
    'sessionid':sessionid,
    # 'trace':trace,
    'reset':reset,
    # 'that':that,
    # 'topic':topic,
    'recent':recent,
    'reload':reload,
    'extra':extra
}

inital_message = True

while(True):
    message = input(">> User:")
    input_object['message'] = message

    result = API.atalk(input_object, usebotkey)
    json_result = json.loads(result.text)
    print('>> Rosie:', json_result['responses'][0])

    if inital_message:
        reset = False
        inital_message = False
        input_object['reset'] = False