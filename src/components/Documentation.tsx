
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, BookOpen, Code, Terminal } from "lucide-react";

const Documentation = () => {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="introduction" className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
          <TabsTrigger value="introduction" className="flex gap-2 items-center justify-center">
            <Info size={16} />
            <span className="hidden sm:inline">Intro</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex gap-2 items-center justify-center">
            <BookOpen size={16} />
            <span className="hidden sm:inline">Language</span>
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex gap-2 items-center justify-center">
            <Code size={16} />
            <span className="hidden sm:inline">Examples</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex gap-2 items-center justify-center">
            <Terminal size={16} />
            <span className="hidden sm:inline">Advanced</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="introduction" className="mt-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Introduction to Interfuck</CardTitle>
              <CardDescription>
                A modern take on esoteric programming languages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Interfuck is an esoteric programming language inspired by Brainfuck but with extended capabilities for interfacing with modern computing environments. Like its predecessor, Interfuck is designed to challenge programmers with its minimalist syntax and unique execution model.
              </p>
              
              <h3 className="text-lg font-medium mt-6">Origins & Philosophy</h3>
              <p>
                While staying true to the minimalist nature of esoteric languages, Interfuck was developed to create a bridge between the elegant simplicity of Brainfuck and the needs of modern developers. The name "Interfuck" reflects its purpose—to interface with computational systems through a deliberately challenging yet powerful paradigm.
              </p>
              
              <h3 className="text-lg font-medium mt-6">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Turing complete computational model</li>
                <li>Extended instruction set beyond classical Brainfuck</li>
                <li>Memory visualization and debugging capabilities</li>
                <li>Support for both character and numeric output</li>
                <li>Compact representation of complex algorithms</li>
                <li>Online interpreter with modern developer features</li>
              </ul>
              
              <div className="p-4 border rounded-md bg-secondary/50 mt-6">
                <h4 className="font-medium mb-2">Why Learn Interfuck?</h4>
                <p className="text-muted-foreground">
                  Working with Interfuck challenges you to think differently about programming fundamentals. It strips away abstractions and forces engagement with the raw mechanics of computation—memory management, pointer manipulation, and control flow. Even if you never use it for practical projects, the mental exercise will make you a better programmer in any language.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="language" className="mt-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Language Specification</CardTitle>
              <CardDescription>
                Detailed explanation of Interfuck's syntax and execution model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Interfuck operates on a memory model consisting of an array of cells (default 30,000), each initialized to zero. A pointer indicates the current cell being manipulated. The language consists of just 10 single-character commands, making it extremely minimalist yet Turing complete.
              </p>
              
              <h3 className="text-lg font-medium mt-6">Basic Instructions</h3>
              
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">Command</th>
                      <th className="py-2 px-4 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">{'>'}</td>
                      <td className="py-2 px-4">Move the pointer to the right</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">{'<'}</td>
                      <td className="py-2 px-4">Move the pointer to the left</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">+</td>
                      <td className="py-2 px-4">Increment the memory cell at the pointer</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">-</td>
                      <td className="py-2 px-4">Decrement the memory cell at the pointer</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">.</td>
                      <td className="py-2 px-4">Output the character signified by the cell at the pointer</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">,</td>
                      <td className="py-2 px-4">Input a character and store it in the cell at the pointer</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">[</td>
                      <td className="py-2 px-4">Jump past the matching ] if the cell at the pointer is 0</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">]</td>
                      <td className="py-2 px-4">Jump back to the matching [ if the cell at the pointer is nonzero</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Extended Instructions</h3>
              
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">Command</th>
                      <th className="py-2 px-4 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">!</td>
                      <td className="py-2 px-4">Print the numeric value of the current cell</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 font-mono">?</td>
                      <td className="py-2 px-4">Print the current state of the memory and pointer for debugging</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Memory Model</h3>
              <p>
                Interfuck's memory consists of 30,000 cells, each a byte that can hold a value from 0 to 255. The memory is circular, so moving the pointer past the end wraps around to the beginning, and vice versa. All cells are initialized to 0 at the beginning of execution.
              </p>
              
              <h3 className="text-lg font-medium mt-6">Execution Model</h3>
              <p>
                Instructions are executed sequentially from left to right, except when control flow is altered by the [ and ] commands. The program terminates when it reaches the end of the instruction sequence.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="examples" className="mt-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>
                Sample programs to help you learn Interfuck
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Hello World</h3>
                <p className="mb-3 text-muted-foreground">
                  The classic first program, outputting "Hello, World!".
                </p>
                <div className="bg-card p-4 rounded-md border font-mono text-sm overflow-x-auto">
                  +++++++++[{'>'}++++++++{'<'}-]{'>'}++++++++++[{'>'}++++++++++{'<'}-]{'>'}+++++.{'>'}+++++++++[{'>'}+++++++++++{'<'}-]{'>'}+.+++++++..+++.{'>'}++++[{'>'}+++++++++++{'<'}-]{'>'}-.------------.{'<'}{'<'}{'<'}{'<'}+++++++++++++++.{'>'}{'>'}.+++.------.--------.{'>'}{'>'}{'+.'} 
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Counter to 10</h3>
                <p className="mb-3 text-muted-foreground">
                  A simple program that counts from 1 to 10 and prints each number.
                </p>
                <div className="bg-card p-4 rounded-md border font-mono text-sm overflow-x-auto">
                  ++++++++++[{'>'}!{'<'}-]
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Cat Program</h3>
                <p className="mb-3 text-muted-foreground">
                  A program that reads input and outputs it unchanged (like the Unix 'cat' command).
                </p>
                <div className="bg-card p-4 rounded-md border font-mono text-sm overflow-x-auto">
                  ,[-.,]
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Simple Addition (3 + 5 = 8)</h3>
                <p className="mb-3 text-muted-foreground">
                  This program adds 3 and 5, then outputs the result (8).
                </p>
                <div className="bg-card p-4 rounded-md border font-mono text-sm overflow-x-auto">
                  +++{'>'}+++++{'<'}[{'>'}+{'<'}-]{'>'}!
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Debug Test</h3>
                <p className="mb-3 text-muted-foreground">
                  A demonstration of the memory visualization feature using the ? command.
                </p>
                <div className="bg-card p-4 rounded-md border font-mono text-sm overflow-x-auto">
                  +++{'>'}++{'>'}+{'<'}?{'<'}?{'<'}?
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-secondary/50 mt-6">
                <h4 className="font-medium mb-2">Programming Tips</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Start with small programs and build up your understanding incrementally</li>
                  <li>Use the ? debug command liberally to understand memory state</li>
                  <li>Break complex operations into smaller steps</li>
                  <li>Remember that cells wrap around at 255 (to 0) and 0 (to 255)</li>
                  <li>Use comments in your code by adding non-instruction characters (they'll be ignored)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Techniques</CardTitle>
              <CardDescription>
                Advanced patterns and algorithms in Interfuck
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Despite its minimalist design, Interfuck is capable of expressing complex algorithms. This section covers some advanced techniques that go beyond basic programming.
              </p>
              
              <h3 className="text-lg font-medium mt-6">Implementing Multiplication</h3>
              <p className="mb-3">
                This pattern implements multiplication of two numbers:
              </p>
              <div className="bg-card p-4 rounded-md border font-mono text-sm overflow-x-auto">
                {/* x in cell 0, y in cell 1, result in cell 2 */}
                {'>'}++++{'>'}+++{'<'}{'<'}[{'>'}[{'>'}+{'>'}+{'<'}{'<'}-]{'>'}{'>'}{'>'}{'<'}{'<'}+{'>'}{'>'}-]{'<'}{'<'}{'<'}-]{'>'}{'>'}{'>'}!
              </div>
              <p className="mt-2 text-muted-foreground">
                This multiplies 4 × 3 = 12 and prints the result.
              </p>
              
              <h3 className="text-lg font-medium mt-6">Working with ASCII</h3>
              <p>
                Since Interfuck allows outputting characters (with .) and numbers (with !), you can work directly with ASCII values. To output a specific character, you need to set a cell to its ASCII value.
              </p>
              <p className="mt-2">
                For example, to output 'A' (ASCII 65):
              </p>
              <div className="bg-card p-4 rounded-md border font-mono text-sm overflow-x-auto mt-2">
                +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.
              </div>
              
              <h3 className="text-lg font-medium mt-6">Optimizing Code</h3>
              <p>
                Interfuck code can often be optimized to use fewer instructions. Here are some patterns that can help:
              </p>
              
              <h4 className="font-medium mt-4">1. Zero a cell</h4>
              <div className="bg-card p-4 rounded-md border font-mono text-sm overflow-x-auto mt-2">
                [-]
              </div>
              
              <h4 className="font-medium mt-4">2. Move a value (cell 0 to cell 1, zeroing cell 0)</h4>
              <div className="bg-card p-4 rounded-md border font-mono text-sm overflow-x-auto mt-2">
                [{'>'}+{'<'}-]
              </div>
              
              <h4 className="font-medium mt-4">3. Copy a value (cell 0 to cells 1 and 2)</h4>
              <div className="bg-card p-4 rounded-md border font-mono text-sm overflow-x-auto mt-2">
                [{'>'}+{'>'}+{'<'}{'<'}-]{'>'}{'>'}{'>'}{'<'}{'<'}+{'>'}{'>'}-]
              </div>
              
              <h3 className="text-lg font-medium mt-6">Memory Management Patterns</h3>
              <p>
                Efficient memory usage is crucial in Interfuck. Here are some common patterns:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Use temporary cells for complex operations</li>
                <li>Clean up temporary cells with [-] when done</li>
                <li>Keep related values in adjacent cells</li>
                <li>Use distant cells for completely separate operations</li>
                <li>Remember that the memory wraps around if you need a lot of cells</li>
              </ul>
              
              <div className="p-4 border rounded-md bg-secondary/50 mt-6">
                <h4 className="font-medium mb-2">Computational Limitations</h4>
                <p className="text-muted-foreground">
                  While Interfuck is Turing complete, it's important to understand its practical limitations. Complex algorithms can require extremely long code sequences, and execution can be slow. The online interpreter has safety limits to prevent infinite loops and excessive resource usage.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;
