const Discord = require('discord.js'); //Obtenemos copia de la información del discord.js
const client = new Discord.Client(); //Creamos un client

const ListaTrolleadas = ["soy el hijo de LU-BOT y LU-BOT GO", "Kenshin y Dries son mis abuelos","Ok.","¿Mi verdadera identidad? Si la revelo, me echan."];
//Creamos una lista para las trolleadas

client.once('ready', () => { //Cuando el bot se encienda ...
	console.log('Bot Encendido!'); //Apunta en la consola bot encendido
	
	
	cargarGuilds(); //Carga las guilds (servidores) y los canales
});

function cargarGuilds(){
	mp.discordbot.guild = mp.discordbot.getGuild(id); //sustituir id por el de la guild que se quiera usar como maestra
	mp.discordbot.canalLogs = mp.discordbot.guild.channels.cache.find(ch => ch.id == id); //Sustituir id por el del canal donde se quiere que vayan los logs
	mp.discordbot.canalBarraA = mp.discordbot.guild.channels.cache.find(ch => ch.id == id); //Sustituir id por el del canal donde se quiere que vaya el /a
	mp.discordbot.canalBarraE = mp.discordbot.guild.channels.cache.find(ch => ch.id == id); //Sustituir id por el del canal donde se quiere que vayan el /e
	mp.discordbot.canalAnuncios = mp.discordbot.guild.channels.cache.find(ch => ch.id == id); //Sustituir id por el del  canal donde se quiere que vayan los anuncios

}
client.on('message', message => { //Al recibir un mensaje

	if(message.mentions.has(client.user)){ //Si me menciona
		var item = ListaTrolleadas[Math.floor(Math.random() * ListaTrolleadas.length)]; //Elije una trolleada
		if(item == undefined) //Si por algún motivo no hay ninguna
			message.reply("Tengo calor, ¿me das agua?"); //Manda una por defecto
		else
			message.reply(item); //Manda una trolleada elegida
		return;
	}

	// Si el mensaje está en el canal del /a
	if (message.channel == mp.discordbot.canalBarraA && message.author != client.user) {
		mp.players.forEach(pl =>
            {
                if(true) //TEMPORAL - FALTA RESTRICCIÓN
                    pl.outputChatBox(`!{red}[ADMIN-D] !{white}${message.author.displayName}: ${message.content}`); //Manda un mensaje a todos los usuarios, recordar restringirlo
            }
        );
	} else if (message.channel == mp.discordbot.canalBarraE && message.author != client.user) { //Lo mismo con /e
		mp.players.forEach(pl =>
            {
                if(true) //TEMPORAL - FALTA RESTRICCIÓN
                    pl.outputChatBox(`!{orange}[STAFF-D] !{white}${message.author.username}: ${message.content}`);
            }
        );
	}
  });

client.login(token); //Poner Token aquí

mp.discordbot = { //Extender mp con un objeto discordbot
	client:client, //Añadir copia del cliente
	guild: null, //Añadir guild principal
	


	getGuild: function(id){ //Función GetGuild
		var resolvable = client.guilds.cache.get(id); //Obtiene la guild por el id
		var resolved = client.guilds.resolve(resolvable);
		return resolved;
	},

	log: msg =>{ //Añadida función log
		try {
			if(mp.discordbot.canalLogs) //Si hay canal de logs
				await mp.discordbot.canalLogs.send(msg); //Manda el mensaje por este
		} catch (error) {
			console.log(error);
		}
		
	}

};



