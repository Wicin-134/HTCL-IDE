import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, BookText, Database, Sparkles, Code, LayoutGrid, MessageSquare, Play, FileText } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

const GettingStartedCard = ({
  number,
  title,
  description
}: {
  number: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const Index = () => {
  useEffect(() => {
    console.log("Index page loaded");
  }, []);
  
  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <Hero />
        
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Why Callback?
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover the unique advantages of programming in this esoteric language
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in animate-delay-200">
              <FeatureCard
                icon={<Terminal size={24} />}
                title="Unique Data Structure"
                description="Callback uses the Databer system with Datalings, where each command's value is specified on the next line for clear data input."
              />
              <FeatureCard
                icon={<BookText size={24} />}
                title="Polite Syntax"
                description="Commands start with 'PLEASE', followed by the action, with values provided on separate lines, making code structure clear and courteous."
              />
              <FeatureCard
                icon={<Database size={24} />}
                title="Extensive Character Mapping"
                description="Supports a comprehensive set of 74 character mappings including lowercase and uppercase letters, numbers 0-9, and special characters for rich text output."
              />
              <FeatureCard
                icon={<MessageSquare size={24} />}
                title="Interactive Input"
                description="Create Datasubs to collect and store user input, allowing for interactive programs with named variables for text storage."
              />
              <FeatureCard
                icon={<Code size={24} />}
                title="Educational Value"
                description="Perfect for learning programming concepts with its unique approach to data manipulation, control flow, and memory management in a simplified environment."
              />
              <FeatureCard
                icon={<LayoutGrid size={24} />}
                title="Visual Datalings"
                description="Watch your data structures in real-time with visual representations of Datalings and Datasubs, making it easier to understand how your program interacts with memory."
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Getting Started
              </h2>
              <p className="text-muted-foreground text-lg">
                Learn the basics of Callback Programming Language quickly
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <GettingStartedCard 
                  number="1"
                  title="Learn Basic Commands"
                  description="Start with PLEASE DO :1. to create Datalings, PLEASE ADD :9. to create Datasubs, and PLEASE CALL :4. to display output."
                />
                <GettingStartedCard 
                  number="2"
                  title="Create and Use Datalings"
                  description="Use PLEASE DO :1. followed by a number value on the next line to create a Dataling. Each number corresponds to a character."
                />
                <GettingStartedCard 
                  number="3"
                  title="Work with Datasubs"
                  description="Create named variables with PLEASE ADD :9. Name and use PLEASE LISTEN :8. Name to collect user input."
                />
                <GettingStartedCard 
                  number="4"
                  title="Perform Calculations"
                  description="Use PLEASE CALC :10. ResultSub to perform mathematical operations and store results in a Datasub."
                />
                <GettingStartedCard 
                  number="5"
                  title="Read the Documentation"
                  description="Check out the Docs page for a complete reference of all available commands, character mappings, and advanced features."
                />
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4">Your First Callback Program</h3>
                <div className="font-mono text-sm bg-secondary/50 p-4 rounded-md whitespace-pre overflow-x-auto mb-6">
{`// Hello World program in CBPL
PLEASE DO :1.
9
PLEASE DO :1.
6
PLEASE DO :1.
13
PLEASE DO :1.
13
PLEASE DO :1.
16
PLEASE DO :1.
1
PLEASE DO :1.
24
PLEASE DO :1.
16
PLEASE DO :1.
19
PLEASE DO :1.
13
PLEASE DO :1. 
5
PLEASE CALL :4.
PLEASE EXIT :6.`}
                </div>
                <div className="flex justify-center gap-4">
                  <Link to="/try">
                    <Button className="gap-2">
                      <Play size={16} />
                      Try it in the IDE
                    </Button>
                  </Link>
                  <Link to="/docs">
                    <Button variant="outline" className="gap-2">
                      <FileText size={16} />
                      Read the Docs
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
