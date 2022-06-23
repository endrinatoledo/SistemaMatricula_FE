import * as React from 'react';
import MaterialTable from '@material-table/core'; 

const TableRepresentative = ({listRepresentative, setListRepresentative, representativesData}) => {

    const columns = [
        { title: 'Tipo', field: 'repIdType', cellStyle:{paddingLeft:'2%'}},
        { title: 'Identificación', field: 'repIdentificationNumber'},
        { title: 'Primer Nombre', field: 'repFirstName'},
        { title: 'Primer Apellido', field: 'repSurname' },        
        { title: 'Vínculo', field: 'repBond', cellStyle:{paddingLeft:'1%'}},
      ];

      if(representativesData !== null){
        setListRepresentative(representativesData)
      }

  return (
    <>
        <MaterialTable title={'Listado'}
            data={listRepresentative} 
            columns={columns}
            options={{
            search: false,
            paging: false,
            width:300,
            actionsCellStyle:{paddingLeft:50,paddingRight:50},
            headerStyle: {
                backgroundColor: "#007bff",
                color: "#FFF",
                fontWeight:'normal',
                fontSize:18,
            },
                actionsColumnIndex:-1,
                addRowPosition:'first'
            }}
            editable={{
                onRowDelete:  (selectRow)=> new Promise((resolve, reject)=>{
                    const newArray = listRepresentative.filter((item) => item.repId !== selectRow.repId)
                    setListRepresentative(newArray)
                    resolve()
        })
            }}
   />
    </>
  )
}

export default TableRepresentative