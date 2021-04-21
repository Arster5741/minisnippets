if(mp.puntos != undefined) return; //Si ya lo ha instanciado otro archivo; no hacerlo de nuevo, bugearía el _pool y el lastid.

mp.puntos = { //Añadido objeto en mp.puntos con el contenido siguente
    _pool: [], //Añadida lista para almacenar los diferentes puntos para facilitar la búsqueda
    lastid: 0, //Añadido sistema para almacenar los IDs -- No se debería usar para información persistente
    new: (clave, position, dimension, range, markertype, markercolor, texto, colorT, objeto_var = true)=>{ //Creada función new con los arguments
        try {
            
        
        this.clave = clave; //Se apunta la clave solicitada
        this.objeto_var = objeto_var; //Se apunta el objeto que se aplicará sobre la clave - Si no se especifica ninguno se pone true para marcarlo
        this.position = null; //Se crea variable position
        if(Array.isArray(position)){ //Se revisa si está en formato array ([x,y,z]); si no se considera que usa formato Vector3 new mp.Vector3(x,y,z) -- entity(player).position
            if(position.length == 3){ //Revisamos que si es array tenga 3 elementos
                if(isNaN(position[0]))  //Revisamos que el primero (X) sea un número- En caso negativo hacemos que salte error.
                    throw "La posición X del array no es un número";
                if(isNaN(position[1]))  //Revisamos que el segundo (Y) sea un número- En caso negativo hacemos que salte error.
                    throw "La posición Y del array no es un número";
                if(isNaN(position[2]))  //Revisamos que el tercero (Z) sea un número- En caso negativo hacemos que salte error.
                    throw "La posición Z del array no es un número";

                this.position = new mp.Vector3(position[0], position[1], position[2]) //Configuramos la variable (del objeto) position con los datos del array
            }else throw "El array de la posición tiene un número erróneo de elementos";
        }else{
            this.position = position; //Si se da este caso, es directamente pasar la información
        }

        mp.puntos.lastid++; //Subimos en uno el id y luego lo configuramos a este
        this.idpunto = mp.puntos.lastid;
        this.dimension = dimension; //Almacenamos dimension
        this.range = range; //Almacenamos rango (1- personas) || (3/5- coche => Depende de gustos)
        this.markertype = markertype; //Almacenamos el tipo de marcador
        if(markertype != -1){
            let posMarker = this.position; //Copiamos la variable del marcador para poder toquetearla
            switch(markertype){
                case 1: posMarker.z-=1; break; //Si es de tipo 1 (el redondo) lo bajamos ligeramente para que vaya al suelo
            }
            this.marcador = mp.markers.new(markertype, posMarker, 1,
                {
                    direction: new mp.Vector3(0,0,0),
                    rotation: new mp.Vector3(0,0,0),
                    color: markercolor,
                    visible: true,
                    dimension: 0
                }); //Creamos objeto visible (círculo, coche, https://wiki.rage.mp/index.php?title=Marker::Marker)
            
            }
        this.colshape = mp.colshapes.newSphere(this.position.x, this.position.y, this.position.z, 3, dimension); //Creamos colshape (campo de fuerza)
        this.label = mp.labels.new(texto, this.position,
            {
                los: true,
                font: 0, //https://wiki.rage.mp/index.php?title=Fonts_and_Colors Parte inferior
                color: colorT,
                dimension: 0
            }); //Creamos el texto con las especificaciones indicadas
        mp.puntos._pool.push(this); //Añadimos el objeto a la lista de puntos

        this.destroy = ()=>{ //Creamos función para destruirlo todo
            if(this.colshape){
                this.colshape.destroy(); //Si el colshape existe, borrarlo
                this.colshape = null;

            }if(this.label){
                this.label.destroy(); //Si el label  existe, borrarlo
                this.label = null;
            }if(this.marcador){
                this.marcador.destroy(); //Si el marcador existe, borrarlo
                this.marcador = null;
            }
        }
    } catch (error) {
       console.log(error.toString());     
    }
    },

    getByColShape: (colshape)=>{
        let punto = mp.puntos.getsafePool().find(x=>x.colshape == colshape); //Creamos función que devuelva toda la info por el colshape
        return punto;
    },

    at: (id)=>{
        let punto = mp.puntos._pool.find(x=>x.id == id); //Creamos función que devuelva toda la info por el id
        return punto;
    },
    getsafePool:()=>{ //Creamos función que devuelva lista limpiada, quitando nulls y undefined. Si se cuela uno no hay problema, aunque sería imposible, casi
        let poolSafe = [];
        mp.puntos._pool.forEach(x=>{
            if(x != null&&x!=undefined)
                poolSafe.push(x);
        });
        return poolSafe;
    }
}


mp.events.add({
    "playerEnterColshape": (player,shape)=>{ //Si entra en un colshape
        try {
            let punto = mp.puntos.getByColShape(shape); //Obtiene Colshape
            if(punto != undefined && punto != null){ //Seguridad
                
                player.setVariable(punto.clave, punto.objeto_var); //Asigna la variable con la clave y el objeto (Se podría identificar como un imperdible distintivo)
            }
        } catch (error) {
            console.log(error);
        }
        
    },
    "playerExitColshape": (player,shape)=>{  //Si sale de un colshape
        let punto = mp.puntos.getByColShape(shape); //Obtiene Colshape
        if(punto != undefined && punto != null){ //Seguridad
            player.setVariable(punto.clave, undefined);//Asigna la variable con la clave y undefined (como antes de entrar) - tipo ResetData de C#Sharp
        }
    }
});
