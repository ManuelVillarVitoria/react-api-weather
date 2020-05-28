import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';

function App() {

//State del formulario
const [busqueda, guardarBusqueda] = useState({
    ciudad:'',
    pais:''
});

const [consultar, guardarConsultar] = useState(false);

//extraer ciudad y país con destructuring
const {ciudad, pais} = busqueda;

//Este Hook detecta los cambios que pases en el array de dependencias.
useEffect(() => {

  if(consultar) { // Colocamos el condicional para que no nos salga primero el error 404.

    const consultarAPI = async () => {

      const appID = 'e548f2f4039680a13ac57b2df3e5cb53';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
  
      const response = await fetch(url);
      const res = await response.json();
  
      console.log(res);
    }
    consultarAPI();
  }

},[consultar]);


  return (
    <Fragment>
      <Header
        titulo='Clima React App'
       />
       <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col m6 s12">
                <Formulario 
                  busqueda={busqueda}
                  guardarBusqueda={guardarBusqueda}
                  guardarConsultar={guardarConsultar}
                />
              </div>
              <div className="col m6 s12">
                2
              </div>
            </div>
          </div>
       </div>
    </Fragment>
  );
}

export default App;
