import React, {useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import PhoneIcon from '@mui/icons-material/Phone';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BadgeIcon from '@mui/icons-material/Badge';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import TimerIcon from '@mui/icons-material/Timer';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import PortraitIcon from '@mui/icons-material/Portrait';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';



function ReservationCard(props) {
    let {pId, pName, pContact, pBegin, pEnd, pTables,
        pPeople, deleteSuccessCallback, deleteErrorCallback, backgroundColor} = props;
    const [id, setId] = useState(pId);
    const [name, setName] = useState(pName);
    const [contact, setContact] = useState(pContact);
    const [begin, setBegin] = useState(pBegin);
    const [end, setEnd] = useState(pEnd);
    const [table, setTable] = useState(pTables);
    const [people, setPeople] = useState(pPeople);

    async function deleteReservation() {
        const deleteUrl = "http://localhost:8080/table/reservation";
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id
            })
        };
        try {
            const response = await fetch(deleteUrl, options);
            if (response.ok) {
                deleteSuccessCallback(id);
            } else {
                deleteErrorCallback(`Failed to delete reservation!`);
            }
        } catch (error) {
            deleteErrorCallback(`Failed to delete reservation!`);
        }
    }

    return(
    <Card sx={{ minWidth: "70%"}}>
        <CardContent sx={{backgroundColor: backgroundColor, padding: 2 }}>
                <Stack direction="column" display="flex">
                    <Typography gutterBottom variant="h5" component="div">
                        <BadgeIcon sx={{mr: 1}}/> Name: {name}
                    </Typography>
                   <Typography gutterBottom variant="h5" component="div">
                        <PhoneIcon sx={{mr: 1}}/> Contact: {contact}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        <TimerIcon sx={{mr: 1}}/> Start Time: {begin}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        <TimerOffIcon sx={{mr: 1}}/> End Time: {end}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        <PortraitIcon sx={{mr: 1}}/> People: {people}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Typography gutterBottom variant="h5" component="div" sx={{maxWidth: "40%"}}>
                            <TableRestaurantIcon sx={{mr: 1}}/> Tables:
                        </Typography>
                        <List>
                            {table && table.map(t => (
                                <ListItem key={t}>
                                    <Typography variant="h5">
                                        {t}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
            </Stack>
        </CardContent>
        <CardActions sx={{backgroundColor: backgroundColor, padding: 2}}>
            <Button variant="contained" size="small" color="error" onClick={deleteReservation} >Delete <DeleteForeverIcon sx={{ml: 1}} /></Button>
        </CardActions>
    </Card>);



}

export default ReservationCard;