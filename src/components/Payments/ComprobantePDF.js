import * as React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";

const tamañoLetra = "12px"
const styles = StyleSheet.create({
    page: {
        // backgroundColor: "#d11fb6",
        color: "black",
    },
    section: {
        margin: 10,
        padding: 10,
        width: '40%'
        // width: '500',
    },
    viewer: {
        width: '100%', //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    membrete: {
        width: '20%', //the pdf viewer will take up all of the width and height
        // height: window.innerHeight,
    },
})

const ComprobantePDF = () => {

    return (
        <PDFViewer style={styles.viewer}>
            {/* Start of the document*/}
            <Document>
                {/*render a single page*/}
                <Page size="A4" style={styles.page}>
                    <View style={{ margin:'15px'
                        // paddingTop:"15px", paddingRight:'15px', paddingLeft:'15px'
                        }}>
                        <View style={{ display: "flex", flexDirection:'row' }}>
                            <View style={{ flex:2 }}>
                                <Text style={{ fontSize: tamañoLetra }}> A.C.U.E Colegio Nuestra Señora de Lourdes</Text>
                                <Text style={{ fontSize: tamañoLetra }}> Inscrito en el M.P.P.E. Cod.S0207D0814</Text>
                                <Text style={{ fontSize: tamañoLetra }}> Número de RIF: J-31730846-8</Text>
                                <Text style={{ fontSize: tamañoLetra }}> AV(100) Bolivar Norte. Valencia-Carabobo</Text>

                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ top: '20%'  }}>
                                        <Text style={{ fontSize: tamañoLetra, textAlign:'center' }}> Fecha</Text>
                                        <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> 12/11/2022</Text>
                                </View>                                    
                            </View>
                            <View style={{ flex: 1 }}>
                                    <View style={{top: '20%' }}>
                                        <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> Nro. de Control</Text>
                                        <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> 00-00020792</Text>
                                        <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> Factura</Text>
                                        <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> 00020760 </Text>
                                    </View>
                            </View>
                        </View>    
                        <View style={{ height:'19px' }}></View>
                        <View style={{ display: "flex", flexDirection: 'row' }}>      
                            <View style={{ flex: 2 }}>
                                <View >
                                    <Text style={{ fontSize: tamañoLetra,marginBottom:'2px' }}> Razón Social: </Text>
                                    <Text style={{ fontSize: tamañoLetra }}> Dirección: </Text>
                                </View> 
                            </View>   
                            <View style={{ flex: 1 }}>
                                <View >
                                    <Text style={{ fontSize: tamañoLetra, marginBottom: '2px' }}> CI/RIF: </Text>
                                    <Text style={{ fontSize: tamañoLetra }}> Teléfono: </Text>
                                </View> 
                            </View>
                        </View>   
                        <View style={{ height: '19px' }}></View>
                        <View style={{ display: "flex", flexDirection: 'row' }}>  
                            <View style={{ flex: 3 }}>
                                <View >
                                    <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> CONCEPTO </Text>
                                </View>
                            </View> 
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> BOLÍVARES </Text>
                            </View> 

                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
        
    )
}

export default ComprobantePDF