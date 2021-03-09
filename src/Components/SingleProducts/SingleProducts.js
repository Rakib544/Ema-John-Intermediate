import { Button, ButtonBase, ButtonGroup, Grid, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { useHistory } from 'react-router';

const SingleProducts = ({ product, handleAddToCart }) => {
    const { img, name, price, stock, seller, key } = product;

    const history = useHistory()
    const goToProductDetailsPage = () => {
        history.push(`/product/${key}`)
    }
    return (
        <>
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
                    <ButtonGroup variant="outlined" color="primary">
                        <Button startIcon={<ShoppingCartIcon />} onClick = {() => handleAddToCart(product)}>Add To Cart</Button>
                        <Button onClick={goToProductDetailsPage}>Show Details</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <hr />
        </>
    );
};

export default SingleProducts;