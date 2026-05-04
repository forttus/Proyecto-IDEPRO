// Servicio para consumir la API de Waliky
import axios from 'axios'

export const obtenerDatosWaliky = async (id_cliente) => {
  try {
    const dataToSend = { ciCliente: id_cliente };
    const apiResponse = await axios.post('https://svr-dockerlab.idepro.org/services-soporte/soporte/whalikis', dataToSend)
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
    isCreditApproved: waliki.IsCreditApproved,
    nameOfBeneficiary: waliki.NameOfBeneficiary,
    oficialId: waliki.OficialId,
    urlTypeClient: waliki.UrlTypeClient || '',

    // Información del Titular
    titular: titular ? {
      typeClient: titular.TypeClient || '',
      url: titular.Url || '',
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
      typeClient: garante.TypeClient || '',
      url: garante.Url || '',
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
    maritalAndGuaranteed: waliki.MaritalAndGuaranteed ? {
      phoneOfGuarante: waliki.MaritalAndGuaranteed.PhoneOfGuarante,
      emailOfGuarante: waliki.MaritalAndGuaranteed.EmailOfGuarante,
      officialIdGuarantor: waliki.MaritalAndGuaranteed.OfficialIdGuarantor,
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
      openMonthActivity: waliki.ActivityMain.OpenMonthActivity,
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

// Función para obtener datos de refinanciamiento
export const obtenerDatosRefinanciamiento = async ( idEvaluacion) => {
  try {
    const response = await axios.post('https://svr-dockerlab.idepro.org/services-soporte/soporte/froddi/actualizarRefi', {
      IdEvaluacion: idEvaluacion
    });
    console.log('Respuesta Refinanciamiento: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de refinanciamiento:', error);
    throw error;
  }
};

// Función para procesar datos de refinanciamiento
export const procesarDatosRefinanciamiento = (data) => {
  if (!data || !data.data || data.data.length === 0) {
    return null;
  }

  const refi = data.data[0];
  return {
    id: refi['Id_C2266522-3331-4E8A-B012-D2E2FAD140F6'] || '',
    numeroPrestamoNetbank: refi.numeroPrestamoNetbanck || '0',
    endeudamientoTotal: refi.Endeudamiento_Total || 0,
    endeudamientoConCredito: refi.Endeudamiento_IDEPRO_mas_Crédito || 0,
    prestamo1: refi.prestamo_1 || '0',
    monto1: refi.monto_1 || 0,
    prestamo2: refi.Préstamo_2 || '0',
    monto2: refi.Monto_2 || 0,
    descProducto: refi.DESCP_PRODUCTO || '',
    producto: refi.PRODUCTO || ''
  };
};

// Función para actualizar datos de refinanciamiento
export const actualizarDatosRefinanciamiento = async (datos) => {
  try {
    const response = await axios.post('https://svr-dockerlab.idepro.org/services-soporte/soporte/froddi/setRefi', datos);
    console.log('Datos de refinanciamiento actualizados: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar datos de refinanciamiento:', error);
    throw error;
  }
};
