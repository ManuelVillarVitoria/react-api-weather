import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  //State del formulario
  const [busqueda, guardarBusqueda] = useState({
      ciudad:'',
      pais:''
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError]= useState(false);
  
  //extraer ciudad y país con destructuring
  const {ciudad, pais} = busqueda;

  //Este Hook detecta los cambios que pases en el array de dependencias.
  useEffect(() => {

    if(consultar) { // Colocamos el condicional para que no nos salga primero el error 404.

      const consultarAPI = async () => {

        const appID = 'e548f2f4039680a13ac57b2df3e5cb53';
        //Añadimos una 's' al protocolo 'http' para que nos deje hacer el deployment.
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    
        const response = await fetch(url);
        const res = await response.json();
    
        guardarResultado(res);
        guardarConsultar(false); //Para hacer múltiples consultas sin necesidad de recargar página.

        //detecta si hubo resultados correctos en la consulta
        if(resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      
      }
      
      consultarAPI();
    }
    //Para que no nos aparezca un warning que indique que nos falta las dependencias relacionadas con pais y ciudad
    //colocamos el siguiente comentario inferior para desactivar ese warning.
    
    // eslint-disable-next-line 
    },[consultar]);

  //Carga condicional de componentes
  let componente;
  if(error) {
    componente = <Error mensaje="No hay resultados" />
  } else  {
    componente = <Clima resultado={resultado} />
  }


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
                {componente}
              </div>
            </div>
          </div>
       </div>
    </Fragment>
  );
}

export default App;
