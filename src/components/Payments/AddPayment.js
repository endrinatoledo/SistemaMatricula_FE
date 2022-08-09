import * as React from 'react';
import Box from '@mui/material/Box';
import SearchRepresentative from './SearchRepresentative'
import PaymentMethodTable from './PaymentMethodTable'
import TabsPayments from './TabsPayments'
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
const { standardMessages } = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;

const AddPayment = () => {

    const [representativeData, setRepresentativeData] = React.useState([])
    const [identification, setIdentification] = React.useState({ repIdType: null, repIdentificationNumber: '' })
    const [representativeFound, setRepresentativeFound] = React.useState(false)
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');
    const [families, setFamilies] = React.useState([])


    const getFamilyByRepId = async () => {

        try {
            const resultFamiles = (await AxiosInstance.get(`/representativeStudent/family/representativeId/${representativeData.repId}`)).data

            if (resultFamiles.ok === true) {
                setFamilies(resultFamiles.data)
            } else {
                setMessage(resultFamiles.message)
                setAlertType("error")
                setAlertModal(true)
            }
        } catch {
            console.log('error al consultar periodo activo')

        }
    }


    React.useEffect(() => {
        if (representativeData.repId !== undefined) {
            getFamilyByRepId()
        }
    }, [representativeData])

    return (
        <>
            <Box>
                <SearchRepresentative representativeFound={representativeFound}
                    setRepresentativeFound={setRepresentativeFound} identification={identification}
                    setIdentification={setIdentification} representativeData={representativeData}
                    setRepresentativeData={setRepresentativeData} />

                {(representativeFound) ?
                    <>
                        {/* <PaymentMethodTable />
                        <TabsPayments representativeData={representativeData}/> */}
                    </>
                    : null}
            </Box>
            {(alertModal) ?
                <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
                : null}
            {(families.length > 0) ?
                <> </>
                : null}
        </>
    )
}

export default AddPayment