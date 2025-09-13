import React from 'react';
import { Box } from '@mui/material';

// Importar todos los logos SVG
import logoSansSerif from '../images/alin-logo-sans-serif-bold.svg';
import logoSerif from '../images/alin-logo-serif-elegante.svg';
import logoCondensed from '../images/alin-logo-condensed.svg';
import logoDisplay from '../images/alin-logo-display.svg';

/**
 * Componente Logo ALIN con múltiples estilos
 * @param {string} variant - Estilo del logo: 'sans-serif' | 'serif' | 'condensed' | 'display'
 * @param {string|number} height - Altura del logo (por defecto: 40px)
 * @param {string|number} width - Ancho del logo (por defecto: auto)
 * @param {object} sx - Estilos adicionales de Material-UI
 */
const AlinLogo = ({ 
  variant = 'sans-serif', 
  height = 40, 
  width = 'auto',
  sx = {},
  ...props 
}) => {
  // Seleccionar el logo según la variante
  const getLogoSrc = () => {
    switch (variant) {
      case 'serif':
      case 'elegante':
        return logoSerif;
      case 'condensed':
      case 'compacto':
        return logoCondensed;
      case 'display':
      case 'llamativo':
        return logoDisplay;
      case 'sans-serif':
      case 'moderno':
      default:
        return logoSansSerif;
    }
  };

  return (
    <Box
      component="img"
      src={getLogoSrc()}
      alt="ALIN"
      sx={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
        objectFit: 'contain',
        ...sx
      }}
      {...props}
    />
  );
};

export default AlinLogo;
