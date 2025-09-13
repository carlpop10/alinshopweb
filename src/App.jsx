import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Divider,
  AppBar,
  Toolbar
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Importar Banner y ejemplos
import Banner from './components/Banner.jsx';
import BannerExample from './examples/BannerExample.jsx';
import MenuExample from './examples/MenuExample';
import DrawerExample from './examples/DrawerExample';
import FormControlExample from './examples/FormControlExample';
import DataGridExample from './examples/DataGridExample';
import SwiperExample from './examples/SwiperExample';
import Portal from './pages/portal.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/portal" />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
    </Router>
  );
}

export default App;
