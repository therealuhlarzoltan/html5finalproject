import React, { useState, useEffect } from "react";
import TableCard from "../components/tablecard";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Grid from '@mui/material/Unstable_Grid2';
import {Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import NavigationBreadcrumbs from "../components/navigationBreadcrumbs";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BadgeIcon from '@mui/icons-material/Badge';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import TimerIcon from '@mui/icons-material/Timer';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import PortraitIcon from '@mui/icons-material/Portrait';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import ReservationCard from "../components/reservationCard";
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function Reservations() {
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [newName, setNewName] = useState("");
    const [newContact, setNewContact] = useState("");
    const [newBegin, setNewBegin] = React.useState(dayjs())
    const [newEnd, setNewEnd] = React.useState(dayjs())
    const [newPeople, setNewPeople] = useState(0);
    const [queryBegin, setQueryBegin] = React.useState(dayjs())
    const [queryEnd, setQueryEnd] = React.useState(dayjs())
    const [reservations, setReservations] = useState([]);


    function displayErrorMsg(msg) {
        setSuccessMsg("");
        setErrorMsg(msg);
    }

    function displaySuccessMsg(msg) {
        setErrorMsg("");
        setSuccessMsg(msg);
    }
    function removeReservationCallback(id) {
        const index = reservations.findIndex(r => r.id === id);
        if (index != -1) {
            let newReservations = [...reservations];
            newReservations.splice(index, 1);
            setReservations(newReservations);
            displaySuccessMsg("Reservation deleted!");
        }
    }

    async function createReservation() {
        const postUrl = "http://localhost:8080/table/reservation";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newName,
                contact: newContact,
                begin: newBegin.format('YYYY-MM-DDTHH:mm:ss[Z]'),
                end: newEnd.format('YYYY-MM-DDTHH:mm:ss[Z]'),
                person: newPeople
            })
        };
        try {
            const response = await fetch(postUrl, options);
            if (response.ok) {
                displaySuccessMsg("Reservation created!");
                if (queryBegin.isBefore(queryEnd) && reservations)
                    getReservations();
                setNewName("");
                setNewBegin(dayjs());
                setNewEnd(dayjs());
                setNewPeople(0);
                setNewContact("");
            } else {
                if (response.status == 400)
                    displayErrorMsg("Failed to create reservation - invalid arguments provided!");
                else if (response.status == 500)
                    displayErrorMsg("Failed to create reservation - no free tables!");
            }
        } catch (error) {
            displayErrorMsg("Something went wrong...");
        }
    }

    async function getReservations() {
        const bString = queryBegin.format('YYYY-MM-DDTHH:mm:ss').replace(/:/g, '%3A');
        const eString = queryEnd.format('YYYY-MM-DDTHH:mm:ss').replace(/:/g, '%3A');
        const getUrl = `http://localhost:8080/table/reservation/byTimeIntervall?begin=${bString}&end=${eString}`;
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
                setReservations(data);
            } else {
                displayErrorMsg("Invalid arguments provided!");
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
                    <Typography variant="h4" sx={{mb: 1, ml: 1}}>Create Reservation</Typography>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack direction={"column"} sx={{margin: 0, padding: 0}}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 1,}} />
                                <TextField required value={newName} onChange={(event) => setNewName(event.target.value)}  label="Name" variant="standard" />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 1,}} />
                                <TextField required value={newContact} onChange={(event) => setNewContact(event.target.value)}  label="Contact" variant="standard" />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker
                                            label="Start Time"
                                            value={queryBegin}
                                            onChange={(newValue) => {setNewBegin(newValue);}}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker
                                            label="End Time"
                                            value={queryEnd}
                                            onChange={(newValue) => {setNewEnd(newValue);}}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PortraitIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                                <TextField value={newPeople} onChange={(event) => setNewPeople(event.target.value)}  label="People" required type="number" variant="standard" />
                            </Box>
                        </Stack>
                        <Button sx={{mt: 2, ml: 1}} size="medium" color="primary" variant="contained" onClick={createReservation}>Create <AddBoxIcon sx={{ml: 1}}/></Button>
                    </Box>
                </Paper>
                <Paper elevation={3} square={false} sx={{width: "70%", padding: 5, margin: 3, bgcolor: "burlywood"}}>
                    <Typography variant="h4" sx={{mb: 2, ml: 1}}>Get Reservations</Typography>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Start Time"
                                        value={queryBegin}
                                        onChange={(newValue) => {setQueryBegin(newValue);}}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Stack direction="column" display="flex" alignItems="felx-start">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="End Time"
                                        value={queryEnd}
                                        onChange={(newValue) => {setQueryEnd(newValue);}}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <Button size="medium" color="success" variant="contained" onClick={getReservations} sx={{ml: 1, mt: 1}}>Get Reservations <SearchIcon sx={{ml: 1}} /></Button>
                        </Stack>
                    </Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid xs={6} container display="flex" direction="column" alignItems="center" justifyContent="flex-start">
                { reservations && <Paper elevation={3} square={false} sx={{width: "70%", maxHeight: "120vh", padding: 5, margin: 3, overflowY: "auto", bgcolor: "burlywood"}}>
                    <Typography variant="h4" sx={{mb:2, ml: 1}}>Active Reservations in Interval</Typography>
                    <List sx={{mt: 0, padding: 0}}>
                        {reservations.map((reservation) => (
                            <ListItem key={reservation.id}>
                                <ReservationCard pId={reservation.id}
                                           pName={reservation.name}
                                           pContact={reservation.contact != null ? reservation.contact : ""}
                                                 pBegin={reservation.begin}
                                                 pEnd={reservation.end}
                                                 pTables={reservation.tableName}
                                                 pPeople={reservation.person}
                                           deleteSuccessCallback={removeReservationCallback}
                                           deleteErrorCallback={displayErrorMsg}
                                           backgroundColor={"darkgoldenrod"}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>  }
            </Grid>
        </Grid>
    )
}

export default Reservations;