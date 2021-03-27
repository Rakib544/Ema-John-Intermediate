import { Button, ButtonBase, ButtonGroup, Container } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory()

    const goToHomePage = () => {
        history.push(`/shop`)
    }
    const goToManagePage = () => {
        history.push(`/manage`)
    }

    const goToReviewPage = () => {
        history.push(`/review`)
    }

    const goToSignInPage = () => {
        history.push(`/login`)
    }
    return (
        <Container maxWidth="lg">
            <ButtonBase style={{ display: 'block', margin: "auto" }}>
                <img src={logo} alt="logo" style={{ height: '80px' }} />
            </ButtonBase>
            <div style={{ display: "flex", justifyContent: 'center', marginTop: "20px" }}>
                <ButtonGroup variant="outlined" color="primary">
                    <Button onClick={goToHomePage}>Shop</Button>
                    <Button onClick={goToReviewPage}>Order-Review</Button>
                    <Button onClick={goToManagePage}>Manage</Button>
                    {
                        loggedInUser.email
                            ? <Button onClick={() => setLoggedInUser({})}>LogOut</Button>
                            : <Button onClick={goToSignInPage}>SignIn</Button>

                    }
                </ButtonGroup>
            </div>
            <br />
        </Container>
    );
};

export default Header;