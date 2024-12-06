import products from "../produtos.json";

export const all_products = products;

export interface Produt {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  foto: string;
}
export const fetchProducts = async (
  page: number = 0,
  pageSize: number = 10,
  query: string = ""
): Promise<{ data: Produt[]; nextPage: number | null }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const filteredProducts = all_products.filter((all_products) =>
    all_products.nome.toLowerCase().includes(query.toLowerCase())
  );

  const start = page * pageSize;
  const end = start + pageSize;

  const paginatedProducts = filteredProducts.slice(start, end);

  const nextPage = end < filteredProducts.length ? page + 1 : null;

  return { data: paginatedProducts, nextPage };
};
