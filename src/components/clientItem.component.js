import React, { useEffect, useState } from 'react';
import {Typography} from '@material-ui/core';
import styled from 'styled-components';
import COLORS  from '../styles/colors';

const ClientWrapper = styled('div')`
    background-color: ${COLORS.grayColor};
    padding: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`

function ClientItem ({name, email, from}){
    return (
        <ClientWrapper>
            <Typography variant="h6">
                {name}
            </Typography>
            <Typography variant="subtitle2">
                {email}
            </Typography>
        </ClientWrapper>
    )
}

export {ClientItem}