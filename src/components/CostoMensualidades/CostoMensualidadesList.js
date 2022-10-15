import * as React from 'react';
import MaterialTable from '@material-table/core';
import ModalAlertMessage from '../AlertMessages/ModalAlertMessage';
import FilterList from '@material-ui/icons/FilterList';
const { standardMessages } = require('../commonComponents/MessagesAndLabels')
const AxiosInstance = require("../utils/request").default;

const CostoMensualidadesList = () => {

    const [Reload, SetReload] = React.useState(0);
    const [dataSource, setDataSource] = React.useState([])
    const [filtering, setFiltering] = React.useState(false)
    const [alertModal, setAlertModal] = React.useState(false)
    const [message, setMessage] = React.useState()
    const [alertType, setAlertType] = React.useState('');

    const columns = [
        { title: 'Fecha', field: 'cmeDate', type: 'date', headerStyle: { paddingLeft: '15%' }, cellStyle: { paddingLeft: '14%' }, validate: rowData => (rowData.cmeDate === undefined || rowData.cmeDate === '') ? "Requerido" : true },
        { title: 'Monto en Dolares', type: 'currency', field: 'cmeAmount', width: 400, cellStyle: { paddingRight: 0 }, validate: rowData => (rowData.cmeAmount === undefined || rowData.cmeAmount === '') ? "Requerido" : true },
    ];

    const fillTable = async () => {

        try {
            const resultListadoCostoM = (await AxiosInstance.get("/costoMensualidades/")).data

            console.log('*******************************', resultListadoCostoM)
            if (resultListadoCostoM.ok === true) {
                setDataSource(resultListadoCostoM.data)
            }
        } catch {
            setMessage('Error de Conexion')
            setAlertModal(true)

        }
    }

    React.useEffect(() => {
        fillTable()

    }, [Reload]);

    return (
        <>
            <MaterialTable title={'Costo de mensualidades'}
                data={dataSource}
                columns={columns}
                actions={[
                    {
                        icon: () => <FilterList />,
                        tooltip: "Activar Filtros",
                        onClick: () => setFiltering(!filtering),
                        isFreeAction: true
                    }
                ]}
                options={{
                    width: 300,
                    actionsCellStyle: { paddingLeft: 50, paddingRight: 50 },
                    headerStyle: {
                        backgroundColor: "#007bff",
                        color: "#FFF",
                        fontWeight: 'normal',
                        fontSize: 18,
                    },
                    filtering: filtering,
                    actionsColumnIndex: -1,
                    addRowPosition: 'first'
                }}
                editable={{
                    onRowAdd: (newRow) => new Promise((resolve, reject) => {

                        console.log('**----***----****--*****---*****---**', newRow)
                        AxiosInstance.post(`/costoMensualidades/`, newRow)
                            .then(resp => {
                                setTimeout(() => {
                                    if (resp.data.ok === true) {
                                        setAlertType("success")
                                    } else {
                                        setAlertType("error")
                                    }
                                    setMessage(resp.data.message)
                                    setAlertModal(true)
                                    fillTable()
                                    resolve()
                                }, 2000);

                            })
                            .catch((err) => {
                                setTimeout(() => {
                                    setMessage(standardMessages.connectionError)
                                    setAlertType("error")
                                    setAlertModal(true)
                                    fillTable()
                                    reject()
                                }, 2000);
                            });
                    }),
                     onRowDelete:  (selectRow)=> new Promise((resolve, reject)=>{
                      AxiosInstance.delete(`/costoMensualidades/${selectRow.cmeId}`)
                      .then(resp=>{
                        setTimeout(() => {
                          if(resp.data.ok === true){
                            setAlertType("success")
                          }else{
                            setAlertType("error")
                          }
                          setMessage(resp.data.message)
                          setAlertModal(true)
                          fillTable()
                          resolve()
                        }, 2000);

                      }).catch((err) => {
                        setTimeout(() => {
                          setMessage(standardMessages.connectionError)
                          setAlertType("error")
                          setAlertModal(true)
                          fillTable()
                          reject()
                        }, 2000);
                      });

                    }),

                }}
            />
            {(alertModal) ?
                <ModalAlertMessage alertModal={alertModal} setAlertModal={setAlertModal} message={message} alertType={alertType} />
                : null}


        </>


    )
}


export default CostoMensualidadesList