import { Box, Typography } from '@mui/material'
import React from 'react'
import Question from './Question'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
Question
const Questions = () => {
    return (
        <Box sx={{ backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${assets.bgImg})`,backgroundRepeat:'no-repeat',backgroundAttachment:'fixed',backgroundSize:'cover', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ mt: 2 ,display:'flex',flexDirection:'column',alignItems:'center'}}>
                <Typography variant='h5' sx={{ color: 'white', fontFamily: 'sans-serif', fontWeight: '700', fontSize:'22px' }}>FREQUENTLY ASKED QUESTIONS</Typography>
                <Box sx={{display:'flex',flexDirection:'column',gap:'10px',mt:5,mb:5}}>
                    {Question.map((card) => (
                        <Box key={card.id} sx={{   pl: 2, pr: 2, pt: 1, pb: 1, borderRadius: '14px',cursor:'pointer' }}>
                            <Typography sx={{ color: 'white', fontWeight: '700', fontSize: '15px', }}><span style={{color:'red',marginRight:'2px',fontWeight:'1000'}}>.</span>{card.Question}</Typography>
                        </Box>
                    ))}
                </Box>
                <NavLink to='/FrequentlyQuestion'>
                <Box component='button' sx={{backgroundColor:'red',p:1,width:'120px',color:'white',border:'none',borderRadius:'5px',m:2,mb:2}}>
                    View All
                </Box>
                </NavLink>
                
            </Box>
        </Box>
    )
}

export default Questions
