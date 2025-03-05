
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Play } from "lucide-react";

interface ExampleCardProps {
  title: string;
  description: string;
  code: string;
  level: "beginner" | "intermediate" | "advanced";
}

const ExampleCard: React.FC<ExampleCardProps> = ({
  title,
  description,
  code,
  level,
}) => {
  const getLevelColor = () => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{title}</CardTitle>
          <span
            className={`px-2 py-0.5 text-xs rounded-full font-medium ${getLevelColor()}`}
          >
            {level}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        <div className="bg-secondary/50 p-3 rounded-md font-mono text-xs overflow-hidden overflow-ellipsis">
          {code.length > 120 ? `${code.substring(0, 120)}...` : code}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Link to="/docs">
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            Learn more
            <ArrowRight size={12} />
          </Button>
        </Link>
        <Link 
          to={`/try?code=${encodeURIComponent(code)}`}
          state={{ code }}
        >
          <Button size="sm" className="gap-1 text-xs">
            <Play size={12} />
            Try it
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Examples = () => {
  const examples = [
    {
      title: "Hello World",
      description: "The classic first program, outputting 'Hello, World!'",
      code: "+++++++++[>++++++++<-]>++++++++++[>++++++++++<-]>+++++.>+++++++++[>+++++++++++<-]>+.+++++++..+++.>++++[>+++++++++++<-]>-.------------.<<<<+++++++++++++++.>>.+++.------.--------.>>+.",
      level: "beginner" as const,
    },
    {
      title: "Counter to 10",
      description: "A simple program that counts from 1 to 10 and prints each number",
      code: "++++++++++[>!<-]",
      level: "beginner" as const,
    },
    {
      title: "Cat Program",
      description: "A program that echoes input characters (like Unix 'cat')",
      code: ",[-.,]",
      level: "beginner" as const,
    },
    {
      title: "Simple Addition",
      description: "This program adds two numbers and outputs the result",
      code: "+++>+++++<[>+<-]>!",
      level: "beginner" as const,
    },
    {
      title: "Multiplication",
      description: "Multiplies two numbers using a nested loop approach",
      code: ">++++>+++<<[>[>+>+<<-]>>[<<+>>-]<<<-]>>!",
      level: "intermediate" as const,
    },
    {
      title: "Debug Test",
      description: "Demonstrates memory inspection with the debug command",
      code: "+++>++>+<?<?<?",
      level: "beginner" as const,
    },
    {
      title: "ASCII Art",
      description: "Outputs a simple ASCII art pattern using characters",
      code: "++++++++[>++++>++++++++>++++++++>+<<<<-]>++.>+.>--.>++++++++++++++.",
      level: "intermediate" as const,
    },
    {
      title: "Division",
      description: "A complex algorithm implementing integer division",
      code: "++++++>++++><<[>>[>+>+<<-]>[-<+>]<<-]>>>!",
      level: "advanced" as const,
    },
    {
      title: "Fibonacci Sequence",
      description: "Generates and outputs the first 10 Fibonacci numbers",
      code: "+>+<[>[>+>+<<-]>>[<<+>>-]<<<-]>>[>!>+<<-]",
      level: "advanced" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight">Example Programs</h2>
        <p className="text-muted-foreground mt-2">
          Explore these sample programs to understand Interfuck capabilities and
          learn programming patterns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <ExampleCard
            key={index}
            title={example.title}
            description={example.description}
            code={example.code}
            level={example.level}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/try">
          <Button className="gap-2">
            <Play size={16} />
            Try the interpreter
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Examples;
