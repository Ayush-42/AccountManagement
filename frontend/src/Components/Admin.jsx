import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchUserInfo } from '../services';

export default function Admin(){
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <React.Fragment>
                      <Typography variant="h4" gutterBottom>
                        Sales Employee
                      </Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Eid</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Profile</TableCell>
                            <TableCell>Region</TableCell>
                            <TableCell>Email</TableCell>
                            {/* <TableCell align="right">Action</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users?.map((user) => (
                            <TableRow key={user.eid}>
                              <TableCell>{user.eid}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.profile}</TableCell>
                              <TableCell>{user.region}</TableCell>
                              <TableCell>{user.email}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </React.Fragment>
                  </Paper>
              </Grid>
            </Grid>
        </>
    )
}