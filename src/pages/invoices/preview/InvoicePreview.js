import React, { useEffect, useState } from 'react'

import convertDate from 'utils/date'

// redux
import { useSelector } from 'react-redux'
import { getOptionsSettings } from 'store/reducers/options'

// const InvoicePreview = React.forwardRef((props, ref) => {
// const InvoicePreview = ({ currentInvoice, ...others }) => {
const InvoicePreview = React.forwardRef((
  {
    invoiceData = null,
    withBackgroundColor = false,
    withPrintMarginT = false,
    printerable = false,
    ...others
  },
  ref) => {
  // ({ currentInvoice, ...others }) => 
  // const { invoiceData, ...others } = props
  const [currentInvoice, setCurrentInvoice] = useState(invoiceData)
  useEffect(() => {
    if (invoiceData?.id && invoiceData?.id !== invoiceData?.id) {
      setCurrentInvoice(invoiceData)
    }
  }, [invoiceData])

  const preferencesOptions = useSelector(getOptionsSettings) // useSelector(getOptionsConfigPreferences)

  // const [currentOptions, setCurrentOptions] = useState(preferencesOptions)

  return (
    <>
      {/* {currentInvoice === null && <div
        style={{
          position: "absolute",
          width: '100%',
          height: '100%',
          background: 'white',
          zIndex: 1,
        }}>
        <div style={{
          display: 'flex',
          top: '50%',
          left: '50%',
          position: "absolute",
          transform: 'translate(-50%, -50%)',
        }}>
          <CircularProgress />
        </div></div>} */}
      <div ref={ref} className={"invoice-body-wrap invoice-preview-container " + (printerable ? "" : "no-print")}
        style={{
          background: withBackgroundColor ? '#eaeced' : 'unset',
          paddingTop: withBackgroundColor ? '15px' : '0',
          paddingBottom: withBackgroundColor ? '15px' : '0',
        }}
      >
        {/* <Header handleClose={others.onClose} /> */}
        <div 
          id='invoice-body-print' 
          className={"body invoice-body " 
            + (printerable ? "" : "no-print")
            + (withPrintMarginT ? 'with-print-mt' : "")}
          style={{
            boxShadow: withBackgroundColor ? '0 0 13px rgba(0, 0, 0, 30%)' : 'unset',
            // background: 'red',  
          }} >
          {/** MAIN INVOICE PRINTED */}
          <div className="container container-invoice" id="container-invoice-card">
            <div className="header">
              {/* <!-- <header>FATTURA</header> --> */}
              <h1 className="title-intestazione" style={{ backgroundColor: preferencesOptions?.invoice?.header_color, color: preferencesOptions?.invoice?.header_font_color }}>
                FATTURA Nr. {currentInvoice?.number}{/* NUMBER */}{currentInvoice?.duplicate && " - " + currentInvoice?.duplicate}{/* DUPLICATE */}
              </h1>
              <address >
                <p className='invoice-company-name' >{currentInvoice?.company_name}{/* company name */}</p>
                <p /* contentEditable */ suppressContentEditableWarning={true}>{currentInvoice?.company_address}{/* Address */}</p>
                <p><strong>Telefono: </strong>{currentInvoice?.company_telephone}{/* Telefono */}</p>
                <p><strong>Partita IVA: </strong>{currentInvoice?.company_piva}{/* PIVA */}</p>
                <p><strong>Codice Fiscale.: </strong>{currentInvoice?.company_cod_fisc}{/* Codice Fiscale */}</p>
              </address>
              <div className='invoice-logo'><img alt="LOGO" src={preferencesOptions?.logo ? preferencesOptions.logo : ""} /></div>
            </div>

            <article>
              <div className="dest-title">
                <h4 className='invoice-client-intro' >{preferencesOptions?.invoice?.invoice_client_intro ? preferencesOptions?.invoice?.invoice_client_intro : "Destinatario"}</h4>
              </div>

              <address>
                <p /* contentEditable */ suppressContentEditableWarning={true}>{currentInvoice?.client_full_name}{/* $client['full_name'] ?> */}</p>
                <p /* contentEditable */ suppressContentEditableWarning={true}>{currentInvoice?.client_address}{/* $client['address'] ?> */}</p>
                <p><strong>Telefono: </strong>{currentInvoice?.client_telephone}{/* <?php echo htmlspecialchars($client['telephone']); ?> */}</p>
                <p><strong>C.F. / P.IVA: </strong>{currentInvoice?.client_piva}{/* <?php echo strtoupper(htmlspecialchars($client['piva'])); ?> */}</p>
                <p></p>
              </address>

              <table className="meta">
                <tbody>
                  <tr>
                    <th><span>Fattura #</span></th>
                    <td><span /* contentEditable */ suppressContentEditableWarning={true}>{currentInvoice?.number}{currentInvoice?.duplicate && " - " + currentInvoice?.duplicate}{/* DUPLICATE */}</span></td>
                  </tr>
                  <tr>
                    <th><span >Data</span></th>
                    <td><span /* contentEditable */ suppressContentEditableWarning={true}>{currentInvoice?.date ? convertDate(currentInvoice?.date) : ""}{/* <?php echo htmlspecialchars(myhuman_mysql_date($invoice['date'])); ?> */}</span></td>
                  </tr>
                </tbody>
              </table>

              <table className="inventory">
                <thead>
                  <tr>
                    <th><span >Descrizione</span></th>
                    <th className="md" colSpan={2} ><span >IVA</span></th>
                    <th className="x-sm"><span >Qt</span></th>
                    <th className="sm"><span >Prezzo</span></th>
                    <th className="sm"><span >Sconto</span></th>
                    <th className="sm"><span >Subtotale</span></th>
                  </tr>
                </thead>
                <tbody>
                  {currentInvoice?.services?.map((service, index) => (
                    <tr key={index} >
                      <td><span /* contentEditable */ suppressContentEditableWarning={true}>{service?.description}</span></td>
                      <td><span /* contentEditable */ suppressContentEditableWarning={true}>{service?.vat}</span><span>%</span></td>
                      <td><span /* contentEditable */ suppressContentEditableWarning={true}>{service?.vat_code}</span></td>
                      <td><span /* contentEditable */ suppressContentEditableWarning={true}>{service?.quantity}</span></td>
                      <td><span /* contentEditable */ suppressContentEditableWarning={true}>{service?.import}</span><span data-prefix> &euro;</span></td>
                      <td><span /* contentEditable */ suppressContentEditableWarning={true}>{service?.discount}</span><span>%</span></td>
                      <td><span /* contentEditable */ suppressContentEditableWarning={true}>{service?.subtotal}</span><span data-prefix> &euro;</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row">

                <div className="col-md-6">
                  <table className="iva-description-container">
                    <tbody>
                      <tr>
                        <th style={{ width: "5%" }} >{/* <span>Riepilogo IVA:</span> */}</th>
                        <th style={{ width: "65%" }} ><span>Riepilogo IVA:</span></th>
                        {/* <th style={{ width: "58%" }}><span>Descrizione:</span></th> */}
                        <th style={{ width: "15%" }}/* colSpan="2" */><span>Imponibile:</span></th>
                        <th style={{ width: "15%" }}/* colSpan="2" */><span>Imposte:</span></th>
                      </tr>
                      {/* <?php foreach ($aux_table_piva as $key => $service) : ?> */}
                      {currentInvoice?.vatsListSummary && Object.keys(currentInvoice?.vatsListSummary).length > 0 ? Object.keys(currentInvoice?.vatsListSummary)?.map((vatKey, index) => {
                        // console.log(vatKey); console.log(currentInvoice?.vatsListSummary[vatKey]); console.log(index);
                        const item = currentInvoice?.vatsListSummary[vatKey]
                        return (
                          <tr key={index}>
                            <td>
                              <span><strong>{vatKey}</strong></span>
                            </td>
                            <td>
                              <span>{item?.vat}</span>
                              <span data-postfix>&#37;</span>
                              <span>{item?.vat_description && ' - ' + item?.vat_description}</span>
                            </td>
                            <td>
                              <span>{(item?.subtotal).toFixed(2)}</span><span data-prefix> &euro;</span>
                            </td>
                            <td>
                              <span>{(item?.tax).toFixed(2)}</span><span data-prefix> &euro;</span>
                            </td>
                          </tr>
                        )
                      }) : <tr><td colSpan={5} style={{ textAlign: "left" }} >Nessun dato disponibile</td></tr>}
                      {/* {!Object.keys(currentInvoice?.vatsListSummary).length && <tr>
                      <td style={{ width: "20%" }}>
                        <span><strong></strong></span>
                      </td>
                      <td style={{ width: "80%" }}>
                        <span></span>
                        <span data-postfix>&#37;</span>
                        <span> - </span>
                      </td>
                      <td>
                        <span><strong></strong></span>
                      </td>
                      <td>
                        <span><strong></strong></span>
                      </td>
                    </tr>} */}

                      {/* <?php endforeach; ?> */}
                    </tbody>
                  </table>
                </div>

                <div className="col-md-6">
                  <table className="payment">
                    <tbody>
                      <tr><th><span >Tipologia di Pagamento</span></th></tr>
                      <tr><td><span /* contentEditable */ suppressContentEditableWarning={true}>{currentInvoice?.payment}{/* <?php echo htmlspecialchars($invoice['payment']); ?> */}</span></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {currentInvoice?.marca_bollo_status ?
                <div className="marca-bollo">
                  <div style={{ height: "35px" }}></div>
                  <p>Marca da bollo applicata su originale</p>
                </div> : ""
              }

              <div className='balance-container'>
                <table className="balance">
                  <tbody>
                    <tr>
                      <th><span >Subtotale</span></th>
                      <td><span>{(currentInvoice?.subtotal ? Number(currentInvoice?.subtotal) : 0).toFixed(2)}</span><span data-prefix> &euro;</span></td>
                    </tr>

                    <tr>
                      <th><span >Totale IVA</span></th>
                      <td><span /* contentEditable */ suppressContentEditableWarning={true}>{(currentInvoice?.subtotal_vat ? Number(currentInvoice?.subtotal_vat) : 0).toFixed(2)}</span><span data-prefix> &euro;</span></td>
                    </tr>

                    {currentInvoice?.marca_bollo_status ?
                      <tr>
                        <th><span >Marca da bollo</span></th>
                        <td><span /* contentEditable */ suppressContentEditableWarning={true}>{(currentInvoice?.marca_bollo_value).toFixed(2)}</span><span data-prefix> &euro;</span></td>
                      </tr> : ""
                    }

                    <tr>
                      <th><span >TOTALE</span></th>
                      <td><span>{(Number(currentInvoice?.total) + Number(currentInvoice?.marca_bollo_status ? Number(currentInvoice?.marca_bollo_value) : 0)).toFixed(2)}</span><span data-prefix> &euro;</span></td>
                    </tr>
                  </tbody>
                </table>

                {/* PAID */}
                {currentInvoice?.paid ?
                  <div className='info-paid paid'>PAGATA</div> : <div className='info-paid not-paid'>DA SALDARE</div>}

              </div>
            </article>

            {/* <?php if ($invoice['additional_info'] != '') : ?> */}
            {currentInvoice?.additional_info &&
              <div className="aside-container">
                <aside>
                  <h2><span>Note Addizionali</span></h2>
                  <div>
                    <p /* contentEditable */ suppressContentEditableWarning={true}>{currentInvoice?.additional_info}</p>
                  </div>
                </aside>
              </div>}
            {/* <?php endif; ?> */}

            <div className="footer-container">
              <div className="footer">
                <div className="footer-info-container">
                  <p><span className="bench-descr">Coordinate Bancarie:</span></p>
                  <p>
                    <span /* contentEditable */ suppressContentEditableWarning={true}>{currentInvoice?.bank_name}</span>
                    <span> - </span>
                    <span /* contentEditable */ suppressContentEditableWarning={true}>{currentInvoice?.bank_iban}</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>

  )
}
);

export default InvoicePreview