import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useCart } from "../../Contexts/CartContext";
import { useNavigate } from "react-router-dom";

function Gateway() {
  const { selecionados, total, limparCarrinho } = useCart();
  const navigation = useNavigate();

  const handleSim = () => {
    limparCarrinho();
    navigation("/");
  };

  return (
    <div className="h-screen flex flex-col items-center bg-lightGray p-6">
      <Typography
        variant="h4"
        gutterBottom
        className="text-center text-vividPurple font-bold"
      >
        Deseja finalizar sua compra?
      </Typography>

      <div className="w-full max-w-4xl max-h-[400px] bg-softPurple rounded-lg p-4 overflow-y-auto shadow-lg mt-4">
        {selecionados.length > 0 ? (
          selecionados.map((produto, index) => (
            <Card
              key={index}
              className="mb-4 bg-lightGray"
              style={{ border: "1px solid softPurple" }}
            >
              <CardContent>
                <Typography variant="h6" className="text-vividPurple font-bold">
                  {produto.nome}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Preço: R${produto.preco.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantidade: {produto.quantidade}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography className="text-center text-white">
            Nenhum produto no carrinho.
          </Typography>
        )}
      </div>

      <div className="mt-6">
        <Typography
          variant="h6"
          className="text-vividPurple font-bold text-lg text-center"
        >
          Total: R${total.toFixed(2)}
        </Typography>
      </div>

      <div className="mt-6 flex space-x-4">
        <Button
          variant="contained"
          onClick={handleSim}
          style={{
            backgroundColor: "vividPurple",
            color: "#ffffff",
          }}
        >
          Sim
        </Button>
        <Button
          variant="outlined"
          style={{
            borderColor: "vividPurple",
            color: "vividPurple",
          }}
        >
          Não
        </Button>
      </div>
    </div>
  );
}

export default Gateway;
