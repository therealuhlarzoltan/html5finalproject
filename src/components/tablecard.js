import React from 'react';
import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HideSourceIcon from '@mui/icons-material/HideSource';

function TableCard(props) {
    let { deleteErrorHandlerCallback, deleteSuccessHandlerCallback, disableSuccessHandlerCallback,
    disableErrorHandlerCallback, backgroundColor } = props;
    const [id, setId] = useState(props?.id);
    const [name, setName] = useState(props?.name);
    const [capacity, setCapacity] = useState(props?.capacity);

    async function disableTable() {
        const disableUrl = `http://localhost:8080/table/table/disable`;
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
               id: id
            })
        };
        try {
            const response = await fetch(disableUrl, options);
            if (response.ok) {
                disableSuccessHandlerCallback(id);
            } else {
                disableErrorHandlerCallback(`Failed to disable table with id of ${id}!`);
            }
        } catch (error) {
            disableErrorHandlerCallback(`Failed to disable table with id of ${id}!`);
        }
    }

    async function deleteTable() {
        const deleteUrl = `http://localhost:8080/table/table?id=${id}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await fetch(deleteUrl, options);
            if (response.ok) {
                deleteSuccessHandlerCallback(id);
            } else {
                deleteErrorHandlerCallback(`Failed to delete table with id of ${id}!`);
            }
        } catch (error) {
            deleteErrorHandlerCallback(`Failed to delete table with id of ${id}!`);
        }
    }

    return(
    <Card sx={{ maxWidth: 350}}>
        <CardContent sx={{backgroundColor: backgroundColor, padding: 2 }}>
            <Stack direction="row" spacing={2}>
                <Avatar>{id}</Avatar>
                <Typography gutterBottom variant="h5" component="div">
                    Table Name: {name} Capacity: {capacity}
                </Typography>
            </Stack>
        </CardContent>
        <CardActions sx={{backgroundColor: backgroundColor, padding: 2}}>
            <Button variant="contained" size="small" color="error" onClick={deleteTable} >Delete <DeleteForeverIcon sx={{ml: 1}} /></Button>
            <Button variant="contained" size="small" color="secondary"  onClick={disableTable} >Disable <HideSourceIcon sx={{ml: 1}}/></Button>
        </CardActions>
    </Card>);
}

export default TableCard;