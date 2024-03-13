import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchClaimInfo, fetchUserInfo } from '../services';
import { useNavigate } from 'react-router-dom';

export default function Sales(){
    const [users, setUsers] = useState([]);
    const [claims, setClaims] = useState([]);
    const navigate = useNavigate();

  const handleClick = () => {
    const eid = users.filter(user => user?.eid);
    console.log(eid, '------------users[0]?.eid')
    navigate('/claim-form', { state: { employeeId: eid } });
  };
    const fetchData = async () => {
        try {
          const response = await fetchUserInfo();
          if (response?.data) {
            setUsers(response?.data?.userInfo);
          }
          // console.log(response, "---------------------response");
        } catch (error) {
          console.log(error, "---------------------error in formData");
        }
    };

    const fetchClaim = async () => {
        try {
          const response = await fetchClaimInfo();
          const eid = users.filter(user => user?.eid);
          console.log(eid,'--------------users')
          if (response?.data) {
            setClaims(response?.data?.claimInfo);
          }
          // console.log(response, "---------------------response");
        } catch (error) {
          console.log(error, "---------------------error in ClaimData");
        }
      };
    

    useEffect(() => {
        fetchData();
        fetchClaim();
    }, []);

    return(
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <React.Fragment>
                      <Typography variant="h4" gutterBottom>
                        Claim Detail
                      </Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Cid</TableCell>
                            <TableCell>ActualAmount</TableCell>
                            <TableCell>ClaimAmount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>ClaimType</TableCell>
                            {/* <TableCell align="right">Action</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {claims?.map((claim) => (
                            <TableRow key={claim.cid}>
                              <TableCell>{claim.cid}</TableCell>
                              <TableCell>{claim.actualAmount}</TableCell>
                              <TableCell>{claim.claimAmount}</TableCell>
                              <TableCell>{claim.status}</TableCell>
                              <TableCell>{claim.claimType}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </React.Fragment>{" "}
                    <br></br>
                    <Button variant="contained" onClick={handleClick}>
                      RaiseClaim
                    </Button>
                  </Paper>
              </Grid>
            </Grid>
        </>
    )
}