import cleverbotfree.cbfree
import sys
cb = cleverbotfree.cbfree.Cleverbot()

def chat():
    userInput = input('User: ')
    response = cb.single_exchange(userInput)
    print(response)
    cb.browser.close()
    sys.exit()

chat()