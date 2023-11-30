import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: '#0a040a', color: 'white', py: 3 }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Links</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', padding: 0, m: 0 }}>
                            <li><Link href="/home" color="inherit">Home</Link></li>
                            <li><Link href="/about" color="inherit">About</Link></li>
                            <li><Link href="/Services" color="inherit">Services</Link></li>
                            <li><Link href="/Contact" color="inherit">Contact</Link></li>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Services</Typography>
                        <Box component="ul" sx={{ listStyle: 'none', padding: 0, m: 0 }}>
                            <li><Link href="/ship" color="inherit">Shipping</Link></li>
                            <li><Link href="/track" color="inherit">Tracking</Link></li>
                            <li><Link href="/Rates" color="inherit">Rates</Link></li>
                            <li><Link href="/FAQ" color="inherit">FAQ</Link></li>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6">Contact</Typography>
                        <Typography>
                            Address: 6534 Sherbrooke, Montreal,QC, H2RO8Y
                        </Typography>
                        <Typography>
                            Phone: (123) 456-7890
                        </Typography>
                        <Typography>
                            Email: info@deliveryservice.com
                        </Typography>
                    </Grid>
                </Grid>
                <Typography textAlign="center" sx={{ mt: 3 }}>
                    &copy; {currentYear} Delivery Service, Inc.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;