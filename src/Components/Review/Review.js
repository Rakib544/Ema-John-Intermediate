import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import CartSingleProduct from '../CartSingleProduct/CartSingleProduct';

const Review = () => {
    const [cartProduct, setCartProduct] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productsKeys = Object.keys(savedCart)
        fetch('https://murmuring-beyond-43171.herokuapp.com/savedProducts', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(productsKeys)
        })
        .then(res => res.json())
        .then(data => setCartProduct(data))
        
    }, [])

    const handleRemoveFromCart = product => {
        const newList = cartProduct.filter(pd => pd.key !== product.key)
        setCartProduct(newList)
        removeFromDatabaseCart(product.key)
    }

    const history = useHistory();
    const handleShowProceedOrder = () => {
        history.push(`/proceed-order`)
    }
    
    return (
        <>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item lg="8" style={{borderRight: '1px solid gray'}}>
                        {
                            cartProduct.map(product => <CartSingleProduct product={product} handleRemoveFromCart = {handleRemoveFromCart} />)
                        }
                    </Grid>
                    <Grid item lg="4">
                        <Cart carts = {cartProduct} showReviewButton={false} handleShowProceedOrder={handleShowProceedOrder} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Review;