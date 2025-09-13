import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import BannerProducts from '../components/BannerProducts.jsx';

/**
 * Ejemplo de uso del componente BannerProducts
 */
const ProductBannerExample = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Banner de Productos
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Banner de navegación de productos con logo ALIN y categorías interactivas:
      </Typography>

      {/* Banner por defecto */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Banner de Productos por Defecto
        </Typography>
        <BannerProducts />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Banner con color personalizado */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Banner con Color Personalizado
        </Typography>
        <BannerProducts backgroundColor="#2196F3" />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Información de categorías */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Categorías Disponibles
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          {[
            { name: 'Papelería', desc: 'Cuadernos, plumas, folders y más' },
            { name: 'Regalos', desc: 'Artículos para obsequios especiales' },
            { name: 'Fiestas', desc: 'Decoraciones y artículos para celebraciones' },
            { name: 'Accesorios de Telefonía', desc: 'Fundas, cargadores y accesorios móviles' },
            { name: 'Accesorios de Cómputo', desc: 'Mouse, teclados y accesorios para PC' }
          ].map((category, index) => (
            <Box key={index} sx={{ p: 2, border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                {category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {category.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Características:</strong>
          <br />
          • Logo ALIN a la izquierda con tipografía Montserrat bold
          <br />
          • 5 categorías de productos con iconos representativos
          <br />
          • Efectos hover: iconos y texto se agrandan y cambian a color #3fb4e6ff
          <br />
          • Completamente responsive para móvil y escritorio
          <br />
          • Cursor no se degrada al hacer hover sobre el banner
          <br />
          • Accesible con soporte para teclado y screen readers
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProductBannerExample;
