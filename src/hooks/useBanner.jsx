import { useState, useCallback } from 'react';

/**
 * Custom hook para manejar la funcionalidad del banner
 */
export const useBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Función para abrir WhatsApp con el número de contacto
  const openWhatsApp = useCallback((phoneNumber) => {
    // Limpiar el número de teléfono (remover espacios, guiones, etc.)
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${cleanNumber}`;
    
    // Abrir en nueva pestaña
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }, []);

  // Función para extraer el número de teléfono del título
  const extractPhoneNumber = useCallback((title) => {
    // Buscar números en el título (asumiendo formato como "554389897")
    const phoneMatch = title.match(/\d{9,}/);
    return phoneMatch ? phoneMatch[0] : '';
  }, []);

  // Handlers para hover effect
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Función para obtener estilos responsive
  const getBannerStyles = useCallback((color, colorTexto) => ({
    container: {
      backgroundColor: color,
      color: colorTexto,
      width: '100%',
      height: {
        xs: '30px', // móvil
        sm: '15px'  // escritorio
      },
      padding: {
        xs: '7px', // móvil
        sm: '15px'  // escritorio
      },
      marginBottom: '0px',
      borderRadius: '0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: color + '90', // Añadir transparencia al hover
        transform: 'scale(1.02)'
      }
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
      fontSize: {
        xs: '14px', // móvil
        sm: '15px'  // escritorio
      },
      fontWeight: 'medium'
    },
    whatsappIcon: {
      fontSize: {
        xs: '18px',
        sm: '20px'
      },
      color: '#25D366', // Color oficial de WhatsApp
      transition: 'transform 0.3s ease',
      transform: isHovered ? 'scale(1.2)' : 'scale(1)'
    }
  }), [isHovered]);

  return {
    openWhatsApp,
    extractPhoneNumber,
    handleMouseEnter,
    handleMouseLeave,
    getBannerStyles,
    isHovered
  };
};

export default useBanner;
