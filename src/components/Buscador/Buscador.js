import CampoCiudad from './CampoCiudad/CampoCiudad';
import CampoFecha from './CampoFecha/CampoFecha';
import ciudades from '../../files/ciudades'
import './Buscador.css'
import CampoPersona from './CampoPersona/CampoPersona';
import SelectClase from './SelectClase/SelectClase';
import SearchIcon from '@mui/icons-material/Search';
import RadioIdaVuelta from './RadioIdaVuelta/RadioIdaVuelta';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';


const Buscador = () => {
    return (
        <div className="contenedor_buscador">
            <div className='d-flex'>
                <h2 className='titulo_buscador my-1'>Vuelos</h2>
                <div className='mb-2'>
                    <RadioIdaVuelta/>
                </div>
            </div>
            <div className='contenedor_inputs_buscador'>
                {/* INPUTS CIUDADES  */}
                <div className='contenedor_ciudades'>
                    <div className='campo_ciudad origen'>
                        <CampoCiudad opciones={ciudades} label={"Ingrese su origen"} />
                    </div>
                    
                    <LocalAirportIcon color="primary" className='icon_avion'/>
                    
                    <div className='campo_ciudad destino'>
                        <CampoCiudad opciones={ciudades} label={"Ingrese su destino"} />
                    </div>
                </div>

                {/* INPUTS FECHAS */}
                <div className='contenedor_fechas'>
                    <div className='campo_fecha'>
                        <CampoFecha label={'Salida'} />
                    </div>
                    <div className='campo_fecha'>
                        <CampoFecha label={'Regreso'} />
                    </div>
                </div>

                {/* PERSONAS */}
                <div className='contenedor_persona'>
                    <CampoPersona />
                </div>

                {/* CLASE */}
                <div className='contenedorSelect'>
                    <SelectClase />
                </div>

                {/* BOTON BUSCAR */}
                {/* <Button className='botonBuscar'  startIcon={<SearchIcon />}>Buscar</Button> */}
                <button className='botonBuscar'> <SearchIcon /> Buscar</button>
            </div>


        </div>
    )
}

export default Buscador;

