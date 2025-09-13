import React from 'react';
import { Box, Typography } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';
import { useBanner } from '../hooks/useBanner';

/**
 * Componente Banner para mostrar información de contacto con WhatsApp
 * @param {string} title - Título del banner (incluye número de contacto)
 * @param {string} color - Color de fondo del banner
 * @param {string} colorTexto - Color del texto del banner
 */
const Banner = ({ 
  title = "Ventas y contacto: 554389897", 
  color = "#3AAFA9", 
  colorTexto = "#FFFFFF" 
}) => {
  const {
    openWhatsApp,
    extractPhoneNumber,
    handleMouseEnter,
    handleMouseLeave,
    getBannerStyles
  } = useBanner();

  // Extraer el número de teléfono del título
  const phoneNumber = extractPhoneNumber(title);

  // Separar el texto antes del número y el número
  const textBeforeNumber = title.substring(0, title.indexOf(phoneNumber));
  const textAfterNumber = title.substring(title.indexOf(phoneNumber) + phoneNumber.length);

  // Manejar click en el banner
  const handleClick = () => {
    if (phoneNumber) {
      openWhatsApp(phoneNumber);
    }
  };

  // Obtener estilos responsive
  const styles = getBannerStyles(color, colorTexto);

  return (
    <Box
      sx={styles.container}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      aria-label={`Contactar por WhatsApp al ${phoneNumber}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <Box sx={styles.content}>
        <Typography component="span" sx={{ fontSize: 'inherit' }}>
          {textBeforeNumber}
        </Typography>
        
        <WhatsApp sx={styles.whatsappIcon} />
        
        <Typography 
          component="span" 
          sx={{ 
            fontSize: 'inherit',
            fontWeight: 'bold',
            textDecoration: 'underline'
          }}
        >
          {phoneNumber}
        </Typography>
        
        {textAfterNumber && (
          <Typography component="span" sx={{ fontSize: 'inherit' }}>
            {textAfterNumber}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Banner;
