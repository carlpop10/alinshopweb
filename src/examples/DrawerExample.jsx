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
  Paper
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

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const menuItems = [
    { text: 'Inicio', icon: <Home />, route: '/' },
    { text: 'Productos', icon: <ShoppingCart />, route: '/productos' },
    { text: 'Mi Cuenta', icon: <AccountCircle />, route: '/cuenta' },
    { text: 'Configuración', icon: <Settings />, route: '/config' },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
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
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Drawer Component Example
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Panel lateral deslizante para navegación
      </Typography>
      
      <Box sx={{ position: 'relative', minHeight: 200 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton
            color="primary"
            aria-label="abrir drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Drawer Demo - Click en el icono para abrir
          </Typography>
        </Box>

        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {DrawerList}
        </Drawer>

        <Box sx={{ p: 2, backgroundColor: 'background.default', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Contenido Principal
          </Typography>
          <Typography paragraph>
            Este es el contenido principal de la aplicación. 
            El drawer se puede abrir desde el botón del menú hamburguesa.
          </Typography>
          <Typography paragraph>
            Elemento seleccionado: <strong>{menuItems[selectedIndex]?.text}</strong>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DrawerExample;