import React from 'react';
import { Paper, Typography, Box, Card, CardMedia, CardContent, Button, Chip, Rating } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ShoppingCart, Favorite } from '@mui/icons-material';

// Importar estilos CSS de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Ejemplo de uso del componente Swiper para productos de papelería
 */
const SwiperExample2 = () => {
  // Datos de ejemplo de productos de papelería
  const productos = [
    {
      id: 1,
      nombre: 'Cuaderno Universitario',
      precio: 15.99,
      imagen: 'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?w=300&h=300&fit=crop',
      categoria: 'Cuadernos',
      rating: 4.5,
      descuento: 10
    },
    {
      id: 2,
      nombre: 'Set de Bolígrafos Premium',
      precio: 24.99,
      imagen: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=300&fit=crop',
      categoria: 'Escritura',
      rating: 4.8,
      descuento: 0
    },
    {
      id: 3,
      nombre: 'Carpeta Archivador',
      precio: 12.50,
      imagen: 'https://images.unsplash.com/photo-1541960071727-c531398e7494?w=300&h=300&fit=crop',
      categoria: 'Archivo',
      rating: 4.2,
      descuento: 15
    },
    {
      id: 4,
      nombre: 'Calculadora Científica',
      precio: 45.00,
      imagen: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop',
      categoria: 'Calculadoras',
      rating: 4.7,
      descuento: 20
    },
    {
      id: 5,
      nombre: 'Resaltadores Fluorescentes',
      precio: 8.99,
      imagen: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
      categoria: 'Marcadores',
      rating: 4.3,
      descuento: 0
    },
    {
      id: 6,
      nombre: 'Agenda 2025',
      precio: 28.75,
      imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
      categoria: 'Agendas',
      rating: 4.6,
      descuento: 25
    }
  ];

  const calcularPrecioFinal = (precio, descuento) => {
    return descuento > 0 ? precio - (precio * descuento / 100) : precio;
  };

  const ProductCard = ({ producto }) => (
    <Card sx={{ 
      width: '100%',
      maxWidth: 280, 
      height: 400,
      display: 'flex', 
      flexDirection: 'column',
      margin: '0 auto',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 6
      }
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={producto.imagen}
          alt={producto.nombre}
          sx={{ objectFit: 'cover' }}
        />
        {producto.descuento > 0 && (
          <Chip
            label={`-${producto.descuento}%`}
            color="error"
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8,
              fontWeight: 'bold',
              fontSize: '0.75rem'
            }}
          />
        )}
        <Chip
          label={producto.categoria}
          color="primary"
          size="small"
          sx={{ 
            position: 'absolute', 
            top: 8, 
            left: 8,
            fontSize: '0.7rem'
          }}
        />
      </Box>
      
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        padding: { xs: 1.5, sm: 2 }
      }}>
        <Typography variant="h6" gutterBottom sx={{ 
          fontSize: { xs: '1rem', sm: '1.1rem' },
          lineHeight: 1.3
        }}>
          {producto.nombre}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={producto.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({producto.rating})
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {producto.descuento > 0 && (
              <Typography variant="body2" sx={{ 
                textDecoration: 'line-through', 
                color: 'text.secondary',
                fontSize: '0.85rem'
              }}>
                ${producto.precio.toFixed(2)}
              </Typography>
            )}
            <Typography variant="h6" color="primary" fontWeight="bold" sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}>
              ${calcularPrecioFinal(producto.precio, producto.descuento).toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="contained" 
              startIcon={<ShoppingCart />} 
              size="small" 
              fullWidth
              sx={{ 
                flex: 1,
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              Agregar
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              sx={{ 
                minWidth: 'auto',
                px: { xs: 0.5, sm: 1 }
              }}
            >
              <Favorite />
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      width: '85%', 
      maxWidth: '1200px',
      margin: '0 auto',
      padding: { xs: 2, sm: 3, md: 4 }
    }}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ textAlign: 'center', mb: 3 }}>
        Productos de Papelería
      </Typography>
      
      <Box sx={{ 
        width: '100%',
        '& .swiper': {
          width: '100%',
          height: 'auto'
        },
        '& .swiper-slide': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch'
        }
      }}>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          autoplay={{ 
            delay: 4000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={{
            480: { 
              slidesPerView: 1.5,
              spaceBetween: 15
            },
            640: { 
              slidesPerView: 2,
              spaceBetween: 20
            },
            768: { 
              slidesPerView: 2.5,
              spaceBetween: 20
            },
            1024: { 
              slidesPerView: 3,
              spaceBetween: 25
            },
            1200: { 
              slidesPerView: 3.5,
              spaceBetween: 30
            }
          }}
          style={{ 
            paddingBottom: '50px',
            paddingTop: '10px',
            paddingLeft: '10px',
            paddingRight: '10px'
          }}
        >
          {productos.map((producto) => (
            <SwiperSlide key={producto.id}>
              <ProductCard producto={producto} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default SwiperExample2;