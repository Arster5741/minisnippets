
[ //Crea una lista con las posiciones de las centrales de noticias (Fuente: Código LURP 037)
    new mp.Vector3(-599.0403, -929.841, 23.86335),
    new mp.Vector3(-318.915, -609.822, 33.5582),
    new mp.Vector3(733.0656, 2523.327, 73.22386),
    new mp.Vector3(750.5254, 222.2882, 87.42294),
    new mp.Vector3(-276.2722, 6239.427, 31.48921)
].forEach(x=> { //Y por cada uno
    mp.puntos.new( //Crea un punto 
        "SEDE_NOTICIAS",
        x, //Sirve tipo Vector3 o [x,y,z]
        0, //En el 90% de los casos poner 0
        1, //1=> Para personas, 3=> Para coches, ajustable a gusto
        1, // https://wiki.rage.mp/index.php?title=Marker::Marker#Markers_type
        [250,250,250,50], //[r,g,b,alpha]
        "USA /an para mandar un anuncio", //String
        [255,0,0,255], //[r,g,b,alpha]
        true // [Optativo] object
        
    );
});


mp.events.addCommand("an", (player, msg) => { //Creo comando /an
	if(player.getVariable("SEDE_NOTICIAS") == true){ //Si está en el punto
        //Añadir cobro
        mp.players.forEach(pl => 
            {
                pl.outputChatBox("!{#FF5733}[ANUNCIO:] "+msg); //Manda el mensaje a todos los players
            }
        );
        mp.discordbot.canalAnuncios.send?mp.discordbot.canalAnuncios.send("[Anuncio] "+msg):console.log("Error - no bot o canal"); //Manda el mensaje por el discord si está instanciado el canal.
        
    }else
		player.outputChatBox( "!{red} No puedes usar este comando aquí");


});