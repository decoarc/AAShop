import React from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";

interface ShoppingCartProps {
  produtosComprados: { nome: string; preco: number }[];
}

const ShoppingCart = ({ produtosComprados }: ShoppingCartProps) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Carrinho de compras
      </Typography>
      {produtosComprados.length > 0 ? (
        produtosComprados.map((produto, index) => (
          <Card key={index} style={{ marginBottom: 10 }}>
            <CardContent>
              <Typography variant="body1">{produto.nome}</Typography>
              <Typography variant="body2">R${produto.preco}</Typography>
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
