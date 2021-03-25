import flask
from flask import request, jsonify, make_response
from flask_cors import CORS, cross_origin

import transformers
from transformers import AutoModelWithLMHead, AutoTokenizer
from transformers import BlenderbotSmallTokenizer, BlenderbotForConditionalGeneration, BlenderbotConfig
import torch

application = flask.Flask(__name__)
cors = CORS(application)
application.config['CORS_HEADERS'] = 'Content-Type'

DialoGPT_tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-large")
DialoGPT_model = AutoModelWithLMHead.from_pretrained("microsoft/DialoGPT-large")

Blenderbot_model = BlenderbotForConditionalGeneration.from_pretrained('facebook/blenderbot-90M')
Blenderbot_tokenizer = BlenderbotSmallTokenizer.from_pretrained('facebook/blenderbot-90M')

def get_DialoGPT_response(text):

    # encode the new user input, add the eos_token and return a tensor in Pytorch
    new_user_input_ids = DialoGPT_tokenizer.encode(text + DialoGPT_tokenizer.eos_token, return_tensors='pt')

    # append the new user input tokens to the chat history
    bot_input_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1) if 0 > 0 else new_user_input_ids

    # generated a response while limiting the total chat history to 1000 tokens,
    chat_history_ids = DialoGPT_model.generate(bot_input_ids, max_length=1000, pad_token_id=DialoGPT_tokenizer.eos_token_id)

    # return last ouput tokens from bot
    reply = DialoGPT_tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)

    return {'bot_name': "DialoGPT", 'reply': reply}

def get_Blenderbot_response(text):
    inputs = Blenderbot_tokenizer([text], return_tensors='pt')
    inputs.pop('token_type_ids', None)

    reply_ids = Blenderbot_model.generate(**inputs)
    reply = [Blenderbot_tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=True) for g in reply_ids]
    reply = " ".join(str(x) for x in reply)

    return {'bot_name': "Blenderbot", 'reply': reply}

@application.route('/', methods=['GET'])
@cross_origin()
def home():
    return '''<h1>Chat Framework API</h1>
<p>A prototype API for getting chatbot responses.</p>'''

@application.route('/api/v1/DialoGPT', methods=['GET'])
@cross_origin()
def flask_DialoGPT_response():
    print(request.args)
    if 'text' in request.args:
        text = request.args['text']
        reply = get_DialoGPT_response(text)
        return jsonify(reply)
    else:
        return jsonify("Error getting text for retrieving DialoGPT Response")

@application.route('/api/v1/Blenderbot', methods=['GET'])
@cross_origin()
def flask_Blenderbot_response():
    print(request.args)
    if 'text' in request.args:
        text = request.args['text']
        reply = get_Blenderbot_response(text)
        return jsonify(reply)
    else:
        return jsonify("Error getting text for retrieving Blenderbot Response")

# run the application.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production application.
    # application.debug = True
    application.run()