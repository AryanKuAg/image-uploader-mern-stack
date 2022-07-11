import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import "./UploadImage.css"
import "./LinearProgress.css"


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));



export default function CustomizedProgressBars(props) {
  return (
    <div className='uploadImage__box lp__box'>
      <p>Uploading...</p>
      {/* <Box sx={{ flexGrow: 1 }}> */}
   
      <BorderLinearProgress variant="determinate" value={props.value} />
    {/* </Box> */}
    </div>
      
       
   
  );
}
