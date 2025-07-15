import "./factura.css";

function Factura({ data }) {
  const { dados, outros_dados, valor_por_extenso } = data;
  const empresa = outros_dados.empresa;
  const cliente = outros_dados.cliente;

  function formatarKz(valor) {
    if(!valor) return 0;

    return valor.toLocaleString('pt-AO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'AOA'
    }).replace('AOA', '').trim();
  }

  return (
    <div className="invoice-container">
      <div className="header">
        <img src={empresa.url_foto} style={{ width: '90px', height: 'auto' }} />
        <div className="header-content">
          <div className="left-section">
            <div className="company-name">{empresa.nome}</div>
            <div className="company-details">
              {empresa.endereco_sede}
              <br />
              {empresa.localidade}
              <br />
              Tel: {empresa.telefone}
              <br />
              E-mail: {empresa.email}
              <br />
              Contribuinte: {empresa.nif}
            </div>
          </div>
          <div className="right-section">
            <div className="client-details">Exmo.(s) Sr(s)</div>
            <div className="client-label">{cliente.nome}</div>
            <div className="client-details">
              {cliente.endereco}
              <br />
              NIF: {cliente.nif}
            </div>
          </div>
        </div>
      </div>

      <div className="invoice-header">
        <div className="invoice-title">{dados.tipo_documento}</div>
        <div className="invoice-number">
          <strong>Factura n.º {dados.referencia}</strong>
        </div>

        <div className="invoice-info-grid">
          <div className="info-row">
            <div className="info-left-group flat-border-bottom">
              <div className="info-item">
                <div className="info-label">Data de emissão</div>
              </div>
              <div className="info-item">
                <div className="info-label">Contribuinte</div>
              </div>
            </div>
            <div className="info-item flat-border-bottom">
              <div className="info-label">Observações</div>
            </div>
          </div>

          <div className="info-row">
            <div className="info-left-group">
              <div className="info-item">
                <div className="info-value">{dados.data_emissao}</div>
              </div>
              <div className="info-item">
                <div className="info-value">{cliente.nif}</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-value">{outros_dados.forma_pagto.forma_pagto}</div>
            </div>
          </div>

          <div className="info-row">
            <div className="info-left-group flat-border-bottom">
              <div className="info-item">
                <div className="info-label">Vencimento</div>
              </div>
              <div className="info-item">
                <div className="info-label">V/ Ref.</div>
              </div>
            </div>
            <div className="info-item"></div>
          </div>
          <div className="info-row">
            <div className="info-left-group">
              <div className="info-item">
                <div className="info-value">{dados.data_vencimento}</div>
              </div>
              <div className="info-item">
                <div className="info-value">{dados.referencia}</div>
              </div>
            </div>
            <div className="info-item"></div>
          </div>
        </div>
      </div>

      <table className="items-table">
        <thead>
          <tr>
            <th className="code">Código</th>
            <th className="description">Descrição</th>
            <th className="price">Preço Uni.</th>
            <th className="qty">Qtd.</th>
            <th className="tax">Taxa/IVA %</th>
            <th className="discount">Desc. %</th>
            <th className="total">Total</th>
          </tr>
        </thead>
        <tbody>
          {dados.itens.map((item, idx) => (
            <tr key={idx}>
              <td>{item.codigo_produto}</td>
              <td className="description">{item.descricao}</td>
              <td>{item.price_unit}</td>
              <td>{item.qtd}</td>
              <td>
                {item.taxa}{" "}
                <span style={{ fontSize: 9 }}>{item.codigo_iva}</span>
              </td>
              <td>{item.discount}</td>
              <td>{formatarKz(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bottom-section" style={{ borderTop: "2px solid rgb(0, 0, 0)" }}>
        <div className="left-info">
          <table className="tax-table">
            <thead>
              <tr>
                <th>Imposto/IVA</th>
                <th>Incidência</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>

              {outros_dados.taxa_incidencia.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.taxa ? formatarKz(item.incidencia) : 'Isento (0%)'}</td>
                  <td>{formatarKz(item.incidencia)}</td>
                  <td>{formatarKz(item.valor)}</td>
                </tr>
              ))}

            </tbody>
          </table>

          <div className="info-sections">
            <div className="info-section">
              <div className="section-title">Regime de IVA</div>
              <div className="section-content">{dados.itens[0].motivo_iva}</div>
            </div>
            <div className="info-section">
              <div className="section-title">Bens e Serviços</div>
              <div className="section-content">Os bens/serviços foram colocados à disposição do adquirente na data e local do documento</div>
            </div>
            <div className="info-section">
              <div className="section-title">Dados Bancários</div>
              <div className="section-content">{empresa.iban.replaceAll('.', ' ')}</div>
            </div>
          </div>
        </div>

        <div className="right-summary">
          <div className="summary-title">Sumário</div>
          <table className="summary-table">
            <tbody>
              <tr>
                <td className="label">Total ilíquido:</td>
                <td className="value">{formatarKz(dados.total_doc)}</td>
              </tr>
              <tr>
                <td className="label">Desconto:</td>
                <td className="value">{formatarKz(dados.desconto)}</td>
              </tr>
              <tr>
                <td className="label">Sem Imposto/IVA/c Desc.:</td>
                <td className="value">{formatarKz(dados.subtotal)}</td>
              </tr>
              <tr>
                <td className="label">Imposto/IVA:</td>
                <td className="value">{outros_dados.total_imposto}</td>
              </tr>
              <tr>
                <td className="label">Retenção:</td>
                <td className="value">{formatarKz(outros_dados.retencao_fonte)}</td>
              </tr>
              <tr className="total-line">
                <td className="label">Total:</td>
                <td className="value">{formatarKz(outros_dados.total_sem_imposto)}</td>
              </tr>
              <tr className="final-total">
                <td className="label">Total a pagar:</td>
                <td className="value">{formatarKz(outros_dados.total_sem_imposto - outros_dados.retencao_fonte)}</td>
              </tr>
            </tbody>
          </table>
          <div className="amount-words">
            <strong>{valor_por_extenso}</strong>
          </div>
        </div>
      </div>

      <div className="page-info">
        <div className="left-footer">
          pL9c - Processado por programa validado n.º 144/AGT/2019 | Factplus
        </div>
        <div className="right-footer">1 de 1</div>
      </div>
    </div >
  );
}

export default Factura;
