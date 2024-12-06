import React, { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
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

function Store() {
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
    getNextPageParam: (lastPage) => lastPage.nextCursor,
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
      <div className="bg-red-300 flex w-3/4 text-red-500 text-5xl mt-4 h-[400px] overflow-scroll grid grid-cols-3 gap-1">
        {filteredProducts?.map((produt) => {
          return <ProductsCards key={produt.id} produt={produt} />;
        })}
        {isLoading && <p>Carregando ...</p>}
        <div ref={observerRef} style={{ height: "1px" }} />
      </div>
    </div>
  );
}

export default Store;
