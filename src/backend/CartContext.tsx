import React, { createContext, useContext, useState } from "react";

interface Produto {
  nome: string;
  preco: number;
}

interface CartContextType {
  comprados: Produto[];
  addProduto: (produto: Produto) => void;
  total: number;
  limparCarrinho: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [comprados, setComprados] = useState<Produto[]>([]);

  const addProduto = (produto: Produto) => {
    setComprados((prevComprados) => [...prevComprados, produto]);
  };

  const limparCarrinho = () => {
    setComprados([]);
  };

  const total = comprados.reduce((acc, item) => acc + item.preco, 0);

  return (
    <CartContext.Provider
      value={{ comprados, addProduto, total, limparCarrinho }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
