import React, {Fragment, useState, useEffect} from 'react';
import Formularios from './components/Formulario.js';
import Cita from './components/Cita.js';
function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales){
    citasIniciales =[];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //UseState para realizar ciertas operaciones cuando el state cambia
  useEffect(() =>{           // -> Siempre es un arrow function
      if(citasIniciales){
        localStorage.setItem('citas', JSON.stringify(citas))
      }else{
        localStorage.setItem('citas', JSON.stringify([]));
      }
  }, [citas]); // -> Sino ponemos el array se sigue siclando, si por ejemplo lo rellanamos con citas, cada vez que citas tenga un cambio, usaEfect se actuliza

  //Funcion que toma las citas actuales y agregue la nueva
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Funcion que elimina una cita por su id

  const eliminarCita = id =>{
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas);
  };

  //Mensaje condicional
  const titulo = citas.length === 0 ?'No hay Citas'     :'Administra tus Citas';

  return (
        <Fragment>
          <h1>Administrador de Pacientes</h1>
          <div className="container">
            <div className="row">
              <div className="one-half column">
                <Formularios
                  crearCita= {crearCita}
                />
              </div>
              <div className="one-half column">
                <h2>{titulo}</h2>
                {citas.map(cita =>(
                  <Cita
                    key= {cita.id}
                    cita={cita} 
                    eliminarCita= {eliminarCita}
                  />
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      );
}

export default App;
