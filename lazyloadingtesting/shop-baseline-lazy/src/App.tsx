import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import ScaleLoader from "react-spinners/ScaleLoader";
const ProductsList = lazy(() => import("./pages/ProductsList"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div className="loading"><ScaleLoader color="#1E88E5"/></div>}>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
