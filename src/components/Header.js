import React from 'react';
import PropTypes from 'prop-types';

const Header = ({titulo}) => {
    return (  
        <nav>
            <div className="nav-wrapper light-blue darken-2">
            {/* En vez de un h1 , ponemos un enlace, ya que Materialize estila mejor esa etiqueta con 
            un enlace vacío. Para evitar advertencias de react, desactivamos el enlace con un signo de ! */}
                <a href="#!" className="brand-logo">{titulo}</a>

            </div>
        </nav>
    );
}

Header.propTypes = {
    titulo : PropTypes.string.isRequired
}
 
export default Header
;