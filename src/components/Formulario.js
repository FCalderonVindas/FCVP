import React, {Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4'; //Nos ayuda a crear id  
import PropTypes from 'prop-types';
const Formularios = ({crearCita}) => {
    //crear state para citas
    const [cita, actulizarCita] = useState({
        mascota: '',
        propietarios:'',
        fecha:'',
        hora:'',
        sintomas:''
    });
    // Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarState = e =>{
        actulizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }
    // State para los errores
    const [error, actualizarError] = useState(false);

    // extraer los valores

    const{mascota, propietarios, fecha, hora, sintomas} =cita;

    // Al agregar cita

    const agregarCita = e =>{
        e.preventDefault();

        //Validar
        if(mascota.trim()===''|| propietarios.trim()===''|| fecha.trim()===''|| hora.trim()===''|| sintomas.trim()===''){
            actualizarError(true);           
            return;
        }

        //Eliminar el mensaje previo
        actualizarError(false);

        //Asignar un ID
        cita.id = uuid();
        console.log(cita);
        //Crear la cita
        crearCita(cita);
        
        //Reiniciar form
        actulizarCita({
            mascota: '',
            propietarios:'',
            fecha:'',
            hora:'',
            sintomas:''
        })        
    }
    return (
        <Fragment>
            <h2>Crear cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatoris</p> :null}
            <form
                onSubmit = {agregarCita}
            >
                <label>nombre mascota:</label>
                <input
                    type = "text"
                    name = "mascota"
                    className="u-full-width"    
                    placeholder ="Nombre mascota"
                    onChange = {actualizarState}
                    value = {mascota}
                />
                <label>nombre dueño:</label>
                <input
                    type = "text"
                    name = "propietarios"
                    className="u-full-width"    
                    placeholder ="Nombre dueño de la mascota"
                    onChange = {actualizarState}
                    value = {propietarios}
                />
                <label>fecha:</label>
                <input
                    type = "date"
                    name = "fecha"
                    className="u-full-width"    
                    onChange = {actualizarState}
                    value = {fecha}
                />
                <label>hora:</label>
                <input
                    type = "time"
                    name = "hora"
                    className="u-full-width"    
                    onChange = {actualizarState}
                    value = {hora}
                />
                <label>síntomas:</label>
                <textarea
                className ="u-full-width"
                name="sintomas"
                onChange = {actualizarState}
                value = {sintomas}
                ></textarea>
                <button
                    type="submit"
                    className ="u-full-width button-primary"
                    
                >agregar cita</button>
                
                
                
            </form>
        </Fragment>
      );
}

Formularios.propTypes = {
    crearCita: PropTypes.func.isRequired //Es una forma de documentar el codigo, por ejemplo si aquí pongo que crear cita es requerido y no lo paso, la consola me mostrará un error
}

export default Formularios;

