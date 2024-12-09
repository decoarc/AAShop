import React from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { useCart } from "../../../backend/CartContext";

interface ShoppingCartProps {
  produtosSelecionados: { nome: string; preco: number; quantidade: number }[];
}

const ShoppingCart = ({ produtosSelecionados }: ShoppingCartProps) => {
  const { removeProduto } = useCart();

  const groupedProducts = produtosSelecionados.reduce((acc, produto) => {
    const existingProduct = acc.find((item) => item.nome === produto.nome);
    if (existingProduct) {
      existingProduct.quantidade += produto.quantidade;
    } else {
      acc.push({ ...produto });
    }
    return acc;
  }, [] as { nome: string; preco: number; quantidade: number }[]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Carrinho de compras
      </Typography>
      {groupedProducts.length > 0 ? (
        groupedProducts.map((produto, index) => (
          <Card key={index} style={{ marginBottom: 10 }}>
            <CardContent>
              <Typography variant="body1">{produto.nome}</Typography>
              <Typography variant="body2">R${produto.preco}</Typography>
              <Typography variant="body2">
                Quantidade: {produto.quantidade}
              </Typography>
              <Button
                onClick={() => removeProduto(produto.nome)}
                color="secondary"
              >
                Remover
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2">
          Nenhum produto no carrinho ainda.
        </Typography>
      )}
    </div>
  );
};

export default ShoppingCart;
