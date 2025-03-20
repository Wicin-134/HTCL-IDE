import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Book, ChevronRight, Code, FileCode, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const Docs = () => {
  return (
    <Layout>
      <div className="container px-4 py-16">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Documentation</h1>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about the Callback Programming Language
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <Card id="introduction" className="scroll-mt-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Introduction to Callback Programming Language
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Callback Programming Language (CBPL) is an esoteric programming language designed to challenge conventional 
                programming paradigms with its unique syntax and execution model.
              </p>
              <p>
                The language revolves around two main data structures: the <strong>Databer</strong>, which can 
                hold multiple numeric data elements called <strong>Datalings</strong>, and <strong>Datasubs</strong>, which can 
                store text data from user input.
              </p>
              <p>
                What sets CBPL apart is its polite syntax - all commands begin with "PLEASE", 
                emphasizing the importance of courtesy even in computer interactions.
              </p>
              <div className="flex justify-end mt-4">
                <Link to="/try">
                  <Button variant="outline" size="sm" className="gap-1">
                    Try it now <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card id="data-types" className="scroll-mt-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Data Types
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Databer</h3>
                <p>The Databer is the primary data structure in CBPL. It serves as a container that can hold many Datalings. When a program starts, the Databer is empty and you must add Datalings to it using the DO command.</p>
                <p className="mt-2">
                  The Databer is essentially a numeric array where each position can be accessed by index.
                  Indices start at 0 for the first Dataling and increment by 1 for each subsequent Dataling.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Datalings</h3>
                <p>
                  Datalings are individual data elements stored within a Databer. Each Dataling contains 
                  a numeric value that can be used for calculations or to represent characters.
                </p>
                <p className="mt-2">
                  When displayed, Datalings with values between 1 and 74 automatically show both their numeric 
                  value and their character representation according to the CBPL character mapping.
                </p>
                <p className="mt-2">
                  Operations can be performed on Datalings:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Creating new Datalings (DO)</li>
                  <li>Removing Datalings (DONT)</li>
                  <li>Updating Dataling values (LET)</li>
                  <li>Displaying all Datalings (CALL)</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Datasubs</h3>
                <p>
                  Datasubs are named variables that can store text data. Unlike Datalings, which only store numeric values,
                  Datasubs can store entire words, sentences, or any textual input from the user.
                </p>
                <p className="mt-2">
                  Datasubs are especially useful for gathering input from the user during program execution. You can:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Create named Datasubs (ADD)</li>
                  <li>Get user input and store it in a Datasub (LISTEN)</li>
                  <li>Delete Datasubs when no longer needed (SUB GO)</li>
                </ul>
                <div className="bg-secondary/20 p-3 rounded-md mt-3">
                  <p className="font-medium mb-2">Example usage:</p>
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                  {`// Create a Datasub named "Username"
PLEASE ADD :9. Username

// Wait for user input and store it in the "Username" Datasub
PLEASE LISTEN :8. Username

// Now the Datasub contains whatever the user entered

// When done, delete the Datasub
PLEASE SUB GO :7. Username`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="language-syntax" className="scroll-mt-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Language Syntax
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p>
                  CBPL uses a unique syntax where commands start with "PLEASE" followed by an action. 
                  Each command's value is specified on the next line (not on the same line), making the code structure clear and easy to read.
                </p>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Comments</h3>
                  <p>
                    Comments in CBPL start with <code className="font-mono bg-secondary/20 px-1 rounded">//</code> and continue to the end of the line.
                    Comments are ignored by the interpreter and are useful for documenting your code.
                  </p>
                  <div className="bg-secondary/20 p-3 rounded-md mt-3">
                    <pre className="font-mono text-sm whitespace-pre-wrap">
                    {`// This is a comment
PLEASE DO :1.  // This is also a comment
10             // Comments can be on value lines too`}
                    </pre>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Actions (Commands)</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">Creating Datalings</h4>
                      <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE DO :1.</code> - Creates a new Dataling and appends it to the Databer. The value is specified on the next line.</p>
                      <div className="bg-secondary/20 p-2 rounded-md mt-2">
                        <pre className="font-mono text-sm">{`PLEASE DO :1.
10              // Creates a Dataling with value 10`}</pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Removing Datalings</h4>
                      <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE DONT :2. [index]</code> - Removes the Dataling at the specified index.</p>
                      <div className="bg-secondary/20 p-2 rounded-md mt-2">
                        <pre className="font-mono text-sm">{`PLEASE DONT :2. 0    // Removes the first Dataling`}</pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Updating Datalings</h4>
                      <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE LET :3. [index]</code> - Updates the value of the Dataling at the specified index. The new value is specified on the next line.</p>
                      <div className="bg-secondary/20 p-2 rounded-md mt-2">
                        <pre className="font-mono text-sm">{`PLEASE LET :3. 2    // Updates the third Dataling
15              // New value is 15`}</pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Displaying Data</h4>
                      <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE CALL :4.</code> - Prints all values stored in the Databer in the order they were added.</p>
                      <div className="bg-secondary/20 p-2 rounded-md mt-2">
                        <pre className="font-mono text-sm">{`PLEASE CALL :4.     // Displays all Datalings and Datasubs`}</pre>
                      </div>
                      
                      <p className="mt-3"><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE CALL :4.: [index]</code> - Displays the value of a specific Dataling at the given index.</p>
                      <div className="bg-secondary/20 p-2 rounded-md mt-2">
                        <pre className="font-mono text-sm">{`PLEASE CALL :4.: 2  // Displays the third Dataling's value`}</pre>
                      </div>
                      
                      <p className="mt-3"><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE CALL :4.; [name]</code> - Displays the value of a specific Datasub with the given name.</p>
                      <div className="bg-secondary/20 p-2 rounded-md mt-2">
                        <pre className="font-mono text-sm">{`PLEASE CALL :4.; UserName  // Displays the value of the "UserName" Datasub`}</pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Clearing the Databer</h4>
                      <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE BREACH :5.</code> - Removes all Datalings and Datasubs from the Databer.</p>
                      <div className="bg-secondary/20 p-2 rounded-md mt-2">
                        <pre className="font-mono text-sm">{`PLEASE BREACH :5.   // Clears all Datalings and Datasubs`}</pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Exiting the Program</h4>
                      <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE EXIT :6.</code> - Exits the IDE.</p>
                      <div className="bg-secondary/20 p-2 rounded-md mt-2">
                        <pre className="font-mono text-sm">{`PLEASE EXIT :6.     // Ends program execution`}</pre>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-md">
                      <h4 className="font-medium mb-1">Deleting Datasubs</h4>
                      <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE SUB GO :7. [name]</code> - Deletes the Datasub with the specified name.</p>
                      <div className="bg-secondary/20 p-2 rounded-md mt-2">
                        <pre className="font-mono text-sm">{`PLEASE SUB GO :7. UserName   // Deletes the Datasub named 'UserName'`}</pre>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-md">
                      <h4 className="font-medium mb-1">Getting User Input</h4>
                      <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE LISTEN :8. [name]</code> - Prompts the user for input and stores it in the named Datasub.</p>
                      <div className="bg-secondary/20 p-2 rounded-md mt-2">
                        <pre className="font-mono text-sm">{`PLEASE LISTEN :8. UserName   // Gets input from user and stores in 'UserName'`}</pre>
                      </div>
                      <p className="mt-2 text-sm">Note: You must create a Datasub with ADD before you can LISTEN to it.</p>
                    </div>
                    
                    <div className="bg-secondary/20 p-4 rounded-md">
                      <h4 className="font-medium mb-1">Creating Datasubs</h4>
                      <p><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE ADD :9. [name]</code> - Creates a new Datasub with the specified name.</p>
                      <div className="bg-secondary/20 p-2 rounded-md mt-2">
                        <pre className="font-mono text-sm">{`PLEASE ADD :9. UserName   // Creates a Datasub named 'UserName'`}</pre>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Required EXIT Command</h3>
                  <p className="text-destructive font-medium">
                    Every CBPL program MUST end with the <code className="font-mono bg-secondary/20 px-1 rounded">PLEASE EXIT :6.</code> command.
                    The IDE will throw a "Stupid error" if this command is missing.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Command Format</h3>
                  <div className="bg-secondary/20 p-2 rounded-md mt-2">
                    <pre className="font-mono text-sm">PLEASE DO :1.  // Create a new Dataling                // The value is on the next line</pre>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Syntax Requirements</h3>
                  <p>
                    CBPL has strict syntax requirements that must be followed:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>All commands must include a period (.) - the "Orb"</li>
                    <li>All commands must include a colon (:) - the "Semi-Orb"</li>
                    <li>Commands must have exactly one period (.)</li>
                    <li>The command name must be one of the defined actions (DO, DONT, LET, CALL, BREACH, EXIT, SUB GO, LISTEN, ADD)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="character-representation" className="scroll-mt-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Character Representation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                CBPL can represent characters using numeric values. Values are mapped to 
                specific characters according to the following comprehensive scheme:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Lowercase Letters (1-27)</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2 mb-2">
                    <div className="p-2 border rounded text-center"><span className="font-mono">1 = ' '</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">2 = 'a'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">3 = 'b'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">4 = 'c'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">5 = 'd'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">6 = 'e'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">7 = 'f'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">8 = 'g'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">9 = 'h'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">10 = 'i'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">11 = 'j'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">12 = 'k'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">13 = 'l'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">14 = 'm'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">15 = 'n'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">16 = 'o'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">17 = 'p'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">18 = 'q'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">19 = 'r'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">20 = 's'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">21 = 't'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">22 = 'u'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">23 = 'v'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">24 = 'w'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">25 = 'x'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">26 = 'y'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">27 = 'z'</span></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Uppercase Letters (28-53)</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2 mb-2">
                    <div className="p-2 border rounded text-center"><span className="font-mono">28 = 'A'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">29 = 'B'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">30 = 'C'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">31 = 'D'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">32 = 'E'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">33 = 'F'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">34 = 'G'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">35 = 'H'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">36 = 'I'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">37 = 'J'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">38 = 'K'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">39 = 'L'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">40 = 'M'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">41 = 'N'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">42 = 'O'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">43 = 'P'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">44 = 'Q'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">45 = 'R'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">46 = 'S'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">47 = 'T'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">48 = 'U'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">49 = 'V'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">50 = 'W'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">51 = 'X'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">52 = 'Y'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">53 = 'Z'</span></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Numbers (54-63)</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2 mb-2">
                    <div className="p-2 border rounded text-center"><span className="font-mono">54 = '0'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">55 = '1'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">56 = '2'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">57 = '3'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">58 = '4'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">59 = '5'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">60 = '6'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">61 = '7'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">62 = '8'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">63 = '9'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">64 = '10'</span></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Special Characters (65-74)</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2 mb-2">
                    <div className="p-2 border rounded text-center"><span className="font-mono">65 = '.'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">66 = ','</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">67 = '?'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">68 = '!'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">69 = '('</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">70 = ')'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">71 = '"'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">72 = '-'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">73 = '+'</span></div>
                    <div className="p-2 border rounded text-center"><span className="font-mono">74 = '*'</span></div>
                  </div>
                </div>
              </div>
              
              <p className="mt-4">
                When the IDE displays Dataling values between 1 and 74, it shows both the 
                numeric value and the corresponding character representation. This makes it easier to work
                with text in CBPL programs.
              </p>
              
              <div className="bg-secondary/20 p-3 rounded-md mt-4">
                <p className="font-medium mb-2">Example of character representation:</p>
                <pre className="font-mono text-sm whitespace-pre-wrap">
                {`PLEASE DO :1.
9    // Creates a Dataling with value 9 (represents 'h')

PLEASE DO :1.
6    // Creates a Dataling with value 6 (represents 'e')

PLEASE CALL :4.
// Output will show: he`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card id="special-terminology" className="scroll-mt-20">
            <CardHeader>
              <CardTitle>Special Language Terminology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                CBPL has unique names for certain programming concepts and characters:
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Data Structure Names</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 border rounded">
                      <p className="font-mono font-semibold">Data Container</p>
                      <p className="text-muted-foreground">Called a "Databer"</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-mono font-semibold">Data Element</p>
                      <p className="text-muted-foreground">Called a "Dataling"</p>
                    </div>
                    <div className="p-3 border rounded bg-secondary/20">
                      <p className="font-mono font-semibold">Named Variable</p>
                      <p className="text-muted-foreground">Called a "Datasub"</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Special Character Names</h3>
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
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Programming Concepts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 border rounded">
                      <p className="font-mono font-semibold">Commands</p>
                      <p className="text-muted-foreground">Called "Actions"</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-mono font-semibold">Errors</p>
                      <p className="text-muted-foreground">Called "Stupid errors"</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="error-handling" className="scroll-mt-20">
            <CardHeader>
              <CardTitle>Error Handling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                CBPL throws specific errors when it encounters issues in your code. Common errors include:
              </p>
              
              <div className="space-y-4">
                <div className="p-3 border border-destructive/30 rounded">
                  <p className="font-medium">Missing EXIT Command</p>
                  <p className="text-muted-foreground">Every program must end with <code className="font-mono bg-secondary/20 px-1 rounded">PLEASE EXIT :6.</code></p>
                </div>
                
                <div className="p-3 border border-destructive/30 rounded">
                  <p className="font-medium">AMNESIA ERROR</p>
                  <p className="text-muted-foreground">Missing Orb (.) or Semi-Orb (:) in a command</p>
                  <div className="mt-2 text-sm">
                    <ul className="list-disc pl-6">
                      <li><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE DO :1</code> - Missing Orb (.)</li>
                      <li><code className="font-mono bg-secondary/20 px-1 rounded">PLEASE DO 1.</code> - Missing Semi-Orb (:)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-3 border border-destructive/30 rounded">
                  <p className="font-medium">ORB OVERLOAD ERROR</p>
                  <p className="text-muted-foreground">Too many Orbs (.) in a command</p>
                  <div className="mt-2 text-sm">
                    <code className="font-mono bg-secondary/20 px-1 rounded">PLEASE DO :1..</code> - Has two Orbs
                  </div>
                </div>
                
                <div className="p-3 border border-destructive/30 rounded">
                  <p className="font-medium">SYNTAX ERROR</p>
                  <p className="text-muted-foreground">Unknown command despite correct syntax structure</p>
                  <div className="mt-2 text-sm">
                    <code className="font-mono bg-secondary/20 px-1 rounded">PLEASE CREATE :1.</code> - "CREATE" is not a valid action
                  </div>
                </div>
                
                <div className="p-3 border border-destructive/30 rounded">
                  <p className="font-medium">Invalid Index</p>
                  <p className="text-muted-foreground">Attempting to access a Dataling at an invalid index</p>
                </div>
                
                <div className="p-3 border border-destructive/30 rounded">
                  <p className="font-medium">Missing Value</p>
                  <p className="text-muted-foreground">Not providing a value after <code className="font-mono bg-secondary/20 px-1 rounded">PLEASE DO :1.</code> or <code className="font-mono bg-secondary/20 px-1 rounded">PLEASE LET :3.</code></p>
                </div>
                
                <div className="p-3 border border-destructive/30 rounded">
                  <p className="font-medium">Non-Numeric Value</p>
                  <p className="text-muted-foreground">Providing a non-numeric value for a Dataling</p>
                </div>
                
                <div className="p-3 border border-destructive/30 rounded">
                  <p className="font-medium">Unrecognized Action</p>
                  <p className="text-muted-foreground">Using an action that is not part of the CBPL language</p>
                </div>
              </div>
              
              <p className="mt-4">
                When an error occurs, the IDE will display a clear error message that 
                explains the issue and helps you debug your code. CBPL uses unique error names that reflect its quirky nature.
              </p>
            </CardContent>
          </Card>

          <Card id="example-programs" className="scroll-mt-20">
            <CardHeader>
              <CardTitle>Example Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Hello World</h3>
                  <p className
