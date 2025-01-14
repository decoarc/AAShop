import React from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Store from "./Pages/Store/Store";
import Gateway from "./Pages/Gateway/Gateway";
import PositionedMenu from "./Components/Menuo";
import { CartProvider } from "./Contexts/CartContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className=" flex flex-col bg-lightBeige h-screen w-full">
        <header className="bg-darkGreen flex justify-between text-lightBeige text-5xl mt-0 w-full h-[75px]">
          <div>AAShop</div>
          <div className="image">
            <PositionedMenu />
          </div>
        </header>
        <CartProvider>
          <Routes>
            <Route>
              <Route path="/" element={<Store />} />
              <Route path="gateway" element={<Gateway />} />
            </Route>
          </Routes>
        </CartProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
