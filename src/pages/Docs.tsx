
import Documentation from "@/components/Documentation";
import Layout from "@/components/Layout";

const Docs = () => {
  return (
    <Layout>
      <div className="container px-4 py-16">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Documentation</h1>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about the Interfuck programming language
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Documentation />
        </div>
      </div>
    </Layout>
  );
};

export default Docs;
