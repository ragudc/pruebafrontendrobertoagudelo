import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/producto/:id" element={<ProductPage />} />
  </Routes>
);

export default AppRoutes;

