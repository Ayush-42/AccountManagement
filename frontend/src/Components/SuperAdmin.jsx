import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchClaimInfo, fetchUserInfo, postLevelInfo } from '../services';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';

export default function SuperAdmin(){
    const [users, setUsers] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Sales1'); 
    const [selectedOption1, setSelectedOption1] = useState('Admin1'); 
    const [selectedOption2, setSelectedOption2] = useState('SuperAdmin1'); 
    const [options, setOptions] = useState([]); 
    const [options1, setOptions1] = useState([]); 
    const [options2, setOptions2] = useState([]); 
    const [claims, setClaims] = useState([]);
    const [flag, setFlag]=useState(false)
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
          const response = await fetchUserInfo();
          if (response?.data) {
            setUsers(response?.data?.userInfo);
            return response?.data?.userInfo
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

    const dropdownRender = (param) => {
        const salesPersons = param.filter(user => user?.profile === 'Sales' && ( !user?.hierarchyExists || user?.hierarchyExists===false));
        const options = salesPersons.map(user => (
          <option key={user.eid} value={user.role}>
            {user.role}
          </option>
        ));
        setOptions(options);
        const adminPersons = param.filter(user => user?.profile === 'Admin' && ( !user?.hierarchyExists || user?.hierarchyExists===false));
        const options1 = adminPersons.map(user => (
          <option key={user.eid} value={user.role}>
            {user.role}
          </option>
        ));
        setOptions1(options1);
        // const sadminPersons = users.filter(user => user?.profile === 'SuperAdmin' && user?.hierarchyExists===false);
        // const options2 = sadminPersons.map(user => (
        //   <option key={user.eid} value={user}>
        //     {user.role}
        //   </option>
        // ));

        const options2 = param.filter(user => user?.profile === 'SuperAdmin' &&  ( !user?.hierarchyExists || user?.hierarchyExists===false)).map(user => (
          <option key={user.eid} value={user.role}>
            {user.role}
          </option>
        ));
        setOptions2(options2);
    }

    const handleEdit = (row) => {
        console.log(row, '---------------row to send')
        navigate('/claim-form', { state: row });
      }

    useEffect(() => {
        const fetchDataAndRenderDropdown = async () => {
          try {
            let res = await fetchData();
            dropdownRender(res);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchDataAndRenderDropdown();
        fetchClaim();
      }, [flag]);

      const handleChangeSadmin = (event) => {
        setSelectedOption(event.target.value); 
      };
      const handleChangeSadmin1 = (event) => {
        setSelectedOption1(event.target.value); 
      };
      const handleChangeSadmin2 = (event) => {
        setSelectedOption2(event.target.value); 
      };

      const handleClick = async () => {
        const payload={
            L1 : selectedOption,
            L2 : selectedOption1,
            L3 : selectedOption2
        }

        try{
            const response = await postLevelInfo(payload);
            setFlag(!flag)
            console.log(response,'---------------payload');
        }catch(error){
            console.log(error,'--------------------error in payload')
        }
      }

    return (
        <>
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                    <React.Fragment>
                      <Typography variant="h4" gutterBottom>
                        Employees Detail
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
                              <TableCell>{user.fname}</TableCell>
                              <TableCell>{user.profile}</TableCell>
                              <TableCell>{user.region}</TableCell>
                              <TableCell>{user.email}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </React.Fragment>
              </Grid><br></br><br></br>
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
                            <TableCell align="right">Action</TableCell>
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
                              <TableCell align='right'><ModeEditOutlineOutlinedIcon onClick={()=>handleEdit(claim)}/></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </React.Fragment>{" "}
                    <br></br>
                  </Paper>
              </Grid>
              </Grid><br></br><br></br>
              <Grid container spacing={3}>
                    <div>
                      <label>L1: </label>
                      <select value={selectedOption} onChange={handleChangeSadmin}>
                        {options}
                      </select>
                    </div><br></br>
                    <div>
                      <label>L2: </label>
                      <select value={selectedOption1} onChange={handleChangeSadmin1}>
                        {options1}
                      </select>
                    </div><br></br>
                    <div>
                      <label>L3: </label>
                      <select value={selectedOption2} onChange={handleChangeSadmin2}>
                        {options2}
                      </select>
                      <br></br>
                    </div>
                    <Button variant="contained" onClick={handleClick}>
                      SetHierarchy
                    </Button>
             </Grid>
        </>
    )
}