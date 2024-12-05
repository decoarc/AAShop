import React from 'react';
import { useQuery } from 'react-query';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

function Store(){
    return( 
        <div className='flex grid'>
    <div className='Zecs2 bg-blue-500 flex fixed left-0 right-0 justify-between text-red-500 text-5xl mt-20 p-5'>
     <div><input/></div>
     <div className='bg-yellow-300 grid'>
        <Button>Perfil</Button>
        <Button>Settings</Button>
        <Button>Logout</Button>
    </div>
    </div>
    <div className='DosCards bg-purple-400 w-4/6 flex mt-10'>
    </div>
    </div>

  

    );

}

export default Store;