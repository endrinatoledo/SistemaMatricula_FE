import * as React from 'react';
import MaterialTable from '@material-table/core'; 

const TableStudent = ({listStudent, setListStudent, studentsData,setStudentsData}) => {

    const columns = [
        { title: 'Tipo', field: 'stuIdType', cellStyle:{paddingLeft:'2%'}},
        { title: 'Identificación', field: 'stuIdentificationNumber'},
        { title: 'Primer Nombre', field: 'stuFirstName'},
        { title: 'Primer Apellido', field: 'stuSurname' },        
      ];

      if(studentsData !== null){
        setListStudent(studentsData)
      }

  return (
    <>
        <MaterialTable title={'Listado'}
            data={listStudent} 
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
                    const newArray = listStudent.filter((item) => item.stuId !== selectRow.stuId)
                    setListStudent(newArray)
                    setStudentsData(newArray)
                    resolve()
        })
            }}
   />
    </>
  )
}

export default TableStudent