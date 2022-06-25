import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import JoinRightRoundedIcon from '@mui/icons-material/JoinRightRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
const AxiosInstance = require("../utils/request").default;

const TableStudent = ({mode,renderStatus, setRenderStatus,listStudent, setListStudent, studentsData,setStudentsData}) => {

    const columns = [
        { title: 'Tipo', field: 'stuIdType', cellStyle:{paddingLeft:'2%'}},
        { title: 'Identificación', field: 'stuIdentificationNumber'},
        { title: 'Primer Nombre', field: 'stuFirstName'},
        { title: 'Primer Apellido', field: 'stuSurname' },   
        { title: 'Estatus',width: 70, field: 'statusRepSt',lookup: {1: 'Activo', 2:'Inactivo'}}     
      ];

      if(studentsData !== null){
        setListStudent(studentsData)
      }

      function deleteItemStudent(rowData){
        const newArray = listStudent.filter((item) => item.stuId !== rowData.stuId)
        setListStudent(newArray)
        setStudentsData(newArray)
    }

    const updateStatusStudent = async (rowData) =>{

      try {
        const result = (await AxiosInstance.put(`/representativeStudent/status/student/${rowData.famId}`,rowData)).data
        setRenderStatus(renderStatus + 1)
      } catch (error) {
        console.log('entro por error')
      }

    }

  return (
    <>
        <MaterialTable title={'Listado'}
            data={listStudent} 
            columns={columns}
            actions={[
              (mode === 'add')? 
                { icon: () => <DeleteOutlineRoundedIcon />,
                  tooltip: "Eliminar de la lista",
                  onClick : (event, rowData)=> deleteItemStudent(rowData)
                }
              : 
                { 
                  icon: () => <JoinRightRoundedIcon />,
                  tooltip: "Cambiar estatus",
                  onClick : (event, rowData)=> updateStatusStudent(rowData)
                }
              ]} 
            options={{
            search: false,
            paging: false,
            width:300,
            actionsCellStyle:{paddingLeft:50,paddingRight:50},
            headerStyle: {
                 backgroundColor: "#007bff",
                 color: "#FFF",
                 fontWeight:'normal',
                 // fontSize:18,
            },
                actionsColumnIndex:-1,
                addRowPosition:'first'
            }}

   />
    </>
  )
}

export default TableStudent