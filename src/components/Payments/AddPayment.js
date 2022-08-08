import * as React from 'react';
import Box from '@mui/material/Box';
import SearchRepresentative from './SearchRepresentative'
import PaymentMethodTable from './PaymentMethodTable'
import TabsPayments from './TabsPayments'

const AddPayment = () => {

    const [representativeData, setRepresentativeData] = React.useState([])
    const [identification, setIdentification] = React.useState({ repIdType: null, repIdentificationNumber: '' })
    const [representativeFound, setRepresentativeFound] = React.useState(false)

    return (
        <>
            <Box>
                <SearchRepresentative representativeFound={representativeFound}
                    setRepresentativeFound={setRepresentativeFound} identification={identification}
                    setIdentification={setIdentification} representativeData={representativeData}
                    setRepresentativeData={setRepresentativeData} />

                {(representativeFound) ?
                    <>
                        <PaymentMethodTable />
                        <TabsPayments representativeData={representativeData}/>
                    </>
                    : null}
            </Box>
        </>
    )
}

export default AddPayment