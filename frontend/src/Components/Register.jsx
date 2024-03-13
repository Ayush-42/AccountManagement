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
import { registerUserInfo } from '../services.jsx';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select } from '@mui/material';

const defaultTheme = createTheme();
const regions = [
    {
        value: 'UttarPradesh',
        label: 'UP',
    },
    {
      value: 'TamilNadu',
      label: 'TN',
    },
    {
      value: 'Delhi',
      label: 'DL',
    },
    {
      value: 'Mharashtra',
      label: 'MH',
    },
  ];
  const profiles = [
      {
          value: 'SuperAdmin',
          label: 'S-Admin',
        },
        {
            value: 'Admin',
            label: 'Admin',
        },
        {
            value: 'Sales',
            label: 'Sales',
        },
    ];
    
    export default function Register(){
        const [fname,setFname]=useState(null);
        const [lname,setLname]=useState(null);
        const [email,setEmail]=useState(null);
        const [pass,setPass]=useState(null);
        const [region, setRegion] = useState('UttarPradesh');
        const [profile, setProfile] = useState('Sales');
        const [showPassword, setShowPassword] = React.useState(false);
        const navigate = useNavigate();

    const handleRegionChange = (event) => {
      console.log(event.target, '---------')
        const selectedRegion = event.target.value;
        setRegion(selectedRegion);
    }
    const handleProfileChange = (event) => {
      console.log(event.target, '---------')
        const selectedProfile = event.target.value;
        setProfile(selectedProfile);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData()
    data.append('fname',fname)
    data.append('lname',lname)
    data.append('email',email)
    data.append('password',pass)
    data.append('region',region)
    data.append('profile',profile)

    let isAnyFieldEmpty = false;

    for(const value of data.values()) {
        if (value === 'null'|| value ==='') {
          isAnyFieldEmpty = true;
          break; 
        }
      }
    try{
        if(!isAnyFieldEmpty){
          const postData = await registerUserInfo(data)
          alert('success')
          console.log(postData,'---------------------response')
          navigate('/signin')
        }
        else{
            alert('All fields are mandotary to be filled');
        }
      }catch(error){
        console.log(error,'---------------------error in formData')
      }

      console.log(data.region, '--------region')
  };

    return (
      <>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>  
                    <InputLabel required  id="demo-simple-select">Region</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={region}
                        label="Region"
                        fullWidth
                        onChange={handleRegionChange}
                      >
                        {regions.map((option) => (
                        <MenuItem key={option?.value} value={option?.value}>
                          {option?.label}
                        </MenuItem>
                      ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth> 
                    <InputLabel required  id="demo-simple-select">Profile</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={profile}
                        label="Profile"
                        fullWidth
                        onChange={handleProfileChange}
                      >
                        {profiles.map((option) => (
                        <MenuItem key={option?.value} value={option?.value}>
                          {option?.label}
                        </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => setPass(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              aria-label="toggle password visibility"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I accept the terms and conditions."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </>
    );
}