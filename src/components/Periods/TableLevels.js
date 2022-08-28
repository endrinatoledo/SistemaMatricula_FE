import * as React from 'react';
import MaterialTable from '@material-table/core'; 
import Button from '@mui/material/Button';
import LoadingButtons from '../commonComponents/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
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

    const [nameColumnStructure, setNameColumnStructure] = React.useState([])
    const [columns, setColumns] = React.useState([])
    const [checked, setChecked] = React.useState(true)
    const [checkedNameColumns, setCheckedNameColumns] = React.useState(
      {A: false, B: false}
      )

      const classes = UseStyles();

      const asignarValorCheck = (rows,section) =>{

        const result = levelsMap.filter(element =>{
          if(element.levName === rows.levName && section === 'a'){
              return element.a
          }else 
          if(element.levName === rows.levName && section === 'b'){
            return element.b
          }else 
          if(element.levName === rows.levName && section === 'c'){
            return element.c
          }else 
          if(element.levName === rows.levName && section === 'd'){
            return element.d
          }else 
          if(element.levName === rows.levName && section === 'e'){
            return element.e
          }
        }         
        )
        return result[0]
      }

      const handleChange = (event) => {

        const nameCheck = event.target.name
        const arrayDeCadenas = nameCheck.split('-') //0:nombre del grado, 1: seccion

        console.log('arrayDeCadenas',arrayDeCadenas)

        console.log('event',event.target.checked)
        console.log('onclic ',event.target.name)
        const updatedOSArray = levelsMap.map(element =>
          (element.levName === arrayDeCadenas[0] && arrayDeCadenas[1] === 'a')
            ?  { ...element, a: event.target.checked }     
            : (element.levName === arrayDeCadenas[0] && arrayDeCadenas[1] === 'b')
              ?  { ...element, b: event.target.checked }     
              :(element.levName === arrayDeCadenas[0] && arrayDeCadenas[1] === 'c')
                ?  { ...element, c: event.target.checked }     
                :(element.levName === arrayDeCadenas[0] && arrayDeCadenas[1] === 'd')
                  ?  { ...element, d: event.target.checked }     
                  :(element.levName === arrayDeCadenas[0] && arrayDeCadenas[1] === 'e')
                  ?  { ...element, e: event.target.checked }     
                  :element          
        )
        setLevelsMap(updatedOSArray)

      };

      const componentRadio = (rows,section) =>{

        return(
          <Checkbox
            // value={}
            name={`${rows.levName}-${section}`}
            checked={asignarValorCheck(rows,section)} //aqui va de forma indifivual su valor
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        )
          
      }

      const columnStructure = () =>{

        //lOGICA DINAMICA
        // const columnsName = Object.keys(levelsMap[0])
        
        // columnsName.unshift('Nombre del Nivel')

        // const result = columnsName.map( element =>{
                  
        // if(element !== 'levId' && element !== 'levName'){
        //   if(element === 'Nombre del Nivel'){
        //       return { title: 'Nombre del Nivel', field: 'levName'}  
        //   }else{
            
        //     return {title : `Sec ${element}`, field: `${element}`, render:(rows)=>componentRadio(rows,element) }
        //   }
          
        // }else{
        //   return null
        // }
        
        // } )
        // var newArray = result.filter((item) => item !== null);
        
        const newArray =  [ 
          { title: 'Nombre del Nivel', field: 'levName',width:'auto',headerStyle:{width:300, marginLeft:'10px',marginRight:'10px'},},
          { title: 'A', field: 'a',width:'auto', render:(rows)=>componentRadio(rows,'a')},
          { title: 'B', field: 'b',width:'auto', render:(rows)=>componentRadio(rows,'b')},
          { title: 'C', field: 'c', render:(rows)=>componentRadio(rows,'c')},
          { title: 'D', field: 'd', render:(rows)=>componentRadio(rows,'d')},
          { title: 'E', field: 'e', render:(rows)=>componentRadio(rows,'e')},
         ]
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
              addRowPosition:'first',
              paging:false
          }}
          onSelectionChange={rows => {
              setPeriodObject({...periodObject, selectedPeriods:rows})
          }}
        />        
    </>: null }

    </>
    
  )
}   
export default TableLevels