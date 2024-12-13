import { Card, Typography, CardMedia, Button } from "@mui/material";
import { Produt } from "../../../backend/get_products";
import React from "react";

interface ProdutsProps {
  produt: Produt;
  onComprar: (nome: string, preco: number) => void; // Recebe a função onComprar
}

function ProductsCards({ produt, onComprar }: ProdutsProps) {
  return (
    <Card style={{ width: 300, height: 200 }}>
      <CardMedia
        component="img"
        style={{ height: "50px", width: "50px" }}
        src={`${process.env.PUBLIC_URL}/assets/${produt.foto}`}
      ></CardMedia>
      <Typography gutterBottom fontSize={20} component="div">
        {produt.nome}
      </Typography>
      <Typography gutterBottom fontSize={16} component="div">
        R${produt.preco}
      </Typography>
      <Typography gutterBottom fontSize={12}>
        {produt.descricao}
      </Typography>
      <Button onClick={() => onComprar(produt.nome, produt.preco)}>
        Comprar
      </Button>
    </Card>
  );
}
export default ProductsCards;
