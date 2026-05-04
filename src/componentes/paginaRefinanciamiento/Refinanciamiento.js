import React, { useState } from 'react';
import { obtenerDatosRefinanciamiento, procesarDatosRefinanciamiento, actualizarDatosRefinanciamiento } from '../../services/walikiService';
import './Refinanciamiento.css';

const Refinanciamiento = () => {
  const [idEvaluacion, setIdEvaluacion] = useState('');
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(false);
  const [datosEditados, setDatosEditados] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  const buscarRefinanciamiento = async () => {
    if (!idEvaluacion.trim()) {
      setError('Por favor ingresa el ID de Evaluación');
      return;
    }

    setCargando(true);
    setError(null);
    setDatos(null);
    setEditando(false);

    try {
      const respuesta = await obtenerDatosRefinanciamiento(idEvaluacion);
      const datosProcesados = procesarDatosRefinanciamiento(respuesta);
      
      if (datosProcesados) {
        setDatos(datosProcesados);
        setDatosEditados(JSON.parse(JSON.stringify(datosProcesados)));
      } else {
        setError('No se encontraron datos de refinanciamiento para esta evaluación');
      }
    } catch (err) {
      setError('Error al obtener datos de refinanciamiento. Intenta nuevamente.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarRefinanciamiento();
    }
  };

  const handleEdit = (campo, valor) => {
    setDatosEditados({
      ...datosEditados,
      [campo]: valor === '' ? 0 : isNaN(valor) ? valor : parseFloat(valor)
    });
  };

  const guardarCambios = async () => {
    setActualizando(true);
    setError(null);

    try {
      const datosEnvio = {
        ...datosEditados,
        IdEvaluacion: idEvaluacion
      };

      await actualizarDatosRefinanciamiento(datosEnvio);
      
      // Actualizar los datos originales con los editados
      setDatos(JSON.parse(JSON.stringify(datosEditados)));
      setEditando(false);
      alert('✓ Datos actualizados correctamente');
    } catch (err) {
      setError('Error al actualizar los datos. Intenta nuevamente.');
      console.error(err);
    } finally {
      setActualizando(false);
    }
  };

  const cancelarEdicion = () => {
    setDatosEditados(JSON.parse(JSON.stringify(datos)));
    setEditando(false);
  };

  return (
    <div className="refinanciamiento-container">
      <div className="busqueda-section">
        <h2>Refinanciamiento de Cliente</h2>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Ingresa ID de Evaluación"
            value={idEvaluacion}
            onChange={(e) => setIdEvaluacion(e.target.value)}
            onKeyPress={handleKeyPress}
            className="documento-input"
          />
          <button 
            onClick={buscarRefinanciamiento}
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

      {datos && (
        <div className="refi-card">
          <div className="card-header">
            <h3>Información de Refinanciamiento</h3>
            {!editando && (
              <button 
                onClick={() => setEditando(true)}
                className="btn-editar"
              >
                ✏️ Editar
              </button>
            )}
          </div>

          {editando ? (
            <div className="form-edicion">
              <div className="form-row">
                {/* <div className="form-group">
                  <label>ID Cliente:</label>
                  <input 
                    type="text" 
                    value={datosEditados.idCliente}
                    onChange={(e) => handleEdit('idCliente', e.target.value)}
                    disabled
                    className="form-input"
                  />
                </div> */}

                <div className="form-group">
                  <label>Nro. Préstamo Netbank:</label>
                  <input 
                    type="text" 
                    value={datosEditados.numeroPrestamoNetbank}
                    onChange={(e) => handleEdit('numeroPrestamoNetbank', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Endeudamiento Total (Bs):</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={datosEditados.endeudamientoTotal}
                    onChange={(e) => handleEdit('endeudamientoTotal', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Endeudamiento IDEPRO + Crédito (Bs):</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={datosEditados.endeudamientoConCredito}
                    onChange={(e) => handleEdit('endeudamientoConCredito', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Préstamo 1:</label>
                  <input 
                    type="text" 
                    value={datosEditados.prestamo1}
                    onChange={(e) => handleEdit('prestamo1', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Monto 1 (Bs):</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={datosEditados.monto1}
                    onChange={(e) => handleEdit('monto1', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Préstamo 2:</label>
                  <input 
                    type="text" 
                    value={datosEditados.prestamo2}
                    onChange={(e) => handleEdit('prestamo2', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Monto 2 (Bs):</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={datosEditados.monto2}
                    onChange={(e) => handleEdit('monto2', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Producto:</label>
                  <input 
                    type="text" 
                    value={datosEditados.producto}
                    onChange={(e) => handleEdit('producto', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  onClick={guardarCambios}
                  disabled={actualizando}
                  className="btn-guardar"
                >
                  {actualizando ? 'Guardando...' : '💾 Guardar Cambios'}
                </button>
                <button 
                  onClick={cancelarEdicion}
                  disabled={actualizando}
                  className="btn-cancelar"
                >
                  ✕ Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="info-display">
              {/* <div className="info-row">
                <div className="info-item">
                  <label>ID Cliente:</label>
                  <p>{datos.idCliente}</p>
                </div>
                <div className="info-item">
                  <label>Nro. Préstamo Netbank:</label>
                  <p>{datos.numeroPrestamoNetbank}</p>
                </div>
              </div> */}

              <div className="info-row">
                <div className="info-item">
                  <label>Endeudamiento Total:</label>
                  <p className="amount">Bs. {datos.endeudamientoTotal.toFixed(2)}</p>
                </div>
                <div className="info-item">
                  <label>Endeudamiento IDEPRO + Crédito:</label>
                  <p className="amount">Bs. {datos.endeudamientoConCredito.toFixed(2)}</p>
                </div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <label>Préstamo 1:</label>
                  <p>{datos.prestamo1}</p>
                </div>
                <div className="info-item">
                  <label>Monto 1:</label>
                  <p className="amount">Bs. {datos.monto1.toFixed(2)}</p>
                </div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <label>Préstamo 2:</label>
                  <p>{datos.prestamo2}</p>
                </div>
                <div className="info-item">
                  <label>Monto 2:</label>
                  <p className="amount">Bs. {datos.monto2.toFixed(2)}</p>
                </div>
              </div>

              <div className="info-row">
                <div className="info-item full-width">
                  <label>Producto:</label>
                  <p>{datos.producto}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Refinanciamiento;
