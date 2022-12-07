import {Stack, TextField} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import './CampoFecha.css'


const CampoFecha = ({label, fecha, setFecha, mostarWarning, disabled}) => {

    const handleChange = (newValue) => {
      setFecha(newValue);
    };
  
    return (
      <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label={label}
            inputFormat="DD/MM/YYYY"
            value={fecha}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            disabled={disabled}
            />  
        </Stack>
      </LocalizationProvider>
      {/* TERNARIOS DE LOS WARNING */}
      { 
        mostarWarning.mostar ? 
        <p className='warningFechas'>{mostarWarning.msg}</p>
        : ""  
      }
      </>
    );
}

export default CampoFecha; 



