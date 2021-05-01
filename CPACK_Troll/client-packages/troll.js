const NativeUI = require('nativeui'); //Obtenemos toda la información que necesitamos de la librería Native UI
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;


const localPlayer = mp.players.local; //Guardamos el jugador local en una variable

var targetID = 0; //Preparamos una variable para guardar el target /troll [esteID]

const AbrirMenuTroll = (targetid, targetName, congelado)=>{ //Configuramos función
    targetID = targetid; //Almacenamos el targetid en la variable targetID (Observar mayúsuculas)
    var ui = new Menu("Menú Troll", "Features para trollear y ayudar", new Point(50, 50)); //Creamos el menú
    ui.AddItem(new UIMenuItem(`${targetName} (${targetID})`)); //Añadimos un objeto inicial para indicar el ID y el nombre
    var Slap = new UIMenuItem("Golpear","Golpear administrativamente"); ui.AddItem(Slap); //Añadimos los diferentes items
    var Congelar = new UIMenuItem(congelado?"Descongelar":"Congelar",congelado?"Descongelar por congelación staff":"Congelar administrativamente"); ui.AddItem(Congelar); //Revisamos si el jugador está congelado y si está o no configuramos el menú
    var Kick = new UIMenuItem("Expulsar","Expulsar del servidor"); ui.AddItem(Kick);
    var Traer = new UIMenuItem("Traer","Teletransportar a tu posición"); ui.AddItem(Traer);
    var Autofix = new UIMenuItem("Autofix","Setearle la dimensión a 0"); ui.AddItem(Autofix);
    var Animales = new UIMenuItem("Animales","Configura la skin del personaje"); ui.AddItem(Animales);
    ui.ItemSelect.on((item, index) => { //Cuando pulsas un ítem ...
        if(index == 0 )return; //Si es el primero (0 - el TargetName (id) ) no hagas nada
        ui.Close(); //Ciera este menú
        if(index == 6) GetMenuAnimales(); //Si es el séptimo (7-1 ya que el primero es el 0); abre el menú de animales
        else mp.events.callRemote('troll:output', index,targetID) //Si no manda al serverside la opción escogida

    });
    ui.Open(); //Abre el menú tras configurar todo
}

mp.events.add({ //Registramos un evento abrirMenu y otro freeze para cuando se congele

    'troll:abrirMenu': AbrirMenuTroll,
    'troll:freeze': value =>localPlayer.freezePosition(value) //Instrucción para poder congelar el jugador
});

const ListaPeds = [ //Creamos una lista con los diferentes PEDs que hay en la opción animles
                    //https://wiki.rage.mp/index.php?title=Peds 
    {nombre: "Persona", model: "humano"}, //Usamos el humano para revisarlo en el serverside
    {nombre: "Rata", model: "a_c_rat"}, //Se pueden añadir otras líneas para que admita más PEDs
    {nombre: "Gabiota", model: "a_c_seagull"},
    {nombre: "Cerdo", model: "a_c_pig"},
    {nombre: "Paloma", model: "a_c_pigeon"},
    {nombre: "Conejo", model: "a_c_rabbit_01"},

];

const GetMenuAnimales = ()=>{
    var ui = new Menu("Peds Troll", "Peds (Models) para trollear y ayudar", new Point(50, 50)); //Crear un menú
    ListaPeds.forEach(z=>{ //Por cada PED de la lista
        ui.AddItem(new UIMenuItem(z.nombre, z.model)); //Añade un item al menú
    });
    ui.ItemSelect.on((item, index) => { //Si se pulsa algo
        ui.Close(); //Cierra el menú
        mp.events.callRemote('troll:animales', ListaPeds[index].model,targetID) //Obtiene el model y lo manda al servidor
    }); 

}