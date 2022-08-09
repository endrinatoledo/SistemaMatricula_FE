import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import JoinRightRoundedIcon from '@mui/icons-material/JoinRightRounded';
const AxiosInstance = require("../utils/request").default;
const TableRepresentative = ({renderStatus, setRenderStatus,repStuData,family,mode,listRepresentative, setListRepresentative, representativesData,setRepresentativesData,listRepresentativeEdit, setListRepresentativeEdit}) => {

    const columns = [
        { title: 'Tipo', field: 'repIdType', width: 70, cellStyle:{maginLeft:'3%'}},
        { title: 'Identificación', field: 'repIdentificationNumber'},
        { title: 'Primer Nombre', field: 'repFirstName'},
        { title: 'Primer Apellido', field: 'repSurname' },        
        { title: 'Vínculo', field: 'repBond',width: 70, cellStyle:{paddingLeft:'1%'}},
        { title: 'Estatus',width: 70, field: 'statusRepSt',lookup: {1: 'Activo', 2:'Inactivo'}},
      ];

      if(representativesData !== null && mode === 'add'){
        setListRepresentative(representativesData)
      }

      function deleteItemRepresentative(rowData){
        if(mode === 'add'){
          const newArray = listRepresentative.filter((item) => item.repId !== rowData.repId)
          setListRepresentative(newArray)
          setRepresentativesData(newArray)
        }else{
          
        }
          
      }

      const updateStatusRepresentative = async (rowData) =>{

        try {
          const result = (await AxiosInstance.put(`/representativeStudent/status/representative/${rowData.famId}`,rowData)).data
          setRenderStatus(renderStatus + 1)
        } catch (error) {
          console.log('entro por error')
        }

      }

      React.useEffect(() => {

      }, [listRepresentativeEdit.length]);

  return (
    <>
        <MaterialTable title={'Listado'}
            data={mode === 'edit' ? listRepresentativeEdit : listRepresentative} 
            columns={columns}
            actions={[
              (mode === 'add')? 
                { icon: () => <DeleteOutlineRoundedIcon />,
                  tooltip: "Eliminar de la lista",
                  onClick : (event, rowData)=> deleteItemRepresentative(rowData)
                }
              : 
                { 
                  icon: () => <JoinRightRoundedIcon />,
                  tooltip: "Cambiar estatus",
                  onClick : (event, rowData)=> updateStatusRepresentative(rowData)
                }
              ]} 
              // , cellStyle:{paddingRight:'5%'}
            options={{
            search: false,
            paging: false,
            width:300,
            actionsCellStyle:{paddingLeft:50,paddingRight:50},
            headerStyle: {
                // width:'fit-content',
                backgroundColor: "#007bff",
                color: "#FFF",
                fontWeight:'normal',
                // fontSize:18,
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