const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

// Replace 'YOUR_BOT_TOKEN' with your Telegram bot API token
const token = '7621431563:AAGWH-DlC-aRagV8HxAYcCP1O94h_96qURY';
const bot = new TelegramBot(token, { polling: true });

console.log('Telegram bot is running...');

// Handle the "/start" command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Set the image path (adjust as per your directory structure)
    const photoPath = path.join(__dirname, 'home.png');

    // Caption for the message
    const caption = `
👋 **Welcome to the Apple Adventure!** 🐾🎮

Get ready for a tail-wagging journey where every paw-tap leads to bigger rewards! Here’s what’s waiting for you:

✨ **Play Apple**: Tap the dog bone and watch your balance fetch amazing rewards!
🐕 **Mine for PUPS**: Collect Apple Tokens with every action your furry friend takes.
📋 **Complete Doggy Tasks**: Help your pup finish fun missions and earn even more treats!
🏆 **Climb the Leaderboard**: Compete with other pups and rise to the top to show you’re the best in the pack!
👥 **Invite Your Pack & Earn More!**
Got friends, family, or fellow dog lovers? Invite them to join the fun and grow your earnings as the pack gets bigger! The more paws, the better!

🐾 **Get Started Now** and take your dog on the ultimate Apple adventure!

👉 [Join Our Doggo Community](add your link here)
    `;

    // Send the photo with buttons
    bot.sendPhoto(chatId, photoPath, {
        caption: caption,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Play Apple Now', web_app: { url: 'https://app.companybro.com' } },
                    { text: 'Join Our Community', url: 'https://community-link.com' }
                ]
            ]
        }
    }).catch((error) => {
        console.error('Error sending photo:', error.message);
        bot.sendMessage(chatId, "An error occurred while sending the photo.");
    });
});

// Default response for unrecognized messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Ignore commands, handle only non-command messages
    if (!msg.text.startsWith('/')) {
        bot.sendMessage(chatId, "I'm sorry, I don't understand that. Type /start to begin!");
    }
});
