import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { assets } from '../assets/assets';
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottom: '1px solid #015170',
        paddingBottom: 10
    },
    information: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid #015170',
        paddingBottom: 15,
        marginBottom: 15
    },
    section: {
        marginBottom: 15
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#005D7C',
        marginBottom: 8,
        textDecoration: 'underline'
    },
    resultsHeader: {
        flexDirection: 'row',
        border: '2px solid #ddd',
        paddingBottom: 5,
        marginBottom: 5
        
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize: 13
    },
    testGroup: {
        marginBottom: 10
    },
    testGroupTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333'
    },
    testRow: {
        flexDirection: 'row',
        marginBottom: 4,
        paddingLeft: 10
    },
    investigation: {
        width: '40%'
    },
    result: {
        width: '20%'
    },
    referenceValue: {
        width: '20%',
        fontStyle: 'italic'
    },
    unit: {
        width: '20%'
    },
    abnormal: {
        color: 'red'
    },
    highLowIndicator: {
        fontWeight: 'bold',
        marginRight: 5
    },
    comments: {
        marginTop: 15,
        fontStyle: 'italic',
        borderTop: '1px solid #eee',
        paddingTop: 10
    },
    reference: {
        marginTop: 15,
        fontSize: 10,
        fontStyle: 'italic'
    },
    sampleType: {
        marginBottom: 10,
        fontStyle: 'italic'
    },
    // divider: {
    //     borderBottom: '1px solid #ddd',
    //     marginVertical: 5
    // }
});

const TestRecordpdf = ({ record }) => {
    // Group tests by category if they have brackets in name (like [SPERM MORPHOLOGY])
    const groupTests = (tests) => {
        const groups = {};
        tests.forEach(test => {
            const name = test.name;
            // Check if test name has brackets indicating a group
            const groupMatch = name.match(/^\[(.*?)\]/);
            const groupName = groupMatch ? groupMatch[1] : 'OTHER TESTS';
            
            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            groups[groupName].push({
                ...test,
                displayName: groupMatch ? name.replace(/^\[.*?\]\s*/, '') : name
            });
        });
        return groups;
    };

    const testGroups = groupTests(record.result || []);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image src={assets.Logo2} style={{ width: 80, height: 60 }} />
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#015170', marginLeft: 100 }}>
                        Smart Hospital System Lab
                    </Text>
                </View>
                
                <View style={styles.information}>
                    <View style={{ marginTop: '5px', fontSize: '10px' }}>
                        <Text style={{ fontSize: '17px', color: '#005D7C', fontWeight: 'bold' }}>Test Information</Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>TestNumber:</Text> {record.testTemplate_id?._id}
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>TestName:</Text> {record.testTemplate_id?.Testname}
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>RequestedOn:</Text> {new Date(record.assighnedAt).toLocaleString()}
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>ReportedOn:</Text> {new Date(record.createdAt).toLocaleString()}
                        </Text>
                    </View>
                    
                    <View style={{ marginTop: '5px', fontSize: '10px' }}>
                        <Text style={{ fontSize: '17px', color: '#005D7C', fontWeight: 'bold' }}>Patient Information</Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>RecordNumber:</Text> {record._id}
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>PatientName:</Text> {record.patient_id.name}
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>ContactNumer:</Text> {record.patient_id.contactNo}
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>Date of Birth:</Text> {record.patient_id.dateOfBirth}
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: 'bold' }}>Gender:</Text> {record.patient_id.Gender}
                        </Text>
                        <Text style={{ fontSize: '10px' }}>
                            <Text style={{ fontWeight: 'bold' }}>PatientCnic:</Text> {record.patient_id.cnic}
                        </Text>
                    </View>
                </View>
                
                {/* Test Results Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{record.testTemplate_id?.Testname || 'Test Results'}</Text>
                    
                    <Text style={styles.sampleType}>Primary Sample Type: Blood</Text>
                    
                    {/* Results Table Header */}
                    
                    <View style={styles.resultsHeader}>
                        <Text style={[styles.headerCell, styles.investigation]}>Investigation</Text>
                        <Text style={[styles.headerCell, styles.result]}>Result</Text>
                        <Text style={[styles.headerCell, styles.referenceValue]}>Range</Text>
                        <Text style={[styles.headerCell, styles.unit]}>Unit</Text>
                    </View>
                    
                    
                    {Object.entries(testGroups).map(([groupName, tests]) => (
                        <View key={groupName} style={styles.testGroup}>
                            {groupName !== 'OTHER TESTS' && (
                                <Text style={styles.testGroupTitle}>{groupName}</Text>
                            )}
                            
                            {tests.map((test, index) => {
                                const templateField = record.testTemplate_id?.fields?.find(f => f.name === test.name);
                                const isAbnormal = test.isAbnormal;
                                const isHigh = templateField && test.value > templateField.normalMax;
                                const isLow = templateField && test.value < templateField.normalMin;
                                
                                return (
                                    <View key={index} style={styles.testRow}>
                                        <Text style={styles.investigation}>{test.displayName || test.name}</Text>
                                        <Text style={[styles.result, isAbnormal && styles.abnormal]}>
                                            {isHigh && <Text style={styles.highLowIndicator}>High </Text>}
                                            {isLow && <Text style={styles.highLowIndicator}>Low </Text>}
                                            {test.value}
                                        </Text>
                                        <Text style={styles.referenceValue}>
                                            {templateField ? `${templateField.normalMin} - ${templateField.normalMax}` : '-'}
                                        </Text>
                                        <Text style={styles.unit}>
                                            {templateField?.unit || ''}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                    
                    {/* Comments if any */}
                    {record.comments && (
                        <View style={styles.comments}>
                            <Text>COMMENTS:</Text>
                            <Text>{record.comments}</Text>
                        </View>
                    )}
                    
                    {/* Reference */}
                    <View style={styles.reference}>
                        <Text>REFERENCE:</Text>
                        <Text>{record.testTemplate_id?.description || 'Refer to standard medical references.'}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default TestRecordpdf;