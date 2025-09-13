# Menu Component - Ejemplo de uso medio

## Descripción
El componente Menu crea menús desplegables contextuales que se pueden anclar a cualquier elemento.

## Ejemplo completo

```jsx
import React, { useState } from 'react';
import { 
  Menu, 
  MenuItem, 
  Button, 
  Divider, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  Share, 
  ContentCopy 
} from '@mui/icons-material';

const MenuExample = () => {
  // Estado para controlar si el menú está abierto
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Función para abrir el menú
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Establece el elemento ancla
  };

  // Función para cerrar el menú
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Funciones para manejar las acciones del menú
  const handleEdit = () => {
    console.log('Editando elemento');
    handleClose();
  };

  const handleDelete = () => {
    console.log('Eliminando elemento');
    handleClose();
  };

  return (
    <div>
      <Button
        id="menu-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
      >
        Abrir Menú
      </Button>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl} // Elemento al que se ancla el menú
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
        // Configuración de posicionamiento
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => console.log('Compartir')}>
          <ListItemIcon>
            <Share fontSize="small" />
          </ListItemIcon>
          <ListItemText>Compartir</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => console.log('Copiar')}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copiar</ListItemText>
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuExample;
```

## Partes más difíciles explicadas

### 1. Control del estado del menú
```jsx
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
```
- `anchorEl`: Guarda la referencia del elemento HTML al que se ancla el menú
- `open`: Convierte anchorEl en boolean para saber si está abierto

### 2. Posicionamiento del menú
```jsx
anchorOrigin={{
  vertical: 'bottom',   // El menú aparece debajo del botón
  horizontal: 'left',   // Alineado a la izquierda
}}
transformOrigin={{
  vertical: 'top',      // El punto de referencia del menú es la parte superior
  horizontal: 'left',   // Alineado a la izquierda
}}
```

### 3. Accesibilidad
```jsx
aria-controls={open ? 'basic-menu' : undefined}
aria-haspopup="true"
aria-expanded={open ? 'true' : undefined}
```
- Estas propiedades ayudan a los lectores de pantalla a entender la funcionalidad del menú

## Casos de uso comunes
- Menús contextuales en tablas
- Opciones de acciones en tarjetas
- Menús de navegación desplegables
- Menús de configuración
