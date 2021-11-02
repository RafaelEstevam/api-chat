import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';

import {
    Grid,
    Button,
    CardContent,
    Typography,
    IconButton,
    Tab,
    Tabs,
    Modal
} from '@material-ui/core';

import {TabItem} from '../../components/tabItem.component';
import {ChatContainer} from '../../components/chatContainer.component';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';

const FullHeightGrid = styled(Grid)`
    height: 100vh;
`

const HeaderWrapper = styled('div')`
    display: flex;
    border-bottom: 1px solid var(--light-gray-color);
    justify-content: space-between;
    aling-items: center;
    width: 100%;
    padding: 15px 30px;
    height: 85px;
    max-height: 85px;
    min-height: 85px;
`

const HeaderContent = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const HeaderButtons = styled('div')`
    display: flex;
    align-items: center;
`

const CustomSubtitle = styled('small')`
    font-size: 0.8em;
    margin-top: 5px;
    color: #737382;
    font-weight: 600;
    margin-bottom: 0px;
`

const CustomTitle = styled('p')`
    font-weight: 700;
    font-size: 1em;
    text-transform: uppercase;
`

// const CustomTypography = styled(Typography)`
//     color: ${}
// `

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
            <div>
                {children}
            </div>
        )}
      </div>
    );
  }


export default function ChatView(){

    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [showClient, setShowClient] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleShowClientDetails = () => {
        if(showClient){
            setShowClient(false);
        }else{
            setShowClient(true);
        }
    }

    return (
        <>
        <Grid container className="dark-background" style={{overflowY: 'hidden'}}>
            <FullHeightGrid className="dark-background" item xs={3} style={{display: 'flex', flexDirection: 'column'}}>
                <HeaderWrapper>
                    <Button size="small" variant="contained" color="primary">Online</Button>
                    <Button size="small" color="secondary">Encerrar</Button>
                </HeaderWrapper>
                <Grid container style={{display: 'flex', height: '100%', maxHeight: '100%', overflowY: 'hidden'}}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        onChange={handleChange}
                        variant="fullWidth"
                    >
                        <Tab label="Fila" />
                        <Tab label="Meus atendimentos" />
                        <Tab label="Em atendimento" />
                    </Tabs>
                    <div style={{height:'100%', width: '100%', overflowY: 'auto' }}>
                        <TabPanel value={value} index={0}>
                            <TabItem />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <TabItem />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <TabItem />
                        </TabPanel>
                    </div>
                </Grid>
            </FullHeightGrid>
            <FullHeightGrid className="gray-background" item xs={!showClient ? 9 : 7} style={{maxHeight: '100%', overflowY: 'hidden', flexDirection: 'column'}}>
                <HeaderWrapper>
                    <HeaderContent>
                        <CustomTitle className="light-color">
                            Nome do client
                        </CustomTitle>
                        <CustomSubtitle>
                            emaildoclient@email.com
                        </CustomSubtitle>
                    </HeaderContent>
                    <HeaderButtons>
                        <IconButton color="inherit" variant="contained" className="text-gray-color" onClick={handleOpen}>
                            <ForwardOutlinedIcon fontSize="large" />
                        </IconButton>
                        <IconButton variant="contained"  color="inherit" className="text-gray-color" onClick={handleShowClientDetails}>
                            <PersonOutlineIcon fontSize="large" />
                        </IconButton>
                    </HeaderButtons>
                </HeaderWrapper>
                <ChatContainer />
            </FullHeightGrid>
            {showClient && 
                <FullHeightGrid item xs={2} style={{borderLeft: `3px solid ${COLORS.lightGrayColor}`}}>
                    <Grid item xs={12}>

                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                </FullHeightGrid>
            }
            
        </Grid>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div>
                asdf
            </div>
        </Modal>
        </>
    )
}