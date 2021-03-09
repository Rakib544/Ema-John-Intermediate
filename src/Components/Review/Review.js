import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import CartSingleProduct from '../CartSingleProduct/CartSingleProduct';

const Review = () => {
    const [cartProduct, setCartProduct] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productsKeys = Object.keys(savedCart)
        const products = productsKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)
            product.quantity = savedCart[existingKey]
            return product
        })
        setCartProduct(products)
    }, [])

    const handleRemoveFromCart = product => {
        const newList = cartProduct.filter(pd => pd.key !== product.key)
        setCartProduct(newList)
        removeFromDatabaseCart(product.key)
    }

    const handlePlaceItemBtn = () => {
        setCartProduct([])
        processOrder()
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
                        <Cart carts = {cartProduct} showReviewButton={false} handlePlaceItemBtn={handlePlaceItemBtn} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Review;