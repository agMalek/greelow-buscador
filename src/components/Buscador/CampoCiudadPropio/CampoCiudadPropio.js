import { useEffect, useState } from 'react'
import './CampoCiudadPropio.css'

const CampoCiudadPropio = ({placeholder, setCiudad, ciudad, ciudades, mostarWarning}) => {
    
    const [openlist, setOpenList] = useState(false)

    useEffect(() => {
        if(ciudades.find(city => city.label.toUpperCase() === ciudad.toUpperCase())){
            setOpenList(false)
        }else if(ciudad.length > 0){
            setOpenList(true)
        }else{
            setOpenList(false)
        }
    },[ciudad])
    
    return (
        <div>
            <input type={'text'} className='input_ciudad' placeholder={placeholder} onChange={(e) => setCiudad(e.target.value)} value={ciudad} />
            <ul className={`list-ciudad ${!openlist ? "dis-none" : ""}`}>
                {
                    openlist ? 
                    ciudades.filter(city => city.label.toUpperCase().includes(ciudad.toUpperCase())).map((city) => {
                        return(
                            <li key={city.id} className='item_list_ciudad' id={city.label} onClick={(SyntheticEvent) => setCiudad(SyntheticEvent.target.id)} >{city.label}</li>
                        )
                    })
                    : ""
                }
            </ul>
            {/* TERNARIOS DE LOS WARNING */}
            {
                mostarWarning ? <p className='warning_ciudad'>{mostarWarning.msg}</p> : ""
            }
        </div>
    )
}

export default CampoCiudadPropio;