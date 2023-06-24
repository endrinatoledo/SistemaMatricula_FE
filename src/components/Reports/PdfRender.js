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

const PdfRender = ({image}) => {
    const nombres = ['Maria', 'Jose', 'Pedro', 'Juan'];
    const [arreglo, setArreglo] = useState([
        {
            grado: '1ero', seccion: 'A', dataGrafica: {
                labels: ['Solventes', '1-Mes Moroso', '+1 Mes Morosos'],
                datasets: [{ label: 'Foo', data: [1, 2, 3] }],
                backgroundColor: [
                    "rgba(75,192,192,0.5)",
                    "rgba(255,205,86,0.5)",
                    "rgba(255,99,132,0.5)",
                    "rgba(255,159,64,0.5)",                 
                    "rgba(54,162,235,0.5)"
                ],
            },
            dataTabla: [
                { descripcion: 'Solventes', numero: '1', porcentaje: '20%' },
                { descripcion: '1 Mes Moroso', numero: '2', porcentaje: '30%' },
                { descripcion: '+1 Mes Morosos', numero: '3', porcentaje: '50$' }
            ],
        },
        {
            grado: '1ero', seccion: 'B', dataGrafica: {
                labels: ['Solventes', '1 Mes Moroso', '+1 Mes Morosos'],
                datasets: [{ label: 'Foo', data: [1, 2, 3] }],
                backgroundColor: [
                    "rgba(75,192,192,0.5)",
                    "rgba(255,205,86,0.5)",
                    "rgba(255,99,132,0.5)",
                    "rgba(255,159,64,0.5)",
                    "rgba(54,162,235,0.5)"
                ],
            },
            dataTabla: [
                { descripcion: 'Solventes', numero: '1', porcentaje: '20%' },
                { descripcion: '1 Mes Moroso', numero: '2', porcentaje: '30%' },
                { descripcion: '+1 Mes Morosos', numero: '3', porcentaje: '50$' }
            ],
        },
        {
            grado: '2ero', seccion: 'A', dataGrafica: {
                labels: ['Solventes', '1 Mes Moroso', '+1 Mes Morosos'],
                datasets: [{ label: 'Foo', data: [1, 2, 3] }],
                backgroundColor: [
                    "rgba(75,192,192,0.5)",
                    "rgba(255,205,86,0.5)",
                    "rgba(255,99,132,0.5)",
                    "rgba(255,159,64,0.5)",
                    "rgba(54,162,235,0.5)"
                ],
            },
            dataTabla: [
                { descripcion: 'Solventes', numero: '1', porcentaje: '20%' },
                { descripcion: '1 Mes Moroso', numero: '2', porcentaje: '30%' },
                { descripcion: '+1 Mes Morosos', numero: '3', porcentaje: '50$' }
            ],
        },
        {
            grado: '2ero', seccion: 'B', dataGrafica: {
                labels: ['Solventes', '1 Mes Moroso', '+1 Mes Morosos'],
                datasets: [{ label: 'Foo', data: [1, 2, 3] }],
                backgroundColor: [
                    "rgba(75,192,192,0.5)",
                    "rgba(255,205,86,0.5)",
                    "rgba(255,99,132,0.5)",
                    "rgba(255,159,64,0.5)",
                    "rgba(54,162,235,0.5)"
                ],
            },
            dataTabla: [
                { descripcion: 'Solventes', numero: '1', porcentaje: '20%' },
                { descripcion: '1 Mes Moroso', numero: '2', porcentaje: '30%' },
                { descripcion: '+1 Mes Morosos', numero: '3', porcentaje: '50$' }
            ],
        },

    ]);
        
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
            fontSize: 15,
            textAlign: 'center',}
    };

    const filas = [];
    for (let i = 0; i < arreglo.length; i += 2) {
        filas.push(
            <View key={i} style={styles2.row}>
                <View key={i} style={styles2.cell}>
                    <Text >{`${arreglo[i].grado} ${arreglo[i].seccion}`} </Text>
                    <PieChart dataGrafica={arreglo[i].dataGrafica}  />
                </View>
                <View key={i} style={styles2.cell}>
                    {arreglo[i + 1] && (
                        <View >
                            <Text >{`${arreglo[i + 1].grado} ${arreglo[i + 1].seccion}`}</Text>
                            <PieChart dataGrafica={arreglo[i].dataGrafica} />
                        </View>
                    )}
                </View>
            </View>
        );
    }

    return (
        <Document>
            <Page>
                <View style={styles2.viewTitle}>
                     <Text style={styles2.title}>Reporte de gráficas del mes de - del periodo - </Text> 
                 </View>
                {filas.length > 0 && (
                    <View style={styles2.container}>{filas}</View>)
                }            
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