import { useEffect, useState } from "react";
import Factura from "./components/Factura";
import "./App.css"

export default function App() {
  const [docId, setFacturaId] = useState("13");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // busca a fatura sempre que id muda
  useEffect(() => {
    if (!docId) return;
    setLoading(true);
    setError("");
    fetch(
      `https://apitenanttest.mmlicloud.com/KS/api/print_docs?id_docs=${docId}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 1) {
          setData(json);
        } else {
          setData(null);
          setError("Não encontrado na API.");
        }
      })
      .catch(() => setError("Falha de API indisponível."))
      .finally(() => setLoading(false));
  }, [docId]);

  const enviarFormulario = (e) => {
    e.preventDefault();
    const id = e.target.elements.facturaId.value.trim();
    if (id) setFacturaId(id);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }} className="page">
      <form onSubmit={enviarFormulario} style={{ marginBottom: "1rem" }}>
        <div>
          <label>
            ID da Factura:&nbsp;
            <input
              name="facturaId"
              type="number"
              defaultValue={docId}
              style={{ width: "100px" }}
            />
          </label>
          <button type="submit" style={{ marginLeft: "0.5rem" }}>Buscar</button>
        </div>

        {data && (
          <button
            type="button"
            onClick={() => window.print()}
            style={{ marginLeft: "1rem" }}
          >
            Imprimir / Salvar PDF
          </button>
        )}
      </form>

      {loading && <p>Carregando…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && <Factura data={data} />}
    </div>
  );
}
