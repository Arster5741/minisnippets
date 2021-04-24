# SCRIPT PUNTOS
## Instalación
Añadir el packages-nombrepaquete/label.js en cualquier package serverside del RAGEMP y en cualquier archivo (solo uno) antes de usarlo poner:
```js
require('ruta_al_label.js');
```

## Uso
En qualquier caso que sea necesario usar el comando creado por el label.js mp.puntos.new().
```js
mp.puntos.new(
    clave_añadir,
    posición, //Sirve tipo Vector3 o [x,y,z]
    dimensión, //En el 90% de los casos poner 0
    rango, //1=> Para personas, 3=> Para coches, ajustable a gusto
    tipo_marcador, // https://wiki.rage.mp/index.php?title=Marker::Marker#Markers_type
    color_marcador, //[r,g,b,alpha]
    texto_textlabel, //String
    colorT, //[r,g,b,alpha]
    objetoPoner // [Optativo] object
    
);

mp.puntos.new(
    "PUNTO_RUKA",
    [ -425.1521 , 1122.6414 , 325.85464],
    0,
    1,
    1,
    [255,20,20,255],
    "Punto /ruka", 
    [255,20,20,255]
);
```
Al entrar comprobar con getVariable (en players) si clave_añadir == true, o a cualquier valor puesto en el objetoPoner (si se ha puesto alguno). En caso de no estar dentro tendrá undefined.