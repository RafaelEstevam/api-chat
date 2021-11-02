import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';

import SendIcon from '@material-ui/icons/Send';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

import {
    TextField,
    FormControl,
    Button,
    Grid
} from '@material-ui/core';

import {MessageItem} from './messageItem.component';


const ChatContent = styled('div')`
    display: flex;
    flex-direction: column;
    max-height: 100%;
`

const ChatWrapper = styled('div')`
    padding: 15px 30px 70px;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
`

const ChatMessage = styled('div')`
    display: block;
    min-height: 260px;
    overflow: hidden;
    border-top: 1px solid ${COLORS.lightGrayColor};
    padding: 30px;
`

const ChatButtons = styled('div')`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const mockMessagesList = [
    {text: 'teste 123', hour: '20:00', to:'ljdsflkja0309#23_', name: 'client', email: 'client@client.com', from: 'jlkj0j223#@3DFAs_', isAttendant: false},
    {text: 'teste 123', hour: '20:00', to:'ljdsflkja0309#23_', name: 'attendant', email: 'attendant@client.com', from: 'adasdf#@3DFAs_', isAttendant: true},
    {text: 'teste 123', hour: '20:00', to:'ljdsflkja0309#23_', name: 'attendant', email: 'attendant@client.com', from: 'w2saf#@3DFAs_', isAttendant: true},
    {text: 'teste 123 asdfad asdf ', hour: '20:00', to:'ljdsflkja0309#23_', name: 'client', email: 'client@client.com', from: 'zxz#@3DFAs_', isAttendant: false},
    {text: 'teste 123', hour: '20:00', to:'ljdsflkja0309#23_', name: 'attendant', email: 'attendant@client.com', from: 'fgh34fg#@3DFAs_', isAttendant: true},
    {text: 'teste 123 adfa dsfasdf asdfadf', hour: '20:00', to:'ljdsflkja0309#23_', name: 'attendant', email: 'attendant@client.com', from: 'cbcvb3#@3DFAs_', isAttendant: true},
    {text: 'teste 123', hour: '20:00', to:'ljdsflkja0309#23_', name: 'client', email: 'client@client.com', from: 'vbc34qfgdfg#@3DFAs_', isAttendant: false},
    {text: 'teste 123', hour: '20:00', to:'ljdsflkja0309#23_', name: 'client', email: 'client@client.com', from: 'sfdqfdfg2#@3DFAs_', isAttendant: false},
    {text: 'teste 123', hour: '20:00', to:'ljdsflkja0309#23_', name: 'attendant', email: 'attendant@client.com', from: 'sfdqfdfg2#@3DFAs_', isAttendant: true},
]

function ChatContainer (){

    return (
        <ChatContent>
            <ChatWrapper> 
                {mockMessagesList.map((item) => (
                    <MessageItem name={item.name} email={item.email} from={item.from} to={item.to} hour={item.hour} isAttendant={item.isAttendant} text={item.text}/>
                ))}
            </ChatWrapper>
            <ChatMessage>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <TextField
                            id="filled-multiline-static"
                            label="Multiline"
                            multiline
                            fullWidth
                            rows={4}
                            defaultValue="Default Value"
                            variant="filled"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <ChatButtons>
                            <Button variant="outlined" size="small" color="secondary" startIcon={<HighlightOffOutlinedIcon />}>Encerrar</Button>
                            <Button variant="contained" size="small" color="primary" className="main-background" startIcon={<SendOutlinedIcon />}>Enviar</Button>
                        </ChatButtons>
                    </Grid>
                </Grid>
            </ChatMessage>
        </ChatContent>
        
    )
}

export {ChatContainer};