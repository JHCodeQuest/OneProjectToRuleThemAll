import random
import time

# --- RULES SECTION: keyword → response ---
KEYWORD_RESPONSES = {
    "hello": "Hello! How can I assist you today?",
    "hi": "Hi there! What's up?",
    "weather": "I'm not a weather station, but I'd guess it's cloudy somewhere.",
    "name": "I go by ChatCLI. Short, sweet, and slightly mysterious.",
    "help": "I can chat, joke, and pretend to be smart. Try asking me anything!"
}

# --- RANDOM FALLBACKS FOR UNKNOWN INPUT ---
FALLBACK_RESPONSES = [
    "Interesting... tell me more.",
    "Not sure I understand, but I'm listening.",
    "Fascinating.",
    "Go on...",
    "Hmm... that's something!"
]

def log_message(sender, message):
    """Writes a line to chat_log.txt with timestamps."""
    with open("chat_log.txt", "a", encoding="utf-8") as log:
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        log.write(f"[{timestamp}] {sender}: {message}\n")

def get_bot_response(user_input):
    """Checks if the message contains known keywords; otherwise returns fallback."""
    text = user_input.lower()

    # Check each keyword
    for keyword, response in KEYWORD_RESPONSES.items():
        if keyword in text:
            return response

    # If nothing matched, pick a random fallback
    return random.choice(FALLBACK_RESPONSES)

def main():
    print("ChatCLI Bot Initialized. Type something! (type 'exit' to quit)")
    log_message("SYSTEM", "Chat started.")

    while True:
        user_input = input("You: ").strip()

        # Exit condition
        if user_input.lower() in ["exit", "quit", "bye"]:
            farewell = "Goodbye! Thanks for chatting."
            print("Bot:", farewell)
            log_message("BOT", farewell)
            break

        # Log user input
        log_message("USER", user_input)

        # Get bot response
        bot_response = get_bot_response(user_input)

        # Print & log response
        print("Bot:", bot_response)
        log_message("BOT", bot_response)

    log_message("SYSTEM", "Chat ended.")

if __name__ == "__main__":
    main()