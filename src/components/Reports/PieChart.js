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
    console.log('dataGrafica', dataGrafica)

    // const [imageSrc, setImageSrc] = useState(null);


    const generateImage = async () => {
        const myChart = new ChartJsImage();
        myChart.setConfig({
            type: 'pie',
            data: dataGrafica,
        });
        const url = await myChart.getShortUrl();
        return url
        console.log('url....', url)
        // setImageSrc(url);
        if(url){return true }else {return false}
        
        
        return true
    };

    const styles2 = {
        container: {
            // padding: 10,
            height: 200,
        },

    };

    const imageSrc =  generateImage()

    // useEffect(() => {
        
    //     generateImage();
    // }, [dataGrafica]);

    return (
        <View style={styles2.container}>
            {imageSrc && ( 
                <Image src={imageSrc} />
            )
                }
        </View>
        // <div>
        //     {imageSrc ? (
        //         <Image src={`https://quickchart.io/chart/render/sf-5ed3878c-8ec3-4c5d-9173-2ef8ac0b36a0`} />
        //         // <img src={imageSrc} alt="Pie chart" />
        //     ) : (
        //         <Text >Loading chart... </Text>
        //     )}
        // </div>
    );
};

export default PieChart;