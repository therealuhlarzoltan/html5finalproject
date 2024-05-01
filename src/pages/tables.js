import React, { useState, useEffect } from "react";
import TableCard from "../components/tablecard";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Grid from '@mui/material/Unstable_Grid2';
import {Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import NavigationBreadcrumbs from "../components/navigationBreadcrumbs";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
function Tables() {
    const [tables, setTables] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [newTableName, setNewTableName] = useState("");
    const [newTableCapacity, setNewTableCapacity] = useState(0);
    const [enableId, setEnableId] = useState(0);
    useEffect(() => {
        getTables();
    }, []);


    function displayErrorMsg(msg) {
        setSuccessMsg("");
        setErrorMsg(msg);
    }

    function displaySuccessMsg(msg) {
        setErrorMsg("");
        setSuccessMsg(msg);
    }
    function removeTableCallback(id) {
        const index = tables.findIndex(t => t.id === id);
        if (index != -1) {
            let newTables = [...tables];
            newTables.splice(index, 1);
            setTables(newTables);
            displaySuccessMsg("Table deleted!");
        }
    }

    function disableTableCallback(id) {
        const index = tables.findIndex(t => t.id === id);
        if (index != -1) {
            let newTables = [...tables];
            newTables.splice(index, 1);
            setTables(newTables);
            setSuccessMsg("Table disabled!")
        }
    }

    async function enableTable() {
        const enableUrl = `http://localhost:8080/table/table/enable`;
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: enableId
            })
        };
        try {
            const response = await fetch(enableUrl, options);
            if (response.ok) {
                displaySuccessMsg("Table enabled!");
                getTables();
                setEnableId(0);
            } else {
                displayErrorMsg(`Failed to enable table with id of ${enableId}!`);
            }
        } catch (error) {
            displayErrorMsg("Something went wrong...");
        }
    }

    async function createTable() {
        const postUrl = "http://localhost:8080/table/table";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newTableName,
                capacity: newTableCapacity
            })
        };
        try {
            const response = await fetch(postUrl, options);
            if (response.ok) {
                displaySuccessMsg("Table created!");
                setNewTableName("");
                setNewTableCapacity(0);
                getTables();
            } else {
                displayErrorMsg("Failed to create table - invalid arguments provided!");
            }
        } catch (error) {
            displayErrorMsg("Something went wrong...");
        }
    }

    async function getTables() {
        const getUrl = "http://localhost:8080/table/table/getAll";
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await fetch(getUrl, options);
            const data = await response.json();
            if (response.ok) {
                setTables(data);
            } else {
                displayErrorMsg(data);
            }
        } catch (error) {
            displayErrorMsg("Something went wrong...");
        }
    }
    return (
        <Grid container  spacing={2} sx={{maxWidth: "100%", bgcolor: "saddlebrown"}}>
            <Grid xs={12} display="flex" direction="row" alignItems="center" justifyContent="center">
                <NavigationBreadcrumbs color="beige"/>
            </Grid>
            { successMsg && <Grid xs={12} display="flex" direction="row" alignItems="center">
                <Alert severity="success" variant="filled" sx={{display: 'flex',
                    alignItems: 'center', margin: "auto", mb: 2, minWidth: "30%", fontSize: 20, fontWeight: "bold"}}
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                   setSuccessMsg("")
                               }}
                               sx={{margin: "auto"}}
                           >
                               <CloseIcon fontSize="inherit" />
                           </IconButton>
                       }
                >
                    {successMsg}
                </Alert>
            </Grid> }

            { errorMsg && <Grid xs={12} display="flex" direction="row" alignItems="center">
                <Alert severity="error" variant="filled" sx={{display: 'flex',
                    alignItems: 'center', margin: "auto", mb: 2, minWidth: "30%", fontSize: 20, fontWeight: "bold" }}
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                   setErrorMsg("")
                               }}
                               sx={{margin: "auto"}}
                           >
                               <CloseIcon fontSize="inherit" />
                           </IconButton>
                       }
                >
                    {errorMsg}
                </Alert>
            </Grid> }
            <Grid xs={6} container display="flex" direction="column" alignItems="center" justifyContent="flex-start">
                <Paper elevation={3} square={false} sx={{padding: 5, margin: 3, width: "70%", bgcolor: "burlywood"}}>
                <Typography variant="h4" sx={{mb: 1, ml: 1}}>Create Table</Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Stack direction={"row"} sx={{margin: 0, padding: 0}}>
                        <TextField
                            sx={{margin: 0}}
                            required
                            label="Name"
                            value={newTableName}
                            onChange={(event) => setNewTableName(event.target.value)}
                        />
                        <TextField
                            required
                            label="Capacity"
                            type="number"
                            value={newTableCapacity}
                            onChange={(event) => setNewTableCapacity(event.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                </Stack>
                    <Button sx={{mt: 2, ml: 1}} size="medium" color="primary" variant="contained" onClick={createTable}>Create <AddBoxIcon sx={{ml: 1}}/></Button>
                </Box>
                </Paper>
                <Paper elevation={3} square={false} sx={{width: "70%", padding: 5, margin: 3, bgcolor: "burlywood"}}>
                <Typography variant="h4" sx={{mb: 2, ml: 1}}>Enable Table</Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Stack direction="row" display="flex" alignItems="center">
                        <TextField
                            required
                            label="Table Id"
                            type="number"
                            value={enableId}
                            onChange={(event) => setEnableId(event.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    <Button size="medium" color="success" variant="contained" onClick={enableTable} sx={{ml: 1}}>Enable <CheckCircleOutlineIcon sx={{ml: 1}} /></Button>
                    </Stack>
                </Box>
                </Paper>
            </Grid>
            <Grid xs={6} container display="flex" direction="column" alignItems="center" justifyContent="flex-start">
                <Paper elevation={3} square={false} sx={{width: "70%", padding: 5, margin: 3, maxHeight: "100vh", overflowY: "auto", bgcolor: "burlywood"}}>
                <Typography variant="h4" sx={{mb:2, ml: 1}}>Active Tables</Typography>
                <List>
                    {tables?.map((table) => (
                        <ListItem key={table.id}>
                            <TableCard id={table.id}
                                       name={table.name}
                                       capacity={table.capacity}
                                       deleteSuccessHandlerCallback={removeTableCallback}
                                       disableSuccessHandlerCallback={disableTableCallback}
                                       deleteErrorHandlerCallback={displayErrorMsg}
                                       disableErrorHandlerCallback={displayErrorMsg}
                                       backgroundColor={"darkgoldenrod"}
                            />
                        </ListItem>
                    ))}
                </List>
                </Paper>
            </Grid>
        </Grid>
    );
}
export default Tables;