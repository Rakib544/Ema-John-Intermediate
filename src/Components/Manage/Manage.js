import { Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import fakeData from '../../fakeData'
const Manage = () => {
    const handleAddProducts = () => {
        fetch(`https://murmuring-beyond-43171.herokuapp.com/addProducts`, {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(fakeData)
        })
    }
    return (
        <Container maxWidth="md" align="center">
            <Typography variant="h5" color="primary" align="center">
                Products Add Here
            </Typography>
            <Button onClick={handleAddProducts} style={{marginTop: '20px'}} variant="contained" color="primary">Add Products</Button >
        </Container>
    );
};

export default Manage;