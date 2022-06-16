import * as React from 'react';
import MaterialTable from '@material-table/core'; 

const TableRepresentative = ({listRepresentative, setListRepresentative}) => {

    const columns = [
        { title: 'Tipo', field: 'repIdType',filtering:true, cellStyle:{paddingLeft:'2%'}},
        { title: 'Identificación', field: 'repIdentificationNumber'},
        { title: 'Primer Nombre', field: 'repFirstName'},
        { title: 'Primer Apellido', field: 'repSurname' },        
        { title: 'Vínculo', field: 'repBond', cellStyle:{paddingLeft:'1%'}},
      ];

  return (
    <>
        <MaterialTable title={'Listado'}
            data={listRepresentative} 
            columns={columns}
            // actions={[ ]}
            options={{
            search: false,
            // paging: false,
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
   />
    </>
  )
}

export default TableRepresentative