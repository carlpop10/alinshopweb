import { useState, useCallback } from 'react';

/**
 * Custom hook para manejar la funcionalidad del banner de productos
 */
export const useProductBanner = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Definir las categorías de productos con sus iconos
  const productCategories = [
    {
      id: 'papeleria',
      name: 'Papelería',
      icon: 'Description', // Material-UI icon name
      path: '/productos/papeleria'
    },
    {
      id: 'regalos',
      name: 'Regalos',
      icon: 'CardGiftcard',
      path: '/productos/regalos'
    },
    {
      id: 'fiestas',
      name: 'Fiestas',
      icon: 'Celebration',
      path: '/productos/fiestas'
    },
    {
      id: 'telefonia',
      name: 'Accesorios de Telefonía',
      icon: 'PhoneIphone',
      path: '/productos/telefonia'
    },
    {
      id: 'computo',
      name: 'Accesorios de Cómputo',
      icon: 'Computer',
      path: '/productos/computo'
    }
  ];

  // Handlers para hover
  const handleItemHover = useCallback((itemId) => {
    setHoveredItem(itemId);
  }, []);

  const handleItemLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  // Handler para navegación
  const handleItemClick = useCallback((path) => {
    // Aquí puedes agregar lógica de navegación
    console.log('Navegando a:', path);
    // window.location.href = path; // O usar react-router
  }, []);

  // Función para obtener estilos del banner
  const getBannerStyles = useCallback(() => ({
    container: {
      backgroundColor: '#3AAFA9',
      width: '100%',
      height: {
        xs: '50px', // móvil
        sm: '60px'  // escritorio
      },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: {
        xs: '0 10px',
        sm: '0 20px'
      },
      position: 'relative',
      cursor: 'default', // Evitar degradación del cursor
      '&:hover': {
        backgroundColor: '#3AAFA9', // Mantener color sin degradar
      }
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      color: '#FFFFFF',
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 800,
      fontSize: {
        xs: '18px',
        sm: '24px'
      },
      letterSpacing: '2px'
    },
    categoriesSection: {
      display: 'flex',
      alignItems: 'center',
      gap: {
        xs: 1,
        sm: 2
      },
      flexWrap: 'nowrap',
      overflow: 'auto'
    }
  }), []);

  // Función para obtener estilos de categoría
  const getCategoryStyles = useCallback((categoryId) => {
    const isHovered = hoveredItem === categoryId;
    
    return {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: {
          xs: '4px',
          sm: '8px'
        },
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        '&:hover': {
          transform: 'scale(1.1)'
        }
      },
      icon: {
        fontSize: {
          xs: isHovered ? '28px' : '24px',
          sm: isHovered ? '36px' : '32px'
        },
        color: isHovered ? '#3fb4e6ff' : '#FFFFFF',
        transition: 'all 0.3s ease',
        marginBottom: '2px'
      },
      text: {
        fontSize: {
          xs: '10px',
          sm: '12px'
        },
        color: isHovered ? '#3fb4e6ff' : '#FFFFFF',
        fontWeight: 600,
        textAlign: 'center',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: {
          xs: '60px',
          sm: '80px'
        }
      }
    };
  }, [hoveredItem]);

  return {
    productCategories,
    hoveredItem,
    handleItemHover,
    handleItemLeave,
    handleItemClick,
    getBannerStyles,
    getCategoryStyles
  };
};

export default useProductBanner;
