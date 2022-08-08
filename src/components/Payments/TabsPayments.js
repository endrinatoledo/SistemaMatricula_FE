import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
const AxiosInstance = require("../utils/request").default;

const UseStyles = makeStyles({
  typography: {
    marginLeft: '3%'
  },
  box: {
    marginTop: '3%'
  },
  TextField: {
    marginBottom: '3%',
    marginTop: '2%',
    marginLeft: '3%'
  },
});

const TabsPayments = ({representativeData}) => {
    const classes = UseStyles();
    const [value, setValue] = React.useState('one');

    console.log('---------------------representativeDatarepresentativeData',representativeData)

    const paymentConceptsRepresentative = async () => {
 
      try {
        const response = (await AxiosInstance.get(`/representatives/representative/payments/${representativeData.repId}`)).data
          console.log('response',response)
        if (response.ok === true) {
          // setExchangeRate(response.data)
        }
      } catch {
        //       setMessage('Error de Conexion al consultar roles')
        //       setAlertModal(true)
  
      }
    }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    paymentConceptsRepresentative()
  }, [0]);

  return (
    <Box sx={{ width: '100%' }} className={classes.box}>
      <Tabs
        value={value}
        onChange={handleChange}
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