import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
const AxiosInstance = require("../utils/request").default;
const TableRepresentative = ({repStuData,family,mode,listRepresentative, setListRepresentative, representativesData,setRepresentativesData}) => {

  console.log('representativesData',representativesData)
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

      function deleteItemRepresentative(rowData){

        if(mode === 'add'){
          console.log('selectRow',rowData)
          const newArray = listRepresentative.filter((item) => item.repId !== rowData.repId)
          setListRepresentative(newArray)
          setRepresentativesData(newArray)
        }else{
          console.log('selectRow',rowData)
          updateStatusRepresentative(rowData)
        }
      }

      function showRepStatus(){


        // repStuData
      }

      const updateStatusRepresentative = async (representative) =>{

        try {
          // const result = (await AxiosInstance.post(`/statusRepresentative/${family}`,representative)).data
          // console.log('update resentative ', result)
        } catch (error) {
          
        }

      }

  return (
    <>
        <MaterialTable title={'Listado'}
            data={listRepresentative} 
            columns={columns}
            actions={[
              (mode === 'add')? 
                { icon: () => <DeleteOutlineRoundedIcon />,
                  tooltip: "Eliminar de la lista",
                  onClick : (event, rowData)=> deleteItemRepresentative(rowData)
                }
              : 
                { icon: () => <Switch />,
                  tooltip: "Eliminar de la lista",
                  onClick : (event, rowData)=> updateStatusRepresentative(rowData)
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
                fontSize:18,
            },
                actionsColumnIndex:-1,
                addRowPosition:'first'
            }}
            editable={{
                // onRowDelete:  (selectRow)=> new Promise((resolve, reject)=>{
                //     const newArray = listRepresentative.filter((item) => item.repId !== selectRow.repId)
                //     setListRepresentative(newArray)
                //     setRepresentativesData(newArray)
                //     resolve()
                // })
            }}
   />
    </>
  )
}

export default TableRepresentative