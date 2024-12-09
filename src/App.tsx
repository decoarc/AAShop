import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Store from "./Pages/Store/Store";
import Gateway from "./Pages/Gateway/Gateway";
import PositionedMenu from "./Components/Menuo";
import { CartProvider } from "./Contexts/CartContext";

//Não consegui colocar a imagem

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className=" flex flex-col bg-lightGray h-screen w-full">
        <header className="bg-darkPurple flex justify-between text-cream text-5xl mt-0 w-full h-[75px]">
          <div>AAShop</div>
          <div className="image">
            <PositionedMenu />
          </div>
        </header>
        <BrowserRouter>
          <CartProvider>
            <Routes>
              <Route>
                <Route path="/" element={<Store />} />
                <Route path="gateway" element={<Gateway />} />
              </Route>
            </Routes>
          </CartProvider>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
