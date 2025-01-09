import {
  Card,
  Typography,
  CardMedia,
  Button,
  Box,
  CardContent,
  Divider,
} from "@mui/material";
import { Produt } from "../../../backend/get_products";
import React from "react";

interface ProdutsProps {
  produt: Produt;
  onComprar: (nome: string, preco: number) => void; // Recebe a função onComprar
}

function ProductsCards({ produt, onComprar }: ProdutsProps) {
  return (
    <Card style={{ width: 300, height: 200, minWidth: 300, minHeight: 200 }}>
      <CardContent className="bg-darkPurple text-white">
        <Box display="flex" flexDirection="row" alignItems="center">
          <CardMedia
            component="img"
            style={{ height: "60px", width: "60px" }}
            src={`${process.env.PUBLIC_URL}/assets/${produt.foto}`}
          ></CardMedia>
          <Typography gutterBottom fontSize={20} component="div" marginLeft={2}>
            {produt.nome}
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      <CardContent>
        <Typography gutterBottom fontSize={12}>
          {produt.descricao}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop={3}
        >
          <Typography gutterBottom fontSize={16} component="div">
            R${produt.preco}
          </Typography>
          <Button onClick={() => onComprar(produt.nome, produt.preco)}>
            Adicionar ao carrinho
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
export default ProductsCards;
