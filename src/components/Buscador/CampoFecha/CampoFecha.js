import dayjs from 'dayjs';
import { useState } from 'react';
import {Stack, TextField} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import './CampoFecha.css'


const CampoFecha = ({label}) => {
    const [value, setValue] = useState(dayjs());

    const handleChange = (newValue) => {
      setValue(newValue);
    };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label={label}
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    );
}

export default CampoFecha; 



