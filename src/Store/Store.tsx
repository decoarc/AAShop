import React, {useState, useEffect, useRef} from 'react';
import {useQuery, useInfiniteQuery} from 'react-query';
import { Card, CardContent, Typography, CardActions, MenuList, MenuItem, Button, Popper } from '@mui/material';
import { fetchProducts } from '../backend/get_products';
import ProductsCards from '../Components/Cards'
import PositionedMenu from "../Components/Menuo"



function Store(){

  const [query, setQuery] = useState('');

    const {data: products, isLoading} = useQuery({
        queryFn: () => fetchProducts(),
        queryKey: ["products"],
        keepPreviousData: true,
    });

    const [open, setOpen] = React.useState(false);

    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen)=>!prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
          anchorRef.current &&
          anchorRef.current.contains(event.target as HTMLElement)
        ) {
          return;
        }
    
        setOpen(false);
      };

      const filteredProducts = products?.filter((produt) =>
        produt.nome.toLowerCase().includes(query.toLowerCase())
      );


    return( 
    <div className='grid gap-4'>
         <div className='bg-blue-500 flex fixed left-0 right-0 justify-between text-5xl mt-20 p-5'>
         <div><input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Nome do produto'/></div>
         <div className='bg-yellow-300 grid'>
            <PositionedMenu/>
         </div>
         </div>
         <div className='bg-red-300 flex fixed w-3/4 text-red-500 text-5xl mt-60 h-screen grid grid-cols-3 gap-1 m-5'>{filteredProducts?.map((produt)=>{
            return <ProductsCards key={produt.id} produt={produt}/>
         })}
         </div>
    </div>
    );

}

export default Store;