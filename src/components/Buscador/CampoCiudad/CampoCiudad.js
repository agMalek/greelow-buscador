import './CampoCiudad.css'
import {Autocomplete, TextField} from '@mui/material'

const CampoCiudad = ({opciones = [], ciudad, label, setCiudad, mostrarWarning}) => {
    
    /* const handleListChange = (value = "") => {
        const aux = value.split('-')
        console.log(opciones.filter(opt => opt.label.includes(ciudad))) 
        console.log(value)  
        setCiudad(value)
    }
    
    const handleInputChange = (value) => {
        console.log(value)  
        setCiudad(value)
    } 
 */

   /*  const handleChange = (value) => {
        setCiudad(value);
    };

    const eleccionCiudad = (value) => {
        console.log("hola", value)
    } */

    return (
        <div className="">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={opciones}  
                sx={{ width: 200}}
                //onClick={(SyntheticEvent) => eleccionCiudad(SyntheticEvent.target)}
                //getOptionLabel={(option) => eleccionCiudad(option.label)}
                //onChange={(SyntheticEvent) => handleListChange(SyntheticEvent.target.label)}
                renderInput={(params) => <TextField {...params}  /* onChange={(SyntheticEvent) => handleChange(SyntheticEvent.target)}  *//* onChange={(SyntheticEvent) => handleInputChange(SyntheticEvent.target.value)} */ label={`${label}`} />}
            />
            {
                mostrarWarning ? 
                <p className='warningCiudad'>*Este campo es obligatorio</p>
                : ""
            }
        </div>
    )
}

export default CampoCiudad;