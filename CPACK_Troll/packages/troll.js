mp.events.addCommand('troll', (player,_full, id) => {
    if(true){ //Quitada restricción
        let t = mp.players.at(id); //Obtiene personaje
        if(t != undefined){ //Revisa si el personaje existe
            player.call('troll:abrirMenu',[t.id, t.name, t.data.congelado != undefined?t.data.congelado:false]); //Ejecuta la apertura del menú

        }else player.outputChatBox(`!{#FF5733}No hay ningún jugador con este ID`);
    }else player.outputChatBox("!{#FF5733}No puedes ejecutar este comando");
});

mp.events.add('troll:output', (player, opcion, target)=>{ //Al devolver el dato
    var segundo = mp.players.at(target); //Obtener de nuevo el jugador y descartarlo si se ha desconectado
    if(segundo == undefined) return;

    switch(opcion){ //Depende de la opción del /troll
        case 1:
            segundo.position = new mp.Vector3(segundo.position.x, segundo.position.y, segundo.position.z +2);
            player.outputChatBox(`!{#FF5733}Has golpeado a ${segundo.name} correctamente.`);
            segundo.outputChatBox(`!{#437CE9}Has sido golpeado por un administrador.`);
                                                                                            //Elevo ligeramente al jugador y le mando un mensaje diciendo que se le ha hecho slab
            
            break;
        case 2:
            if(segundo.data.congelado == undefined || false) segundo.data.congelado = true; //Si no está congelado, se le congela (variable)
            else segundo.data.congelado = false; //Si lo está, se le descongela
            segundo.call('troll:freeze', [segundo.data.congelado]); //Le ejecuto el clientside
            break;
        case 3:
            segundo.kick("Has sido trolleado"); //Expulso al jugador del servidor
            break;
        case 4:
            segundo.position = player.position; //Teletransporto al jugador al local
            segundo.dimension = player.dimension; //Le traigo a la dimensión del local
            break;
        case 5:
            segundo.dimension = 0; //Seteo la dimensión del jugador a 0 (normal)
            break;
    }
});

mp.events.add('troll:animales', (player, opcion, target)=>{
    var segundo = mp.players.at(target); //Obtengo el jugador y lo tiro hacia atrás si no existe
    if(segundo == undefined) return;
    if(opcion == "humano"){ //Si el model es humano
        segundo.model = true?mp.joaat('mp_m_freemode_01'):mp.joaat('mp_f_freemode_01'); //Si es hombre (sustituir true por expresión lógica ) le pongo skin de hombre, si no; de mujer
        //Añadir aquí cosas relacionadas con ropa / Personalización / ...
        return;
    }
    let hash = mp.joaat(opcion.toString()); //Obtengo el hash de lo mandado por el cliente
    segundo.model = hash; //Le seteo el model
    player.outputChatBox(`!{#FF5733}Has puesto a ${segundo.name} una skin troll correctamente.`); //Mando mensajes al troll y al trolleado
    segundo.outputChatBox(`!{#437CE9} Has sido trolleado por un administrador.`);
});