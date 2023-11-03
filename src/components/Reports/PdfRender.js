import React,{ useEffect, useState } from 'react'
import {
    Document,
    Page,
    Image,
    StyleSheet,
    Text,
    View,
  } from "@react-pdf/renderer";
import Table from './Table';
import PieChart from './PieChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);



const PdfRenderRespando = ({ image }) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: "column",
            marginTop: 20,
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Table style={{ flex: 1 }} />
                <Image src={`${image}`} />
            </Page>
        </Document>
    );

}

const Colors = ['#1792a4', '#44b4c4', '#4dd0e1', '#80c9c6', '#a3d5d1', '#c8e5e3']



const PdfRender = ({ dataReporte }) => {

    const [arreglo, setArreglo] = useState([
        {
            grado: '1ero', seccion: 'A', dataGrafica: {
                labels: ['Solventes', '1 Mes Moroso', '+1 Mes Morosos'],
                datasets: [{ label: 'Foo', data: dataReporte[0].arrayDataGrafica, backgroundColor: ["rgba(59, 245, 39, 0.68)", "rgba(235, 245, 39, 0.8)", "rgba(245, 39, 39, 0.81)"] }],
                options:{
                    
                }
            },
            // dataTabla: [
            //     { descripcion: 'Solventes', numero: '1', porcentaje: '20%' },
            //     { descripcion: '1 Mes Moroso', numero: '2', porcentaje: '30%' },
            //     { descripcion: '+1 Mes Morosos', numero: '3', porcentaje: '50$' }
            // ],
        }
    ]);

    const tableStyles = StyleSheet.create({
        table: { width: '90%', borderWidth: 1, borderColor: '#000000',marginLeft: 'auto', marginRight: 'auto', marginTop:10 },
        tableRow: { flexDirection: 'row', borderBottomColor: '#000000', borderBottomWidth: 1, alignItems: 'center' },
        tableCell: { flex: 1, padding: 3 },
        tableHeader: { backgroundColor: '#f2f2f2' },
    });
        
    const styles2 = {
        container: {
            padding: 10,
        },
        row: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            alignItems: 'center',
            height: 'auto',
            fontSize: 12,
        },
        cell: {
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: '#000',
            paddingLeft: 8,
            textAlign: 'center',
            height: 'auto',
        },
        cell2: {
            flex: 1,
            paddingLeft: 8,
            textAlign: 'center',
            paddingTop: 25,
            paddingBottom: 25,
        },
        viewTitle:{
            padding: 10,
        },
        title:{
            fontSize: 13,
            textAlign: 'center',}
    };

    // const filas = [];
    // for (let i = 0; i < arreglo.length; i += 2) {
    //     filas.push(
    //         <View key={i} style={styles2.row}>
    //             <View key={i} style={styles2.cell}>
    //                 <Text >{`${arreglo[i].grado} ${arreglo[i].seccion}`} </Text>
    //                 <PieChart dataGrafica={arreglo[i].dataGrafica}  />
    //             </View>
    //             <View key={i} style={styles2.cell}>
    //                 {arreglo[i + 1] && (
    //                     <View >
    //                         <Text >{`${arreglo[i + 1].grado} ${arreglo[i + 1].seccion}`}</Text>
    //                         <PieChart dataGrafica={arreglo[i].dataGrafica} />
    //                     </View>
    //                 )}
    //             </View>
    //         </View>
    //     );
    // }

    return (
        // <Document>
        //     <Page>
        //         <View style={styles2.viewTitle}>
        //             <Text style={styles2.title}>{dataReporte[0].nombreReporte} </Text> 
        //          </View>
        //         {filas.length > 0 && (
        //             <View style={styles2.container}>{filas}</View>)
        //         }            
        //     </Page>
        // </Document>
        <Document>
            <Page>
                <View style={styles2.viewTitle}>
                    <Text style={styles2.title}>{dataReporte[0].nombreReporte} </Text>
                </View>
                <View >
                    <PieChart dataGrafica={arreglo[0].dataGrafica} />
                </View>
                <View style={tableStyles.table}>
                    {/* Encabezado de la tabla */}
                    <View style={tableStyles.tableRow}>
                        <View style={[tableStyles.tableCell, tableStyles.tableHeader]}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Estudiante</Text>
                        </View>
                        <View style={[tableStyles.tableCell, tableStyles.tableHeader]}>
                            <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Estatus</Text>
                        </View>
                    </View>

                    {/* Contenido de la tabla */}
                    {dataReporte[0].arrayEstudiantesEstatusPago.map((fila, index) => (
                        <View style={tableStyles.tableRow} key={index}>
                            <View style={tableStyles.tableCell}>
                                <Text style={{ fontSize: 10 }}>{fila.nombre}</Text>
                            </View>
                            <View style={tableStyles.tableCell}>
                                <Text style={{ fontSize: 10 }}>{fila.estatus}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
}


export default PdfRender;
 // <Document>
        //     <Page size="A4" style={styles.page}>
        //         <View style={styles.viewTitle}>
        //             <Text style={styles.title}>Reporte de gráficas del mes de - del periodo - </Text> 
        //         </View>
                


        //         <Table style={{ flex: 1 }} />
        //         <Image src={`${image}`} />
        //     </Page>
        // </Document>