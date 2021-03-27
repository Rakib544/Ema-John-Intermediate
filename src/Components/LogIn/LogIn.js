import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const useStyles = makeStyles(theme => ({
    input: {
        width: '100%',
        margin: '10px 0'
    }
}))
const LogIn = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const classes = useStyles()
    const [showSingUpForm, setShowSignUpForm] = useState(false)
    const [user, setUser] = useState({ isSignedIn: false, name: '', email: '', password: '', error: '', success: false })
    const [inputError, setInputError] = useState({ emailError: false, passwordError: false })

    //google sign in method goes here
    const provider = new firebase.auth.GoogleAuthProvider();
    const signInWithGoogle = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                setUser(res.user)
                setLoggedInUser(res.user)
                history.replace(from)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //facebook signIn method goes here
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const signInWithFacebook = () => {
        firebase.auth().signInWithPopup(facebookProvider)
            .then(res => {
                setUser(res)
                setLoggedInUser(res)
                
            })
            .catch(err => {
                setUser(err)
            })
    }

    //user input password functionality goes here
    const handleBlur = e => {
        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
            const newInputError = { ...inputError }
            newInputError.emailError = !isFieldValid
            setInputError(newInputError)
        }
        if (e.target.name === 'password') {
            isFieldValid = e.target.value.length > 6 && /\d{1}/.test(e.target.value)
            const newInputError = { ...inputError }
            newInputError.passwordError = !isFieldValid;
            setInputError(newInputError)
        }

        if (isFieldValid) {
            const newUser = { ...user }
            newUser[e.target.name] = e.target.value;
            setUser(newUser)
        }
    }

    //private route functionality
    const history = useHistory();
    const location = useLocation();

    const {from} = location.state || {from : {pathname: '/'}}

    const handleSubmit = e => {
        e.preventDefault();
        if (showSingUpForm && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUser = { ...user }
                    newUser.success = true;
                    newUser.error = '';
                    setUser(newUser)
                })
                .catch(err => {
                    const newUser = { ...user }
                    newUser.success = false;
                    newUser.error = err.message;
                    setUser(newUser)
                })
        }

        if (!showSingUpForm && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUser = { ...user }
                    newUser.success = true;
                    newUser.error = '';
                    setUser(newUser)
                    setLoggedInUser(newUser)
                    history.replace(from)
                })
                .catch(err => {
                    const newUser = { ...user }
                    newUser.success = false;
                    newUser.error = err.message;
                    setUser(newUser)
                    console.log(err)
                    setLoggedInUser(newUser)
                })
        }
        e.target.reset();
    }

    return (
        <div>
            <Typography variant="h4" align="center" color="primary">
                My First Authenticate Login Form
      </Typography>
            <Container maxWidth="sm" justify="center">
                <form onSubmit={handleSubmit}>
                    {
                        showSingUpForm
                            ?
                            <div>
                                <TextField name="name" onBlur={handleBlur} label="Enter Name" className={classes.input} type="text" />
                                <TextField name="email" onBlur={handleBlur} error={inputError.emailError} helperText={inputError.emailError && "Incorrect email"} label="Enter Email" className={classes.input} type="email" />
                                <TextField name="password" onBlur={handleBlur} error={inputError.passwordError} helperText={inputError.passwordError && 'Password must have at least 6 character and should have 1 number'} label="Enter Password" className={classes.input} type="password" />
                                <Button type="submit" color="primary" variant="contained">Sing Up</Button>
                            </div>
                            :
                            <div>
                                <TextField name="email" onBlur={handleBlur} label="Enter Email" className={classes.input} type="email" />
                                <TextField name="password" onBlur={handleBlur} label="Enter Password" className={classes.input} type="password" />
                                <Grid container>
                                    <Grid item lg="6" alignItems="center">
                                        <Button type="submit" color="primary" variant="contained">Sign In</Button>
                                    </Grid>
                                    <Grid item lg="6">
                                        <Button color="primary" onClick={() => setShowSignUpForm(!showSingUpForm)}>Not Registered ? Sign Up Here</Button>
                                    </Grid>
                                </Grid>

                                <Button color="primary" variant="contained" className={classes.input} onClick={signInWithGoogle}>Sign In With Google</Button>
                                <Button color="primary" variant="contained" className={classes.input} onClick={signInWithFacebook} startIcon={<FacebookIcon />}>Sing In With Facebook</Button>
                            </div>
                    }
                </form>
                <Typography variant="subtitle1" color="secondary">
                    {user.error}
                </Typography>
                {
                    user.success && <Typography variant="subtitle1" color="primary" align="center">
                        User {showSingUpForm ? 'Created' : 'Log In'} Successfully
          </Typography>
                }
            </Container>
        </div>
    );
};

export default LogIn;