import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  Description,
  CardGiftcard,
  Celebration,
  PhoneIphone,
  Computer
} from '@mui/icons-material';
import { useProductBanner } from '../hooks/useProductBanner.jsx';

// Mapeo de iconos
const iconMap = {
  Description,
  CardGiftcard,
  Celebration,
  PhoneIphone,
  Computer
};

/**
 * Componente BannerProducts para mostrar categorías de productos
 * @param {string} backgroundColor - Color de fondo del banner (por defecto: #3AAFA9)
 */
const BannerProducts = ({ 
  backgroundColor = "#3AAFA9"
}) => {
  const {
    productCategories,
    handleItemHover,
    handleItemLeave,
    handleItemClick,
    getBannerStyles,
    getCategoryStyles
  } = useProductBanner();

  const bannerStyles = getBannerStyles(backgroundColor);

  return (
    <Box
      sx={{
        ...bannerStyles.container,
        backgroundColor: backgroundColor
      }}
    >
      {/* Logo ALIN a la izquierda */}
      <Box sx={bannerStyles.logoSection}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontWeight: 800,
            fontSize: 'inherit',
            letterSpacing: 'inherit',
            color: '#FFFFFF',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          ALIN
        </Typography>
      </Box>

      {/* Categorías de productos a la derecha */}
      <Box sx={bannerStyles.categoriesSection}>
        {productCategories.map((category) => {
          const IconComponent = iconMap[category.icon];
          const categoryStyles = getCategoryStyles(category.id);

          return (
            <Box
              key={category.id}
              sx={categoryStyles.container}
              onMouseEnter={() => handleItemHover(category.id)}
              onMouseLeave={handleItemLeave}
              onClick={() => handleItemClick(category.path)}
              role="button"
              aria-label={`Ver productos de ${category.name}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleItemClick(category.path);
                }
              }}
            >
              {/* Icono */}
              <IconComponent sx={categoryStyles.icon} />
              
              {/* Texto */}
              <Typography
                variant="caption"
                sx={categoryStyles.text}
              >
                {category.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default BannerProducts;
