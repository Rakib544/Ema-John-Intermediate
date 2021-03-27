import { ButtonBase, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';

const ShowProductDetails = () => {
    const { key } = useParams()
    const [selectProduct, setSelectProduct] = useState({})
    useEffect(() => {
        fetch(`http://localhost:8080/product/${key}`)
        .then(res => res.json())
        .then(data => setSelectProduct(data))
    }, [key])

    const { name, img, seller, stock, price } = selectProduct;
    return (
        <div>
            <Container maxWidth="md">
                <Grid container gutterBottom align="center">
                    <Grid item lg={12} align="center">
                        <ButtonBase >
                            <img src={img} alt={name} />
                        </ButtonBase>
                    </Grid>
                    <Grid item lg={12}>
                        <Typography variant="subtitle1" gutterBottom><strong>{name}</strong></Typography>
                        <Typography variant="subtitle2" gutterBottom>By - {seller}</Typography>
                        <Typography variant="h6" gutterBottom>$ {price}</Typography>
                        <Typography variant="subtitle1" gutterBottom>Only {stock} left - Order soon</Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default ShowProductDetails;