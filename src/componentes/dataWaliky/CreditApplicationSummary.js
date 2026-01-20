// CreditApplicationSummary.jsx
import React from 'react';
import './CreditApplicationSummary.css';

const CreditApplicationSummary = ({ application }) => {
  const {
    TitularName,
    NameOfBeneficiary,
    IsCreditAproved,
    WalikiVeloz,
    PreAprovalCredit,
    LegalSignatureCentralRisk,
    Documents = [],
    RegisterLastStep,
  } = application || {};

  const creditInfo = LegalSignatureCentralRisk?.LegalSignaturesCentralRisk?.[0] || {};

  return (
    <div className="credit-application-summary">
      <h2>Resumen de Solicitud de Crédito</h2>

      <div className="sections">
        {/* Datos del titular */}
        <section>
          <h3>Titular</h3>
          <p><strong>Nombre:</strong> {TitularName}</p>
          <p><strong>CI:</strong> {creditInfo.CI}</p>
          <p><strong>Fecha de Nacimiento:</strong> {creditInfo.FechaDeNacimiento}</p>
          <p><strong>Estado Civil:</strong> {creditInfo.EstadoCivil}</p>
          <p><strong>Ocupación:</strong> {creditInfo.ProfesionUOcupacion}</p>
          <p><strong>Departamento:</strong> {creditInfo.Departamento}</p>
        </section>

        {/* Beneficiario */}
        <section>
          <h3>Beneficiario</h3>
          <p>{NameOfBeneficiary}</p>
        </section>

        {/* Estado del crédito */}
        <section>
          <h3>Estado del Crédito</h3>
          <p>
            <strong>Aprobado:</strong> {IsCreditAproved ? '✅ Sí' : '❌ No'}
          </p>
          {PreAprovalCredit && (
            <>
              <p><strong>Monto Autorizado:</strong> {PreAprovalCredit.AuthorizedAmount} Bs</p>
              <p><strong>Plazo:</strong> {PreAprovalCredit.Term} meses</p>
              <p><strong>Cuota Mensual:</strong> {PreAprovalCredit.Fee} Bs</p>
              <p><strong>Tasa de Interés:</strong> {PreAprovalCredit.Rate}%</p>
              <p><strong>Seguro:</strong> {PreAprovalCredit.Sure}</p>
            </>
          )}
        </section>

        {/* Actividad económica */}
        {application?.ActivityMain && (
          <section>
            <h3>Actividad Económica</h3>
            <p><strong>Descripción:</strong> {application.ActivityMain.DescriptionActivity}</p>
            <p><strong>Tipo:</strong> {application.ActivityMain.TypeOfActivity}</p>
            <p><strong>Año de Inicio:</strong> {application.ActivityMain.OpenYearActivity}</p>
            <p><strong>Zona:</strong> {application.ActivityMain.ZoneActivity}</p>
          </section>
        )}

        {/* Documentos */}
        <section className="full-width">
          <h3>Documentos</h3>
          <ul>
            {Documents.map((doc) => (
              <li key={doc._id}>
                <a href={doc.urlViewer} target="_blank" rel="noopener noreferrer">
                  {doc.alias || doc.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Últimos pasos del flujo */}
        <section className="full-width">
          <h3>Registro de Etapas</h3>
          {Object.entries(RegisterLastStep || {}).map(([step, date]) => (
            <p key={step}><strong>{step}:</strong> {new Date(date).toLocaleString()}</p>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CreditApplicationSummary;
