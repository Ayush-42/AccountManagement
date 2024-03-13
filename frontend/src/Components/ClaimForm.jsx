import React, { useEffect, useState } from "react";
import { postClaimInfo, updateClaimInfo } from "../services";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const claims = [
    {
        value: 'Transport',
        label: 'Travel',
      },
      {
          value: 'StayRent',
          label: 'Hotel',
      },
      {
          value: 'Gifts',
          label: 'Gifts',
      },
  ];

export default function ClaimForm(){

    const [claimType, setClaimType] = useState('Transport');
    const [actualAmount, setActualAmt]= useState();
    const [claimAmount, setClaimAmt]= useState();
    const [status, setStatus]= useState();
    const navigate = useNavigate();
    const location = useLocation();
  const eid = location.state?.employeeId;
  console.log(eid, location,'----------------------user');
  const handleClaimChange = (event) => {
    console.log(event.target, '---------')
      const selectedType = event.target.value;
      setClaimType(selectedType);
  }
    const handleSubmit = async(event) =>{
        event.preventDefalut();
        const formData= new FormData();
        formData.append('claimType',claimType);
        formData.append('actualAmount',actualAmount);
        formData.append('claimAmount',claimAmount);
        formData.append('status',status);
        formData.append('eid',eid);

        let isAnyFieldEmpty = false;
        console.log(formData,'-----------------formData')
        for (const value of formData.values()) {
            if (value === 'null'|| value ==='') {
              isAnyFieldEmpty = true;
              break; 
            }
          }
          try{
            if(!isAnyFieldEmpty && !location){
            const postClaim = await postClaimInfo(formData);
            alert('success')
             console.log(postClaim,'-----------------------------postClaim')
             navigate('/dashboard');
            }
            else{
              formData.append("_id", location?.state?._id);
              const updateData = await updateClaimInfo(formData);
              console.log(updateData, "---------------------response");
              navigate("/dashboard");
            }
          }catch(err){
            console.log(err,'------------------------error in postClaim')
          }
        };

        useEffect(()=>{
          if(location){
            const rowInfo = location?.state
            setClaimType(rowInfo?.claimType)
            setActualAmt(rowInfo?.actualAmount)
            setClaimAmt(rowInfo?.claimAmount)
            setStatus(rowInfo?.status)
          }
        },[location])

    return (
        <>
        <Paper
        sx={{ p: 2, display: "flex", flexDirection: "column" }}
      >
        <React.Fragment>
                          <Box
                            sx={{
                              marginTop: 8,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Typography component="h1" variant="h5">
                              Raise Claim
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
                                    name="actualAmount"
                                    required
                                    fullWidth
                                    id="actualAmount"
                                    label="Actual Amount"
                                    value={actualAmount}
                                    autoFocus
                                    onChange={(e) => setActualAmt(e.target.value)}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    required
                                    fullWidth
                                    id="claimAmount"
                                    label="Claim Amount"
                                    name="claimAmount"
                                    value={claimAmount}
                                    autoComplete="family-name"
                                    onChange={(e) => setClaimAmt(e.target.value)}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    required
                                    fullWidth
                                    id="status"
                                    label="Status"
                                    name="status"
                                    autoComplete="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <FormControl fullWidth>
                                    <InputLabel
                                      required
                                      id="demo-simple-select"
                                    >
                                      Claim
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={claimType}
                                      label="Claim"
                                      fullWidth
                                      onChange={handleClaimChange}
                                    >
                                      {claims.map((option) => (
                                        <MenuItem
                                          key={option?.value}
                                          value={option?.value}
                                        >
                                          {option?.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                              >
                                Claim
                              </Button>
                            </Box>
                          </Box>
                    </React.Fragment>
                    </Paper>
        </>
    )
}