import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/layout/Layout';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;