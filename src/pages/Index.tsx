
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
                title="Unique Data Structure"
                description="Interfuck introduces the Databer system, a container that can hold multiple Datalings, offering a distinctive approach to data storage and manipulation."
              />
              <FeatureCard
                icon={<BookText size={24} />}
                title="Polite Syntax"
                description="All commands in Interfuck begin with 'PLEASE', promoting a culture of courtesy in programming while providing a clear structure to the code."
              />
              <FeatureCard
                icon={<Database size={24} />}
                title="Character Mapping"
                description="Interfuck includes a built-in system for representing characters as numbers (1-27), allowing text manipulation within its numeric-focused environment."
              />
              <FeatureCard
                icon={<Sparkles size={24} />}
                title="Creative Challenge"
                description="With its distinctive command set and data model, Interfuck encourages innovative problem-solving and offers a refreshing break from conventional programming paradigms."
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
