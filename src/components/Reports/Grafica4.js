import './App.css';
import React, { useEffect, useState } from 'react'
import PdfRender from './PdfRender';
import { saveAs } from 'file-saver';
import { pdf } from "@react-pdf/renderer";
import ChartJsImage from 'chartjs-to-image';
import { Stack } from '@mui/material';
// importa el boton de material ui
import Button from '@mui/material/Button';



function GraficosPDF({ dataReporte }) {
    const [imageSrc, setImageSrc] = useState(null);
    
    useEffect(() => {
        const myChart = new ChartJsImage();
        myChart.setConfig({
            type: 'pie',
            data: {
                labels: ['Hello world', 'Foo bar'],
                datasets: [{
                    label: 'Foo', data: dataReporte[0].arrayDataGrafica }]
            },
        });
        convertToURL(myChart);

    }, []);

    const convertToURL = async (chart) => {
        const url = await chart.getShortUrl();
        setImageSrc(url);
    }

    const pdfGenerator = async () => {
        const blob = await pdf((
            <PdfRender image={imageSrc} dataReporte={dataReporte} />
        )).toBlob();

        saveAs(blob, dataReporte[0].nombreReporte);
    }

    return (
        <Stack 
        justifyContent="flex-end"
        alignItems="center"
        direction="row" 
        spacing={2}>
            <Button variant="outlined" size="small"
                onClick={pdfGenerator}
            >Generar PDF</Button>
        </Stack>
    );
}

export default GraficosPDF;
