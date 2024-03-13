import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { verifyUserInfo } from '../services.jsx';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function SignIn() {
  const [eid,setEid]=useState();
  const [password,setPassword]=useState();
  const navigate = useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData();
    // console.log(eid,password,'-------------------')
    data.append('eid',eid || '')
    data.append('password',password || '')

    try{
      if(eid && password){
        const postData = await verifyUserInfo(data)
        console.log(postData, '------------postData')
        alert('success')
        const userObj = postData?.data?.data;
        localStorage.setItem('data', JSON.stringify(userObj));
        console.log(postData,'---------------------loginresponse')
        if(data.profile==='SuperAdmin'){
          console.log('abac')
        }
        else if(data.profile==='Admin'){
            console.log('adsf')
        }else{
          console.log('dfa')
        }
        navigate('/dashboard');
      }
      else{
          alert('Fill eid and Password to Login');
      }
    }catch(error){
      console.log(error,'---------------------error in login formData')
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="eid"
              label="EmployeeId"
              name="eid"
              autoComplete="eid"
              onChange={(e) => setEid(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}