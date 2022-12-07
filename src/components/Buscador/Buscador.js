/* import CampoCiudad from './CampoCiudad/CampoCiudad'; */
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import ciudades from '../../files/ciudades'

import RadioIdaVuelta from './RadioIdaVuelta/RadioIdaVuelta';
import CampoCiudadPropio from './CampoCiudadPropio/CampoCiudadPropio';
import CampoFecha from './CampoFecha/CampoFecha';
import CampoPersona from './CampoPersona/CampoPersona';
import SelectClase from './SelectClase/SelectClase';

import SearchIcon from '@mui/icons-material/Search';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';

import './Buscador.css'


const Buscador = () => {


    
    /* ESTADOS Y CONSTANTES RELACIONADOS AL RADIO --> IDA Y VUELTA || SOLO IDA */    
    const [valorRadio, setValorRadio] = useState("idaYVuelta")
    
    
    /* ESTADOS Y CONSTANTES RELACIONADOS A LAS CIUDADES */
    //const [mostrarWarningCiudad, setMostrarWarningCiudad] = useState(false)
    const [ciudadOrigen, setCiudadOrigen] = useState("")
    const [ciudadDestino, setCiudadDestino] = useState("")
    const [mostrarWarningCiudadOrigen, setMostrarWarningCiudadOrigen] = useState({mostrar: false, msg: ""})
    const [mostrarWarningCiudadDestino, setMostrarWarningCiudadDestino] = useState({mostrar: false, msg: ""})
    
    /* ESTADOS Y CONSTANTES RELACIONADOS A LAS FECHAS */
    const [fechaSalida, setFechaSalida] = useState(dayjs())
    const [fechaRegreso, setFechaRegreso] = useState(dayjs())
    const [mostrarWarningFechaSalida, setMostrarWarningFechaSalida] = useState({mostrar: false, msg: ""})
    const [mostrarWarningFechaRegreso, setMostrarWarningFechaRegreso] = useState({mostrar: false, msg: ""})
    const fechaActual = dayjs()
    const añoslimites = 2
    const fechaLimite = dayjs().add(añoslimites, 'year')
    
    
    /* ESTADOS Y CONSTANTES RELACIONADOS A LA CANT DE PERSONAS */
    const cantMaximaReserva = 9
    const [cantAdultos, setCantAdultos] = useState(1)
    const [cantMenores, setCantMenores] = useState(0)
    const [cantBebes, setCantBebes] = useState(0)
    const [edadMenores, setEdadMenores] = useState([])
    const [mostrarWarningEdadesMenores, setMostrarWarningEdadesMenores] = useState(false)
    const [mostrarWarningMasBebesQAdultos, setMostrarWarningMasBebesQAdultos] = useState(false)
    const [mostrarWarningMuchasPersonas, setMostrarWarningMuchasPersonas] = useState(false)

    /* ESTADOS Y CONSTANTES RELACIONADOS A LA CLASE */
    const [clase, setClase] = useState('');
    const [mostrarWarningClase, setMostrarWarningClase] = useState(false);

    const buscar = () => {
        if(verificarBusqueda()){
            alert(`
                Los datos de la bussqueda son:

                Salida de: ${ciudadOrigen}
                Destino a: ${ciudadDestino}
                Fecha de salida ${fechaSalida}
                ${valorRadio === 'idaYVuelta' ? `Fecha de regreso ${fechaRegreso}` : ""}
                Cantidad de personas: ${cantAdultos+cantBebes+cantMenores}.
                    ---> Adultos: ${cantAdultos}
                    ---> Menores: ${cantMenores}
                    ---> Bebes: ${cantBebes}
                Clase: ${clase}            
            `)
        }
    }

    const verificarBusqueda = () => {
        const okCiudades = validacionesCiudades()
        const okFechas = validacionesFechas()
        const okPersonas = validacionensPersonas()
        const okClase = validacionesClase()

        return okCiudades && okFechas && okPersonas && okClase  
    }

    const validacionesCiudades = () => {
        
        /* VALIDACIONES CAMPO CIUDAD ORIGEN */
        const valiCiudadOrigen = validacionCiudad(ciudadOrigen)
        if(!valiCiudadOrigen.rta){
            setMostrarWarningCiudadOrigen({mostar: true, msg: valiCiudadOrigen.msg})
        }else{
            setMostrarWarningCiudadOrigen({mostar: false, msg: valiCiudadOrigen.msg})
        }
        
        /* VALIDACIONES CAMPO CIUDAD DESTINO */
        const valiCiudadDestino = validacionCiudad(ciudadDestino)
        if(!valiCiudadDestino.rta){
            setMostrarWarningCiudadDestino({mostar: true, msg: valiCiudadDestino.msg})
        }else if(ciudadDestino === ciudadOrigen){   
            setMostrarWarningCiudadDestino({mostar: true, msg: "El destino debe ser distino al origen"})
            valiCiudadDestino.rta = false
        }else{
            setMostrarWarningCiudadDestino({mostar: false, msg: valiCiudadDestino.msg})
        }

        return valiCiudadOrigen.rta && valiCiudadDestino.rta
    }

    const validacionCiudad = (ciudad) => {
        if(ciudad == ""){
            return {rta: false, msg: "*Este campo es obligatorio"}
        }else if(!ciudades.find(c => c.label.toUpperCase() === ciudad.toUpperCase())){
            return {rta: false, msg: "*Ingrese una ciudad válida"}
        }else{
            return {rta: true, msg: ""}
        }
    }

    const validacionesFechas = () => 
    {
        /* VALIDACIONES CAMPO FECHA SALIDA */
        const fechaSalidaValida = verficarFechaValida(fechaSalida)
        if(!fechaSalidaValida.rta){
            setMostrarWarningFechaSalida({mostar: true, msg: fechaSalidaValida.msg})
        }else{
            setMostrarWarningFechaSalida({mostar: false, msg: fechaSalidaValida.msg})
        }

        /* VALIDACIONES CAMPO FECHA REGRESO */
        if(valorRadio === "idaYVuelta"){
            const fechaRegresoValida = verficarFechaValida(fechaRegreso)
            if(!fechaRegresoValida.rta){
                setMostrarWarningFechaRegreso({mostar: true, msg: fechaRegresoValida.msg})
            }else if(fechaRegreso.isBefore(fechaSalida)){
                setMostrarWarningFechaRegreso({mostar: true, msg: "*Ingrese una fecha posterior a la de salida"})
                fechaRegresoValida.rta = false
            }else{
                setMostrarWarningFechaRegreso({mostar: false, msg: fechaRegresoValida.msg})
            }
            return fechaSalidaValida.rta && fechaRegresoValida.rta
        }

        return fechaSalidaValida.rta


    }

    const verficarFechaValida = (fecha) => {
        if(fecha.$d == "Invalid Date"){
            return {rta: false, msg: "*Fecha inválida"}
        }else if(!fecha.isBefore(fechaLimite)){
            return {rta: false, msg: `*Ingrese una fecha dentro de los ${añoslimites} años`}
        }else if(fecha.isBefore(fechaActual)){
            return {rta: false, msg: "*Ingrese una fecha posterior a la actual"}
        }
        return {rta: true, msg: ""}
        //console.log(dayjs('2018-08-08')) // parse

        //console.log(dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A')) // display

        //console.log(dayjs().set('month', 3).month()) // get & set

        //console.log(fecha.add(1, 'year')) // manipulate

    }

    
    const validacionensPersonas = () => {
        return !mostrarWarningMuchasPersonas && !mostrarWarningMasBebesQAdultos && !mostrarWarningEdadesMenores
    }

    const verificarEdadesMenores = () => {
        const rta = edadMenores.filter(edad => edad === 'Sin seleccionar')
        if (rta.length !== 0) {
            setMostrarWarningEdadesMenores(true)
        } else {
            setMostrarWarningEdadesMenores(false)
        }
    }
    
    const verificarMenosBebesQAdultos = () => {
        if(cantBebes > cantAdultos){
            setMostrarWarningMasBebesQAdultos(true)
        }else{
            setMostrarWarningMasBebesQAdultos(false)
        }
    }
    
    const verificarLimitePersonas = () => {
        if( (cantAdultos + cantMenores + cantBebes) > cantMaximaReserva){
            setMostrarWarningMuchasPersonas(true)
        }else{
            setMostrarWarningMuchasPersonas(false)
        }
    }

    const validacionesClase = () => {
        if( clase === ""){
            setMostrarWarningClase(true)
            return false
        }else{
            setMostrarWarningClase(false)
            return true
        }
    }

    useEffect(() => {
        if(valorRadio === "ida"){
            setMostrarWarningFechaRegreso({mostrar: false, msg: ""})
        }
    },[valorRadio])
    
    useEffect(() => {
        verificarLimitePersonas()
        verificarMenosBebesQAdultos()
    }, [cantAdultos, cantMenores, cantBebes])
    
    useEffect(() => {
        verificarEdadesMenores()
    }, [edadMenores])

    


    
    return (
        <div className="contenedor_buscador">
            

            {/* TITULO Y RADIO */}
            <div className='contenedorTituloYRadio'>
                <h2 className='titulo_buscador my-1'>Vuelos</h2>
                <div className='radioIdaYVuelta mb-2'>
                    <RadioIdaVuelta setRadioIdaVuelta={setValorRadio}/>
                </div>
            </div>


            <div className='contenedor_inputs_buscador'>
                
                {/* INPUTS CIUDADES --->>> CON COMPONENTE MUI */}


                {/* <div className='contenedor_ciudades'>
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
                </div> */}
              

                {/* INPUTS CIUDADES  */}
                <div className='contenedor_input_ciudades'>
                   
                    <CampoCiudadPropio 
                        placeholder={"Ingrese su origen"}
                        setCiudad={setCiudadOrigen}
                        ciudad={ciudadOrigen}
                        ciudades={ciudades}
                        mostarWarning={mostrarWarningCiudadOrigen}
                    />
                    
                    <LocalAirportIcon color="primary" className='icon_avion'/>
                    
                    <CampoCiudadPropio 
                        placeholder={"Ingrese su destino"}
                        setCiudad={setCiudadDestino}
                        ciudad={ciudadDestino}
                        ciudades={ciudades}
                        mostarWarning={mostrarWarningCiudadDestino}
                    />
                </div>

                {/* INPUTS FECHAS */}
                <div className='contenedor_fechas'>
                    <div className='campo_fecha'>
                        <CampoFecha 
                            label={'Salida'} 
                            fecha={fechaSalida} 
                            setFecha={setFechaSalida} 
                            mostarWarning={mostrarWarningFechaSalida}
                        />
                    </div>
                    <div className='campo_fecha'>
                        <CampoFecha 
                            label={'Regreso'} 
                            fecha={fechaRegreso} 
                            setFecha={setFechaRegreso} 
                            mostarWarning={mostrarWarningFechaRegreso}
                            disabled={valorRadio === "ida"}
                            />
                    </div>
                </div>
                 
                <div className='contenedor_PersonasYClase'>
                    {/* PERSONAS */}
                    <div className='contenedor_persona'>
                        <CampoPersona 
                            cantAdultos={cantAdultos}
                            cantMenores={cantMenores}
                            cantBebes={cantBebes}
                            edadMenores={edadMenores}
                            setCantAdultos={setCantAdultos}
                            setCantMenores={setCantMenores}
                            setCantBebes={setCantBebes}
                            setEdadMenores={setEdadMenores} 
                            mostrarWarningEdadesMenores={mostrarWarningEdadesMenores}
                            mostrarWarningMasBebesQAdultos={mostrarWarningMasBebesQAdultos}
                            mostrarWarningMuchasPersonas={mostrarWarningMuchasPersonas}
                            cantMaximaReserva={cantMaximaReserva}
                        />
                    </div>

                    {/* CLASE */}
                    <div className='contenedorSelect'>
                        <SelectClase clase={clase} setClase={setClase} mostrarWarningClase={mostrarWarningClase}/>
                    </div>

                </div> 

                {/* BOTON BUSCAR */}
                <button className='botonBuscar' onClick={() => buscar()}> <SearchIcon className='iconoBuscador' /> Buscar</button>
            </div>


        </div>
    )
}

export default Buscador;

