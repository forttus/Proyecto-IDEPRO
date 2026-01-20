// Servicio para consumir la API de Onboarding
import axios from 'axios'

export const obtenerDatosOnboarding = async (email) => {
  try {
    const dataToSend = { email };
    const apiResponse = await axios.post('http://localhost:4000/soporte/onboarding', dataToSend)
    const apiData = apiResponse.data
    console.log('Respuesta Onboarding: ', apiResponse.data);
    
    return apiData;
  } catch (error) {
    console.error('Error al obtener datos de Onboarding:', error);
    throw error;
  }
};

// Función para procesar datos de Onboarding
export const procesarDatosOnboarding = (data) => {
  if (!data || !data._id) {
    return null;
  }

  const onboarding = data;

  return {
    // Información general
    id: onboarding._id?.$oid || onboarding._id,
    email: onboarding.Email,
    phoneNumber: onboarding.PhoneNumber,
    step: onboarding.Step,
    promotionCode: onboarding.PromotionCode || 'N/A',
    isActive: onboarding.AuditFields?.IsActive,

    // Datos generales
    generalData: onboarding.GeneralData ? {
      nombres: onboarding.GeneralData.Name,
      apellidoPaterno: onboarding.GeneralData.FathersLastName,
      apellidoMaterno: onboarding.GeneralData.MothersLastName,
      apellidoCasada: onboarding.GeneralData.MarriedLastName || 'N/A',
      fechaNacimiento: new Date(onboarding.GeneralData.DateOfBirth?.$date).toLocaleDateString('es-BO'),
      genero: onboarding.GeneralData.Gender === 1 ? 'Masculino' : onboarding.GeneralData.Gender === 2 ? 'Femenino' : 'No especificado',
      lugarNacimiento: onboarding.GeneralData.BirthPlace,
      numeroDocumento: onboarding.GeneralData.IDDocument,
      fechaVencimiento: onboarding.GeneralData.DueDate,
      profesion: onboarding.GeneralData.Profession,
      estadoCivil: onboarding.GeneralData.MaritalStatus,
      conyuge: {
        nombre: onboarding.GeneralData.SpouseData?.SpFullName || 'N/A',
        posicion: onboarding.GeneralData.SpouseData?.SpPosition || 'N/A',
      },
    } : null,

    // Datos de dirección
    addressData: onboarding.AddressData ? {
      direccion: onboarding.AddressData.FullAddress,
      departamento: onboarding.AddressData.Department,
      ciudad: onboarding.AddressData.City,
      provincia: onboarding.AddressData.Province,
    } : null,

    // Referencias
    references: onboarding.References ? {
      nombre: onboarding.References.Name,
      celular: onboarding.References.Cellphone,
    } : null,

    // Documento
    document: onboarding.Document ? {
      isValidToken: onboarding.Document.IsValidToken,
      token: onboarding.Document.Token,
      documentId: onboarding.IdDocumentOnboarding,
    } : null,

    // Fechas de registro por pasos
    registrationDateStep: onboarding.RegistrationDateStep || {},

    // Campos de auditoría
    auditFields: onboarding.AuditFields ? {
      userCreationId: onboarding.AuditFields.UserCreationId,
      creationDate: new Date(onboarding.AuditFields.CreationDate?.$date).toLocaleString('es-BO'),
      userLastModifiedId: onboarding.AuditFields.UserLastModifiedId,
      dateLastModificationId: new Date(onboarding.AuditFields.DateLastModificationId?.$date).toLocaleString('es-BO'),
    } : null,
  };
};
