// Servicio para consumir la API de Waliky
import axios from 'axios'

export const obtenerDatosWaliky = async (id_cliente) => {
  try {
    const dataToSend = { ciCliente: id_cliente };
    const apiResponse = await axios.post('http://localhost:4000/soporte/whalikis', dataToSend)
    const apiData = apiResponse.data
    console.log('Respuesta Waliky: ', apiResponse.data);
    
    return apiData;
  } catch (error) {
    console.error('Error al obtener datos de Waliky:', error);
    throw error;
  }
};

// Función para procesar datos de Waliky
export const procesarDatosWaliky = (data) => {
  if (!data || !data.data || data.data.length === 0) {
    return null;
  }

  const waliki = data.data[0];
  const titular = waliki.LegalSignatureCentralRisk?.LegalSignaturesCentralRisk?.find(
    (item) => item.Role === 'TITULAR_BUROS'
  );
  const garante = waliki.LegalSignatureCentralRisk?.LegalSignaturesCentralRisk?.find(
    (item) => item.Role === 'GARANTE_BUROS'
  );

  return {
    // Información general
    id: waliki._id,
    creditCode: waliki.CreditCode,
    transactionId: waliki.TransactionId,
    step: waliki.Step,
    isCreditApproved: waliki.IsCreditAproved,
    nameOfBeneficiary: waliki.NameOfBeneficiary,
    oficialId: waliki.OficialId,

    // Información del Titular
    titular: titular ? {
      nombres: titular.Nombres,
      primerApellido: titular.PrimerApellido,
      segundoApellido: titular.SegundoApellido,
      ci: titular.CI,
      departamento: titular.Departamento,
      provincia: titular.Provincia,
      localidad: titular.Localidad,
      estadoCivil: titular.EstadoCivil,
      fechaNacimiento: titular.FechaDeNacimiento,
      profesion: titular.ProfesionUOcupacion,
      domicilio: titular.Domicilio,
      pais: titular.Pais,
      isActive: titular.IsActive,
      approved: titular.Approved,
      frontCi: titular.FrontCi,
      backCi: titular.BackCi,
    } : null,

    // Información del Garante
    garante: garante ? {
      nombres: garante.Nombres,
      primerApellido: garante.PrimerApellido,
      segundoApellido: garante.SegundoApellido,
      ci: garante.CI,
      departamento: garante.Departamento,
      provincia: garante.Provincia,
      localidad: garante.Localidad,
      estadoCivil: garante.EstadoCivil,
      fechaNacimiento: garante.FechaDeNacimiento,
      profesion: garante.ProfesionUOcupacion,
      domicilio: garante.Domicilio,
      pais: garante.Pais,
      isActive: garante.IsActive,
      approved: garante.Approved,
      frontCi: garante.FrontCi,
      backCi: garante.BackCi,
    } : null,

    // Información de contacto del garante
    maritalAndGuaranteed: waliki.MaritalAndGuaranted ? {
      phoneOfGuarante: waliki.MaritalAndGuaranted.PhoneOfGuarante,
      emailOfGuarante: waliki.MaritalAndGuaranted.EmailOfGuarante,
      officialIdGuarantor: waliki.MaritalAndGuaranted.OfficialIdGuarantor,
    } : null,

    // Información del crédito (Waliki Veloz)
    walikiVeloz: waliki.WalikiVeloz ? {
      monto: waliki.WalikiVeloz.monto,
      plazo: waliki.WalikiVeloz.plazo,
      tasa: waliki.WalikiVeloz.tasa,
      amountToRequest: waliki.WalikiVeloz.AmountToRequest,
      isForOperation: waliki.WalikiVeloz.IsForOperation,
    } : null,

    // Información de pre-aprobación
    preApprovalCredit: waliki.PreAprovalCredit ? {
      authorizedAmount: waliki.PreAprovalCredit.AuthorizedAmount,
      term: waliki.PreAprovalCredit.Term,
      fee: waliki.PreAprovalCredit.Fee,
      sure: waliki.PreAprovalCredit.Sure,
      rate: waliki.PreAprovalCredit.Rate,
    } : null,

    // Información de actividad principal
    activityMain: waliki.ActivityMain ? {
      descriptionActivity: waliki.ActivityMain.DescriptionActivity,
      typeOfActivity: waliki.ActivityMain.TypeOfActivity,
      openYearActivity: waliki.ActivityMain.OpenYearActivity,
      openMonthActivity: waliki.ActivityMain.OpenMouthActivity,
    } : null,

    // Estado de firmas
    legalSignatureKit: waliki.LegalSignatureKitLegal ? {
      dateSentSignature: waliki.LegalSignatureKitLegal.DateSentSignature,
      signaturesKitGuarantors: waliki.LegalSignatureKitLegal.SignaturesKitGuarantors,
      waitingUserKitSignature: waliki.LegalSignatureKitLegal.WaitingUserKitSignature,
      legalSignatures: waliki.LegalSignatureKitLegal.LegalSignaturesKitLegal || [],
    } : null,

    // Documentos
    documents: waliki.Documents || [],

    // Fechas de registro de pasos
    registerLastStep: waliki.RegisterLastStep || {},
  };
};
