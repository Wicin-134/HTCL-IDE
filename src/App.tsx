
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Docs from "@/pages/Docs";
import Try from "@/pages/Try";
import NotFound from "@/pages/NotFound";
import { LanguageProvider } from "@/lib/translations";
import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/try" element={<Try />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
