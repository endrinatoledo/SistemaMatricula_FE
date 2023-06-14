import React from 'react';
import {
    Text,
    View,
    StyleSheet,
  } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    table: { 
        display: "table", 
        width: "auto", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0 
      }, 
      tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol: { 
        width: "25%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableCell: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 10 
      }
    });

const Table = () => (
        <View style={styles.table}> 
            <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Alumno</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Materia</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Periodo</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Deuda</Text> 
                </View> 
            </View>
            <View style={styles.tableRow}> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Marcos Flores</Text> 
                </View> 
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Matematicas</Text> 
                </View> 
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
                </View>
                <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>5€</Text> 
                </View> 
            </View> 
        </View>
)

export default Table;
