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
import Store from "./Store/Store";
import Gateway from "./Gateway/Gateway";
import PositionedMenu from "./Components/Menuo";

//Não consegui colocar a imagem

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className=" flex flex-col bg-yellow-500 h-screen w-full">
        <header className="bg-green-500 flex justify-between text-red-500 text-5xl mt-0 w-full h-[75px]">
          <div>AAShop</div>
          <div className="image">
            <PositionedMenu />
          </div>
        </header>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<Store />} />
              <Route path="gateway" element={<Gateway />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
