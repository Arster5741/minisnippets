require('./label.js'); //Poner SIEMPRE el require antes de usar la utilidad - solo es necesario ponerlo en uno de los archivos, ya que modifica mp (variable global).



if(mp.puntos.new != undefined){
mp.puntos.new("PUNTO_RUKA", [ -425.1521 , 1122.6414 , 325.85464], 0, 1, 1, [255,20,20,255], "Punto /ruka", [255,20,20,255]); //Creamos un Punto => Posición Observatorio Galileo, en este caso
//mp.puntos.new();
mp.events.addCommand("ruka", (player) => {
	if(player.getVariable("PUNTO_RUKA") == true){ //Comprobamos que el getVariable (imperdible) sea true, es decir, que lo tenga.
		player.call('ruka'); //Ejecutamos el CEF del ruka
	}else{
		player.outputChatBox("!{red}No puedes usar este comando aquí");
	}

});
}else throw("Probablmente hayas usado mp.puntos.new antes de hora")//Check tonto de que se haya instanciado el punto antes de hora, en caso que no, tira error
