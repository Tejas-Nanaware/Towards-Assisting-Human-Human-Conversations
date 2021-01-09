from transformers import BlenderbotSmallTokenizer, BlenderbotForConditionalGeneration, BlenderbotConfig

model_name = 'facebook/blenderbot-90M'
model = BlenderbotForConditionalGeneration.from_pretrained(model_name)
tokenizer = BlenderbotSmallTokenizer.from_pretrained(model_name)
configuration = BlenderbotConfig.from_pretrained(model_name)
configuration.to_diff_dict()

# UTTERANCE = "It takes too long to process this text!"
# print(UTTERANCE)

# inputs = tokenizer([UTTERANCE], return_tensors='pt')
# inputs.pop('token_type_ids', None)
# print(inputs)

# reply_ids = model.generate(**inputs)
# print(reply_ids)

# reply = [tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=False) for g in reply_ids]
# print(reply)

while True:
    for step in range(15):
        UTTERANCE = input(">> User: ")

        inputs = tokenizer([UTTERANCE], return_tensors='pt')
        inputs.pop('token_type_ids', None)

        reply_ids = model.generate(**inputs)

        reply = [tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=True) for g in reply_ids]
        reply = " ".join(str(x) for x in reply)
        print(">> Blenderbot: ", reply)
        