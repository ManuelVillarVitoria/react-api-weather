import React, {useState} from 'react';

const Formulario = ({busqueda, guardarBusqueda,guardarConsultar}) => {

    const  [error, guardarError] = useState(false);
   
    //extraer ciudad y país con destructuring
    const {ciudad, pais} = busqueda;

    //Función que coloca los elementos en el state
    const handleChange = e => {
        //actualizar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    //Cuando el usuario le da Submit al formulario
    const handleSubmit = e => {
        e.preventDefault();

        //Validar
        if(ciudad.trim() === "" || pais.trim() === "") {
            guardarError(true);
            return;
        }

        guardarError(false);

        guardarConsultar(true);
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <p className="red darken-4 error">Todos los campos son obligatorios</p> : null}

            <div className="input-field col s-12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                 {/* en vez de poner 'for', que es una palabra reservada para JS,ponemos 'htmlFor en react. 
                    Colocamos el label después del input porque Materialize da un estilo específico de esta forma*/}  
                <label htmlFor="ciudad">Ciudad: </label>

                <div className="input-field col s-12">
                    <select
                        name="pais"
                        id="pais"
                        value={pais}
                        onChange={handleChange}
                    >
                        <option value="">-- Seleccione un país --</option>
                        <option value="US">Estados Unidos</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">España</option>
                        <option value="PE">Perú</option>
                    </select>
                    <label htmlFor="pais">País: </label>
                </div>     
            </div> 

            <div className="input-field col s12">
                    <input
                        type="submit"
                        value="Buscar Clima"
                        className="waves-effect waves-light btn-large btn-block yellow accent-4"
                    />
            </div>       
        </form>
     );
}
 
export default Formulario;