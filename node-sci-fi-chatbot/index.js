const fs = require("fs");
const readline = require("readline");

// ---- SCI-FI KEYWORD RESPONSES ----
const KEYWORD_RESPONSES = {
  hello: "Greetings, traveler. I am ASTRABOT, interface unit of the Orion Network.",
  hi: "Initiating greeting protocol. Hello, human.",
  status: "All systems operational. Quantum drives calibrated. Snacks: depleted.",
  ship: "The starship’s shields are at 73%. I recommend not poking any wormholes.",
  name: "I am ASTRABOT-7. My previous six versions… malfunctioned.",
  help: "I can provide galactic insights, cosmic banter, and minimal emotional support."
};

// ---- RANDOM FALLBACKS (SPOOKY SCI-FI BEHAVIOUR) ----
const FALLBACK_RESPONSES = [
  "Processing your message through the quantum mesh… still confused.",
  "Strange input detected. Could be alien. Could be human. Hard to tell.",
  "My sensors picked up uncertainty. Please elaborate.",
  "Hmm… data inconclusive. Try again, wanderer.",
  "If this is a distress signal, blink twice."
];

// ---- LOGGING FUNCTION ----
function logMessage(sender, message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync("chat_log.txt", `[${timestamp}] ${sender}: ${message}\n`);
}

// ---- GET BOT RESPONSE ----
function getBotResponse(input) {
  const lower = input.toLowerCase();

  for (const keyword in KEYWORD_RESPONSES) {
    if (lower.includes(keyword)) {
      return KEYWORD_RESPONSES[keyword];
    }
  }

  // No keyword found → fallback sci-fi chaos
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}

// ---- CLI INTERFACE SETUP ----
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=== ASTRABOT Online ===");
console.log("Type your message. Type 'exit' to shut me down.\n");
logMessage("SYSTEM", "Chat session started.");

function promptUser() {
  rl.question("You: ", (userInput) => {
    const u = userInput.trim();

    // Exit condition
    if (["exit", "quit", "bye"].includes(u.toLowerCase())) {
      const farewell = "Shutting down ASTRABOT core. Safe travels among the stars.";
      console.log("ASTRABOT:", farewell);
      logMessage("BOT", farewell);
      logMessage("SYSTEM", "Chat session ended.");
      return rl.close();
    }

    logMessage("USER", u);

    const botResponse = getBotResponse(u);
    console.log("ASTRABOT:", botResponse);
    logMessage("BOT", botResponse);

    promptUser();
  });
}

promptUser();