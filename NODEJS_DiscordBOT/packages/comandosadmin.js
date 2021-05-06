mp.events.addCommand('a', (player, msg) => {
    if(true){//TEMPORAL - FALTA RESTRICCIÓN
        mp.players.forEach(pl =>
            {
                if(true) //TEMPORAL - FALTA RESTRICCIÓN
                    pl.outputChatBox(`!{green}[ADMIN] ${player.name} - ${player.id}: ${msg}`); //Manda 
            }
        );
        //mp.discordbot.canalBarraA.send(`**${player.name} [${/*"Rank"*/""}-${player.id}]** ${msg}`);
        mp.discordbot.canalBarraA?mp.discordbot.canalBarraA.send(`**${player.name} [${player.id}]** ${msg}`):[];
    }else player.outputChatBox("No puedes ejecutar este comando");
});

mp.events.addCommand('e', (player, msg) => {
    if(true){//TEMPORAL - FALTA RESTRICCIÓN
        mp.players.forEach(pl =>
            {
                if(true) //TEMPORAL - FALTA RESTRICCIÓN
                    pl.outputChatBox(`!{orange}[STAFF] !{white}${player.name}: ${msg}`);
            }
        );
        //mp.discordbot.canalBarraA.send(`**${player.name} [${/*"Rank"*/""}-${player.id}]** ${msg}`);
        mp.discordbot.canalBarraE.send?mp.discordbot.canalBarraE.send(`**${player.name} [${player.id}]** ${msg}`):[];
    }else player.outputChatBox("No puedes ejecutar este comando");
});