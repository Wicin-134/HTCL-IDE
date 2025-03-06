
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Trash, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { interpretInterfuck, convertToChar } from "@/lib/interfuckInterpreter";

const EXAMPLE_CODE = `// Przykładowy program INTERFUCK
// Tworzy dwa Datalings, wyświetla je, aktualizuje wartość i wyświetla ponownie

PLEASE DO :1. 42

PLEASE DO :1. 7

PLEASE CALL :4.

PLEASE LET :3. 1 99

PLEASE CALL :4.

PLEASE BREACH :5.

PLEASE CALL :4.

PLEASE EXIT :6.`;

const InterfuckInterpreter: React.FC = () => {
  const [code, setCode] = useState<string>(EXAMPLE_CODE);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isRunning, setIsRunning] = useState<boolean>(false);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Edytor kodu */}
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

      {/* Wyjście */}
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

      {/* Referencja akcji */}
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
              <div className="text-sm">Exits the interpreter</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela konwersji cyfr na znaki */}
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
