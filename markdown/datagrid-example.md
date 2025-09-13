# DataGrid Component - Ejemplo de uso medio

## Descripción
DataGrid es una tabla avanzada con funcionalidades como filtrado, ordenamiento, paginación, selección de filas y edición inline.

## Ejemplo completo

```jsx
import React, { useState, useMemo } from 'react';
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel
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
  Avatar
} from '@mui/material';
import {
  Edit,
  Delete,
  Visibility,
  Add
} from '@mui/icons-material';

const DataGridExample = () => {
  // Datos de ejemplo
  const [rows, setRows] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      age: 28,
      department: 'Desarrollo',
      salary: 45000,
      status: 'Activo',
      joinDate: new Date('2022-01-15')
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@example.com',
      age: 32,
      department: 'Marketing',
      salary: 42000,
      status: 'Activo',
      joinDate: new Date('2021-08-20')
    },
    {
      id: 3,
      name: 'Carlos López',
      email: 'carlos@example.com',
      age: 25,
      department: 'Ventas',
      salary: 38000,
      status: 'Inactivo',
      joinDate: new Date('2023-03-10')
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana@example.com',
      age: 29,
      department: 'HR',
      salary: 40000,
      status: 'Activo',
      joinDate: new Date('2022-11-05')
    }
  ]);

  // Estados para el modal y edición
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});

  // Función para obtener avatar
  const getAvatar = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // Función para formatear salary
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  // Definición de columnas
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
      editable: true,
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
      type: 'number',
      editable: true
    },
    {
      field: 'department',
      headerName: 'Departamento',
      width: 130,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Desarrollo', 'Marketing', 'Ventas', 'HR', 'Finanzas']
    },
    {
      field: 'salary',
      headerName: 'Salario',
      width: 120,
      type: 'number',
      editable: true,
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
      field: 'joinDate',
      headerName: 'Fecha Ingreso',
      width: 130,
      type: 'date',
      valueFormatter: (params) => {
        if (!params.value) return '';
        return new Date(params.value).toLocaleDateString('es-MX');
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 120,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Guardar"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancelar"
              onClick={handleCancelClick(id)}
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Visibility />}
            label="Ver"
            onClick={handleViewClick(id)}
          />,
          <GridActionsCellItem
            icon={<Edit />}
            label="Editar"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Eliminar"
            onClick={handleDeleteClick(id)}
          />
        ];
      }
    }
  ];

  // Funciones para manejar acciones
  const handleViewClick = (id) => () => {
    const row = rows.find((row) => row.id === id);
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  // Manejar actualización de filas
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowUpdateError = (error) => {
    console.error('Error updating row:', error);
  };

  // Agregar nueva fila
  const handleAddClick = () => {
    const id = Math.max(...rows.map(r => r.id)) + 1;
    const newRow = {
      id,
      name: '',
      email: '',
      age: 25,
      department: 'Desarrollo',
      salary: 35000,
      status: 'Activo',
      joinDate: new Date(),
      isNew: true
    };
    setRows([...rows, newRow]);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    });
  };

  // Configuración de paginación
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0
  });

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Empleados
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

      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleRowUpdateError}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
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
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'action.hover'
          }
        }}
      />

      {/* Dialog para ver detalles */}
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
    </Box>
  );
};

export default DataGridExample;
```

## Partes más difíciles explicadas

### 1. Definición de columnas complejas
```jsx
{
  field: 'name',
  headerName: 'Nombre',
  width: 180,
  editable: true,
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
}
```
- `renderCell` permite personalizar completamente el contenido de la celda
- `params.value` es el valor de la celda actual
- `params.row` da acceso a toda la fila

### 2. Columna de acciones dinámicas
```jsx
{
  field: 'actions',
  type: 'actions',
  getActions: ({ id }) => {
    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
    
    if (isInEditMode) {
      return [/* acciones de edición */];
    }
    return [/* acciones normales */];
  }
}
```
- `type: 'actions'` indica que es una columna especial para acciones
- `getActions` retorna diferentes botones según el estado de la fila

### 3. Modo de edición por fila
```jsx
const handleEditClick = (id) => () => {
  setRowModesModel({ 
    ...rowModesModel, 
    [id]: { mode: GridRowModes.Edit } 
  });
};

const processRowUpdate = (newRow) => {
  const updatedRow = { ...newRow, isNew: false };
  setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  return updatedRow;
};
```
- `rowModesModel` controla qué filas están en modo edición
- `processRowUpdate` se ejecuta cuando se guarda una fila editada

### 4. Toolbar personalizada con filtro rápido
```jsx
slots={{
  toolbar: GridToolbar
}}
slotProps={{
  toolbar: {
    showQuickFilter: true,
    quickFilterProps: { debounceMs: 500 }
  }
}}
```
- `GridToolbar` proporciona funcionalidades como exportar, filtros, etc.
- `quickFilter` permite búsqueda rápida en todas las columnas
- `debounceMs` evita hacer búsquedas en cada teclazo

### 5. Paginación controlada
```jsx
const [paginationModel, setPaginationModel] = useState({
  pageSize: 25,
  page: 0
});

// En el DataGrid
paginationModel={paginationModel}
onPaginationModelChange={setPaginationModel}
pageSizeOptions={[5, 10, 25, 50]}
```
- Controla externamente la paginación
- Permite diferentes tamaños de página

## Funcionalidades principales
1. **Ordenamiento**: Click en headers para ordenar
2. **Filtrado**: Filtros por columna y filtro rápido
3. **Selección**: Checkboxes para seleccionar filas
4. **Edición**: Inline editing con validación
5. **Acciones**: Botones personalizados por fila
6. **Exportación**: CSV, Print, etc. con GridToolbar

## Casos de uso comunes
- Gestión de usuarios/empleados
- Inventarios de productos
- Reportes y dashboards
- Administración de datos empresariales
