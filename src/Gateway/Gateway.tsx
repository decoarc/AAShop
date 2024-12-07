import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { useCart } from "../backend/CartContext";
import { useNavigate } from "react-router-dom";

function Gateway() {
  const { comprados, total, limparCarrinho } = useCart();
  const navigation = useNavigate();

  const handleSim = () => {
    limparCarrinho();
    navigation("/");
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 p-6">
      <Typography variant="h4" gutterBottom>
        Deseja finalizar sua compra?
      </Typography>
      <div className="w-full max-w-4xl">
        {comprados.map((produto, index) => (
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6">{produto.nome}</Typography>
              <Typography variant="body2" color="textSecondary">
                Preço: R${produto.preco.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Typography variant="h6">
          Total: <span className="font-bold">R${total.toFixed(2)}</span>
        </Typography>
      </div>

      <div className="mt-6 flex space-x-4">
        <Button variant="contained" color="primary" onClick={handleSim}>
          Sim
        </Button>
        <Button variant="outlined" color="secondary">
          Não
        </Button>
      </div>
    </div>
  );
}

export default Gateway;
