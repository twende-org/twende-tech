import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./components/Contact";
import About from "./components/About";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Portfolio from "./components/Portfolio";
import Layout from "./components/Layout";
import ProjectDetail from "./pages/ProjectDetail";

const App = () => (
  <Routes>
    <Route path="/" element={<Layout><Index /></Layout>} />
    <Route path="/about" element={<Layout><About /></Layout>} />
    <Route path="/services" element={<Layout><Services /></Layout>} />
    <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
    <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
    <Route path="/portfolio/:id" element={<Layout><ProjectDetail /></Layout>} />
    <Route path="/contact" element={<Layout><Contact /></Layout>} />
    <Route path="*" element={<Layout><NotFound /></Layout>} />
  </Routes>
);

export default App;
