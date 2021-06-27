# Introduction
The main goal of this project is to create conversational assistants that can be used to help overcome social anxiety. Due to social anxiety, people can find it difficult to have a successful conversation when meeting a new person or having an initial conversation. This project assists humans in an open-ended or open-topic conversation. This is a part of my Master's Thesis research, advised by Prof. Shlomo Argamon with Prof. Kai Shu as the member of the thesis committee.  
  
There are several openended chatbots that were trained to have a human-chatbot interaction in an open-topic discussion. However, there is very few research in open-domain chatbot assisting humans in an openended discussion. This is because open-endedness is one of the greatest challenges in Natural Language Processing. This project uses two best performing open source chatbots that perform well in open-ended conversations: DialoGPT by Microsoft, and Blenderbot by Facebook. Although there are papers describing better chatbots than these two, but unfortunately, they were not available: Meena by Google, and Mitsuku or Kuki by Pandorabots.  
  
# Process
The project involved human study and therefore requires prior approval from the IRB. The chatbots were deployed using Flask for getting the responses, and a full stack chat application was developed for connecting two strangers for having a guided conversation. The source for both is present in `src` with `API` contains the chatbot Flask API and `Chat Framework` contains the JavaScript framework as a web-application.

# Analysis & Transfer Learning
While performing the human study, the users were asked specific questions that would help to analyze the performance of the chatbots and if the chatbots were able to provide context relevant suggestions. The messages sent by the users were also saved for transfer learning and improving the results. After transfer learning the Blenderbot model was able to achieve a perplexity of 3.61.  
  
# Further Information
For more information about the project, please read the [Thesis Document](./docs/Thesis/Towards%20Assisting%20Human-Human%20Conversations.pdf) and the [Defense Presentation](./docs/Thesis/Defense%20Presentation.pdf) in the `docs/Thesis` folder.