import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { assets } from '../../assets/assets';
import axios from 'axios';

// Styles (optimized for tables)
const styles = StyleSheet.create({
  page: { 
    padding: 30,
    fontSize: 12 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottom: '1px solid #015170',
    paddingBottom: 10
  },
  title: { 
    fontSize: 18, 
    marginBottom: 15, 
    textAlign: 'center', 
    fontWeight: 'bold',
    color: '#015170'
  },
  section: { 
    marginBottom: 15,
    lineHeight: 1.5 
  },
  label: { 
    fontWeight: 'bold',
    marginRight: 5
  },
  table: {
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#015170'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#015170'
  },
  tableHeader: {
    backgroundColor: '#015170',
    color: 'white',
    fontWeight: 'bold'
  },
  tableCell: {
    padding: 8,
    flex: 1,
    textAlign: 'center'
  },
  medicineCell: {
    flex: 2 // Wider column for medicine names
  }
});

const MedicalRecordPDF = ({ record }) => {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/prescription/findPrescription/${record._id}`
        );
        if (response.data.success) {
          setPrescriptionList(response.data.data);
        } else {
          setMessage(response.data.message );
        }
      } catch (error) {
        setMessage('Failed to load prescriptions');
        console.error('API Error:', error);
      }
    };

    if (record?._id) fetchPrescriptions();
  }, [record]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={assets.Logo2} style={{ width: 80, height: 70 }} />
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#015170', marginLeft: 100 }}>
            Smart Hospital System
          </Text>
        </View>

        {/* Patient Info */}
        <Text style={styles.title}>Medical Record</Text>
        <View style={styles.section}>
          <Text><Text style={styles.label}>Diagnosis:</Text> {record.dignosis || 'N/A'}</Text>
          <Text><Text style={styles.label}>Treatment Plan:</Text> {record.treatmentPlan || 'N/A'}</Text>
          <Text><Text style={styles.label}>Medical History:</Text> {record.History || 'N/A'}</Text>
          <Text><Text style={styles.label}>Date:</Text> {record.date || 'N/A'}</Text>
        </View>

        {/* Prescriptions Table */}
        <Text style={{ ...styles.title, textAlign: 'left', fontSize: 16, marginTop: 20 }}>
          Prescriptions ({prescriptionList.length})
        </Text>
        
        
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.medicineCell]}>Medicine</Text>
              <Text style={styles.tableCell}>Dosage</Text>
              <Text style={styles.tableCell}>Frequency</Text>
              <Text style={styles.tableCell}>Duration</Text>
            </View>
            
            {/* Table Rows */}
            {prescriptionList.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.medicineCell]}>{item.medicineName || '-'}</Text>
                <Text style={styles.tableCell}>{item.dosage || '-'}</Text>
                <Text style={styles.tableCell}>{item.frequency || '-'}</Text>
                <Text style={styles.tableCell}>{item.duration || '-'}</Text>
              </View>
            ))}
          </View>
         
          <Text style={{ color: '#666', fontStyle: 'italic' }}>
            {message}
          </Text>
        
      </Page>
    </Document>
  );
};

export default MedicalRecordPDF;