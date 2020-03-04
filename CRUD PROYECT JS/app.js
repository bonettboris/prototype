//VARIABLES GLOBALES

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.querySelector('#listaActividades');
let arrayActividades = [];

//FUNCIONES

const CrearItem = (actividad) =>{
    let item = {
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item);
    return item;
}

const GuardarDB = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    pintarDB();
}

const pintarDB = () =>{
    listaActividadesUI.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
//    console.log(arrayActividades);
    if(arrayActividades === null){
        arrayActividades = [];
    }else{
        arrayActividades.forEach(element => {
          //console.log(element);
            if(element.estado){
                listaActividadesUI.innerHTML += `
          <div class="alert alert-success mt-4" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b>  -  ${element.estado ? 'Activado': ''}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>
          `
            }else{
                listaActividadesUI.innerHTML += `
          <div class="alert alert-danger mt-4" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b>  -  ${element.estado ? '': 'Inactivado'}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>
          `
            }
        }); 
    }
}

const eliminarDB = (actividad) => {
//    console.log(actividad);
    let indexArray;
    arrayActividades.forEach((elemento, index) =>{
//        console.log(index);
        if(elemento.actividad === actividad){
            indexArray = index;
        }
        
    });

    arrayActividades.splice(indexArray,1);
    GuardarDB();
    
}

const EditarDB = (actividad) => {
    let indexArray = arrayActividades.findIndex((elemento) => elemento.actividad === actividad);
    //console.log(indexArray);
    //console.log(arrayActividades[indexArray]);
    arrayActividades[indexArray].estado = true;
    GuardarDB();
}

/*let correr = CrearItem('correr');
console.log(correr);
let nadar = CrearItem('nadar');
console.log(arrayActividades);*/


//EventListener

formularioUI.addEventListener('submit', (e)=>{
    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;
//    console.log(actividadUI);
    CrearItem(actividadUI);
    GuardarDB();

    formularioUI.reset();      
    
});

document.addEventListener('DOMContentLoaded', pintarDB);

listaActividadesUI.addEventListener('click', (e) =>{
    e.preventDefault();
    //console.log(e.path[2].childNodes[3].innerHTML);
    //console.log(e.target.innerHTML)
    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
        //console.log('accion del done');
        let texto = e.path[2].childNodes[1].innerHTML;
        if(e.target.innerHTML === 'delete'){
            // accion de eliminar 
            eliminarDB(texto);

        }
        if(e.target.innerHTML === 'done'){
            //editar
            EditarDB(texto);
        }
    }

});
