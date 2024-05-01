import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import backgroundImage from '../static/openingBackgroundMedium.jpg';
import { Typography } from "@mui/material";
import NavigationBreadcrumbs from "../components/navigationBreadcrumbs";

function Home() {
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", position: "relative" }}>
            <Grid container spacing={0} sx={{ padding: 0, margin: 0 }}>
                <Grid item xs={12} justifyContent="center" alignItems="center" display="flex" style={{ position: 'relative', zIndex: 2, top: "90px" }}>
                    <NavigationBreadcrumbs color="beige" />
                </Grid>
                <Grid item xs={12} justifyContent="center" alignItems="center" display="flex" style={{ position: 'relative', zIndex: 2, top: "140px" }}>
                    <Typography letterSpacing={10} color="whitesmoke" variant="h1">Yokudlela</Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
