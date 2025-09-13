# Swiper Component - Ejemplo de uso medio

## Descripción
Swiper es una librería para crear carruseles táctiles modernos con soporte para móviles, con múltiples efectos y funcionalidades avanzadas.

## Instalación adicional de CSS
```bash
npm install swiper
```

## Ejemplo completo

```jsx
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
  Thumbs,
  FreeMode
} from 'swiper/modules';

// Importar estilos CSS de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Badge,
  Chip,
  Rating
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  ShoppingCart,
  Share,
  Visibility
} from '@mui/icons-material';

const SwiperExample = () => {
  // Datos de productos de ejemplo
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
    },
    {
      id: 5,
      name: 'Calculadora Científica',
      price: 245.00,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
      rating: 4.7,
      reviews: 156,
      discount: 18,
      category: 'Tecnología'
    },
    {
      id: 6,
      name: 'Agenda 2024',
      price: 78.50,
      originalPrice: 95.00,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      rating: 4.4,
      reviews: 89,
      discount: 17,
      category: 'Planificación'
    }
  ];

  // Estados
  const [favorites, setFavorites] = useState(new Set());
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // Función para manejar favoritos
  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  // Función para formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price);
  };

  // Componente de tarjeta de producto
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
      {/* Badge de descuento */}
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

      {/* Botón de favorito */}
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Productos Destacados
      </Typography>

      {/* Swiper principal con efecto coverflow */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
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
          className="mySwiper"
          style={{ paddingBottom: '50px' }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} style={{ width: '300px' }}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Swiper con navegación y thumbnails */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Carrusel con Thumbnails
        </Typography>
        
        {/* Swiper principal */}
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {products.map((product) => (
            <SwiperSlide key={`main-${product.id}`}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper de thumbnails */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          style={{ marginTop: '10px', height: '100px' }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={`thumb-${product.id}`}>
              <Box
                sx={{
                  height: '100%',
                  border: activeIndex === index ? 2 : 1,
                  borderColor: activeIndex === index ? 'primary.main' : 'grey.300',
                  borderRadius: 1,
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                <CardMedia
                  component="img"
                  height="100%"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Swiper responsivo con breakpoints */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Carrusel Responsivo
        </Typography>
        <Swiper
          ref={swiperRef}
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

      {/* Controles personalizados */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          Anterior
        </Button>
        <Button
          variant="outlined"
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          Siguiente
        </Button>
        <Button
          variant="outlined"
          onClick={() => swiperRef.current?.swiper.autoplay.stop()}
        >
          Pausar
        </Button>
        <Button
          variant="outlined"
          onClick={() => swiperRef.current?.swiper.autoplay.start()}
        >
          Reproducir
        </Button>
      </Box>
    </Box>
  );
};

export default SwiperExample;
```

## Partes más difíciles explicadas

### 1. Importación de módulos y estilos
```jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow
} from 'swiper/modules';

// CSS requerido
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
```
- Importar solo los módulos que necesitas para optimizar el bundle
- Cada módulo requiere su CSS específico

### 2. Configuración de efectos avanzados
```jsx
<Swiper
  effect={'coverflow'}
  coverflowEffect={{
    rotate: 50,        // Rotación de las slides
    stretch: 0,        // Estiramiento entre slides
    depth: 100,        // Profundidad del efecto 3D
    modifier: 1,       // Multiplicador del efecto
    slideShadows: true // Sombras en las slides
  }}
/>
```
- `coverflow` crea un efecto 3D tipo carrusel de iTunes
- Cada parámetro controla un aspecto visual específico

### 3. Swiper con thumbnails
```jsx
const [thumbsSwiper, setThumbsSwiper] = useState(null);

// Swiper principal
<Swiper
  thumbs={{ 
    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null 
  }}
/>

// Swiper de thumbnails
<Swiper
  onSwiper={setThumbsSwiper}
  freeMode={true}
  watchSlidesProgress={true}
/>
```
- El swiper principal se sincroniza con el de thumbnails
- `watchSlidesProgress` permite la sincronización
- Verificar `!thumbsSwiper.destroyed` previene errores

### 4. Breakpoints responsivos
```jsx
breakpoints={{
  320: {
    slidesPerView: 1,
    spaceBetween: 10
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
```
- Define diferentes configuraciones según el ancho de pantalla
- Se adapta automáticamente al tamaño del dispositivo

### 5. Control programático
```jsx
const swiperRef = useRef(null);

// Métodos de control
swiperRef.current?.swiper.slidePrev()    // Slide anterior
swiperRef.current?.swiper.slideNext()    // Slide siguiente
swiperRef.current?.swiper.autoplay.stop() // Pausar autoplay
```
- `useRef` para obtener referencia al swiper
- Acceso a todos los métodos de la API de Swiper

### 6. Configuración de autoplay
```jsx
autoplay={{
  delay: 3000,                    // Tiempo entre slides (ms)
  disableOnInteraction: false,    // No parar al interactuar
  pauseOnMouseEnter: true        // Pausar al hacer hover
}}
```

## Efectos disponibles
- **slide**: Efecto normal (predeterminado)
- **fade**: Transición con desvanecimiento
- **cube**: Efecto cubo 3D
- **coverflow**: Efecto tipo iTunes
- **flip**: Efecto de volteo
- **cards**: Efecto de cartas apiladas

## Casos de uso comunes
- Galerías de productos
- Carruseles de imágenes
- Testimonios de clientes
- Showcases de portafolio
- Banners promocionales
- Presentaciones de características
