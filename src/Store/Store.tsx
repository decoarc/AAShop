import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  MenuList,
  MenuItem,
  Button,
  Popper,
} from "@mui/material";
import { fetchProducts } from "../backend/get_products";
import ProductsCards from "../Components/Cards";
import PositionedMenu from "../Components/Menuo";
import ShoppingCart from "../Components/Cart";

function Store() {
  const navigation = useNavigate();
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

  const [comprados, setComprados] = useState<{ nome: string; preco: number }[]>(
    []
  );
  const handleComprar = (nome: string, preco: number) => {
    const produtoCompra = { nome, preco };
    setComprados((prevComprados) => [...prevComprados, produtoCompra]);
  };

  const total = comprados.reduce((acc, item) => acc + item.preco, 0);

  return (
    <div className="flex flex-col">
      <div className="bg-blue-500 flex justify-between text-5xl p-5">
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nome do produto"
          />
        </div>
        <div className="bg-yellow-300 grid"></div>
      </div>
      <div className="flex w-full space-x-16 mt-2">
        <div className="bg-red-300 flex w-3/4 text-red-500 text-5xl mt-4 h-[400px] overflow-y-auto grid grid-cols-3 gap-1">
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
        <div className="bg-blue-200 w-[300px] p-4">
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <ShoppingCart produtosComprados={comprados} />
          </div>
          <div>
            <Typography> Total: R${total.toFixed(2)}</Typography>
            <Button
              onClick={() => {
                navigation("/gateway");
              }}
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
