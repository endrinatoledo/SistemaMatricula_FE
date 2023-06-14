import React from 'react'
import {
    Document,
    Page,
    Image,
    StyleSheet,
  } from "@react-pdf/renderer";
import Table from './Table';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const PdfRender = ({image}) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: "column",
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

export default PdfRender;
