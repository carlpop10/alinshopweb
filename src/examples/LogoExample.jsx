import React from 'react';
import { Paper, Typography, Box, Divider, Grid } from '@mui/material';
import AlinLogo from '../components/AlinLogo.jsx';

/**
 * Ejemplo de uso del componente AlinLogo
 */
const LogoExample = () => {
  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Logo ALIN - Todas las Variantes
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Ejemplos del logo ALIN en diferentes estilos y tamaños:
      </Typography>

      <Grid container spacing={3}>
        {/* Logos sobre fondo verde aqua */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            En Banner Verde Aqua (#3AAFA9)
          </Typography>
          <Box sx={{ backgroundColor: '#3AAFA9', padding: 2, borderRadius: 1, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <AlinLogo variant="sans-serif" height={40} />
              </Grid>
              <Grid item>
                <AlinLogo variant="serif" height={40} />
              </Grid>
              <Grid item>
                <AlinLogo variant="condensed" height={40} />
              </Grid>
              <Grid item>
                <AlinLogo variant="display" height={40} />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Sans-Serif */}
        <Grid item xs={12} md={6}>
          <Box sx={{ border: 1, borderColor: 'grey.300', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Sans-Serif Bold (Moderno)
            </Typography>
            <Box sx={{ backgroundColor: '#3AAFA9', p: 2, borderRadius: 1, mb: 2 }}>
              <AlinLogo variant="sans-serif" height={50} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Perfecto para web, aplicaciones modernas y interfaces digitales.
            </Typography>
          </Box>
        </Grid>

        {/* Serif */}
        <Grid item xs={12} md={6}>
          <Box sx={{ border: 1, borderColor: 'grey.300', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Serif Elegante (Premium)
            </Typography>
            <Box sx={{ backgroundColor: '#3AAFA9', p: 2, borderRadius: 1, mb: 2 }}>
              <AlinLogo variant="serif" height={50} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Ideal para papelería de lujo, documentos formales y marca premium.
            </Typography>
          </Box>
        </Grid>

        {/* Condensed */}
        <Grid item xs={12} md={6}>
          <Box sx={{ border: 1, borderColor: 'grey.300', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Condensed (Compacto)
            </Typography>
            <Box sx={{ backgroundColor: '#3AAFA9', p: 2, borderRadius: 1, mb: 2 }}>
              <AlinLogo variant="condensed" height={50} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Perfecto para espacios reducidos y headers compactos.
            </Typography>
          </Box>
        </Grid>

        {/* Display */}
        <Grid item xs={12} md={6}>
          <Box sx={{ border: 1, borderColor: 'grey.300', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Display (Llamativo)
            </Typography>
            <Box sx={{ backgroundColor: '#3AAFA9', p: 2, borderRadius: 1, mb: 2 }}>
              <AlinLogo variant="display" height={50} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Ideal para títulos principales e impacto visual máximo.
            </Typography>
          </Box>
        </Grid>

        {/* Diferentes tamaños */}
        <Grid item xs={12}>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Diferentes Tamaños (Sans-Serif)
          </Typography>
          <Box sx={{ backgroundColor: '#3AAFA9', p: 3, borderRadius: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <AlinLogo variant="sans-serif" height={20} />
              <AlinLogo variant="sans-serif" height={30} />
              <AlinLogo variant="sans-serif" height={40} />
              <AlinLogo variant="sans-serif" height={60} />
              <AlinLogo variant="sans-serif" height={80} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Uso del componente:</strong>
          <br />
          • <code>{'<AlinLogo variant="sans-serif" height={40} />'}</code>
          <br />
          • <code>{'<AlinLogo variant="serif" height={50} />'}</code>
          <br />
          • <code>{'<AlinLogo variant="condensed" height={30} />'}</code>
          <br />
          • <code>{'<AlinLogo variant="display" height={60} />'}</code>
        </Typography>
      </Box>
    </Paper>
  );
};

export default LogoExample;
