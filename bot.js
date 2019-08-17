const Discord = require("discord.js");
const TicTacToe = require("./discord-tictactoe/tictactoe/Game.js");

const bot = new Discord.Client();

// Chargement de la configuration externe
require('dotenv').config();

/*  Gestion des réactions automatiques sur les messages du canal annonces  */
bot.on("message", function(message) {
	if (message.channel.name == "annonces") {
		message.react("👍").then(() => {
			message.react("👎").then(() => {
				message.react("❤").then(() => {
					message.react("💩").catch(console.error);
				}).catch(console.error);
			}).catch(console.error);
		}).catch(console.error);
	}
});

/*  Gestion du Tic-Tac-Toe  */
let tictactoe = new TicTacToe({
    use_custom_bot : true,
    channel : "tictactoe",

    auto_clear : true,
    messages : {
        welcome : "Bienvenue dans le salon du jeu **TicTacToe** ! Tapes **!duel** pour trouver un adversaire ! :smiley:",
        waiting_opponent : "Le joueur %player% est prêt ! Tapes **!duel** pour démarrer le duel !",
        begin_game : "**%player1% et %player2%** ont commencé une partie de **TicTacToe** ! :smiley:",
        introduce_round : "À %player% (%symbol%) de jouer !",

        end_equality : "Egalité ! Bravo à vous deux ! :smiley:",
        end_victory : "Le joueur %player% a gagné ! GG :wink: :tada:"
    }
});

bot.login(process.env.DISCORD_API_TOKEN);
tictactoe.bindToClient(bot);
