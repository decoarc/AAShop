import products from "../produtos.json"

export const all_products = products

export interface Produt {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    foto: string;

}
export const fetchProducts = async (query = ""): Promise<Produt[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const filteredTodos = all_products.filter((all_products) =>
        all_products.nome.toLowerCase().includes(query.toLowerCase())
    );
return [...filteredTodos];
  };


