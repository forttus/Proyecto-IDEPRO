// Servicio para consumir la API de clientes
import axios from 'axios'

export const obtenerDatosCliente = async (numero_documento) => {
  try {
    const dataToSend = { ciCliente: numero_documento };
    const apiResponse = await axios.post('http://localhost:4000/soporte/froddi/buscaCliente', dataToSend)
    const apiData = apiResponse.data
    console.log('Respuesta empoint ', apiResponse.data);
    
    return apiData;
  } catch (error) {
    console.error('Error al obtener datos del cliente:', error);
    throw error;
  }
};

// Función para obtener información específica del cliente
export const procesarDatosCliente = (data) => {
  // Verificar si la respuesta tiene resultado
  const resultado = data.resultado || (data.data?.resultado);
  
  if (!resultado || resultado.length === 0) {
    return null;
  }

  const cliente = resultado[0];
  
  return {
    // Información personal
    nombres: cliente.nombres,
    apellidos: `${cliente.primer_apellido} ${cliente.segundo_apellido}`.trim(),
    numero_documento: cliente.numero_documento,
    complemento: cliente.complemento || '',
    sexo: cliente.sexo === 1 ? 'Masculino' : cliente.sexo === 2 ? 'Femenino' : 'No especificado',
    fecha_nacimiento: cliente.fecha_nacimiento,
    nacionalidad: cliente.nacionalidad,
    tipo_documento: cliente.tipo_documento,
    expedido_en: cliente.expedido_en,
    fecha_vencimiento_doc: cliente.fecha_vencimiento_doc,
    
    // Información de contacto
    numero_celular: cliente.numero_celular,
    numero_telefono_domicilio: cliente.numero_telefono_domicilio,
    numero_telefono_oficina: cliente.numero_telefono_oficina,
    email: cliente.email || 'No disponible',
    
    // Información de dirección
    direccion: cliente.direcciones?.[0]?.direccion || 'No disponible',
    referencia_direccion: cliente.direcciones?.[0]?.referencia || '',
    envio_correspondencia: cliente.envio_correspondencia,
    
    // Información laboral
    profesion: cliente.profesion,
    nivel_educacion: cliente.nivel_educacion,
    descripcion_actividad: cliente.descripcion_actividad,
    empresa_donde_trabaja: cliente.empresa_donde_trabaja,
    cargo_ocupa: cliente.cargo_ocupa,
    antiguedad: cliente.antiguedad,
    
    // Información económica
    estado_civil: cliente.estado_civil,
    saldo_total_refinanciar: cliente.saldo_total_refinanciar,
    
    // Préstamos
    prestamos: cliente.prestamos || [],
  };
};
