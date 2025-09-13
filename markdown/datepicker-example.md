# DatePicker y DateTimePicker - Ejemplo de uso medio

## Descripción
Los componentes DatePicker y DateTimePicker permiten seleccionar fechas y fechas con hora respectivamente, con soporte para localización y validación.

## Configuración necesaria

```jsx
// Instalar dependencia adicional para el adaptador de fechas
npm install @mui/x-date-pickers @date-io/date-fns date-fns
```

## Ejemplo completo

```jsx
import React, { useState } from 'react';
import {
  LocalizationProvider,
  DatePicker,
  DateTimePicker,
  TimePicker,
  DateRangePicker,
  StaticDatePicker
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
  TextField,
  FormControl,
  FormLabel,
  Chip
} from '@mui/material';
import {
  Event,
  Schedule,
  DateRange,
  Today
} from '@mui/icons-material';

const DatePickerExample = () => {
  // Estados para diferentes tipos de fecha
  const [birthDate, setBirthDate] = useState(null);
  const [appointmentDateTime, setAppointmentDateTime] = useState(null);
  const [meetingTime, setMeetingTime] = useState(null);
  const [vacationRange, setVacationRange] = useState([null, null]);
  const [eventDate, setEventDate] = useState(new Date());
  
  // Estados para validación y configuración
  const [errors, setErrors] = useState({});
  const [minDate] = useState(new Date(1900, 0, 1));
  const [maxDate] = useState(new Date(2030, 11, 31));

  // Función para validar fechas
  const validateDates = () => {
    const newErrors = {};

    // Validar fecha de nacimiento
    if (!birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es requerida';
    } else if (birthDate > new Date()) {
      newErrors.birthDate = 'La fecha de nacimiento no puede ser futura';
    }

    // Validar cita
    if (!appointmentDateTime) {
      newErrors.appointmentDateTime = 'Selecciona fecha y hora de la cita';
    } else if (appointmentDateTime < new Date()) {
      newErrors.appointmentDateTime = 'La cita no puede ser en el pasado';
    }

    // Validar rango de vacaciones
    if (vacationRange[0] && vacationRange[1]) {
      const daysDiff = Math.ceil((vacationRange[1] - vacationRange[0]) / (1000 * 60 * 60 * 24));
      if (daysDiff > 30) {
        newErrors.vacationRange = 'Las vacaciones no pueden exceder 30 días';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para deshabitar días específicos
  const shouldDisableDate = (date) => {
    // Deshabilitar fines de semana para citas
    return date.getDay() === 0 || date.getDay() === 6;
  };

  // Función para deshabitar horas específicas
  const shouldDisableTime = (value, view) => {
    // Deshabilitar horas fuera del horario de oficina (9 AM - 6 PM)
    if (view === 'hours') {
      return value < 9 || value > 18;
    }
    // Deshabilitar minutos que no sean en intervalos de 15
    if (view === 'minutes') {
      return value % 15 !== 0;
    }
    return false;
  };

  // Función para formatear fechas
  const formatDate = (date) => {
    if (!date) return 'No seleccionada';
    return new Intl.DateTimeFormat('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatDateTime = (date) => {
    if (!date) return 'No seleccionada';
    return new Intl.DateTimeFormat('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (validateDates()) {
      console.log('Formulario válido:', {
        birthDate,
        appointmentDateTime,
        meetingTime,
        vacationRange,
        eventDate
      });
      alert('Fechas guardadas correctamente!');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom align="center">
          Selectores de Fecha y Hora
        </Typography>

        <Grid container spacing={3}>
          {/* DatePicker básico */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Event sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Fecha de Nacimiento
                </Typography>
                
                <DatePicker
                  label="Fecha de nacimiento"
                  value={birthDate}
                  onChange={(newValue) => setBirthDate(newValue)}
                  minDate={minDate}
                  maxDate={new Date()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.birthDate,
                      helperText: errors.birthDate,
                      variant: 'outlined'
                    }
                  }}
                  format="dd/MM/yyyy"
                />

                {birthDate && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Fecha seleccionada: {formatDate(birthDate)}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* DateTimePicker con restricciones */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Schedule sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Cita Médica
                </Typography>
                
                <DateTimePicker
                  label="Fecha y hora de la cita"
                  value={appointmentDateTime}
                  onChange={(newValue) => setAppointmentDateTime(newValue)}
                  minDateTime={new Date()}
                  shouldDisableDate={shouldDisableDate}
                  shouldDisableTime={shouldDisableTime}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.appointmentDateTime,
                      helperText: errors.appointmentDateTime || 
                        'Solo días laborables, de 9:00 AM a 6:00 PM, intervalos de 15 min'
                    }
                  }}
                  format="dd/MM/yyyy hh:mm a"
                  ampm={true}
                />

                {appointmentDateTime && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Cita programada: {formatDateTime(appointmentDateTime)}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* TimePicker */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Hora de Reunión
                </Typography>
                
                <TimePicker
                  label="Hora de la reunión"
                  value={meetingTime}
                  onChange={(newValue) => setMeetingTime(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined'
                    }
                  }}
                  format="HH:mm"
                  ampm={false}
                />

                {meetingTime && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Hora seleccionada: {meetingTime.toLocaleTimeString('es-MX', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* DateRangePicker */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <DateRange sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Período de Vacaciones
                </Typography>
                
                <DateRangePicker
                  startText="Fecha inicio"
                  endText="Fecha fin"
                  value={vacationRange}
                  onChange={(newValue) => setVacationRange(newValue)}
                  minDate={new Date()}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField {...startProps} fullWidth sx={{ mb: 1 }} />
                      <TextField {...endProps} fullWidth />
                    </>
                  )}
                />

                {errors.vacationRange && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.vacationRange}
                  </Alert>
                )}

                {vacationRange[0] && vacationRange[1] && (
                  <Box sx={{ mt: 2 }}>
                    <Chip
                      label={`Inicio: ${formatDate(vacationRange[0])}`}
                      color="primary"
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      label={`Fin: ${formatDate(vacationRange[1])}`}
                      color="primary"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="caption" display="block">
                      Duración: {Math.ceil((vacationRange[1] - vacationRange[0]) / (1000 * 60 * 60 * 24))} días
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* StaticDatePicker */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom align="center">
                  <Today sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Calendario de Eventos
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={eventDate}
                    onChange={(newValue) => setEventDate(newValue)}
                    renderDay={(day, _value, DayComponentProps) => {
                      // Resaltar días específicos (ejemplo: días con eventos)
                      const isEventDay = day.getDate() % 7 === 0; // Ejemplo: cada 7 días
                      
                      return (
                        <Box
                          {...DayComponentProps}
                          sx={{
                            ...DayComponentProps.sx,
                            backgroundColor: isEventDay ? 'primary.light' : undefined,
                            '&:hover': {
                              backgroundColor: isEventDay ? 'primary.main' : undefined
                            }
                          }}
                        />
                      );
                    }}
                  />
                </Box>

                <Alert severity="info" sx={{ mt: 2 }}>
                  Fecha del evento: {formatDate(eventDate)}
                </Alert>
              </CardContent>
            </Card>
          </Grid>

          {/* Resumen y acciones */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resumen de Fechas
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Nacimiento:</strong> {formatDate(birthDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Cita:</strong> {formatDateTime(appointmentDateTime)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Reunión:</strong> {meetingTime ? 
                        meetingTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : 
                        'No seleccionada'
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Vacaciones:</strong> {
                        vacationRange[0] && vacationRange[1] ? 
                        `${formatDate(vacationRange[0])} - ${formatDate(vacationRange[1])}` : 
                        'No seleccionadas'
                      }
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    size="large"
                  >
                    Guardar Fechas
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setBirthDate(null);
                      setAppointmentDateTime(null);
                      setMeetingTime(null);
                      setVacationRange([null, null]);
                      setEventDate(new Date());
                      setErrors({});
                    }}
                  >
                    Limpiar Todo
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default DatePickerExample;
```

## Partes más difíciles explicadas

### 1. Configuración del LocalizationProvider
```jsx
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
  {/* Todos los date pickers van aquí */}
</LocalizationProvider>
```
- `LocalizationProvider` es requerido para envolver todos los date pickers
- `AdapterDateFns` es el adaptador para usar date-fns como librería de fechas
- `adapterLocale={es}` configura el idioma a español

### 2. Validación personalizada de fechas
```jsx
const shouldDisableDate = (date) => {
  // Deshabilitar fines de semana
  return date.getDay() === 0 || date.getDay() === 6;
};

const shouldDisableTime = (value, view) => {
  if (view === 'hours') {
    return value < 9 || value > 18; // Solo de 9 AM a 6 PM
  }
  if (view === 'minutes') {
    return value % 15 !== 0; // Solo intervalos de 15 minutos
  }
  return false;
};
```
- `shouldDisableDate` permite deshabilitar días específicos
- `shouldDisableTime` controla qué horas/minutos están disponibles
- `view` puede ser 'hours', 'minutes', o 'seconds'

### 3. Configuración avanzada con slotProps
```jsx
<DatePicker
  slotProps={{
    textField: {
      fullWidth: true,
      error: !!errors.birthDate,
      helperText: errors.birthDate,
      variant: 'outlined'
    }
  }}
/>
```
- `slotProps` permite personalizar props de componentes internos
- `textField` configura el campo de texto subyacente
- Útil para manejar errores y estilos

### 4. DateRangePicker para rangos
```jsx
const [vacationRange, setVacationRange] = useState([null, null]);

<DateRangePicker
  startText="Fecha inicio"
  endText="Fecha fin"
  value={vacationRange}
  onChange={(newValue) => setVacationRange(newValue)}
  renderInput={(startProps, endProps) => (
    <>
      <TextField {...startProps} fullWidth />
      <TextField {...endProps} fullWidth />
    </>
  )}
/>
```
- El estado es un array con fecha de inicio y fin
- `renderInput` personaliza cómo se muestran los campos

### 5. StaticDatePicker con días personalizados
```jsx
<StaticDatePicker
  renderDay={(day, _value, DayComponentProps) => {
    const isEventDay = day.getDate() % 7 === 0;
    
    return (
      <Box
        {...DayComponentProps}
        sx={{
          backgroundColor: isEventDay ? 'primary.light' : undefined
        }}
      />
    );
  }}
/>
```
- `renderDay` permite personalizar la apariencia de cada día
- Útil para mostrar eventos, disponibilidad, etc.

### 6. Formateo de fechas
```jsx
const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
```
- `Intl.DateTimeFormat` para formateo internacionalizado
- Más flexible que métodos nativos de Date

## Adaptadores disponibles
- **date-fns**: `@mui/x-date-pickers/AdapterDateFns`
- **dayjs**: `@mui/x-date-pickers/AdapterDayjs`
- **luxon**: `@mui/x-date-pickers/AdapterLuxon`
- **moment**: `@mui/x-date-pickers/AdapterMoment`

## Casos de uso comunes
- Formularios de registro con fecha de nacimiento
- Sistemas de reservas y citas
- Calendarios de eventos
- Filtros de fecha en reportes
- Planificación de vacaciones
- Formularios de configuración temporal
