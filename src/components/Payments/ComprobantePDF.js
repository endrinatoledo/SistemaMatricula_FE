import * as React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";

const tamañoLetra = "11px"
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

const ComprobantePDF = ({ conceptosAdicionalesArray, replicaDatosPago, numControl, numFact, datosCompletos, datosPago, tasaDelDia, datosCabecera, pagosRegistrados }) => {

    console.log('stos son mis datos completos', datosCompletos)
    console.log('replicaDatosPago.................', replicaDatosPago)
    //PULGADAS : 9.5  - 5.5
    //CENTIMETROS: 24.13 - 13.97
    //MILIMETROS: 228.6 - 139.7

    const [montos, setMontos] = React.useState([])
    const [total, setTotal] = React.useState(null)
    const [destallesDePagos, setDestallesDePagos] = React.useState(null)

    const bancosYreferencias = () => {
        let descripcion = ''

        pagosRegistrados.forEach(element => {
            // console.log('element', element)
            if (element.metodoPago.payName != 'EFECTIVO') {
                if (element.banco !== null) descripcion = `${descripcion} Banco: ${element.banco.banName} `
                if (element.referencia !== null) descripcion = `${descripcion} Referencia: ${element.referencia} `
                if (element.tarjeta !== null && element.tarjeta !== undefined) descripcion = `${descripcion} Tarjeta: ${element.tarjeta} `
                descripcion = `${descripcion} - `
            }

        });

        setDestallesDePagos(descripcion.substring(0, descripcion.length - 2))
    }

    const calcularMontoTotal = () => {
        const montoTotal = montos.reduce(function (sum, item) {
            return sum + Number(item.monto);
        }, 0)
        setTotal(montoTotal.toFixed(2))
    }

    function funcionSuma(element) {
        return pagosRegistrados.reduce(function (sum, item) {
            return (item.metodoPago.payName === element)
                ? item.moneda === "Bolívares" ? sum + Number(item.monto) : sum + (tasaDelDia.excAmount * Number(item.monto))
                : sum;
        }, 0);
    }

    const ordenarMontos = () => {

        let hash = {};
        const eliminarMetodosPagoRepetidos = pagosRegistrados.filter(o => hash[o.metodoPago.payName] ? false : hash[o.metodoPago.payName] = true);
        const detallePagoMetodos = eliminarMetodosPagoRepetidos.map(item => {
            return {
                metodoPago: item.metodoPago.payName,
                monto: 0
            }
        }
        )

        const detallePagoMonto = detallePagoMetodos.map(item => {
            return {
                metodoPago: item.metodoPago,
                monto: (funcionSuma(item.metodoPago)).toFixed(2)
            }
        }
        )
        setMontos(detallePagoMonto)
    }

    const armarDescripcionConceptoAdicional = (concepto) => {
        const descripcion = `${concepto.icoName ? concepto.icoName.toUpperCase() : ''} ${concepto.famName ? concepto.famName.toUpperCase() : ''} ${concepto.student ? concepto.student.toUpperCase() : ''} ${concepto.description ? concepto.description.toUpperCase() : ''}`
        return descripcion
    }

    React.useEffect(() => {
        ordenarMontos()
        if (datosPago.length > 0 || conceptosAdicionalesArray.length > 0) { bancosYreferencias() }
    }, [1])

    React.useEffect(() => {
        if (montos.length > 0) { calcularMontoTotal() }

    }, [montos])

    return (
        < >
            {
                (destallesDePagos !== null && total !== null && montos.length > 0 && datosCompletos !== null)
                    ? <PDFViewer style={styles.viewer}>
                        {/* Start of the document*/}
                        <Document>
                            {/*render a single page*/}
                            <Page size="A4" style={styles.page}>
                                <View style={{
                                    marginTop: '10px', marginLeft: '5px', marginRight: '5px', marginBottom: '35'
                                    // paddingTop:"15px", paddingRight:'15px', paddingLeft:'15px'
                                }}>
                                    <View style={{ display: "flex", flexDirection: 'row' }}>
                                        <View style={{ flex: 2 }}>
                                            <Text style={{ fontSize: tamañoLetra }}> A.C.U.E Colegio Nuestra Señora de Lourdes</Text>
                                            <Text style={{ fontSize: tamañoLetra }}> Inscrito en el M.P.P.E. Cod.S0207D0814</Text>
                                            <Text style={{ fontSize: tamañoLetra }}> Número de RIF: J-31730846-8</Text>
                                            <Text style={{ fontSize: tamañoLetra }}> AV(100) Bolivar Norte. Valencia-Carabobo</Text>

                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ top: '10%' }}>
                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> Fecha</Text>
                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> {datosCompletos.cabecera?.date !== undefined ? datosCompletos.cabecera.date : ''}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={{ top: '10%' }}>
                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> Nro. de Control</Text>
                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> {numControl}</Text>
                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> Factura</Text>
                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> {numFact} </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ height: '19px' }}></View>
                                    <View style={{ display: "flex", flexDirection: 'row' }}>
                                        <View style={{ flex: 2 }}>
                                            <View >
                                                <Text style={{ fontSize: tamañoLetra, marginBottom: '2px' }}> Razón Social: {datosCompletos.cabecera.razonSocial !== undefined ? datosCompletos.cabecera.razonSocial : ''}</Text>
                                                <Text style={{ fontSize: tamañoLetra }}> Dirección: {datosCompletos.cabecera.address !== undefined ? datosCompletos.cabecera.address : ''}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View >
                                                <Text style={{ fontSize: tamañoLetra, marginBottom: '2px' }}> CI/RIF: {datosCompletos.cabecera.identificacion !== undefined ? datosCompletos.cabecera.identificacion : ''}</Text>
                                                <Text style={{ fontSize: tamañoLetra }}> Teléfono: {datosCompletos.cabecera.phones !== undefined ? datosCompletos.cabecera.phones : ''} </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ height: '9px' }}></View>
                                    <View style={{ display: "flex", flexDirection: 'row', border: '1', padding: '5px' }}>
                                        <View style={{ flex: 3 }}>
                                            <View >
                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'center' }}> CONCEPTO </Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: tamañoLetra, textAlign: 'right' }}> BOLÍVARES </Text>
                                        </View>
                                    </View>
                                    <View style={{ height: '5px' }}></View>
                                    <View style={{ display: "flex", flexDirection: 'row' }}>
                                        <View style={{ flex: 3 }}>

                                            
                                                <View >
                                                {conceptosAdicionalesArray != undefined && Array.isArray(conceptosAdicionalesArray) && conceptosAdicionalesArray.length > 0
                                                        // conceptosAdicionalesArray.length > 0
                                                            ? conceptosAdicionalesArray.map(item =>
                                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'left' }}> {armarDescripcionConceptoAdicional(item)}  </Text>)
                                                            : null
                                                    }
                                                    {
                                                        datosCompletos !== null
                                                            ? datosCompletos.cuerpo.map(item =>
                                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'left' }}> {item.descripcion? (item.descripcion).toUpperCase() : ''} {item.student?(item.student).toUpperCase():''}  </Text>)
                                                            : null
                                                    }
                                                    
                                                </View>

                                            
                                            {/* <Text style={{ fontSize: tamañoLetra, textAlign: 'left' }}> conceptos </Text> */}

                                        </View>
                                        <View style={{ flex: 1 }}>
                                            {
                                                <View >
                                                    {
                                                        conceptosAdicionalesArray.length > 0
                                                            ? conceptosAdicionalesArray.map(item =>
                                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'right', paddingRight: '6px' }}> {item.montoApagarBol}  </Text>)
                                                            : null
                                                    }
                                                    {
                                                        datosCompletos !== null
                                                            ?
                                                            datosCompletos.cuerpo.map(item =>
                                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'right', paddingRight: '6px' }}> {parseFloat(item.pagoAplicadoBol).toFixed(2)}  </Text>)
                                                            // <Text style={{ fontSize: tamañoLetra, textAlign: 'right', paddingRight: '6px' }}> {(item.pago * tasaDelDia.excAmount).toFixed(2)}  </Text>)
                                                            : null
                                                    }
                                                </View>

                                            }
                                            {/* <Text style={{ fontSize: tamañoLetra, textAlign: 'right' }}> bolivares </Text> */}
                                        </View>
                                    </View>
                                    <View style={{ height: '5px' }}></View>
                                    <View style={{ display: "flex", flexDirection: 'row', border: '1', padding: '5px' }}>
                                        <View style={{ flex: 3, borderRight: '1', margin: '1px', paddingRight: '5px' }}>
                                            <View >
                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'left' }}> Formas de pago: </Text>
                                                {
                                                    montos.length > 0
                                                        ? montos.map(item => <Text style={{ fontSize: tamañoLetra, textAlign: 'left' }}> {item.metodoPago} </Text>)
                                                        : null
                                                }
                                                <Text style={{ fontSize: tamañoLetra, textAlign: 'left' }}> Detalle de Pago:  {` ${destallesDePagos}`} </Text>
                                            </View>
                                        </View>
                                        {/* <View style={{ display: "flex", flexDirection: 'row' }}>
                                            
                                        </View> */}

                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: tamañoLetra, textAlign: 'right' }}>  </Text>
                                            {
                                                montos.length > 0
                                                    ? montos.map(item => <Text style={{ fontSize: tamañoLetra, textAlign: 'right' }}> {item.monto} </Text>)
                                                    : null
                                            }
                                            <Text style={{ fontSize: tamañoLetra, textAlign: 'right' }}> {`Total  ${total}`} </Text>
                                        </View>
                                    </View>
                                    <View style={{ height: '19px' }}></View>
                                    <View style={{ display: "flex", flexDirection: 'row' }}>
                                        {/* <View style={{ flex: 3 }}> */}
                                        <View >
                                            <Text style={{ fontSize: tamañoLetra, textAlign: 'left' }}> Conforme de recibido: _______________________________________ </Text>
                                        </View>
                                        {/* </View> */}
                                    </View>
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                    : null
            }

        </>


    )
}

export default ComprobantePDF