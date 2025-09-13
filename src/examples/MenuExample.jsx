import React, { useState } from 'react';
import { 
  Menu, 
  MenuItem, 
  Button, 
  Divider, 
  ListItemIcon, 
  ListItemText,
  Box,
  Paper,
  Typography
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  Share, 
  ContentCopy 
} from '@mui/icons-material';

const MenuExample = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log('Editando elemento');
    handleClose();
  };

  const handleDelete = () => {
    console.log('Eliminando elemento');
    handleClose();
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Menu Component Example
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Menú desplegable contextual con opciones y iconos
      </Typography>
      
      <Box>
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
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'menu-button',
          }}
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
      </Box>
    </Paper>
  );
};

export default MenuExample;