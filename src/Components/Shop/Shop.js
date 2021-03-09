import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import SingleProducts from '../SingleProducts/SingleProducts';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [carts, setCarts] = useState([])

    useEffect(() => {
        const first10 = fakeData.slice(1, 10);
        setProducts(first10)
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)
            product.quantity = savedCart[existingKey]
            return product;
        })
        setCarts(previousCart)
    }, [])

    const handleAddToCart = selectProduct => {
        const sameProduct = carts.find(product => selectProduct.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = carts.filter(pd => pd.key !== selectProduct.key);
            newCart = [...others, sameProduct]
        } else {
            selectProduct.quantity = 1;
            newCart = [...carts, selectProduct]
        }
        setCarts(newCart)
        addToDatabaseCart(selectProduct.key, count)
    }
    
    return (
        <>
            <Container maxWidth="auto">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={7} lg={8} style={{borderRight: '1px solid gray'}}>
                        {
                            products.map(product => <SingleProducts key={product.key} product={product} handleAddToCart={handleAddToCart} />)
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={4}>
                        <Cart carts = {carts} showReviewButton = {true} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Shop;