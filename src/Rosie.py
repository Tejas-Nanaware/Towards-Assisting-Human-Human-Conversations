import aiml


# Create the kernel and learn AIML files
kernel = aiml.Kernel()
kernel.learn("./rosie/lib/rosie_startup.xml")
kernel.respond("load aiml b")

# Press CTRL-C to break this loop
while True:
    print("Rosie>", kernel.respond(input("User> ").upper()))
