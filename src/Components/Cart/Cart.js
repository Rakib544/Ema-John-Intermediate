import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ carts, showReviewButton, handleShowProceedOrder }) => {

    const subTotal = carts.reduce((sum, product) => sum += product.price * (product.quantity || 1), 0)
    const tax = subTotal * 0.1;
    let shipping;
    if (subTotal > 0 && subTotal < 50) {
        shipping = 4.99
    } else {
        shipping = 0
    }
    const total = subTotal + tax + shipping;

    const formatNumber = num => num.toFixed(2);

    return (
        <>
            <Typography variant="h5" color="primary" align="center">
                Order Summary
            </Typography>
            <Typography variant="h6" color="primary" align="center">
                Items Ordered - {carts.length}
            </Typography>
            <br />
            <Grid container>
                <Grid item lg="8">
                    <Typography variant="subtitle1">
                        Items -
                    </Typography>
                    <Typography variant="subtitle1">
                        Shipping and handling -
                    </Typography>
                    <Typography variant="subtitle1">
                        Total before Tax -
                    </Typography>
                    <Typography variant="subtitle1">
                        Estimated Tax -
                    </Typography>
                    <Typography gutterBottom variant="h5">
                        Order Total -
                    </Typography>
                    {
                        showReviewButton ?
                            <Link to="/review">
                                <Button variant="contained" color="primary">
                                    Review Order
                            </Button>
                            </Link>
                            : <Button variant="contained" color="primary" onClick={handleShowProceedOrder}>
                                Proceed Order
                        </Button>
                    }
                </Grid>
                <Grid item lg="4">
                    <Typography variant="subtitle1">
                        {carts.length}
                    </Typography>
                    <Typography variant="subtitle1">
                        $ {shipping}
                    </Typography>
                    <Typography variant="subtitle1">
                        $ {formatNumber(subTotal)}
                    </Typography>
                    <Typography variant="subtitle1">
                        $ {formatNumber(tax)}
                    </Typography>
                    <Typography variant="h5">
                        $ {formatNumber(total)}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default Cart;