
import Layout from "@/components/Layout";
import InterfuckInterpreter from "@/components/InterfuckInterpreter";

const Try = () => {
  return (
    <Layout>
      <div className="relative overflow-hidden min-h-[calc(100vh-16rem)]">
        {/* Futuristic background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl" />
        </div>
        
        <div className="container px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto mb-6 md:mb-10 text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              HyperCall IDE
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Write, run, and debug HCPL code in your browser
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="glass-card rounded-2xl overflow-hidden border border-slate-200/30 dark:border-slate-700/30 shadow-lg backdrop-blur-sm">
              <InterfuckInterpreter />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Try;
