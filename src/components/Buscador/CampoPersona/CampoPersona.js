import './CampoPersona.css'
import {useEffect, useState} from 'react'
import ItemPersona from './ItemPersona/ItemPersona'
/* import Select from '../Select/Select'
import Alert from '@mui/material/Alert'; */

const CampoPersona = () => {


    const cantMaximaReserva = 9

    const [mostrarModal, setMostrarModal] = useState(false)
    const [cantAdultos, setCantAdultos] = useState(1)
    const [cantMenores, setCantMenores] = useState(0)
    const [cantBebes, setCantBebes] = useState(0)
    const [edadMenores, setEdadMenores] = useState([])
    const [mostrarWarningEdadesMenores, setMostrarWarningEdadesMenores] = useState(false)


    useEffect(() => {
        if(cantMenores > edadMenores.length){
            setEdadMenores([...edadMenores, "Sin seleccionar"])         
        }else{
            setEdadMenores(edadMenores.slice(0, edadMenores.length-1))
        }
    }, [cantMenores])

    
    useEffect(() => {
        verificarEdadesMenores()
    }, [edadMenores])

    
    const handleChangeEdadMenor = (value, index) => {
        setEdadMenores([...edadMenores.slice(0,index), value, ...edadMenores.slice(index+1)])
    }   
    
    const verificarEdadesMenores = () => {
        const rta = edadMenores.filter(edad => edad === 'Sin seleccionar')
        if(rta.length !== 0){
            setMostrarWarningEdadesMenores(true)
        }else{
            setMostrarWarningEdadesMenores(false)
        }
    }

    return(
        <>
            <div className='boton_personas' onClick={() =>setMostrarModal(!mostrarModal) }>
                <p className='label_boton'>Personas</p>
                <p 
                    className='value_boton' 
                    style={{"color": (cantAdultos+cantMenores+cantBebes)>cantMaximaReserva || cantBebes>cantAdultos || mostrarWarningEdadesMenores ? "red" : "black"}}
                >
                    {cantAdultos+cantMenores+cantBebes} {(cantAdultos+cantMenores+cantBebes>1) ? "personas" : "persona"} 
                </p>
            </div>
            {
                mostrarModal ? 
                <div className='modal_personas'>

                    {/* ADULTOS */}
                    
                    <ItemPersona 
                        titulo={"Adultos"}
                        desc={"Desde los 18 años"}
                        preguntaDisabledDescontar={cantAdultos===1}
                        preguntaDisabledAumentar={cantAdultos>=cantMaximaReserva}
                        funcionButton={setCantAdultos}
                        contador={cantAdultos}
                    />

                    {/* MENORES */}
                   
                     <ItemPersona 
                        titulo={"Menores"}
                        desc={"De 2 a 17 años"}
                        preguntaDisabledDescontar={cantMenores===0}
                        preguntaDisabledAumentar={cantMenores>=cantMaximaReserva-1}
                        funcionButton={setCantMenores}
                        contador={cantMenores}
                    />

                    {
                        edadMenores.map((edad, index) => {
                            return (
                                <select 
                                    className='selectPersona d-flex' 
                                    defaultValue={edad} 
                                    key={index} 
                                    onChange={(SyntheticEvent)=>handleChangeEdadMenor(SyntheticEvent.target.value, index)}
                                >
                                    <option className='optionSelect' value={"Sin seleccionar"}>Seleccione la edad del {index+1}° menor</option>
                                    <option className='optionSelect' value={"Ninio"}>Entre 2 y 11 años</option>
                                    <option className='optionSelect' value={"Adolescente"}>Entre 11 y 17 años</option>
                                </select>
                                
                            )
                        })
                    }

                    {/* BEBES */}
                    
                    <ItemPersona 
                        titulo={"Bebes"}
                        desc={"Menor de 2 años"}
                        preguntaDisabledDescontar={cantBebes===0}
                        preguntaDisabledAumentar={cantBebes>=cantMaximaReserva-1}
                        funcionButton={setCantBebes}
                        contador={cantBebes}
                    
                    />
                    
                    <hr />
                    {
                        (cantAdultos+cantMenores+cantBebes)>cantMaximaReserva ? 
                        //<Alert className='warningPersona' severity="error">El máximo de reservas es de {cantMaximaReserva} personas</Alert> 
                        <p className='warningPersona'>*El máximo de reservas es de {cantMaximaReserva} personas</p>
                        : ""    
                    }
                    {
                        cantBebes>cantAdultos ? 
                        //<Alert className='warningPersona' severity="error">No pueden haber mas bebes que adultos</Alert>
                        <p className='warningPersona'>*No pueden haber mas bebes que adultos</p>
                        : ""    
                    }
                    {
                        mostrarWarningEdadesMenores ? 
                        //<Alert className='warningPersona' severity="error">Seleccione la edad de todos los menores</Alert>
                        <p className='warningPersona'>*Seleccione la edad de todos los menores</p>
                        : ""
                    }
                    <div className='d-flex justify-content-center'>
                        <button 
                            disabled={(cantAdultos+cantMenores+cantBebes)>cantMaximaReserva || cantBebes>cantAdultos || mostrarWarningEdadesMenores} 
                            className='btn btn-info botonListo'  
                            onClick={() =>setMostrarModal(!mostrarModal) }
                        >Listo</button>
                    </div>
                </div>

                : ""

            }
        </>
    )
}


export default CampoPersona; 

/* 

limitar entre 0 y 9 cada boton
y limitar tambien la suma total a 9 // warning

con menores mostrar x cant  de selects para seleccion de edad del menor
// warning de campo obligatorio al no especificar

con bebes mostar warning si hay mas bebes que adultos

bloquear boton si hay warnings

*/




                                {/* <Select
                                    key={index}
                                    defaultValue={edad}
                                    handleChange={handleChangeEdadMenor}
                                    values={[
                                        {
                                            value:"Sin seleccionar",
                                            desc: "Sin seleccionar"
                                        },
                                        {
                                            value:"Ninio",
                                            desc: "Entre 2 y 11 años"
                                        },
                                        {
                                            value:"Adolescente",
                                            desc: "Entre 11 y 17 años"
                                        }
                                        ]}
                                /> */}