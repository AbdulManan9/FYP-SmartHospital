import { Box, Typography } from '@mui/material'
import React from 'react'

const QuestionAnswer = () => {
    return (
        <Box>
            <Box sx={{ margin:'50px 50px' }}>
                <Typography variant='h4' sx={{ color: '#005E7D' }}> Frequently Asked Question</Typography>

                <Box>
                    <Typography sx={{ color: '#005E7D', marginTop: '20px', fontSize: '17px', fontWeight: '600' }}>
                        1- How can I book an online appointment?
                    </Typography>
                    <Typography sx={{marginTop:'2px',fontFamily:'sans-serif'}}>You can book an online appointment in just a few simple steps:<br/>

                        Visit Our Website – Go to the Appointments section on our homepage.<br/>
                        Select a Doctor – Choose the specialist you need based on your condition.<br/>
                        Enter Your Details – Provide your name, contact number, CNIC, and medical concern.<br/>
                        Confirm Your Booking – Submit the request, and you will receive a confirmation via email or SMS.</Typography>
                </Box>
                <Box>
                    <Typography sx={{ color: '#005E7D', marginTop: '20px', fontSize: '17px', fontWeight: '600' }}>
                        2- Are my medical records secure?
                    </Typography>
                    <Typography sx={{marginTop:'2px',fontFamily:'sans-serif'}}>
                    Yes, your medical records are completely secure. We use a cloud-based database with built-in security features, including end-to-end encryption, access control, and automated backups to ensure the safety and privacy of your data. Only authorized doctors and medical staff can access your records, and all data transmissions are encrypted to prevent unauthorized access. Your privacy is our top priority.
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={{ color: '#005E7D', marginTop: '20px', fontSize: '17px', fontWeight: '600' }}>
                        3- Can I access my past medical records?
                    </Typography>
                    <Typography sx={{marginTop:'2px',fontFamily:'sans-serif'}}>
                    Yes, you can access your past medical records through our secure digital system. Simply log in to your account and enter your registered CNIC to retrieve your medical history. Our platform ensures that all your records, including diagnoses, treatment plans, and prescriptions, are stored safely in our database. If you are an admitted patient, you can view your complete medical history anytime, ensuring seamless and hassle-free access to your healthcare information.
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={{ color: '#005E7D', marginTop: '20px', fontSize: '17px', fontWeight: '600' }}>
                        4- Is this digital medical Record is benefit for me?
                    </Typography>
                    <Typography sx={{marginTop:'2px',fontFamily:'sans-serif'}}>
                    Yes, our digital medical record system offers numerous benefits for you. It allows you to securely store and access your complete medical history anytime, eliminating the risk of losing paper records. You can quickly retrieve past diagnoses, treatment plans, and prescriptions, making it easier for doctors to provide accurate and efficient care. Additionally, it enhances coordination between healthcare providers, reduces paperwork, and ensures that your medical information is always up-to-date, improving the overall quality of your healthcare experience.                    </Typography>
                </Box>
                <Box>
                    <Typography sx={{ color: '#005E7D', marginTop: '20px', fontSize: '17px', fontWeight: '600' }}>
                    5- Can I consult a doctor 24/7?
                    </Typography>
                    <Typography sx={{marginTop:'2px',fontFamily:'sans-serif'}}>
                    The availability of doctors depends on our hospital's schedule. While some doctors may have specific consultation hours, we do offer 24/7 emergency support and online appointment booking. You can check the availability of doctors through our platform and schedule an appointment accordingly. In case of an emergency, our medical team is always ready to assist you.
                    </Typography>
                    </Box>
            </Box>
            
        </Box>
    )
}

export default QuestionAnswer
