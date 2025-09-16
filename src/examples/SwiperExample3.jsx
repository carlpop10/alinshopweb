import React from 'react';
import { Box, Card, CardMedia, CardContent, Button, Chip, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ShoppingCart, Favorite } from '@mui/icons-material';

// Importar estilos CSS de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * COPIA DE RESPALDO - SwiperExample3
 * 
 * CONFIGURACIÓN RESPALDADA:
 * - Box laterales: 5% cada uno
 * - Box central: 90%
 * - Cards: maxWidth 200px
 * - spaceBetween: 12px
 * - slidesPerView: 'auto' en desktop, 5 en breakpoints 1024px+
 * - Fuentes reducidas para mejor ajuste
 */
const SwiperExample3 = () => {
  // Datos de ejemplo de productos de papelería
  const productos = [
    {
      id: 1,
      nombre: 'Cuaderno Universitario',
      precio: 15.99,
      imagen: 'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?w=300&h=300&fit=crop',
      categoria: 'Cuadernos'
    },
    {
      id: 2,
      nombre: 'Set de Bolígrafos Premium',
      precio: 24.99,
      imagen: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&h=300&fit=crop',
      categoria: 'Escritura'
    },
    {
      id: 3,
      nombre: 'Carpeta Archivador',
      precio: 12.50,
      imagen: 'https://images.unsplash.com/photo-1541960071727-c531398e7494?w=300&h=300&fit=crop',
      categoria: 'Archivo'
    },
    {
      id: 4,
      nombre: 'Calculadora Científica',
      precio: 45.00,
      imagen: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop',
      categoria: 'Calculadoras'
    },
    {
      id: 5,
      nombre: 'Resaltadores Fluorescentes',
      precio: 8.99,
      imagen: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
      categoria: 'Marcadores'
    },
    {
      id: 6,
      nombre: 'Agenda 2025',
      precio: 28.75,
      imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
      categoria: 'Agendas'
    }
  ];

  const ProductCard = ({ producto }) => (
    <Card sx={{ 
      width: '100%',
      maxWidth: 200,
      height: 320,
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 6
      }
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="140"
          image={producto.imagen}
          alt={producto.nombre}
          sx={{ objectFit: 'cover' }}
        />
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
          fontSize: { xs: '0.8rem', sm: '0.9rem' },
          lineHeight: 1.2,
          mb: 1.5
        }}>
          {producto.nombre}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6" color="primary" fontWeight="bold" sx={{
              fontSize: { xs: '0.9rem', sm: '1.0rem' }
            }}>
              ${producto.precio.toFixed(2)}
            </Typography>
          </Box>

          <Button 
            variant="contained" 
            startIcon={<ShoppingCart />} 
            size="small" 
            fullWidth
            sx={{ 
              fontSize: { xs: '0.6rem', sm: '0.7rem' },
              padding: { xs: '4px 8px', sm: '6px 12px' }
            }}
          >
            Agregar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      width: '100%',
      marginTop: '10px',
      overflowX: 'hidden',
      display: 'flex'
    }}>
      
      {/* Box izquierdo - 5% */}
      <Box sx={{ width: '5%' }} />
      
      {/* Box central - 90% con el slider */}
      <Box sx={{ 
        width: '90%',
        position: 'relative',
        overflow: 'hidden',
        '& .swiper': {
          width: '100%',
          height: 'auto',
          overflow: 'hidden'
        },
        '& .swiper-slide': {
          width: 'auto !important',
          flex: '0 0 auto',
          display: 'flex',
          justifyContent: 'center'
        },
        '& .swiper-button-next, & .swiper-button-prev': {
          width: '40px',
          height: '40px',
          marginTop: '-20px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '50%',
          border: '1px solid #ddd',
          color: '#333',
          zIndex: 10,
          '&:after': {
            fontSize: '16px',
            fontWeight: 'bold'
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            border: '1px solid #1976d2'
          }
        },
        '& .swiper-button-next': {
          right: '-50px'
        },
        '& .swiper-button-prev': {
          left: '-50px'
        },
        '& .swiper-pagination': {
          bottom: '10px'
        }
      }}>
        <Swiper
          spaceBetween={12}
          slidesPerView={'auto'}
          centeredSlides={false}
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
            320: { 
              slidesPerView: 1,
              spaceBetween: 12
            },
            480: { 
              slidesPerView: 2,
              spaceBetween: 12
            },
            768: { 
              slidesPerView: 3,
              spaceBetween: 12
            },
            1024: { 
              slidesPerView: 5,
              spaceBetween: 12
            },
            1200: { 
              slidesPerView: 5,
              spaceBetween: 12
            }
          }}
          style={{ 
            paddingBottom: '40px',
            paddingTop: '10px',
            paddingLeft: '0',
            paddingRight: '0'
          }}
        >
          {productos.map((producto) => (
            <SwiperSlide key={producto.id}>
              <ProductCard producto={producto} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      
      {/* Box derecho - 5% */}
      <Box sx={{ width: '5%' }} />
    </Box>
  );
};

export default SwiperExample3;