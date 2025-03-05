
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
          <div className="p-8 border rounded-lg shadow-sm bg-card text-center">
            <p className="text-2xl text-muted-foreground">Documentation will be available soon</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Docs;
