import React, { useState } from 'react';
import { obtenerDatosCliente, procesarDatosCliente } from '../../services/clienteService';
import './DeudasCliente.css';

const DeudasCliente = () => {
  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [numero_documento, setNumero_documento] = useState('');

  const buscarCliente = async () => {
    if (!numero_documento.trim()) {
      setError('Por favor ingresa un número de documento');
      return;
    }

    setCargando(true);
    setError(null);
    setCliente(null);

    try {
      const datos = await obtenerDatosCliente(numero_documento);
      const datosProcessados = procesarDatosCliente(datos);
      
      if (datosProcessados) {
        setCliente(datosProcessados);
      } else {
        setError('No se encontraron datos del cliente');
      }
    } catch (err) {
      setError('Error al obtener datos del cliente. Intenta nuevamente.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarCliente();
    }
  };

  return (
    <div className="deudas-cliente-container">
      <div className="busqueda-section">
        <h2>Consultar Deudas del Cliente</h2>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Ingresa número de documento"
            value={numero_documento}
            onChange={(e) => setNumero_documento(e.target.value)}
            onKeyPress={handleKeyPress}
            className="documento-input"
          />
          <button 
            onClick={buscarCliente}
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

      {cliente && (
        <div className="cliente-info-card">
          <div className="card-header">
            <h3>Información del Cliente</h3>
          </div>

          <div className="deudas-section">
            <h4>📊 Información de Préstamos</h4>
            
            {cliente.prestamos && cliente.prestamos.length > 0 ? (
              <div className="prestamos-container">
                <div className="saldo-total-card">
                  <h5>Saldo Total a Refinanciar</h5>
                  <p className="saldo-amount">Bs. {cliente.saldo_total_refinanciar?.toFixed(2) || '0.00'}</p>
                </div>

                <div className="prestamos-list">
                  {cliente.prestamos.map((prestamo, index) => (
                    <div key={index} className="prestamo-card">
                      <div className="prestamo-header">
                        <h6>Préstamo #{index + 1}</h6>
                        <span className={`estado-badge estado-${prestamo.id_estado}`}>
                          {prestamo.estado}
                        </span>
                      </div>

                      <div className="prestamo-grid">
                        <div className="prestamo-item">
                          <label>Nro. de Préstamo:</label>
                          <p>{prestamo.nro_prestamo}</p>
                        </div>

                        <div className="prestamo-item">
                          <label>Monto Desembolsado:</label>
                          <p className="monto">Bs. {prestamo.monto_desembolsado_origen?.toFixed(2)}</p>
                        </div>

                        <div className="prestamo-item">
                          <label>Producto:</label>
                          <p>{prestamo.producto}</p>
                        </div>

                        <div className="prestamo-item">
                          <label>Estado:</label>
                          <p>{prestamo.estado}</p>
                        </div>
                      </div>

                      {prestamo.productos_habilitados && prestamo.productos_habilitados.length > 0 && (
                        <div className="productos-habilitados">
                          <label>Productos Habilitados:</label>
                          <div className="productos-list">
                            {prestamo.productos_habilitados.map((prod, idx) => (
                              <span key={idx} className="producto-tag">
                                {prod.producto}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="deudas-placeholder">✓ Este cliente no tiene préstamos registrados</p>
            )}
          </div>

          <div className="tabs-container">
            <div className="tab-content">
              <h4>Datos Personales</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Nombres:</label>
                  <p>{cliente.nombres}</p>
                </div>

                <div className="info-item">
                  <label>Apellidos:</label>
                  <p>{cliente.apellidos}</p>
                </div>

                <div className="info-item">
                  <label>Documento:</label>
                  <p>{cliente.numero_documento} {cliente.complemento ? `- ${cliente.complemento}` : ''}</p>
                </div>

                <div className="info-item">
                  <label>Sexo:</label>
                  <p>{cliente.sexo}</p>
                </div>

                <div className="info-item">
                  <label>Fecha de Nacimiento:</label>
                  <p>{cliente.fecha_nacimiento}</p>
                </div>

                <div className="info-item">
                  <label>Nacionalidad:</label>
                  <p>{cliente.nacionalidad}</p>
                </div>

                <div className="info-item">
                  <label>Estado Civil:</label>
                  <p>{cliente.estado_civil}</p>
                </div>

                <div className="info-item">
                  <label>Vencimiento Documento:</label>
                  <p>{cliente.fecha_vencimiento_doc}</p>
                </div>
              </div>

              <h4>Información de Contacto</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Celular:</label>
                  <p>{cliente.numero_celular}</p>
                </div>

                <div className="info-item">
                  <label>Teléfono Domicilio:</label>
                  <p>{cliente.numero_telefono_domicilio || 'No disponible'}</p>
                </div>

                <div className="info-item">
                  <label>Teléfono Oficina:</label>
                  <p>{cliente.numero_telefono_oficina || 'No disponible'}</p>
                </div>

                <div className="info-item">
                  <label>Email:</label>
                  <p>{cliente.email}</p>
                </div>
              </div>

              <h4>Información Laboral</h4>
              <div className="info-grid">
                <div className="info-item full-width">
                  <label>Descripción de Actividad:</label>
                  <p>{cliente.descripcion_actividad || 'No disponible'}</p>
                </div>

                <div className="info-item">
                  <label>Profesión:</label>
                  <p>{cliente.profesion}</p>
                </div>

                <div className="info-item">
                  <label>Nivel de Educación:</label>
                  <p>{cliente.nivel_educacion}</p>
                </div>

                <div className="info-item">
                  <label>Antigüedad (años):</label>
                  <p>{cliente.antiguedad || 'No disponible'}</p>
                </div>
              </div>

              <h4>Información de Dirección</h4>
              <div className="info-grid">
                <div className="info-item full-width">
                  <label>Dirección:</label>
                  <p>{cliente.direccion}</p>
                </div>

                <div className="info-item full-width">
                  <label>Referencia:</label>
                  <p>{cliente.referencia_direccion || 'Sin referencia'}</p>
                </div>

                <div className="info-item full-width">
                  <label>Envío de Correspondencia:</label>
                  <p>{cliente.envio_correspondencia}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!cliente && !error && !cargando && (
        <div className="inicial-message">
          <p>🔍 Ingresa un número de documento para ver la información del cliente</p>
        </div>
      )}
    </div>
  );
};

export default DeudasCliente;