import CampoCiudad from './CampoCiudad/CampoCiudad';
import CampoFecha from './CampoFecha/CampoFecha';
import ciudades from '../../files/ciudades'
import './Buscador.css'
import CampoPersona from './CampoPersona/CampoPersona';

const Buscador = () => {
    return(
        <div className="contenedor_buscador">
             
            {/* INPUTS CIUDADES  */}
            <div className='contenedor_ciudades'>
                <div className='campo_ciudad'>
                    <CampoCiudad opciones={ciudades} label={"Ingrese su origen"}/>  
                </div>
                <div className='campo_ciudad'>
                    <CampoCiudad opciones={ciudades} label={"Ingrese su destino"}/>  
                </div>
            </div>

            {/* INPUTS FECHAS */}
            <div className='contenedor_fechas'>
                <div className='campo_fecha'>
                    <CampoFecha label={'Salida'}/>
                </div>
                <div className='campo_fecha'>
                    <CampoFecha label={'Regreso'}/>
                </div>
            </div>

            <div className='contenedor_persona'>
                <CampoPersona />
            </div>

        </div>
    )
}

export default Buscador;

    