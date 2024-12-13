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
  const response = await fetch(
    `http://localhost:8082/api/products?page=${page}&pageSize=${pageSize}&query=${query}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  const data = await response.json();

  return data;
};
