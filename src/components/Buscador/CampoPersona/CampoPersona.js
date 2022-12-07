import { useEffect, useState } from 'react'
import ItemPersona from './ItemPersona/ItemPersona'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
/* import Alert from '@mui/material/Alert'; */
import './CampoPersona.css'

const CampoPersona = ({
    cantAdultos,
    cantMenores,
    cantBebes,
    edadMenores,
    setCantAdultos,
    setCantMenores,
    setCantBebes,
    setEdadMenores,
    mostrarWarningEdadesMenores,
    mostrarWarningMasBebesQAdultos,
    mostrarWarningMuchasPersonas,
    cantMaximaReserva
}) => {



    const [mostrarModal, setMostrarModal] = useState(false)



    useEffect(() => {
        if (cantMenores > edadMenores.length) {
            setEdadMenores([...edadMenores, "Sin seleccionar"])
        } else {
            setEdadMenores(edadMenores.slice(0, edadMenores.length - 1))
        }
    }, [cantMenores])




    const handleChangeEdadMenor = (value, index) => {
        setEdadMenores([...edadMenores.slice(0, index), value, ...edadMenores.slice(index + 1)])
    }




    return (
        <>
            <div className='contenedorBotonPersona'>
                <div className='boton_personas' onClick={() => setMostrarModal(!mostrarModal)}>
                    <div>
                        <p className='label_boton'>Personas</p>
                        <p
                            className='value_boton'
                            style={{ "color": mostrarWarningMuchasPersonas || mostrarWarningMasBebesQAdultos || mostrarWarningEdadesMenores ? "red" : "black" }}
                        >
                            {cantAdultos + cantMenores + cantBebes} {(cantAdultos + cantMenores + cantBebes > 1) ? "personas" : "persona"}
                        </p>
                    </div>
                    <div className='my-1 mx-3'>
                        <EmojiPeopleIcon color="primary" fontSize="large" />
                    </div>
                </div>
            </div>
            {
                !mostrarModal && (mostrarWarningEdadesMenores || mostrarWarningMasBebesQAdultos || mostrarWarningMuchasPersonas) ?
                    <p className='warningPersonaPrincipal'>*Revise su selección</p>
                    : ""

            }
            {
                mostrarModal ?
                    <div className='modal_personas'>

                        {/* ADULTOS */}

                        <ItemPersona
                            titulo={"Adultos"}
                            desc={"Desde los 18 años"}
                            preguntaDisabledDescontar={cantAdultos === 1}
                            preguntaDisabledAumentar={cantAdultos >= cantMaximaReserva}
                            funcionButton={setCantAdultos}
                            contador={cantAdultos}
                        />

                        {/* MENORES */}

                        <ItemPersona
                            titulo={"Menores"}
                            desc={"De 2 a 17 años"}
                            preguntaDisabledDescontar={cantMenores === 0}
                            preguntaDisabledAumentar={cantMenores >= cantMaximaReserva - 1}
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
                                        onChange={(SyntheticEvent) => handleChangeEdadMenor(SyntheticEvent.target.value, index)}
                                    >
                                        <option className='optionSelect' value={"Sin seleccionar"}>Seleccione la edad del {index + 1}° menor</option>
                                        <option className='optionSelect' value={"Ninio"}>Entre 2 y 11 años</option>
                                        <option className='optionSelect' value={"Adolescente"}>Entre 12 y 17 años</option>
                                    </select>

                                )
                            })
                        }

                        {/* BEBES */}

                        <ItemPersona
                            titulo={"Bebes"}
                            desc={"Menor de 2 años"}
                            preguntaDisabledDescontar={cantBebes === 0}
                            preguntaDisabledAumentar={cantBebes >= cantMaximaReserva - 1}
                            funcionButton={setCantBebes}
                            contador={cantBebes}

                        />

                        <hr />

                        {/* TERNARIOS DE LOS WARNING */}

                        {
                            mostrarWarningMuchasPersonas ?
                                //<Alert className='warningPersona' severity="error">El máximo de reservas es de {cantMaximaReserva} personas</Alert> 
                                <p className='warningPersona'>*El máximo de reservas es de {cantMaximaReserva} personas</p>
                                : ""
                        }
                        {
                            mostrarWarningMasBebesQAdultos ?
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
                                disabled={mostrarWarningMuchasPersonas || mostrarWarningMasBebesQAdultos || mostrarWarningEdadesMenores}
                                className='botonListoModalPersona'
                                onClick={() => setMostrarModal(!mostrarModal)}
                            >Listo</button>
                        </div>
                    </div>

                    : ""

            }
        </>
    )
}


export default CampoPersona;


