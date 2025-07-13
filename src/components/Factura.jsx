import "./factura.css";

function Factura({ data }) {
  const { dados, outros_dados, valor_por_extenso } = data;
  const empresa = outros_dados.empresa;
  const cliente = outros_dados.cliente;
  const item = dados.itens[0];

  return (
    <div className="factura">
      <div className="topo">
        <div className="topo-linhas">
          <div>
            <div className="empresa">{empresa.nome}</div>
            <div className="detalhes-empresa">
              {empresa.endereco}<br />
              {empresa.localidade}<br />
              Tel: {empresa.telefone}<br />
              Email: {empresa.email}<br />
              NIF: {empresa.nif}
            </div>
          </div>
          <div>
            <div className="cliente">Cliente</div>
            <div className="detalhes-cliente">
              {cliente.nome}<br />
              {cliente.endereco}<br />
              NIF: {cliente.nif}
            </div>
          </div>
        </div>
      </div>

      <div className="fatura-info">
        <div className="linha-info">
          <span><strong>Factura:</strong> {dados.numero}</span>
          <span><strong>Data:</strong> {dados.data}</span>
        </div>
        <div className="linha-info">
          <span><strong>Pagamento:</strong> {dados.pagamento}</span>
        </div>
      </div>

      <table className="tabela-itens">
        <thead>
          <tr>
            <th className="descricao">Descrição</th>
            <th className="quantidade">Qtd.</th>
            <th className="preco">Preço Uni.</th>
            <th className="total">Total</th>
          </tr>
        </thead>
        <tbody>
          {dados.itens.map((item, idx) => (
            <tr key={idx}>
              <td>{item.descricao}</td>
              <td>{item.qtd}</td>
              <td>{item.preco}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="resumo">
        <table className="resumo-total">
          <tbody>
            <tr>
              <td>Total:</td>
              <td>{dados.total}</td>
            </tr>
            <tr className="total-final">
              <td>Total a Pagar:</td>
              <td>{dados.total_a_pagar}</td>
            </tr>
            <tr>
              <td colSpan="2">
                <strong>{valor_por_extenso}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rodape">
        Documento gerado automaticamente.
      </div>
    </div>
  );
}

export default Factura;
