import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {NavLink} from 'react-router-dom'
import LoadingButtons from '../commonComponents/LoadingButton';
import { useParams } from 'react-router-dom';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
const AxiosInstance = require("../utils/request").default;


const EditPeriod = () => {
    let { perid } = useParams();
    const [period, setPeriod] = React.useState(perid)
    const [message  , setMessage] = React.useState('')
    const [alertType, setAlertType] = React.useState('');
    const [alertModal, setAlertModal] = React.useState(false)
    
    const getPeriodById = async () => {

        try {
        //   const resultFamilies = (await AxiosInstance.get(`/representativeStudent/byFam/${famid}`)).data
    
        //   if (resultFamilies.ok === true) {
        //     setFamilyData(resultFamilies.data.family)
        //     setRepresentativesData(resultFamilies.data.representatives)
        //     setStudentsData(resultFamilies.data.students)
        //     setRepStuData(resultFamilies.data.representativeStudent)
        //     setToShow(toShow + 1)
        //   }
        } catch {
          console.log('error al consutlar')
    
        }
      }

      React.useEffect(() => {
        getPeriodById()
      }, [period]);

  return (
    <div>
      editar periodo
    </div>
  )
}

export default EditPeriod
