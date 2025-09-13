import React, { useState } from 'react';
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem
} from '@mui/x-data-grid';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Chip,
  Avatar,
  Paper
} from '@mui/material';
import {
  Edit,
  Delete,
  Visibility,
  Add
} from '@mui/icons-material';

const DataGridExample = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      age: 28,
      department: 'Desarrollo',
      salary: 45000,
      status: 'Activo'
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@example.com',
      age: 32,
      department: 'Marketing',
      salary: 42000,
      status: 'Activo'
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos@example.com',
      age: 25,
      department: 'Ventas',
      salary: 38000,
      status: 'Inactivo'
    }
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const getAvatar = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  const handleViewClick = (id) => () => {
    const row = rows.find((row) => row.id === id);
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleEditClick = (id) => () => {
    console.log('Editando fila:', id);
  };

  const handleDeleteClick = (id) => () => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleAddClick = () => {
    const id = Math.max(...rows.map(r => r.id)) + 1;
    const newRow = {
      id,
      name: 'Nuevo Empleado',
      email: 'nuevo@example.com',
      age: 25,
      department: 'Desarrollo',
      salary: 35000,
      status: 'Activo'
    };
    setRows([...rows, newRow]);
  };

  const columns = [
    {
      field: 'avatar',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
          {getAvatar(params.row.name)}
        </Avatar>
      )
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 180,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.email}
          </Typography>
        </Box>
      )
    },
    {
      field: 'age',
      headerName: 'Edad',
      width: 80,
      type: 'number'
    },
    {
      field: 'department',
      headerName: 'Departamento',
      width: 130
    },
    {
      field: 'salary',
      headerName: 'Salario',
      width: 120,
      type: 'number',
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="success.main">
          {formatCurrency(params.value)}
        </Typography>
      )
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Activo' ? 'success' : 'default'}
          size="small"
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 120,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Visibility />}
            label="Ver"
            onClick={handleViewClick(id)}
            key="view"
          />,
          <GridActionsCellItem
            icon={<Edit />}
            label="Editar"
            onClick={handleEditClick(id)}
            key="edit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Eliminar"
            onClick={handleDeleteClick(id)}
            key="delete"
          />
        ];
      }
    }
  ];

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0
  });

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        DataGrid Example
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Tabla avanzada con filtros, ordenamiento, paginación y acciones
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddClick}
        >
          Agregar Empleado
        </Button>
      </Box>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{
            toolbar: GridToolbar
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }
            }
          }}
        />
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Detalles del Empleado</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <Box sx={{ pt: 1 }}>
              <TextField
                label="Nombre"
                value={selectedRow.name}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Email"
                value={selectedRow.email}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Departamento"
                value={selectedRow.department}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Salario"
                value={formatCurrency(selectedRow.salary)}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DataGridExample;
