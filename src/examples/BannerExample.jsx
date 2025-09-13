import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import Banner from '../components/Banner.jsx';

/**
 * Ejemplo de uso del componente Banner
 */
const BannerExample = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Banner de Contacto
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Ejemplos del componente Banner con diferentes configuraciones:
      </Typography>

      {/* Banner por defecto */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Banner Por Defecto
        </Typography>
        <Banner />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Banner personalizado 1 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Banner Personalizado - Verde
        </Typography>
        <Banner 
          title="Soporte técnico: 555123456"
          color="#4CAF50"
          colorTexto="#FFFFFF"
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Banner personalizado 2 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Banner Personalizado - Azul
        </Typography>
        <Banner 
          title="Atención al cliente: 555987654"
          color="#2196F3"
          colorTexto="#FFFFFF"
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Banner personalizado 3 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Banner Personalizado - Naranja
        </Typography>
        <Banner 
          title="Emergencias 24/7: 555456789"
          color="#FF9800"
          colorTexto="#000000"
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Banner personalizado 4 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Banner Original - Papelería
        </Typography>
        <Banner 
          title="Ventas y contacto: 554389897"
          color="#3AAFA9"
          colorTexto="#FFFFFF"
        />
      </Box>

      <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Instrucciones:</strong>
          <br />
          • Haz clic en cualquier banner para abrir WhatsApp con el número correspondiente
          • Los banners son completamente responsivos
          • El ícono de WhatsApp se anima al hacer hover
          • Puedes personalizar el título, color de fondo y color de texto
        </Typography>
      </Box>
    </Paper>
  );
};

export default BannerExample;
