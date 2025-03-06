import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Docs = () => {
  return <Layout>
      <div className="container px-4 py-16">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Documentation</h1>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about the Interfuck programming language
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Introduction to INTERFUCK</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                INTERFUCK is an esoteric programming language designed to challenge conventional 
                programming paradigms with its unique syntax and execution model.
              </p>
              <p>
                The language revolves around a data structure called a <strong>Databer</strong>, which can 
                hold multiple data elements called <strong>Datalings</strong>. Each Dataling contains a numeric value.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Databer</h3>
                <p>
                  The Databer is the primary data structure in INTERFUCK. It serves as a container that 
                  can hold 500+ Datalings. When a program starts, the Databer is empty and you must add 
                  Datalings to it.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Datalings</h3>
                <p>
                  Datalings are individual data elements stored within a Databer. Each Dataling contains 
                  a numeric value. Datalings can be added, removed, or have their values modified during 
                  program execution.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language Syntax</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  INTERFUCK uses a unique syntax where commands start with "PLEASE" followed by an action. 
                  Each command's value is specified on the next line (not on the same line), making the code structure clear and easy to read.
                  Comments start with // and continue to the end of the line.
                </p>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Actions</h3>
                  <div className="space-y-2">
                    <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE DO :1.</code> - Creates a new Dataling. The value is specified on the next line</p>
                    <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE DONT :2. [index]</code> - Removes the Dataling at the specified index</p>
                    <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE LET :3. [index]</code> - Updates the value of the Dataling at the specified index. The new value is specified on the next line</p>
                    <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE CALL :4.</code> - Prints all values stored in the Databer</p>
                    <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE BREACH :5.</code> - Removes all Datalings from the Databer</p>
                    <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE EXIT :6.</code> - Exits the IDE</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Required EXIT Command</h3>
                  <p className="text-destructive font-medium">
                    Every INTERFUCK program MUST end with the <code className="font-mono bg-secondary/20 px-1 rounded">PLEASE EXIT :6.</code> command.
                    The IDE will throw a "Stupid error" if this command is missing.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Example Format</h3>
                  <div className="bg-secondary/20 p-2 rounded-md mt-2">
                    <pre className="font-mono text-sm">PLEASE DO :1.  // Create a new Dataling            // The value is on the next line</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Character Representation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                INTERFUCK can represent characters using numeric values. Values are mapped to 
                specific characters according to the following scheme:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Lowercase Letters (1-27)</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-2">
                    <div className="p-2 border rounded text-center"><span className="font-mono">1 = ' '</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">2 = 'a'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">...</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">27 = 'z'</span></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Uppercase Letters (28-53)</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-2">
                    <div className="p-2 border rounded text-center"><span className="font-mono">28 = 'A'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">...</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">53 = 'Z'</span></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Numbers (54-64)</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-2">
                    <div className="p-2 border rounded text-center"><span className="font-mono">54 = '0'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">...</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">64 = '10'</span></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Special Characters (65-74)</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-2">
                    <div className="p-2 border rounded text-center"><span className="font-mono">65 = '.'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">66 = ','</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">...</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">74 = '*'</span></div>
                  </div>
                </div>
              </div>
              
              <p className="mt-4">
                When the IDE displays Dataling values between 1 and 74, it also shows the 
                corresponding character representation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Character Names</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                INTERFUCK has unique names for certain special characters:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded">
                  <p className="font-mono font-semibold">Dot (.)</p>
                  <p className="text-muted-foreground">Called an "Orb"</p>
                </div>
                <div className="p-3 border rounded">
                  <p className="font-mono font-semibold">Colon (:)</p>
                  <p className="text-muted-foreground">Called a "Semi-Orb"</p>
                </div>
                <div className="p-3 border rounded">
                  <p className="font-mono font-semibold">Comma (,)</p>
                  <p className="text-muted-foreground">Called an "Orbit"</p>
                </div>
                <div className="p-3 border rounded">
                  <p className="font-mono font-semibold">Semicolon (;)</p>
                  <p className="text-muted-foreground">Called a "Semi-Orbit"</p>
                </div>
              </div>
              <div className="p-3 border rounded mt-4">
                <p className="font-mono font-semibold">Commands</p>
                <p className="text-muted-foreground">Called "Actions"</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Basic Program</h3>
                <div className="bg-secondary/20 p-3 rounded-md">
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                  {`// Create two Datalings
PLEASE DO :1.
8

PLEASE DO :1.
5
                    
// Display the Databer contents
PLEASE CALL :4.
                    
// Update the first Dataling
PLEASE LET :3. 0
12
                    
// Display the updated Databer
PLEASE CALL :4.
                    
// Exit the IDE
PLEASE EXIT :6.`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Hello</h3>
                <div className="bg-secondary/20 p-3 rounded-md">
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                  {`// This program spells "hello"
PLEASE DO :1.  // h
9

PLEASE DO :1.  // e
6

PLEASE DO :1.  // l
13

PLEASE DO :1.  // l
13

PLEASE DO :1.  // o
16
                    
// Display the Databer contents
PLEASE CALL :4.
                    
// Exit the IDE
PLEASE EXIT :6.`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>;
};

export default Docs;
