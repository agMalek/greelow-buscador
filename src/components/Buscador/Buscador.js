import CampoCiudad from './CampoCiudad/CampoCiudad';
import CampoFecha from './CampoFecha/CampoFecha';
import ciudades from '../../files/ciudades'
import './Buscador.css'
import CampoPersona from './CampoPersona/CampoPersona';
import SelectClase from './SelectClase/SelectClase';
import SearchIcon from '@mui/icons-material/Search';
import RadioIdaVuelta from './RadioIdaVuelta/RadioIdaVuelta';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';


const Buscador = () => {

    const fechaActual = dayjs()
    const fechaLimite = dayjs().add(2, 'year')

    
    /* ESTADOS RELACIONADOS A LAS CIUDADES */
    const [mostrarWarningCiudad, setMostrarWarningCiudad] = useState(false)
    const [ciudadOrigen, setCiudadOrigen] = useState("")
    const [ciudadDestino, setCiudadDestino] = useState("")

    /* ESTADOS RELACIONADOS A LAS FECHAS */
    const [fechaSalida, setFechaSalida] = useState(dayjs())
    const [fechaRegreso, setFechaRegreso] = useState(dayjs())
    const [mostrarWarningFechaSalida, setMostrarWarningFechaSalida] = useState({mostrar: false, msg: ""})
    const [mostrarWarningFechaRegreso, setMostrarWarningFechaRegreso] = useState({mostrar: false, msg: ""})




    const verificarBusqueda = () => {
        const fechaSalidaValida = verficarFechaValida(fechaSalida)
        if(!fechaSalidaValida.rta){
            setMostrarWarningFechaSalida({mostar: true, msg: fechaSalidaValida.msg})
        }else{
            setMostrarWarningFechaSalida({mostar: false, msg: fechaSalidaValida.msg})
        }

        const fechaRegresoValida = verficarFechaValida(fechaRegreso)
        if(!fechaRegresoValida.rta){
            setMostrarWarningFechaRegreso({mostar: true, msg: fechaRegresoValida.msg})
        }else if(fechaRegreso.isBefore(fechaSalida)){
            setMostrarWarningFechaRegreso({mostar: true, msg: "*Ingrese una fecha posterior a la de salida"})
        }else{
            setMostrarWarningFechaRegreso({mostar: false, msg: fechaRegresoValida.msg})
        }
    }

    const verficarFechaValida = (fecha) => {
        if(fecha.$d == "Invalid Date"){
            return {rta: false, msg: "*Fecha inválida"}
        }else if(!fecha.isBefore(fechaLimite)){
            return {rta: false, msg: "*Ingrese una fecha dentro de los 2 años"}
        }else if(fecha.isBefore(fechaActual)){
            return {rta: false, msg: "*Ingrese una fecha del futuro"}
        }
        return {rta: true, msg: ""}
        //console.log(dayjs('2018-08-08')) // parse

        //console.log(dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A')) // display

        //console.log(dayjs().set('month', 3).month()) // get & set

        //console.log(fecha.add(1, 'year')) // manipulate

    }

    const buscar = () => {
        if(verificarBusqueda()){
            alert(`
                Los datos de la bussqueda son:
                Fecha de salida ${fechaSalida}
                Fecha de regreso ${fechaRegreso}
            `)
        }
    }




    return (
        <div className="contenedor_buscador">
            

            {/* TITULO Y RADIO */}
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
                        <CampoCiudad 
                            opciones={ciudades} 
                            label={"Ingrese su origen"} 
                            ciudad={ciudadOrigen}
                            setCiudad={setCiudadOrigen} 
                            mostrarWarning={mostrarWarningCiudad}
                        />
                    </div>
                     
                    <LocalAirportIcon color="primary" className='icon_avion'/>
                    
                    <div className='campo_ciudad destino'>
                        <CampoCiudad 
                            opciones={ciudades}
                            label={"Ingrese su destino"}
                            setCiudad={setCiudadDestino}
                            mostrarWarning={mostrarWarningCiudad}
                        />
                    </div>
                </div>

                {/* INPUTS FECHAS */}
                <div className='contenedor_fechas'>
                    <div className='campo_fecha'>
                        <CampoFecha label={'Salida'} fecha={fechaSalida} setFecha={setFechaSalida} mostarWarning={mostrarWarningFechaSalida}/>
                    </div>
                    <div className='campo_fecha'>
                        <CampoFecha label={'Regreso'} fecha={fechaRegreso} setFecha={setFechaRegreso} mostarWarning={mostrarWarningFechaRegreso}/>
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
                <button className='botonBuscar' onClick={() => buscar()}> <SearchIcon /> Buscar</button>
            </div>


        </div>
    )
}

export default Buscador;

