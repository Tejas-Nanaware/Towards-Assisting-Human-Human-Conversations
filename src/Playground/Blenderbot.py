from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration, BlenderbotConfig

model_name = 'facebook/blenderbot-3B'
model = BlenderbotForConditionalGeneration.from_pretrained(model_name)
tokenizer = BlenderbotTokenizer.from_pretrained(model_name)
configuration_3B = BlenderbotConfig(model_name)
configuration_3B.to_diff_dict()

UTTERANCE = "It takes too long to process this text!"
print(UTTERANCE)

inputs = tokenizer([UTTERANCE], return_tensors='pt')
print(inputs)

reply_ids = model.generate(**inputs)
print(reply_ids)

reply = [tokenizer.decode(g, skip_special_tokens=True, clean_up_tokenization_spaces=False) for g in reply_ids]
print(reply)