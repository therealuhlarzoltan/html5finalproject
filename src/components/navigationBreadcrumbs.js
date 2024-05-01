import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink from react-router-dom

export default function NavigationBreadcrumbs({ color }) {
    const handleClick = (event, url) => {
        event.preventDefault();
        // Navigate to the specified URL using React Router Dom
        window.location.href = url;
    };

    return (
        <div role="presentation">
            <Breadcrumbs separator={"|"} aria-label="breadcrumb" sx={{ fontSize: 35 }} color={color}>
                <Link underline="hover" color="inherit" component={RouterLink} to="/">
                    Home
                </Link>
                <Link
                    color="inherit"
                    underline="hover"
                    component={RouterLink}
                    to="/tables"
                >
                    Tables
                </Link>
                <Link
                    color="inherit"
                    underline="hover"
                    component={RouterLink}
                    to="/reservations"
                >
                    Reservations
                </Link>
            </Breadcrumbs>
        </div>
    );
}
