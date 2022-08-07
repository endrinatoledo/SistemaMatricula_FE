import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

const UseStyles = makeStyles({
  typography: {
    marginLeft: '3%'
  },
  box: {
    marginTop: '2%'
  },
  TextField: {
    marginBottom: '3%',
    marginTop: '2%',
    marginLeft: '3%'
  },
  TextField2: {
    marginBottom: '3%',
    marginTop: '2%',
    marginLeft: '1%'
  }
});

const TabsPayments = () => {
    const classes = UseStyles();
    const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        // textColor="secondary"
        // indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </Box>
  )
}

export default TabsPayments