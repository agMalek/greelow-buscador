import {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectClase = () => {
  const [clase, setClase] = useState('');

  const handleChange = (value) => {
    setClase(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Clase</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue='Cualquiera'
          value={clase}
          label="Clase"
          onChange={(SyntheticEvent)=>handleChange(SyntheticEvent.target.value)}
        >
          <MenuItem value={"Cualquiera"}>Cualquiera</MenuItem>
          <MenuItem value={"Econónica"}>Econónica</MenuItem>
          <MenuItem value={"Premiun"}>Premiun</MenuItem>
          <MenuItem value={"Business"}>Business</MenuItem>
          <MenuItem value={"Primera"}>Primera</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectClase;