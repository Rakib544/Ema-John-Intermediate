import { Button, ButtonBase, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';

const CartSingleProduct = ({ product, handleRemoveFromCart }) => {
    const { name, img, stock, seller, price } = product;
    return (
        <>
            <Container maxWidth="lg">
                <Grid container gutterBottom>
                    <Grid item xs="12" sm="12" md="12" lg="4" align="center">
                        <ButtonBase>
                            <img src={img} alt={name} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs="12" sm="12" md="12" lg="8">
                        <Typography variant="subtitle1" gutterBottom><strong>{name}</strong></Typography>
                        <Typography variant="subtitle2" gutterBottom>By - {seller}</Typography>
                        <Typography variant="h6" gutterBottom>$ {price}</Typography>
                        <Typography variant="subtitle1" gutterBottom>Only {stock} left - Order soon</Typography>
                        <Button variant="outlined" color="primary" onClick={() => handleRemoveFromCart(product)}>Remove Cart</Button>
                    </Grid>
                </Grid>
            </Container>
            <hr />
        </>
    );
};

export default CartSingleProduct;