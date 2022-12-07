import {Radio, RadioGroup, FormControlLabel, FormControl} from '@mui/material';


const RadioIdaVuelta = ({setRadioIdaVuelta}) => {

  const handleChange = (value) => {
    setRadioIdaVuelta(value)
  }

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="idaYVuelta"
        name="radio-buttons-group"
        row={true}
        onChange={(e) => handleChange(e.target.value)}
      >
        <FormControlLabel className='mx-3' value="idaYVuelta" control={<Radio />} label="Ida y vuelta" />
        <FormControlLabel className='mx-3' value="ida" control={<Radio />} label="Sólo ida" />
        <FormControlLabel className='mx-3' value="Multidestino" control={<Radio />} label="Multidestino" />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioIdaVuelta;