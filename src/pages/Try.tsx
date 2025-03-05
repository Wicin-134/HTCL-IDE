
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Interpreter from "@/components/Interpreter";
import Layout from "@/components/Layout";

const Try = () => {
  const location = useLocation();
  const [initialCode, setInitialCode] = useState<string | null>(null);
  
  useEffect(() => {
    // Check for code in URL parameters
    const params = new URLSearchParams(location.search);
    const codeParam = params.get("code");
    
    // Check for code in location state (from examples page)
    const stateCode = location.state?.code;
    
    if (codeParam) {
      setInitialCode(codeParam);
    } else if (stateCode) {
      setInitialCode(stateCode);
    }
  }, [location]);

  return (
    <Layout>
      <div className="container px-4 py-16">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Interfuck Interpreter</h1>
          <p className="text-muted-foreground text-lg">
            Write, run, and debug Interfuck code in your browser
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Interpreter initialCode={initialCode} />
        </div>
      </div>
    </Layout>
  );
};

export default Try;
