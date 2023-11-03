import React, { useState, useEffect } from 'react';
import ChartJsImage from 'chartjs-to-image';
import {
    Document,
    Page,
    Image,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
const PieChart = ({ dataGrafica }) => {

    const generateImage = async () => {
        const myChart = new ChartJsImage();
        myChart.setConfig({
            type: 'pie',
            data: dataGrafica,
            options : {
                plugins: {
                    datalabels: {
                        color: 'black', // Color del número
                        font: {
                            size: 16, // Tamaño del número
                        },
                    },
                    labels: {
                        color: 'black', // Color de los labels
                    }
                }
            }
        });
        const url = await myChart.getShortUrl();
        return url
    };

    const styles2 = {
        container: {
            paddingTop: 3,
            paddingRight: 1,
            paddingLeft: 1,
            paddingBottom: 3,
            width: 350,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 20,
            backgroundColor: "black",
        },
    };

    const imageSrc =  generateImage()

    return (
        <View style={styles2.container}>
            {imageSrc && ( 
                <Image src={imageSrc} />
            )
                }
        </View>

    );
};

export default PieChart;

// <div>
//     {imageSrc ? (
//         <Image src={`https://quickchart.io/chart/render/sf-5ed3878c-8ec3-4c5d-9173-2ef8ac0b36a0`} />
//         // <img src={imageSrc} alt="Pie chart" />
//     ) : (
//         <Text >Loading chart... </Text>
//     )}
// </div>