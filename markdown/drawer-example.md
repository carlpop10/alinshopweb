# Drawer Component - Ejemplo de uso medio

## Descripción
El componente Drawer crea un panel lateral deslizante, ideal para navegación en aplicaciones móviles y de escritorio.

## Ejemplo completo

```jsx
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  ShoppingCart,
  AccountCircle,
  Settings,
  ExitToApp,
  ChevronLeft
} from '@mui/icons-material';

const DrawerExample = () => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Función para abrir/cerrar el drawer
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Función para manejar la selección de elementos
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false); // Cierra el drawer al seleccionar
  };

  // Datos del menú
  const menuItems = [
    { text: 'Inicio', icon: <Home />, route: '/' },
    { text: 'Productos', icon: <ShoppingCart />, route: '/productos' },
    { text: 'Mi Cuenta', icon: <AccountCircle />, route: '/cuenta' },
    { text: 'Configuración', icon: <Settings />, route: '/config' },
  ];

  // Contenido del drawer
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      {/* Encabezado del drawer */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: 2,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText'
      }}>
        <Typography variant="h6" noWrap>
          Mi Aplicación
        </Typography>
        <IconButton 
          onClick={toggleDrawer(false)}
          sx={{ color: 'inherit' }}
        >
          <ChevronLeft />
        </IconButton>
      </Box>

      <Divider />

      {/* Lista de navegación principal */}
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: selectedIndex === index ? 'primary.main' : 'inherit' 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{ 
                  color: selectedIndex === index ? 'primary.main' : 'inherit' 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Sección secundaria */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => console.log('Cerrar sesión')}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Barra superior */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="abrir drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Ejemplo Drawer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <Drawer
        anchor="left"          // Posición del drawer
        open={open}
        onClose={toggleDrawer(false)}
        // Configuración para dispositivos móviles
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en móviles
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {DrawerList}
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // Margen superior para la AppBar
        }}
      >
        <Typography variant="h4" gutterBottom>
          Contenido Principal
        </Typography>
        <Typography paragraph>
          Este es el contenido principal de la aplicación. 
          El drawer se puede abrir desde el botón del menú hamburguesa.
        </Typography>
        <Typography paragraph>
          Elemento seleccionado: {menuItems[selectedIndex]?.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default DrawerExample;
```

## Partes más difíciles explicadas

### 1. Control del estado y eventos
```jsx
const toggleDrawer = (newOpen) => () => {
  setOpen(newOpen);
};
```
- Función de orden superior que retorna otra función
- Permite pasar parámetros al event handler

### 2. Manejo de selección
```jsx
const handleListItemClick = (event, index) => {
  setSelectedIndex(index);
  setOpen(false); // Cierra automáticamente en móviles
};
```
- Actualiza el elemento seleccionado
- Cierra el drawer para mejor UX en móviles

### 3. Estilos condicionales
```jsx
sx={{
  '&.Mui-selected': {
    backgroundColor: 'primary.light',
    '&:hover': {
      backgroundColor: 'primary.light',
    },
  },
}}
```
- Estilos específicos para el elemento seleccionado
- Mantiene el color al hacer hover

### 4. Optimización para móviles
```jsx
ModalProps={{
  keepMounted: true, // Mejora el rendimiento en dispositivos móviles
}}
```
- Mantiene el componente montado para mejor rendimiento

## Variantes disponibles
- **Permanent**: Siempre visible (escritorio)
- **Persistent**: Se puede cerrar con botón
- **Temporary**: Se cierra tocando fuera (móvil)

## Casos de uso comunes
- Navegación principal en aplicaciones
- Menús laterales en dashboards
- Filtros en aplicaciones de comercio electrónico
- Configuraciones y opciones avanzadas
