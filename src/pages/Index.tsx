
import Hero from "@/components/Hero";
import Examples from "@/components/Examples";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, BookText, Database, Sparkles } from "lucide-react";

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  return (
    <Card className="bg-card transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Why Interfuck?
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover the unique advantages of programming in this esoteric language
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in animate-delay-200">
              <FeatureCard
                icon={<Terminal size={24} />}
                title="Minimalist Syntax"
                description="With just 10 commands, Interfuck strips programming down to its essential operations, forcing creative problem-solving and deeper understanding of computational principles."
              />
              <FeatureCard
                icon={<BookText size={24} />}
                title="Educational Value"
                description="Learning Interfuck provides insights into memory management, pointers, and low-level operations that are abstracted away in higher-level languages."
              />
              <FeatureCard
                icon={<Database size={24} />}
                title="Memory Visualization"
                description="Our interpreter includes tools to visualize memory states and program execution, making it easier to understand how your code manipulates data."
              />
              <FeatureCard
                icon={<Sparkles size={24} />}
                title="Creative Challenge"
                description="Writing efficient Interfuck code is a puzzle that exercises your creativity and logical thinking in ways that conventional programming rarely demands."
              />
            </div>
          </div>
        </section>
        
        {/* Examples Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container px-4">
            <Examples />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
