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
    const [checkedNameColumns, setCheckedNameColumns] = React.useState(
      {A: false, B: false}
      )
    // const columns = columnStructure();
      const classes = UseStyles();

      


      const asignarValorCheck = (rows,section) =>{

        const result = levelsMap.map(element =>{
          if(rows.levId === element.levId){
            // console.log('entro aqui y ',element)
              if(section === 'A'){
                // console.log('entro aca y ',element)
                // console.log('rows ',rows)
                // console.log('section',section)
                return element.A
                // return true
                //  setLevelsMap({...levelsMap, A: !element.A})
              }else{
                return false
              }
              
          }
        })

      }
      console.log('levelsMap',levelsMap)

      const handleChange = (event) => {

        const nameCheck = event.target.name
        const arrayDeCadenas = nameCheck.split('-') //0:nombre del grado, 1: seccion

        console.log('arrayDeCadenas',arrayDeCadenas)

        console.log('event',event.target.checked)
        console.log('onclic ',event.target.name)
        const updatedOSArray = levelsMap.map(element =>
          (element.levName === arrayDeCadenas[0] && (arrayDeCadenas[1] === 'a')
            ?  { ...element, a: !element.a }     
            :
            element

            // (arrayDeCadenas[1] === 'A')? { ...element, A: true } : 
            // (arrayDeCadenas[1] === 'B')? { ...element, B: true } : null
          
        ))
          // if(element.levName === arrayDeCadenas[0]){
          //   if(arrayDeCadenas[1] === 'A'){
          //     return { ...element, A: !element.A }
          //   }else if(arrayDeCadenas[1] === 'B'){
          //     return { ...element, B: !element.B }
          //   }else if(arrayDeCadenas[1] === 'C'){
          //     return { ...element, C: !element.C }
          //   }else if(arrayDeCadenas[1] === 'D'){
          //     return { ...element, D: !element.D }
          //   }
          // }else{
          //   return element
          // }

          

        // console.log('event',event.target.checked)
        // console.log('onclic ',event.target.name)
        console.log('updatedOSArray',updatedOSArray)
        // console.log('event',event)
        // setChecked(event.target.checked);

      };

      const componentRadio = (rows,section) =>{

        // console.log('esto llego', rows)
        // console.log('esto section', section)
        return(
          <Checkbox
            // value={}
            name={`${rows.levName}-${section}`}
            checked={asignarValorCheck(rows,section)} //aqui va de forma indifivual su valor
            onChange={handleChange}
            onClick= {(event, rowData) => {      
                      // console.log('onclic ',event)
                      // console.log('onclic ',event.target.name)
            }}
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
          { title: 'Nombre del Nivel', field: 'levName'},
          { title: 'A', field: 'a', render:(rows)=>componentRadio(rows,'a')},
          { title: 'B', field: 'b', render:(rows)=>componentRadio(rows,'b')},
          { title: 'C', field: 'c', render:(rows)=>componentRadio(rows,'c')},
          { title: 'D', field: 'd', render:(rows)=>componentRadio(rows,'d')},
          { title: 'E', field: 'e', render:(rows)=>componentRadio(rows,'e')},
          { title: 'F', field: 'f', render:(rows)=>componentRadio(rows,'f')},
          { title: 'G', field: 'g', render:(rows)=>componentRadio(rows,'g')},
          { title: 'H', field: 'h', render:(rows)=>componentRadio(rows,'h')},
          { title: 'I', field: 'i', render:(rows)=>componentRadio(rows,'i')},
          { title: 'J', field: 'j', render:(rows)=>componentRadio(rows,'j')},
          { title: 'K', field: 'k', render:(rows)=>componentRadio(rows,'k')},
          { title: 'L', field: 'l', render:(rows)=>componentRadio(rows,'l')},
          { title: 'M', field: 'm', render:(rows)=>componentRadio(rows,'m')}
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