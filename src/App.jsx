import React, { useEffect, useState } from "react";
import Factura from "./components/Factura";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://apitenanttest.mmlicloud.com/KS/api/print_docs?id_docs=13")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando a fatura...</p>;
  if (!data || data.status !== 1) return <p>Erro ao carregar a fatura.</p>;

  return <Factura data={data} />;
}

export default App;
