# FormControl Component - Ejemplo de uso medio

## Descripción
FormControl proporciona un contexto para componentes de formulario como Input, Select, y FormHelperText, manejando estados como error, disabled, required, etc.

## Ejemplo completo

```jsx
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
  IconButton
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Person
} from '@mui/icons-material';

const FormControlExample = () => {
  // Estados del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    gender: '',
    notifications: false,
    terms: false
  });

  // Estados de control
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Función para manejar cambios en inputs
  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' 
      ? event.target.checked 
      : event.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    // Validación email
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    // Validación contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validación confirmar contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validación país
    if (!formData.country) {
      newErrors.country = 'Selecciona un país';
    }

    // Validación términos
    if (!formData.terms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      console.log('Formulario válido:', formData);
      // Aquí enviarías los datos al servidor
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Registro de Usuario
      </Typography>

      <Grid container spacing={3}>
        {/* Email */}
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

        {/* Contraseña */}
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

        {/* Confirmar contraseña */}
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

        {/* País */}
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

        {/* Género */}
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

        {/* Checkboxes */}
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

        {/* Botón de envío */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Registrarse
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormControlExample;
```

## Partes más difíciles explicadas

### 1. Manejo de estado complejo
```jsx
const handleChange = (field) => (event) => {
  const value = event.target.type === 'checkbox' 
    ? event.target.checked 
    : event.target.value;
  
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};
```
- Función de orden superior para manejar diferentes tipos de input
- Maneja checkboxes y inputs de texto de manera uniforme
- Actualiza el estado de forma inmutable

### 2. Validación y manejo de errores
```jsx
const validateForm = () => {
  const newErrors = {};
  
  if (!formData.email) {
    newErrors.email = 'El email es requerido';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'El email no es válido';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```
- Validación centralizada de todos los campos
- Retorna true/false para determinar si el formulario es válido
- Actualiza el estado de errores

### 3. FormControl con estados de error
```jsx
<FormControl fullWidth error={!!errors.email}>
  <TextField
    error={!!errors.email}
    // ... otras props
  />
  {errors.email && (
    <FormHelperText>{errors.email}</FormHelperText>
  )}
</FormControl>
```
- FormControl propaga el estado de error a sus hijos
- `!!errors.email` convierte string a boolean
- FormHelperText muestra el mensaje de error

### 4. Inputs con adornos
```jsx
<OutlinedInput
  type={showPassword ? 'text' : 'password'}
  endAdornment={
    <InputAdornment position="end">
      <IconButton onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  }
/>
```
- InputAdornment permite agregar iconos o botones
- Control del tipo de input para mostrar/ocultar contraseña

## Mejores prácticas
1. **Usar FormControl para agrupar elementos relacionados**
2. **Manejar errores de forma consistente**
3. **Validar en tiempo real para mejor UX**
4. **Usar FormHelperText para guiar al usuario**
5. **Agrupar campos relacionados con Grid**

## Casos de uso comunes
- Formularios de registro/login
- Formularios de contacto
- Configuraciones de usuario
- Formularios de checkout
