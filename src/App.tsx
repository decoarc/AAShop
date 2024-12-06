import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from 'react-query';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import Store from "./Store/Store"
import Gateway from './Gateway/Gateway';

//Não consegui colocar a imagem

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App bg-yellow-500 h-screen w-full flex ">
      <header className='bg-green-500 fixed top-0 left-0 right-0 flex justify-between text-red-500 text-5xl mt-0'>
        <div>AAShop</div>
        <div className='image'><img src={require('./Images/produto.png')} style={{height:"70px", width:"70px"}}></img></div>
        </header>
        <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/' element={<Store/>}/>
            <Route path='gateway' element={<Gateway/>}/>
          </Route>
        </Routes>
        </BrowserRouter>


    </div>
    </QueryClientProvider>
  );
}

export default App;