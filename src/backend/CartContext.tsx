import React, { createContext, useContext, useState } from "react";

interface Produto {
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartContextType {
  selecionados: Produto[];
  addProduto: (produto: Produto) => void;
  removeProduto: (nome: string) => void;
  total: number;
  limparCarrinho: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selecionados, setSelecionados] = useState<Produto[]>([]);

  const addProduto = (produto: Produto) => {
    setSelecionados((prevSelecionados) => {
      const existingProduct = prevSelecionados.find(
        (item) => item.nome === produto.nome
      );

      if (existingProduct) {
        return prevSelecionados.map((item) =>
          item.nome === produto.nome
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prevSelecionados, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removeProduto = (nome: string) => {
    setSelecionados((prevSelecionados) =>
      prevSelecionados.filter((item) => item.nome !== nome)
    );
  };

  const limparCarrinho = () => {
    setSelecionados([]);
  };

  const total = selecionados.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{ selecionados, addProduto, removeProduto, total, limparCarrinho }}
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
