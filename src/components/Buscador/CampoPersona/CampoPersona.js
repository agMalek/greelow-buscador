import './CampoPersona.css'
import {useEffect, useState} from 'react'


const CampoPersona = () => {


    const cantMaximaReserva = 9

    const [mostrarModal, setMostrarModal] = useState(false)
    const [mostrarWarningEdadesMenores, setMostrarWarningEdadesMenores] = useState(false)
    const [cantAdultos, setCantAdultos] = useState(1)
    const [cantMenores, setCantMenores] = useState(0)
    const [cantBebes, setCantBebes] = useState(0)
    const [edadMenores, setEdadMenores] = useState([])


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
                <p className='value_boton'>{cantAdultos+cantMenores+cantBebes} {(cantAdultos+cantMenores+cantBebes>1) ? "personas" : "persona"} </p>
            </div>
            {
                mostrarModal ? 
                <div className='modal_personas'>
                    <div className='item_modal_personas'>
                        <div className='contenedor_label_item'>
                            <p className='label_item'>Adultos</p>
                            <p className='info_label_item'>Desde 18 años</p>
                        </div>
                        <div className='contenedor_cant_pers'>
                            <button disabled={cantAdultos===1} className='btn btn-primary' onClick={() => setCantAdultos(cantAdultos-1)}>-</button>
                            <p>{cantAdultos}</p>
                            <button disabled={cantAdultos>=cantMaximaReserva} className='btn btn-primary' onClick={() => setCantAdultos(cantAdultos+1)}>+</button>
                        </div>
                    </div>
                    <div className='item_modal_personas'>
                        <div className='contenedor_label_item'>
                            <p className='label_item'>Menores</p>
                            <p className='info_label_item'>Desde 2 a 17 años</p>
                        </div>
                        <div className='contenedor_cant_pers'>
                            <button disabled={cantMenores===0} className='btn btn-primary' onClick={() => setCantMenores(cantMenores-1)}>-</button>
                            <p>{cantMenores}</p>
                            <button disabled={cantMenores>=cantMaximaReserva-1} className='btn btn-primary' onClick={() => setCantMenores(cantMenores+1)}>+</button>
                        </div>
                    </div>
                    {
                        edadMenores.map((edad, index) => {
                            return (
                                <select defaultValue={edad} key={index} onChange={(SyntheticEvent)=>handleChangeEdadMenor(SyntheticEvent.target.value, index)}>
                                    <option value={"Sin seleccionar"}>Seleccione la edad del {index+1}° menor</option>
                                    <option value={"Ninio"}>Entre 2 y 11 años</option>
                                    <option value={"Adolescente"}>Entre 11 y 17 años</option>
                                </select>
                            )
                        })
                    }
                    <div className='item_modal_personas'>
                        <div className='contenedor_label_item'>
                            <p className='label_item'>Bebes</p>
                            <p className='info_label_item'>Menos de 2 años</p>
                        </div>
                        <div className='contenedor_cant_pers'>
                            <button disabled={cantBebes===0} className='btn btn-primary' onClick={() => setCantBebes(cantBebes-1)}>-</button>
                            <p>{cantBebes}</p>
                            <button disabled={cantBebes>=cantMaximaReserva-1} className='btn btn-primary' onClick={() => setCantBebes(cantBebes+1)}>+</button>
                        </div>
                    </div>
                    
                    <hr />
                    {
                        (cantAdultos+cantMenores+cantBebes)>cantMaximaReserva ? 
                        <p>El máximo de reservas es de {cantMaximaReserva} personas</p>
                        : ""    
                    }
                    {
                        cantBebes>cantAdultos ? 
                        <p>No pueden haber mas bebes que adultos</p>
                        : ""    
                    }
                    {
                        mostrarWarningEdadesMenores ? 
                        <p>Debe especificar las edades de todos los menores</p>
                        : ""
                    }
                    
                    <button className='btn btn-info'  onClick={() =>setMostrarModal(!mostrarModal) }>Listo</button>
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