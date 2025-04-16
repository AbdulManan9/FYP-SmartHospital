import React, { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Loop } from '@mui/icons-material';
import { assets } from '../../assets/assets';


const Header = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false // Disable default arrows
    };

    return (
        <Box>
            <Box sx={{ position: 'relative', width: '100%', maxWidth: '100%', mx: 'auto' }}>
            {/* Left Button */}
            <Button 
                onClick={() => sliderRef.current.slickPrev()} 
                sx={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', bgcolor: '#012A47', color: 'white', zIndex: 10 }}
            >
                <ArrowBackIos />
            </Button>

            {/* Slider */}
            <Slider ref={sliderRef} {...settings}>
            <Box sx={{textAlign: 'center',backgroundImage:`linear-gradient(rgb(255 255 255 / 50%), rgb(181 178 178 / 50%)), url(${assets.header1Img})`,height:'90vh',minHeight:'400px',maxHeight:'900px',backgroundSize:'cover',backgroundRepeat:'no-repeat', color: 'white', }}>
                    <Typography variant="h3" fontWeight='700' sx={{color:'#005E7D',mt:10}}>Book an Appointment</Typography>

                    <Typography sx={{width:'70%',margin:'auto',color:'black',mt:5,fontWeight:700}}>Skip the waiting lines and take control of your health with our seamless online appointment booking system. Connect with expert doctors, choose your preferred time, and get the care you need—all from the comfort of your home. Your well-being is just a click away</Typography>
                    <Button variant="contained" sx={{ mt: 2, bgcolor: '#005E7D',mt:5}}>Book Now</Button>
                </Box>
                <Box sx={{textAlign: 'center',backgroundImage:`linear-gradient(rgb(255 255 255 / 50%), rgb(181 178 178 / 50%)), url(${assets.header2Img})`,height:'90vh',minHeight:'400px',maxHeight:'900px',backgroundSize:'cover',backgroundRepeat:'no-repeat', color: 'white'}}>
                    <Typography variant="h3" fontWeight='700' sx={{color:'#005E7D',mt:10}}>Smart Digital Health Records & Progress Monitoring</Typography>

                    <Typography sx={{width:'70%',margin:'auto',color:'black',mt:5,fontWeight:600}}>Say goodbye to lost prescriptions and incomplete medical histories! Our platform allows doctors to securely store and manage patients' medical records online. With digitalized prescriptions and comprehensive progress tracking, doctors can easily review a patient's history and monitor improvements over time. Whether a patient returns after weeks or months, their medical data is just a click away—ensuring better diagnosis, efficient treatment, and seamless healthcare experiences.</Typography>
                    <Button variant="contained" sx={{ mt: 2, bgcolor: '#005E7D',mt:5}}>Book Now</Button>
                </Box>
                <Box sx={{textAlign: 'center',backgroundImage:`url(${assets.header1Img})`,height:'90vh',minHeight:'400px',maxHeight:'900px',backgroundSize:'cover',backgroundRepeat:'no-repeat', color: 'white'}}>
                    <Typography variant="h3" fontWeight='700' sx={{color:'#005E7D',mt:10}}>Access Your Medical Records Anytime, Anywhere</Typography>

                    <Typography sx={{width:'70%',margin:'auto',color:'black',mt:5,fontWeight:600}}>Stay informed about your health with our secure online medical records system. Patients can easily access their prescription history, treatment plans, and medical records anytime, ensuring transparency and convenience. No more lost prescriptions or forgotten treatments—your complete health history is just a click away.</Typography>
                    <Button variant="contained" sx={{ mt: 2, bgcolor: '#005E7D',mt:5}}>Medical Record</Button>
                </Box>
            </Slider>

            {/* Right Button */}
            <Button 
                onClick={() => sliderRef.current.slickNext()} 
                sx={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', bgcolor: '#012A47', color: 'white', zIndex: 10 }}
            >
                <ArrowForwardIos />
            </Button>
        </Box>
        </Box>
    );
};

export default Header;
