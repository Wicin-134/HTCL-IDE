import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Trash, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { interpretInterfuck, convertToChar } from "@/lib/interfuckInterpreter";

const EXAMPLE_CODE = `// Hello World program in INTERFUCK
// Each command is followed by its value on the next line

PLEASE DO :1.  // Create Dataling for 'h' (value 9)
9

PLEASE DO :1.  // Create Dataling for 'e' (value 6)
6

PLEASE DO :1.  // Create Dataling for 'l' (value 13)
13

PLEASE DO :1.  // Create Dataling for 'l' (value 13)
13

PLEASE DO :1.  // Create Dataling for 'o' (value 16)
16

PLEASE CALL :4.  // Display all Datalings (will show: "h e l l o")

PLEASE EXIT :6.  // Exit the program`;

const InterfuckInterpreter: React.FC = () => {
  const location = useLocation();
  const [code, setCode] = useState<string>(EXAMPLE_CODE);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (location.state && location.state.code) {
      setCode(location.state.code);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    setError(undefined);

    try {
      const result = interpretInterfuck({ code });
      setOutput(result.output);
      if (result.error) {
        setError(result.error);
        toast.error(result.error);
      } else if (result.output.length > 0) {
        toast.success("Program executed successfully!");
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsRunning(false);
    }
  };

  const clearCode = () => {
    setCode("");
    setOutput([]);
    setError(undefined);
    toast.info("Code cleared");
  };

  const resetExample = () => {
    setCode(EXAMPLE_CODE);
    setOutput([]);
    setError(undefined);
    toast.info("Example code loaded");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const extractDatalings = (output: string[]): { index: number; value: number }[] => {
    const datalings: { index: number; value: number }[] = [];
    const creationPattern = /Created Dataling with value: (\d+) at index (\d+)/;
    const updatePattern = /Updated Dataling at index (\d+) with value: (\d+)/;
    const removalPattern = /Removed Dataling at index: (\d+)/;
    const clearPattern = /All Datalings removed from Databer/;
    
    for (const line of output) {
      const createMatch = line.match(creationPattern);
      if (createMatch) {
        datalings.push({ 
          index: parseInt(createMatch[2]), 
          value: parseInt(createMatch[1]) 
        });
        continue;
      }
      
      const updateMatch = line.match(updatePattern);
      if (updateMatch) {
        const index = parseInt(updateMatch[1]);
        const value = parseInt(updateMatch[2]);
        const existingIndex = datalings.findIndex(d => d.index === index);
        if (existingIndex !== -1) {
          datalings[existingIndex].value = value;
        }
        continue;
      }
      
      const removeMatch = line.match(removalPattern);
      if (removeMatch) {
        const index = parseInt(removeMatch[1]);
        const existingIndex = datalings.findIndex(d => d.index === index);
        if (existingIndex !== -1) {
          datalings.splice(existingIndex, 1);
        }
        continue;
      }
      
      if (line.match(clearPattern)) {
        datalings.length = 0;
        continue;
      }
    }
    
    return datalings;
  };

  const currentDatalings = extractDatalings(output);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <span>Code Editor</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyCode} title="Copy code">
                <Copy size={16} />
              </Button>
              <Button variant="outline" size="sm" onClick={clearCode} title="Clear code">
                <Trash size={16} />
              </Button>
              <Button variant="outline" size="sm" onClick={resetExample} title="Reset to example">
                <RotateCcw size={16} />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your INTERFUCK code here..."
            className="h-[350px] font-mono text-sm resize-none"
          />
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={runCode} 
            disabled={isRunning || !code.trim()}
          >
            <Play size={16} className="mr-2" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-secondary/30 p-4 rounded-md h-[350px] overflow-auto font-mono text-sm">
            {output.length > 0 ? (
              <div>
                {output.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-destructive">{error}</div>
            ) : (
              <div className="text-muted-foreground">
                Run your code to see the output here.
              </div>
            )}
          </div>
        </CardContent>
        {error && (
          <CardFooter className="pt-0">
            <div className="text-xs text-destructive bg-destructive/10 p-2 rounded-md w-full">
              Error: {error}
            </div>
          </CardFooter>
        )}
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Current Datalings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {currentDatalings.length > 0 ? (
              currentDatalings.map((dataling, i) => (
                <div key={i} className="border rounded-md p-3 bg-secondary/20 w-20 h-20 flex flex-col items-center justify-center">
                  <div className="text-xs text-muted-foreground mb-1">Index {dataling.index}</div>
                  <div className="font-mono text-xl font-bold">{dataling.value}</div>
                  <div className="text-xs mt-1">{convertToChar(dataling.value)}</div>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground">No datalings in memory</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>INTERFUCK Action Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3 border rounded-md bg-secondary/10">
              <div className="font-mono font-bold mb-1">PLEASE DO :1. [value]</div>
              <div className="text-sm">Creates a Dataling with the specified value</div>
            </div>
            <div className="p-3 border rounded-md bg-secondary/10">
              <div className="font-mono font-bold mb-1">PLEASE DONT :2. [index]</div>
              <div className="text-sm">Deletes the Dataling at the specified index</div>
            </div>
            <div className="p-3 border rounded-md bg-secondary/10">
              <div className="font-mono font-bold mb-1">PLEASE LET :3. [index] [value]</div>
              <div className="text-sm">Updates the value of the Dataling at the specified index</div>
            </div>
            <div className="p-3 border rounded-md bg-secondary/10">
              <div className="font-mono font-bold mb-1">PLEASE CALL :4.</div>
              <div className="text-sm">Prints all values stored in the Databer</div>
            </div>
            <div className="p-3 border rounded-md bg-secondary/10">
              <div className="font-mono font-bold mb-1">PLEASE BREACH :5.</div>
              <div className="text-sm">Deletes all Datalings from the Databer</div>
            </div>
            <div className="p-3 border rounded-md bg-secondary/10">
              <div className="font-mono font-bold mb-1">PLEASE EXIT :6.</div>
              <div className="text-sm">Exits the interpreter (required at the end of every program)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Character Conversion Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {Array.from({ length: 27 }, (_, i) => i + 1).map(num => (
              <div key={num} className="p-2 border rounded-md text-center">
                <div className="font-mono font-bold">{num}</div>
                <div className="text-sm">'{convertToChar(num)}'</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterfuckInterpreter;
