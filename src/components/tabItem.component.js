import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {ClientItem} from './clientItem.component';

const TabItemWrapper = styled('div')`
    padding: 15px 15px 70px;
    max-height: 100%;
`

const mockClientList = [
    {name: 'client', email: 'client@client.com', from: 'jlkj0j223#@3DFAs_'},
    {name: 'client', email: 'client@client.com', from: 'adasdf#@3DFAs_'},
    {name: 'client', email: 'client@client.com', from: 'w2saf#@3DFAs_'},
    {name: 'client', email: 'client@client.com', from: 'zxz#@3DFAs_'},
    {name: 'client', email: 'client@client.com', from: 'fgh34fg#@3DFAs_'},
    {name: 'client', email: 'client@client.com', from: 'cbcvb3#@3DFAs_'},
    {name: 'client', email: 'client@client.com', from: 'vbc34qfgdfg#@3DFAs_'},
    {name: 'client', email: 'client@client.com', from: 'sfdqfdfg2#@3DFAs_'},
    {name: 'client', email: 'client@client.com', from: 'sfdqfdfg2#@3DFAs_'},
]

function TabItem (){

    return (
        <TabItemWrapper> 
            {mockClientList.map((item) => (
                <ClientItem name={item.name} email={item.email} from={item.from} />
            ))}
        </TabItemWrapper>
    )
}

export {TabItem};