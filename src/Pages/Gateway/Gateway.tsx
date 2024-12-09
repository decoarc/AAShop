import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useCart } from "../../backend/CartContext";
import { useNavigate } from "react-router-dom";

function Gateway() {
  const { selecionados, total, limparCarrinho } = useCart();
  const navigation = useNavigate();

  const handleSim = () => {
    limparCarrinho();
    navigation("/");
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#cac4ce] p-6">
      <Typography
        variant="h4"
        gutterBottom
        className="text-center text-[#9067c6] font-bold"
      >
        Deseja finalizar sua compra?
      </Typography>

      <div className="w-full max-w-4xl max-h-[400px] bg-[#8d86c9] rounded-lg p-4 overflow-y-auto shadow-lg mt-4">
        {selecionados.length > 0 ? (
          selecionados.map((produto, index) => (
            <Card
              key={index}
              className="mb-4 bg-[#cac4ce]"
              style={{ border: "1px solid #8d86c9" }}
            >
              <CardContent>
                <Typography variant="h6" className="text-[#9067c6] font-bold">
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
          className="text-9067c6 font-bold text-lg text-center"
        >
          Total: R${total.toFixed(2)}
        </Typography>
      </div>

      <div className="mt-6 flex space-x-4">
        <Button
          variant="contained"
          onClick={handleSim}
          style={{
            backgroundColor: "#9067c6",
            color: "#ffffff",
          }}
        >
          Sim
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigation("/store")}
          style={{
            borderColor: "#9067c6",
            color: "#9067c6",
          }}
        >
          Não
        </Button>
      </div>
    </div>
  );
}

export default Gateway;
