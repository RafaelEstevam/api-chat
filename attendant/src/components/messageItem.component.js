import React, { useEffect, useState } from 'react';
import {Grid, Typography} from '@material-ui/core';
import styled from 'styled-components';
import COLORS  from '../styles/colors';

import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';

const MessageWrapper = styled('div')`
    background-color: ${COLORS.grayColor};
    padding: 20px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;

    ${(props) => props.isAttendant ? `
        background-color: ${COLORS.mainColor};
    ` : `
        background-color: ${COLORS.lightGrayColor}
    `};
`

const MessageGrid = styled(Grid)`
    ${(props) => props.isAttendant ? `
        justify-content: flex-end;
    ` : `
        justify-content: flex-start;
    `};
`

const Message = styled('div')`
    display: flex;
    flex-direction: column;

    ${(props) => props.isAttendant ? `
        align-items: flex-end;
    ` : `
        align-items: flex-start;
    `};
`;

const MessageFlag = styled('div')`
    height: 30px;
    width: 30px;
    display: block;
    content: '';
    margin-top: -23px;
    border: 20px solid;

    ${(props) => props.isAttendant ? `
        border-color: transparent ${COLORS.mainColor} transparent transparent;
    ` : `
        border-color: transparent transparent transparent ${COLORS.lightGrayColor};
    `};
`;

const MessageText = styled('p')`
    color: ${COLORS.lightColor};
    font-size: 1em;
`

const MessageHour = styled('small')`
    color: #54545f;
    font-size: 0.8em;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const MessageContent = styled('div')`
    display: flex;
    flex-direction: column;
    ${(props) => props.isAttendant ? `
        align-items: flex-end;
    ` : `
        align-items: flex-start;
    `};
`

const MessageContainer = styled('div')`
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;

    ${(props) => props.isAttendant ? `
        flex-direction: row;
    ` : `
        flex-direction: row-reverse;
    `};
`

const MessageIcon = styled('div')`
    background: ${props => props.bgColor && props.bgColor}40;
    border-radius: 1000px;
    padding: 10px;
    display: flex;
    justify-content: center;
    aling-items: center;
    height: 55px;
    width: 55px;
    margin: 10px;
`

function MessageItem ({text, hour, isAttendant, name, email, to, from}){

    return (
        <MessageGrid container isAttendant={isAttendant}>
            <MessageContainer isAttendant={isAttendant}>
                <MessageContent isAttendant={isAttendant}>
                    <Message isAttendant={isAttendant}>
                        <MessageWrapper isAttendant={isAttendant}>
                            <MessageText>
                                {text}
                            </MessageText>
                            <MessageHour>
                                <AccessTimeOutlinedIcon fontSize="small"/> {hour}
                            </MessageHour>
                        </MessageWrapper>
                        <MessageFlag isAttendant={isAttendant}/>
                    </Message>
                    <MessageHour>
                        {name}
                    </MessageHour>
                </MessageContent>
                {isAttendant ? (
                    <MessageIcon bgColor={COLORS.textGrayColor}>
                        <PermContactCalendarOutlinedIcon className="main-color" fontSize="large"/>
                    </MessageIcon>
                ) : (
                    <MessageIcon bgColor={COLORS.lightGrayColor}>
                        <AccountCircleOutlinedIcon className="text-gray-color" fontSize="large"/>
                    </MessageIcon>
                )}
            </MessageContainer>
            
        </MessageGrid>
        
    )
}

export {MessageItem}