import React from 'react';
import { Box } from '@mui/material';
import Banner from '../components/Banner.jsx';
import BannerProducts from '../components/BannerProducts.jsx';

const Portal = () => {
    return (
        <>
            {/* Banners fijos hasta arriba - ocupan todo el ancho sin márgenes */}
            <Box 
                sx={{ 
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    zIndex: 1000,
                    margin: 0,
                    padding: 0
                }}
            >
                {/* Banner de contacto */}
                <Banner
                    title="Ventas y contacto: 554389897"
                    color="#989b9bff"
                    colorTexto="#FFFFFF"
                />
                
                {/* Banner de productos - pegado debajo del banner de contacto */}
                <BannerProducts backgroundColor="#3AAFA9" />
            </Box>

            {/* Contenido del portal con espacio para los banners fijos */}
            <Box sx={{ paddingTop: '120px' }}> {/* Aumenté el padding para los dos banners */}
                <div>
                    Hola amigo
                </div>
            </Box>
        </>
    );
};

export default Portal;