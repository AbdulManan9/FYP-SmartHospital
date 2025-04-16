import React from 'react'
import { assets } from '../../assets/assets'
import { Box, Typography } from '@mui/material'
const AboutUs = () => {
  return (
    <>
    <Box sx={{backgroundColor:'#f2efef'}}>
        {/* section 1 */}
    <Box sx={{display:'flex',mt:3,flexDirection:{xs:'column',md:'row'},alignItems:{sm:'center',md:'normal'}}}>
        <Box sx={{width:{xs:'100%',md:'50%'},backgroundColor:'#EFF6FC'}}>
            <Box sx={{margin:'50px 20px'}}>
            <Typography variant='h3' sx={{color:'#005E7D'}}> About Us</Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>We are one of the leading community-based healthcare providers in our country, committed to innovation, research, and education.</Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>Our goal is to provide the best facilities to our patients, ensuring high-quality and efficient healthcare services. We have integrated advanced technologies and modern features into our hospital system to enhance patient care, streamline hospital operations, and create a seamless and hassle-free experience for everyone. </Typography>
            </Box>
        </Box>
        <Box sx={{width:{xs:'100%',md:'50%'}}}>
            <img style={{width:'100%',height:'100%'}} src={assets.AboutUs}/>
        </Box>
    </Box>


    {/* section 2 */}
    <Box sx={{display:'flex',mt:3,flexDirection:{xs:'column-reverse',md:'row'},alignItems:{sm:'center',md:'normal'}}}>
    <Box sx={{width:{xs:'100%',md:'50%'}}}>
            <img style={{width:'100%',height:'100%'}} src={assets.staff}/>
        </Box>
        <Box sx={{width:{xs:'100%',md:'50%'},backgroundColor:'#EFF6FC'}}>
            <Box sx={{margin:'50px 20px'}}>
            <Typography variant='h3' sx={{color:'#005E7D'}}> Who we are</Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>Our staff is highly professional, punctual, and dedicated to providing the best patient care.</Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>We have a team of experienced doctors, nurses, and medical professionals who are committed to ensuring patient comfort and well-being.
            Our healthcare team is not only skilled but also compassionate, treating every patient with care, respect, and empathy. </Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>We believe in teamwork and collaboration, ensuring that our patients receive timely and accurate medical attention.
            With a strong focus on patient satisfaction, our staff works tirelessly to maintain a smooth and efficient hospital experience.</Typography>

            </Box>
        </Box>
    </Box>



    {/* section 3 */}
    <Box sx={{display:'flex',mt:3,flexDirection:{xs:'column',md:'row'},alignItems:{sm:'center',md:'normal'}}}>
    
        <Box sx={{width:{xs:'100%',md:'50%'},backgroundColor:'#EFF6FC'}}>
            <Box sx={{margin:'50px 20px'}}>
            <Typography variant='h3' sx={{color:'#005E7D'}}> Our Strategy</Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>Our strategy focuses on integrating advanced technology with healthcare to provide efficient, accurate, and patient-centered services.</Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>We continuously innovate and upgrade our hospital facilities to ensure the highest standard of medical care.
            By leveraging smart hospital systems, we aim to reduce wait times, streamline patient management, Patient medical Record Management,and enhance the overall healthcare experience. </Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>Our approach combines research, education, and cutting-edge medical advancements to deliver the best possible treatments.
            We prioritize patient satisfaction by implementing digital solutions for seamless appointment booking, real-time doctor availability, and hassle-free medical consultations..</Typography>

            </Box>
        </Box>
        <Box sx={{width:{xs:'100%',md:'50%'}}}>
            <img style={{width:'100%',height:'100%'}} src={assets.strategy}/>
        </Box>
    </Box>


    {/* section 4 */}
    <Box sx={{display:'flex',mt:3,mb:3,flexDirection:{xs:'column-reverse',md:'row'},alignItems:{sm:'center',md:'normal'}}}>
    <Box sx={{width:{xs:'100%',md:'50%'}}}>
            <img style={{width:'100%',height:'100%'}} src={assets.History}/>
        </Box>
        <Box sx={{width:{xs:'100%',md:'50%'},backgroundColor:'#EFF6FC'}}>
            <Box sx={{margin:'50px 20px'}}>
            <Typography variant='h3' sx={{color:'#005E7D'}}> Our History</Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>Our journey began with a vision to revolutionize healthcare by integrating technology with medical excellence</Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>Founded with the mission to provide high-quality and accessible healthcare, we have grown into a leading smart hospital in the country.
            From our humble beginnings, we have continuously evolved, embracing innovation to enhance patient care and hospital efficiency.</Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>Over the years, we have expanded our facilities, introduced state-of-the-art medical equipment, and built a dedicated team of expert doctors and healthcare professionals.
            Our commitment to research, education, and patient-centered care has made us a trusted name in the healthcare industry.</Typography>
            <Typography sx={{fontSize:'18px',mt:3}}>With every milestone, we strive to improve and adapt, ensuring our hospital remains at the forefront of modern medical advancements.</Typography>

            </Box>
        </Box>
    </Box>

    </Box>
    </>
  )
}

export default AboutUs
