import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


export default function NativeSelectDemo() {
  return (

    <>
        <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Secretaria
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>SEAD</option>
          <option value={20}>SEDUC</option>
        </NativeSelect>
      </FormControl>
    </Box>
    </>

  );
}
