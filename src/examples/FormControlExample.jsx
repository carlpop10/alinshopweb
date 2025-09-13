import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  TextField,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  Checkbox,
  Button,
  Box,
  Typography,
  Grid,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Paper
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email
} from '@mui/icons-material';

const FormControlExample = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    gender: '',
    notifications: false,
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' 
      ? event.target.checked 
      : event.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.country) {
      newErrors.country = 'Selecciona un país';
    }

    if (!formData.terms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      console.log('Formulario válido:', formData);
      alert('Formulario enviado correctamente!');
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        FormControl Example
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Formulario completo con validación y diferentes tipos de input
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.email}>
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                error={!!errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.email && (
                <FormHelperText>{errors.email}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.password}>
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
              {errors.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.confirmPassword}>
              <InputLabel htmlFor="confirm-password">Confirmar Contraseña</InputLabel>
              <OutlinedInput
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmar Contraseña"
              />
              {errors.confirmPassword && (
                <FormHelperText>{errors.confirmPassword}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.country}>
              <InputLabel>País</InputLabel>
              <Select
                value={formData.country}
                onChange={handleChange('country')}
                label="País"
              >
                <MenuItem value="">
                  <em>Selecciona un país</em>
                </MenuItem>
                <MenuItem value="mx">México</MenuItem>
                <MenuItem value="us">Estados Unidos</MenuItem>
                <MenuItem value="es">España</MenuItem>
                <MenuItem value="ar">Argentina</MenuItem>
                <MenuItem value="co">Colombia</MenuItem>
              </Select>
              {errors.country && (
                <FormHelperText>{errors.country}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Género</FormLabel>
              <RadioGroup
                value={formData.gender}
                onChange={handleChange('gender')}
                row
              >
                <FormControlLabel 
                  value="male" 
                  control={<Radio />} 
                  label="Masculino" 
                />
                <FormControlLabel 
                  value="female" 
                  control={<Radio />} 
                  label="Femenino" 
                />
                <FormControlLabel 
                  value="other" 
                  control={<Radio />} 
                  label="Otro" 
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.notifications}
                    onChange={handleChange('notifications')}
                  />
                }
                label="Recibir notificaciones por email"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.terms}
                    onChange={handleChange('terms')}
                  />
                }
                label="Acepto los términos y condiciones"
              />
              {errors.terms && (
                <FormHelperText error>{errors.terms}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Registrarse
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default FormControlExample;
