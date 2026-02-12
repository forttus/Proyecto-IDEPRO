import React, { useState } from 'react';
import { obtenerDatosOnboarding, procesarDatosOnboarding } from '../../services/onboardingService';
import './Onboarding.css';

const Onboarding = () => {
  const [onboarding, setOnboarding] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  const buscarOnboarding = async () => {
    if (!email.trim()) {
      setError('Por favor ingresa un email');
      return;
    }

    setCargando(true);
    setError(null);
    setOnboarding(null);

    try {
      const datos = await obtenerDatosOnboarding(email);
      console.log('Goku!!', datos);
      
      const datosProcessados = procesarDatosOnboarding(datos);
      
      if (datosProcessados) {
        setOnboarding(datosProcessados);
      } else {
        setError('No se encontraron datos de Onboarding');
      }
    } catch (err) {
      setError('Error al obtener datos de Onboarding. Intenta nuevamente.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarOnboarding();
    }
  };

  const getEstadoStep = (step) => {
    const pasos = {
      1: 'Email',
      2: 'Validación Metamap',
      3: 'Validación SEGIP',
      4: 'Datos Generales',
      5: 'Documentos',
      6: 'Validación Token',
    };
    return pasos[step] || `Paso ${step}`;
  };

  return (
    <div className="onboarding-container">
      <div className="busqueda-section">
        <h2>Consultar Información de Onboarding</h2>
        
        <div className="input-group">
          <input
            type="email"
            placeholder="Ingresa email del cliente"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="email-input"
          />
          <button 
            onClick={buscarOnboarding}
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

      {onboarding && (
        <div className="onboarding-card">
          <div className="card-header onboarding-header">
            <h3>Información de Onboarding</h3>
            <div className="step-badge">
              <span className="step-number">{onboarding.step}</span>
              <span className="step-label">{getEstadoStep(onboarding.step)}</span>
            </div>
          </div>

          {/* Datos Personales */}
          {onboarding.generalData && (
            <div className="section">
              <h4>👤 Datos Personales</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Nombres:</label>
                  <p>{onboarding.generalData.nombres}</p>
                </div>
                <div className="info-item">
                  <label>Apellido Paterno:</label>
                  <p>{onboarding.generalData.apellidoPaterno}</p>
                </div>
                <div className="info-item">
                  <label>Apellido Materno:</label>
                  <p>{onboarding.generalData.apellidoMaterno}</p>
                </div>
                <div className="info-item">
                  <label>Apellido de Casada:</label>
                  <p>{onboarding.generalData.apellidoCasada}</p>
                </div>
                <div className="info-item">
                  <label>Fecha de Nacimiento:</label>
                  <p>{onboarding.generalData.fechaNacimiento}</p>
                </div>
                <div className="info-item">
                  <label>Género:</label>
                  <p>{onboarding.generalData.genero}</p>
                </div>
                <div className="info-item">
                  <label>Lugar de Nacimiento:</label>
                  <p>{onboarding.generalData.lugarNacimiento}</p>
                </div>
                <div className="info-item">
                  <label>Profesión:</label>
                  <p>{onboarding.generalData.profesion}</p>
                </div>
                <div className="info-item">
                  <label>Estado Civil:</label>
                  <p>{onboarding.generalData.estadoCivil}</p>
                </div>
              </div>

              {onboarding.generalData.conyuge.nombre !== 'N/A' && (
                <div className="spouse-info">
                  <h5>Información del Cónyuge</h5>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Nombre Completo:</label>
                      <p>{onboarding.generalData.conyuge.nombre}</p>
                    </div>
                    <div className="info-item">
                      <label>Posición:</label>
                      <p>{onboarding.generalData.conyuge.posicion}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Documento de Identidad */}
          {onboarding.generalData && (
            <div className="section">
              <h4>🆔 Documento de Identidad</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Número de Documento:</label>
                  <p>{onboarding.generalData.numeroDocumento}</p>
                </div>
                <div className="info-item">
                  <label>Fecha de Vencimiento:</label>
                  <p>{onboarding.generalData.fechaVencimiento}</p>
                </div>
              </div>
            </div>
          )}

          {/* Datos de Dirección */}
          {onboarding.addressData && (
            <div className="section">
              <h4>📍 Información de Dirección</h4>
              <div className="info-grid">
                <div className="info-item full-width">
                  <label>Dirección Completa:</label>
                  <p>{onboarding.addressData.direccion}</p>
                </div>
                <div className="info-item">
                  <label>Departamento:</label>
                  <p>{onboarding.addressData.departamento}</p>
                </div>
                <div className="info-item">
                  <label>Ciudad:</label>
                  <p>{onboarding.addressData.ciudad}</p>
                </div>
                <div className="info-item">
                  <label>Provincia:</label>
                  <p>{onboarding.addressData.provincia}</p>
                </div>
              </div>
            </div>
          )}

          {/* Información de Contacto */}
          <div className="section">
            <h4>📧 Información de Contacto</h4>
            <div className="info-grid">
              <div className="info-item">
                <label>Email:</label>
                <p>{onboarding.email}</p>
              </div>
              <div className="info-item">
                <label>Teléfono:</label>
                <p>{onboarding.phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* Referencias */}
          {onboarding.references && (
            <div className="section">
              <h4>🤝 Información de Referencias</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Nombre de la Referencia:</label>
                  <p>{onboarding.references.nombre}</p>
                </div>
                <div className="info-item">
                  <label>Celular de la Referencia:</label>
                  <p>{onboarding.references.celular}</p>
                </div>
              </div>
            </div>
          )}

          {/* Información del Documento */}
          {onboarding.document && (
            <div className="section">
              <h4>📄 Validación de Documento</h4>
              <div className="document-info">
                <div className="document-item">
                  <label>Token Válido:</label>
                  <span className={`token-badge ${onboarding.document.isValidToken ? 'valid' : 'invalid'}`}>
                    {onboarding.document.isValidToken ? '✓ Válido' : '✗ Inválido'}
                  </span>
                </div>
                <div className="document-item">
                  <label>Token:</label>
                  <p>{onboarding.document.token}</p>
                </div>
              </div>
            </div>
          )}

          {/* Fechas de Registro */}
          {Object.keys(onboarding.registrationDateStep).length > 0 && (
            <div className="section">
              <h4>⏱️ Fechas de Registro por Paso</h4>
              <div className="timeline">
                {Object.entries(onboarding.registrationDateStep).map(([paso, fecha], idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <label>{paso}:</label>
                      <p>{fecha}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Información de Auditoría */}
          {onboarding.auditFields && (
            <div className="section audit-section">
              <h4>🔐 Información de Auditoría</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Usuario de Creación:</label>
                  <p>{onboarding.auditFields.userCreationId}</p>
                </div>
                <div className="info-item">
                  <label>Fecha de Creación:</label>
                  <p>{onboarding.auditFields.creationDate}</p>
                </div>
                <div className="info-item">
                  <label>Usuario Última Modificación:</label>
                  <p>{onboarding.auditFields.userLastModifiedId}</p>
                </div>
                <div className="info-item">
                  <label>Última Modificación:</label>
                  <p>{onboarding.auditFields.dateLastModificationId}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!onboarding && !error && !cargando && (
        <div className="inicial-message">
          <p>🔍 Ingresa un email para consultar la información de Onboarding</p>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
