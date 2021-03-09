import { Typography } from '@material-ui/core';
import React from 'react';

const NotFound = () => {
    return (
        <div>
            <Typography variant="h2" color="secondary" align="center">
                404 !!!
            </Typography>
            <Typography variant="h5" align="center">
                Page Not Found
            </Typography>
        </div>
    );
};

export default NotFound;