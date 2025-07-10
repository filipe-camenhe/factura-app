import React from "react";
import "./factura.css";

function Factura({ data }) {
  const { dados, outros_dados, valor_por_extenso } = data;
  const empresa = outros_dados.empresa;
  const cliente = outros_dados.cliente;
  const item = dados.itens[0];

  return (
    <div className="page">
      <div className="page-inner">

      </div>

      <div className="page-content">
        <div className="box-container box-height">
          {/* Dados da empresa */}
          <div className="text-box" style={{ left: "3.75em", top: "13em" }}>
            <span className="bold">{empresa.nome}</span>
          </div>
          <div className="text-box" style={{ left: "3.75em", top: "14em" }}>
            <span className="regular">{empresa.endereco_sede}</span>
          </div>
          <div className="text-box" style={{ left: "3.75em", top: "15em" }}>
            <span className="regular">NIF: {empresa.nif}</span>
          </div>
          <div className="text-box" style={{ left: "3.75em", top: "16em" }}>
            <span className="regular">Tel: {empresa.telefone}</span>
          </div>
          <div className="text-box" style={{ left: "3.75em", top: "17em" }}>
            <span className="regular">E-mail: {empresa.email}</span>
          </div>

          {/* Cliente */}
          <div className="text-box" style={{ left: "29em", top: "13em" }}>
            <span className="regular">Cliente:</span>
          </div>
          <div className="text-box" style={{ left: "29em", top: "14em" }}>
            <span className="bold">{cliente.nome}</span>
          </div>
          <div className="text-box" style={{ left: "29em", top: "15em" }}>
            <span className="regular">NIF: {cliente.nif}</span>
          </div>
          <div className="text-box" style={{ left: "29em", top: "16em" }}>
            <span className="regular">Tel: {cliente.telefone}</span>
          </div>

          {/* Dados do documento */}
          <div className="text-box" style={{ left: "3.75em", top: "19em" }}>
            <span className="regular">
              {dados.tipo_fatura} n.º {dados.sigla} {dados.referencia}
            </span>
          </div>
          <div className="text-box" style={{ left: "3.75em", top: "20em" }}>
            <span className="regular">Data: {dados.data_emissao.split(" ")[0]}</span>
          </div>

          {/* Cabeçalho da Tabela */}
          <div className="text-box" style={{ left: "3.75em", top: "23em" }}>
            <span className="bold">Código</span>
          </div>
          <div className="text-box" style={{ left: "9em", top: "23em" }}>
            <span className="bold">Descrição</span>
          </div>
          <div className="text-box" style={{ left: "28em", top: "23em" }}>
            <span className="bold">Qtd</span>
          </div>
          <div className="text-box" style={{ left: "32em", top: "23em" }}>
            <span className="bold">Preço</span>
          </div>
          <div className="text-box" style={{ left: "39em", top: "23em" }}>
            <span className="bold">Total</span>
          </div>

          {/* Item */}
          <div className="text-box" style={{ left: "3.75em", top: "24em" }}>
            <span className="regular">{item.codigo_produto}</span>
          </div>
          <div className="text-box" style={{ left: "9em", top: "24em" }}>
            <span className="regular">{item.descricao}</span>
          </div>
          <div className="text-box" style={{ left: "28em", top: "24em" }}>
            <span className="regular">{item.qtd}</span>
          </div>
          <div className="text-box" style={{ left: "32em", top: "24em" }}>
            <span className="regular">{item.price.toLocaleString()} Kz</span>
          </div>
          <div className="text-box" style={{ left: "39em", top: "24em" }}>
            <span className="regular">{item.total.toLocaleString()} Kz</span>
          </div>

          {/* Totais */}
          <div className="text-box" style={{ left: "32em", top: "28em" }}>
            <span className="regular">Subtotal:</span>
          </div>
          <div className="text-box" style={{ left: "39em", top: "28em" }}>
            <span className="regular">{dados.subtotal.toLocaleString()} Kz</span>
          </div>
          <div className="text-box" style={{ left: "32em", top: "29em" }}>
            <span className="regular">Retenção:</span>
          </div>
          <div className="text-box" style={{ left: "39em", top: "29em" }}>
            <span className="regular">{outros_dados.retencao_fonte.toLocaleString()} Kz</span>
          </div>
          <div className="text-box" style={{ left: "32em", top: "30em" }}>
            <span className="regular">Total:</span>
          </div>
          <div className="text-box" style={{ left: "39em", top: "30em" }}>
            <span className="regular">{dados.total_doc.toLocaleString()} Kz</span>
          </div>

          {/* Valor por extenso */}
          <div className="text-box" style={{ left: "3.75em", top: "33em" }}>
            <span className="regular">Valor por extenso: {valor_por_extenso}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Factura;
