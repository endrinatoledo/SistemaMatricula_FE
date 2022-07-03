import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import Checkbox from '@mui/material/Checkbox';
import ModalSections from './ModalSections';
import { makeStyles } from '@mui/styles';

const UseStyles = makeStyles({
  period: {
      marginTop: '2%',
      marginLeft: '4%'
  },
  representatives: {
    marginLeft: '4%',
  },
  typography: {
    marginTop: '2%',
    marginLeft: '2%'
  },
  divider: {
    marginBottom: '2%'
  },
  stack: {
    marginTop: '5%'
  },


});

const TableLevels = ({levelsMap, setLevelsMap,periodObject, setPeriodObject,allLevels, setAllLevels,allSections, setAllSections}) => {

    const [openModalSections, setOpenModalSection] = React.useState(false);
    const [nameColumnStructure, setNameColumnStructure] = React.useState([])
    const [columns, setColumns] = React.useState([])
    const [checked, setChecked] = React.useState(true)
    // const columns = columnStructure();
      const classes = UseStyles();


      console.log('levelsMap',levelsMap)

      const handleChange = (event) => {
        console.log('event',event.target.checked)
        setChecked(event.target.checked);
      };

      const componentRadio = (rows,section) =>{

        // console.log('esto llego', rows)
        // console.log('esto section', section)
        return(
          <Checkbox
            name={`${rows.levName}-${section}`}
            checked={checked}
            onChange={handleChange}
            onClick= {(event, rowData) => {      
                      console.log('onclic ',event)
            }}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        )
          
      }

      const columnStructure = () =>{

        const columnsName = Object.keys(levelsMap[0])
        
        columnsName.unshift('Nombre del Nivel')

        const result = columnsName.map( element =>{
                  
        if(element !== 'levId' && element !== 'levName'){
          if(element === 'Nombre del Nivel'){
              return { title: 'Nombre del Nivel', field: 'levName'}  
          }else{
            
            return {title : `Sec ${element}`, field: `${element}`, render:(rows)=>componentRadio(rows,element) }
          }
          
        }else{
          return null
        }
        
        } )
        var newArray = result.filter((item) => item !== null);
        console.log('newArray',newArray)
        setColumns(newArray) 

      }

      React.useEffect(() => {  
        if(levelsMap.length > 0){
          columnStructure()
        }
        
        }, [levelsMap]);

      

  return (
    <>
    {(columns.length > 0) ? 
    <>
            <MaterialTable title={'Seleccionar Niveles'}
        
        data={allLevels} 
        columns={columns}
        // actions={[
        //     {
        //       icon: () => <GridOnRoundedIcon />,
        //       tooltip: 'Seleccionar Secciones',
        //       position: 'row',
        //       onClick: (event, rowData) => {
        //         setOpenModalSection(!openModalSections)

        //         console.log('rowData',rowData)
        //         }
        //     }
        // ]}    
        options={{
            width:300,
            actionsCellStyle:{paddingLeft:50,paddingRight:50},
            headerStyle: {
              backgroundColor: "#007bff",
              color: "#FFF",
              fontWeight:'normal',
              fontSize:18,
            },
            // selection: true,            
            search:false,
            actionsColumnIndex:-1,
            addRowPosition:'first'
        }}
        onSelectionChange={rows => {
            setPeriodObject({...periodObject, selectedPeriods:rows})
        }}
        />
        {
          (openModalSections) ? 
            <ModalSections levelsMap={levelsMap} setLevelsMap={setLevelsMap} allSections={allSections} openModalSections={openModalSections} setOpenModalSection={setOpenModalSection} />
          : null
        }
    </>: null }

    </>
    
  )
}   
export default TableLevels