import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField, CircularProgress } from "@mui/material";
import { fetchProducts } from "../../backend/get_products";
import ProductsCards from "./Components/CustomCard";
import ShoppingCart from "./Components/Cart";
import { useCart } from "../../Contexts/CartContext";

function Store() {
  const navigation = useNavigate();
  const { selecionados, addProduto, total } = useCart();
  const [query, setQuery] = useState("");

  const [loadingMessage, setLoadingMessage] = useState(false);

  const {
    data: products,
    isFetching,
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
        setLoadingMessage(true);
        setTimeout(() => {
          setLoadingMessage(false);
          fetchNextPage();
        });
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
    <div
      className="flex flex-col overflow-hidden"
      style={{ height: `${window.innerHeight}px` }}
    >
      <div className="p-5 h-[72px]">
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar produto"
          variant="outlined"
          fullWidth
          InputProps={{
            style: { backgroundColor: "lightBeige" },
          }}
        />
      </div>
      <div className="flex flex-nowrap mt-4 px-5">
        <div
          className="flex flex-col w-full overflow-y-scroll scrollbar-webkit"
          style={{ height: `${window.innerHeight - 200}px` }}
        >
          <div
            className="w-full grid gap-4 bg-cac4ce "
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {filteredProducts?.map((produt) => {
              return (
                <ProductsCards
                  key={produt.id}
                  produt={produt}
                  onComprar={handleComprar}
                />
              );
            })}
          </div>
          <div
            className="w-full bg-black"
            ref={observerRef}
            style={{ height: "1px" }}
          >
            {isFetching && (
              <div className="flex justify-center items-center">
                <CircularProgress size={24} />
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-[300px] bg-darkGreen rounded-lg p-4 text-white">
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <ShoppingCart produtosSelecionados={selecionados} />
          </div>
          <div className="mt-4">
            <Typography variant="h6"> Total: R${total.toFixed(2)}</Typography>
            <Button
              fullWidth
              variant="contained"
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
