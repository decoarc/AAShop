import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { fetchProducts } from "../../backend/get_products";
import ProductsCards from "./Components/CustomCard";
import PositionedMenu from "../../Components/Menuo";
import ShoppingCart from "./Components/Cart";
import { useCart } from "../../Contexts/CartContext";

function Store() {
  const navigation = useNavigate();
  const { selecionados, addProduto, total } = useCart();
  const [query, setQuery] = useState("");

  const {
    data: products,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = 0 }) => fetchProducts(pageParam, 10),
    queryKey: ["products"],
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  const [open, setOpen] = React.useState(false);

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const filteredProducts = products?.pages
    .flatMap((page) => page.data)
    .filter((produt) =>
      produt.nome.toLowerCase().includes(query.toLowerCase())
    );

  const handleComprar = (nome: string, preco: number) => {
    addProduto({ nome, preco, quantidade: 1 });
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center bg-softPurple p-5">
        <div>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar produto"
            variant="outlined"
            fullWidth
            InputProps={{
              style: { backgroundColor: "lightGray" },
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap mt-4 px-5 space-x-4">
        <div className="w-3/4 grid grid-cols-3 gap-4 bg-cac4ce rounded-lg p-4 overflow-y-auto max-h-[500px]">
          {filteredProducts?.map((produt) => {
            return (
              <ProductsCards
                key={produt.id}
                produt={produt}
                onComprar={handleComprar}
              />
            );
          })}
          {isLoading && <p>Carregando ...</p>}
          <div ref={observerRef} style={{ height: "1px" }} />
        </div>
        <div className="bg-vividPurple w-[300px] rounded-lg p-4 text-white">
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <ShoppingCart produtosSelecionados={selecionados} />
          </div>
          <div className="mt-4">
            <Typography variant="h6"> Total: R${total.toFixed(2)}</Typography>
            <Button
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "softPurple",
                color: "#ffffff",
                marginTop: "10px",
              }}
              onClick={() => navigation("/gateway")}
            >
              Finalizar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
