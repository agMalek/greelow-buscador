import './CampoCiudad.css'
import {Autocomplete, TextField} from '@mui/material'

const CampoCiudad = ({opciones, label}) => {
    
    return (
        <div className="">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={opciones}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label={`${label}`} />}
            />
        </div>
    )
}

export default CampoCiudad;