import React, { useState } from 'react';
import { obtenerDatosWaliky, procesarDatosWaliky } from '../../services/walikiService';
import './Waliky.css';

const Waliky = () => {
  const [waliki, setWaliki] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [cliente_id, setCliente_id] = useState('');

  const buscarWaliky = async () => {
    if (!cliente_id.trim()) {
      setError('Por favor ingresa un ID de cliente');
      return;
    }

    setCargando(true);
    setError(null);
    setWaliki(null);

    try {
      const datos = await obtenerDatosWaliky(cliente_id);
      const datosProcessados = procesarDatosWaliky(datos);
      
      if (datosProcessados) {
        setWaliki(datosProcessados);
      } else {
        setError('No se encontraron datos de Waliky');
      }
    } catch (err) {
      setError('Error al obtener datos de Waliky. Intenta nuevamente.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarWaliky();
    }
  };

  const getEstadoFirma = (signature) => {
    return signature ? '✓ Firmado' : '⏳ Pendiente';
  };

  return (
    <div className="waliky-container">
      <div className="busqueda-section">
        <h2>Consultar Información Waliky</h2>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Ingresa ID del cliente"
            value={cliente_id}
            onChange={(e) => setCliente_id(e.target.value)}
            onKeyPress={handleKeyPress}
            className="cliente-input"
          />
          <button 
            onClick={buscarWaliky}
            disabled={cargando}
            className="btn-buscar"
          >
            {cargando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
        </div>
      )}

      {waliki && (
        <div className="waliky-card">
          <div className="card-header waliky-header">
            <h3>Información Waliky - Transacción {waliki.creditCode} </h3>
            <h3> PASO: {waliki.step}</h3>
            <span className={`status-badge ${waliki.isCreditApproved ? 'approved' : 'pending'}`}>
              {waliki.isCreditApproved ? '✓ Aprobado' : '⏳ En Proceso'}
            </span>
          </div>

          {/* Información del Crédito */}
          <div className="section">
            <h4>💰 Información del Crédito</h4>
            {waliki.walikiVeloz && (
              <div className="credit-grid">
                <div className="credit-card">
                  <label>Monto Solicitado</label>
                  <p className="credit-amount">Bs. {waliki.walikiVeloz.amountToRequest}</p>
                </div>
                <div className="credit-card">
                  <label>Monto Aprobado</label>
                  <p className="credit-amount">Bs. {waliki.preApprovalCredit?.authorizedAmount || 'N/A'}</p>
                </div>
                <div className="credit-card">
                  <label>Plazo (meses)</label>
                  <p className="credit-amount">{waliki.preApprovalCredit?.term || waliki.walikiVeloz.plazo}</p>
                </div>
                <div className="credit-card">
                  <label>Tasa de Interés</label>
                  <p className="credit-amount">{waliki.preApprovalCredit?.rate || waliki.walikiVeloz.tasa}%</p>
                </div>
              </div>
            )}
          </div>

          {/* Información del Titular */}
          {waliki.titular && (
            <div className="section">
              <h4>👤 Información del Titular</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Tipo de Cliente:</label>
                  <p>{waliki.titular.typeClient}</p>
                </div>
                {waliki.titular.url && (
                  <div className="info-item full-width">
                    <label>URL Waliki:</label>
                    <a href={waliki.titular.url} target="_blank" rel="noopener noreferrer" className="waliki-link">
                      {waliki.titular.url.substring(0, 50)}...
                    </a>
                  </div>
                )}
                <div className="info-item">
                  <label>Nombres:</label>
                  <p>{waliki.titular.nombres}</p>
                </div>
                <div className="info-item">
                  <label>Apellidos:</label>
                  <p>{waliki.titular.primerApellido} {waliki.titular.segundoApellido}</p>
                </div>
                <div className="info-item">
                  <label>CI:</label>
                  <p>{waliki.titular.ci}</p>
                </div>
                <div className="info-item">
                  <label>Fecha de Nacimiento:</label>
                  <p>{waliki.titular.fechaNacimiento}</p>
                </div>
                <div className="info-item">
                  <label>Estado Civil:</label>
                  <p>{waliki.titular.estadoCivil}</p>
                </div>
                <div className="info-item">
                  <label>Profesión:</label>
                  <p>{waliki.titular.profesion}</p>
                </div>
                <div className="info-item full-width">
                  <label>Domicilio:</label>
                  <p>{waliki.titular.domicilio || 'No disponible'}</p>
                </div>
                <div className="info-item">
                  <label>Departamento:</label>
                  <p>{waliki.titular.departamento}</p>
                </div>
                <div className="info-item">
                  <label>Localidad:</label>
                  <p>{waliki.titular.localidad}</p>
                </div>
              </div>
            </div>
          )}

          {/* Información del Garante */}
          {waliki.garante && (
            <div className="section">
              <h4>🤝 Información del Garante</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Tipo de Cliente:</label>
                  <p>{waliki.garante.typeClient}</p>
                </div>
                {waliki.garante.url && (
                  <div className="info-item full-width">
                    <label>URL Waliki:</label>
                    <a href={waliki.garante.url} target="_blank" rel="noopener noreferrer" className="waliki-link">
                      {waliki.garante.url.substring(0, 50)}...
                    </a>
                  </div>
                )}
                <div className="info-item">
                  <label>Nombres:</label>
                  <p>{waliki.garante.nombres}</p>
                </div>
                <div className="info-item">
                  <label>Apellidos:</label>
                  <p>{waliki.garante.primerApellido} {waliki.garante.segundoApellido}</p>
                </div>
                <div className="info-item">
                  <label>CI:</label>
                  <p>{waliki.garante.ci}</p>
                </div>
                <div className="info-item">
                  <label>Fecha de Nacimiento:</label>
                  <p>{waliki.garante.fechaNacimiento}</p>
                </div>
                <div className="info-item">
                  <label>Estado Civil:</label>
                  <p>{waliki.garante.estadoCivil}</p>
                </div>
                <div className="info-item">
                  <label>Profesión:</label>
                  <p>{waliki.garante.profesion}</p>
                </div>
                <div className="info-item">
                  <label>Teléfono:</label>
                  <p>{waliki.maritalAndGuaranteed?.phoneOfMarital || waliki.maritalAndGuaranteed?.phoneOfGuarante || 'No disponible'}</p>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <p>{waliki.maritalAndGuaranteed?.emailOfMarital || waliki.maritalAndGuaranteed?.emailOfGuarante || 'No disponible'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Información del Codeudor */}
          {waliki.codeudor && (
            <div className="section">
              <h4>👥 Información del Codeudor</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Tipo de Cliente:</label>
                  <p>{waliki.codeudor.typeClient}</p>
                </div>
                {waliki.codeudor.url && (
                  <div className="info-item full-width">
                    <label>URL Waliki:</label>
                    <a href={waliki.codeudor.url} target="_blank" rel="noopener noreferrer" className="waliki-link">
                      {waliki.codeudor.url.substring(0, 50)}...
                    </a>
                  </div>
                )}
                <div className="info-item">
                  <label>Nombres:</label>
                  <p>{waliki.codeudor.nombres}</p>
                </div>
                <div className="info-item">
                  <label>Apellidos:</label>
                  <p>{waliki.codeudor.primerApellido} {waliki.codeudor.segundoApellido}</p>
                </div>
                <div className="info-item">
                  <label>CI:</label>
                  <p>{waliki.codeudor.ci}</p>
                </div>
                <div className="info-item">
                  <label>Fecha de Nacimiento:</label>
                  <p>{waliki.codeudor.fechaNacimiento}</p>
                </div>
                <div className="info-item">
                  <label>Estado Civil:</label>
                  <p>{waliki.codeudor.estadoCivil}</p>
                </div>
                <div className="info-item">
                  <label>Profesión:</label>
                  <p>{waliki.codeudor.profesion}</p>
                </div>
                <div className="info-item">
                  <label>Teléfono:</label>
                  <p>{waliki.maritalAndGuaranteed?.phoneOfMarital || 'No disponible'}</p>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <p>{waliki.maritalAndGuaranteed?.emailOfMarital || 'No disponible'}</p>
                </div>
                <div className="info-item full-width">
                  <label>Domicilio:</label>
                  <p>{waliki.codeudor.domicilio || 'No disponible'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Estado de Firmas Digitales */}
          {waliki.legalSignatureKit && (
            <div className="section">
              <h4>✍️ Estado de Firmas Digitales</h4>
              <div className="signatures-container">
                {waliki.legalSignatureKit.legalSignatures.map((sig, idx) => (
                  <div key={idx} className="signature-item">
                    <div className="signature-header">
                      <h6>{sig.TypeClient}</h6>
                      <span className={`firma-badge ${sig.Signature ? 'firmado' : 'pendiente'}`}>
                        {getEstadoFirma(sig.Signature)}
                      </span>
                    </div>
                    <div className="signature-details">
                      <p><strong>ID Transacción:</strong> {sig.TransactionId}</p>
                      {sig.Url && (
                        <a href={sig.Url} target="_blank" rel="noopener noreferrer" className="firma-link">
                          Ver Documento de Firma
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documentos */}
          {waliki.documents && waliki.documents.length > 0 && (
            <div className="section">
              <h4>📄 Documentos</h4>
              <div className="documents-list">
                {waliki.documents.map((doc, idx) => (
                  <div key={idx} className="document-item">
                    <div className="doc-header">
                      <h6>{doc.alias}</h6>
                    </div>
                    <div className="doc-links">
                      <a href={doc.urlExport} target="_blank" rel="noopener noreferrer" className="doc-link export">
                        📥 Descargar
                      </a>
                      <a href={doc.urlViewer} target="_blank" rel="noopener noreferrer" className="doc-link view">
                        👁️ Ver
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Información de Actividad */}
          {waliki.activityMain && (
            <div className="section">
              <h4>💼 Información de Actividad Principal</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Descripción:</label>
                  <p>{waliki.activityMain.descriptionActivity}</p>
                </div>
                <div className="info-item">
                  <label>Tipo de Actividad:</label>
                  <p>{waliki.activityMain.typeOfActivity}</p>
                </div>
                <div className="info-item">
                  <label>Año de Apertura:</label>
                  <p>{waliki.activityMain.openYearActivity}</p>
                </div>
                <div className="info-item">
                  <label>Mes de Apertura:</label>
                  <p>{waliki.activityMain.openMonthActivity}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!waliki && !error && !cargando && (
        <div className="inicial-message">
          <p>🔍 Ingresa un ID de cliente para consultar la información Waliky</p>
        </div>
      )}
    </div>
  );
};

export default Waliky;
