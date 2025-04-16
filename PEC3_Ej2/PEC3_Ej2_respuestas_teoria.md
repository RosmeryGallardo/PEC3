![Captura de error cuando intentamos cambiar el valor de la constante a string](/PEC3_Ej2/captura_code1.png)

 La ventaja principal del reconocimiento de este error es que te permite no cometer errores a la hora de definir variables, por lo que son más sólidas, pues facilita la detección temprana de errores. 
 Al trabajar con editores como Visual Studio Code facilita el uso de herramientas de TS como autocompletado y advertencias. Cabe recalcar que tanto TS como VSC fueron desarrollados por Microsoft, por lo que su compatibilidad está dirigida a coordinar esfuerzos para el desarrollo eficiente.
 Con TipeScript, el código es más fácil de mantener a medida que crece, está diseñado para facilitar el trabajo en equipo. 
 1. Para cada uno de los valores del fichero code2.ts, ¿Qué tipo de datos inferirá TypeScript? Explica por qué se ha inferido este tipo de datos.

const a = 1042; infiere tipo number porque le doy un valor en número. 
const b = 'apples and oranges'; infiere tipo string porque el valor que le doy es una cadena de texto, por eso infiere que es un valor tipo string.
const c = 'pineapples'; primedo interpreta que al ser una constante es un valor de tipo literal, es decir que no es cualquier string, sino el valor de 'pineapples'
const d = [true, true, false]; Boolean, porque son elementos de valor true, false
const e = { type: 'ficus' }; inferido. En este caso no se reasigna e, por lo que el TS puede interpretarlo como literal, pero si esperamos modificar el valor a argumento genériso entonces inferiria string.
const f = [1, false]; array de nombre number y boolean. Ts infiere que pueden ser cualquiera de esos tipos. 
const g = [3]; array de números 
const h = null; porque lo definimos como null. 
¿Por qué se dispara cada uno de los errores del fichero code3.ts?

const i: 3 = 3;
i = 4; // Error TS2588 : Cannot assign to 'i' because it is a constant.ts(2588)
En primer lugar, le decimos a TS que i solo puede tener el valor literal de 3, sin embargo, luego intentamos redefinir su valor a 4, lo que pretende cambiar nuestra propia definición del valor de la constante y una constante no se puede reasignar. 

const j = [1, 2, 3];
j.push(4);
j.push('5'); // Error TS2345: Argument of type '"5"' is not assignable to parameter of type 'number'.
TS infiere el valor de j como un array de números, luego en j.push determinamos '5' lo cual no es un número sino un string, no coincide con el valor esperado. No puedes insertar un string en un array de números. 

let k: never = 4; // Error TSTS2322: Type '4' is not assignable to type 'never'.

let l: unknown = 4;
let m = l * 2; // Error TS2571: Object is of type 'unknown'.
En este caso never es un tipado especial para valores que no ocurren, no se le puede asignar un valor como 4 porque viola su definición. Se supone que never nunca tiene valor. 

¿Cuál es la diferencia entre una clase y una interface en TypeScript?

La interfaz solo existe en tiempo de compilación, solo se usa para verificación de tipos, no genera código JS. Las clases existen en compilación y ejecución.
La interfaz se usa para tipar objetos, funciones o clases. Es como un contrato, quien use esa interfaz debe cumplir sus propiedades.
Una interfaz solo dice cómo debe ser algo, define la forma, la estructura de un objeto, más no su implementación. 

/*Clase*/
La clase define estructura y comportamiento, puede tener lógica, métodos y estado.
Podemos inicializar propiedades e implementar métodos con las clases.También podemos crear instancias de dicha clase.  
Puede tener constructores, metodos, herencia, propiedades privadas. 



