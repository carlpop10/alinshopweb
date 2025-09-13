import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Rating,
  Paper
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  ShoppingCart,
  Share
} from '@mui/icons-material';

const SwiperExample = () => {
  const products = [
    {
      id: 1,
      name: 'Cuaderno Profesional',
      price: 45.99,
      originalPrice: 59.99,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      rating: 4.5,
      reviews: 128,
      discount: 25,
      category: 'Papelería'
    },
    {
      id: 2,
      name: 'Set de Bolígrafos Premium',
      price: 89.99,
      originalPrice: 120.00,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
      rating: 4.8,
      reviews: 95,
      discount: 25,
      category: 'Escritura'
    },
    {
      id: 3,
      name: 'Organizador de Escritorio',
      price: 125.50,
      originalPrice: 150.00,
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400',
      rating: 4.3,
      reviews: 67,
      discount: 16,
      category: 'Organización'
    },
    {
      id: 4,
      name: 'Carpeta Archivadora',
      price: 32.99,
      originalPrice: 42.99,
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400',
      rating: 4.1,
      reviews: 203,
      discount: 23,
      category: 'Archivo'
    }
  ];

  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  const ProductCard = ({ product }) => (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3
      }
    }}>
      {product.discount > 0 && (
        <Chip
          label={`-${product.discount}%`}
          color="error"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 1,
            fontWeight: 'bold'
          }}
        />
      )}

      <IconButton
        onClick={() => toggleFavorite(product.id)}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)'
          }
        }}
      >
        {favorites.has(product.id) ? (
          <Favorite color="error" />
        ) : (
          <FavoriteBorder />
        )}
      </IconButton>

      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h3" gutterBottom noWrap>
          {product.name}
        </Typography>

        <Chip
          label={product.category}
          size="small"
          variant="outlined"
          sx={{ alignSelf: 'flex-start', mb: 1 }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <Typography variant="caption" sx={{ ml: 1 }}>
            ({product.reviews})
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {formatPrice(product.price)}
            </Typography>
            {product.originalPrice > product.price && (
              <Typography
                variant="body2"
                sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
              >
                {formatPrice(product.originalPrice)}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              fullWidth
              onClick={() => console.log(`Agregado al carrito: ${product.name}`)}
            >
              Agregar
            </Button>
            <IconButton color="primary">
              <Share />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Swiper Example
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Carrusel de productos con efectos y navegación
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Carrusel con Efecto 3D
        </Typography>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          style={{ paddingBottom: '50px' }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} style={{ width: '300px' }}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Carrusel Responsivo
        </Typography>
        <Swiper
          spaceBetween={20}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 25
            }
          }}
          modules={[Navigation, Pagination, Autoplay]}
          style={{ paddingBottom: '50px' }}
        >
          {products.map((product) => (
            <SwiperSlide key={`responsive-${product.id}`}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Paper>
  );
};

export default SwiperExample;
