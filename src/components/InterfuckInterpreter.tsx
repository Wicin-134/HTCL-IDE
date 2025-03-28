import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Trash, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { interpretInterfuck, convertToChar, Databer } from "@/lib/interfuckInterpreter";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const InterfuckInterpreter: React.FC = () => {
  const location = useLocation();
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [datalings, setDatalings] = useState<{
    index: number;
    value: number;
  }[]>([]);
  const [datasubs, setDatasubs] = useState<Map<string, string>>(new Map());
  const [inputDialogOpen, setInputDialogOpen] = useState(false);
  const [currentSubName, setCurrentSubName] = useState("");
  const [userInput, setUserInput] = useState("");
  const inputResolveFnRef = useRef<((value: string) => void) | null>(null);

  useEffect(() => {
    if (location.state && location.state.code) {
      setCode(location.state.code);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const getUserInput = async (subName: string): Promise<string> => {
    return new Promise(resolve => {
      setCurrentSubName(subName);
      setUserInput("");
      setInputDialogOpen(true);
      inputResolveFnRef.current = resolve;
    });
  };

  const handleInputSubmit = () => {
    if (inputResolveFnRef.current) {
      inputResolveFnRef.current(userInput);
      inputResolveFnRef.current = null;
    }
    setInputDialogOpen(false);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);
    setError(undefined);
    setDatalings([]);
    setDatasubs(new Map());

    try {
      const databer = new Databer();
      let currentDatalings: {
        index: number;
        value: number;
      }[] = [];

      const lines = code.split('\n').map(line => line.trim());
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.includes('//')) {
          line = line.split('//')[0].trim();
          if (!line) continue;
        }
        if (!line) continue;
        if (line.startsWith('PLEASE DO :1.')) {
          if (i + 1 < lines.length) {
            let nextLine = lines[i + 1].trim();
            if (nextLine.includes('//')) {
              nextLine = nextLine.split('//')[0].trim();
            }
            if (nextLine && /^-?\d+$/.test(nextLine)) {
              const value = Number(nextLine);
              if (!isNaN(value)) {
                const index = databer.addDataling(value);
                currentDatalings.push({
                  index,
                  value
                });
                i++;
              }
            }
          }
        } else if (line.startsWith('PLEASE ADD :9.')) {
          const subNameMatch = line.match(/PLEASE ADD :9\.\s*(\w+)/);
          if (subNameMatch && subNameMatch[1]) {
            const subName = subNameMatch[1];
            databer.addDatasub(subName);
          }
        } else if (line.startsWith('PLEASE DONT :2.')) {
          const indexMatch = line.match(/:2\.\s*(\d+)/);
          if (indexMatch && indexMatch[1]) {
            const indexToRemove = Number(indexMatch[1]);
            currentDatalings = currentDatalings.filter(d => d.index !== indexToRemove);
            try {
              databer.removeDataling(indexToRemove);
            } catch (e) {}
          }
        } else if (line.startsWith('PLEASE LET :3.')) {
          const match = line.match(/PLEASE LET :3\.\s*(\d+)/);
          if (match && match[1]) {
            const index = Number(match[1]);
            if (i + 1 < lines.length) {
              let nextLine = lines[i + 1].trim();
              if (nextLine.includes('//')) {
                nextLine = nextLine.split('//')[0].trim();
              }
              if (nextLine && /^-?\d+$/.test(nextLine)) {
                const value = Number(nextLine);
                if (!isNaN(value)) {
                  const existingIndex = currentDatalings.findIndex(d => d.index === index);
                  if (existingIndex !== -1) {
                    currentDatalings[existingIndex].value = value;
                  }
                  try {
                    databer.updateDataling(index, value);
                  } catch (e) {}
                  i++;
                }
              }
            }
          }
        } else if (line.startsWith('PLEASE BREACH :5.')) {
          currentDatalings = [];
          databer.clear();
        } else if (line.startsWith('PLEASE SUB GO :7.')) {
          const subNameMatch = line.match(/PLEASE SUB GO :7\.\s*(\w+)/);
          if (subNameMatch && subNameMatch[1]) {
            const subName = subNameMatch[1];
            databer.removeDatasub(subName);
          }
        }
      }

      const result = await interpretInterfuck({
        code,
        hideCommandOutput: true,
        onUserInput: getUserInput
      });

      setOutput(result.output);
      setDatalings(currentDatalings);
      if (result.datasubs) {
        setDatasubs(result.datasubs);
      }

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
    setDatalings([]);
    setDatasubs(new Map());
    toast.info("Code cleared");
  };

  const resetExample = () => {
    setCode("");
    setOutput([]);
    setError(undefined);
    setDatalings([]);
    setDatasubs(new Map());
    toast.info("Editor reset");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  return <>
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
                <Button variant="outline" size="sm" onClick={resetExample} title="Reset editor">
                  <RotateCcw size={16} />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <Textarea value={code} onChange={e => setCode(e.target.value)} placeholder="Enter your CBPL code here..." className="h-[350px] font-mono text-sm resize-none" />
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={runCode} disabled={isRunning || !code.trim()}>
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
              {output.length > 0 ? <div>
                  {output.map((line, index) => <div key={index} className="mb-1">
                      {line}
                    </div>)}
                </div> : error ? <div className="text-destructive">{error}</div> : <div className="text-muted-foreground">
                  Run your code to see the output here.
                </div>}
            </div>
          </CardContent>
          {error && <CardFooter className="pt-0">
              <div className="text-xs text-destructive bg-destructive/10 p-2 rounded-md w-full">
                Error: {error}
              </div>
            </CardFooter>}
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Current  Databer Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Datalings</h3>
                <div className="flex flex-wrap gap-4">
                  {datalings.length > 0 ? datalings.map((dataling, i) => <div key={i} className="border rounded-md p-3 bg-secondary/20 w-20 h-20 flex flex-col items-center justify-center">
                        <div className="text-xs text-muted-foreground mb-1">Index {dataling.index}</div>
                        <div className="font-mono text-xl font-bold">{dataling.value}</div>
                        <div className="text-xs mt-1">{convertToChar(dataling.value)}</div>
                      </div>) : <div className="text-muted-foreground">No datalings in memory</div>}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold mb-3">Datasubs</h3>
                <div className="flex flex-col gap-3">
                  {datasubs.size > 0 ? Array.from(datasubs.entries()).map(([name, value], i) => <div key={i} className="border rounded-md p-3 bg-secondary/20">
                        <div className="text-xs text-muted-foreground mb-1">Name</div>
                        <div className="font-mono font-medium">{name}</div>
                        <div className="text-xs text-muted-foreground mb-1 mt-2">Value</div>
                        <div className="font-mono">{value || "(empty)"}</div>
                      </div>) : <div className="text-muted-foreground">No datasubs in memory</div>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>CBPL Action Reference</CardTitle>
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
                <div className="text-sm">Prints all values stored in the Databer.    </div>
              </div>
              <div className="p-3 border rounded-md bg-secondary/10">
                <div className="font-mono font-bold mb-1">PLEASE CALL :4.: [index]</div>
                <div className="text-sm">Prints the value of the Dataling at the specified index</div>
              </div>
              <div className="p-3 border rounded-md bg-secondary/10">
                <div className="font-mono font-bold mb-1">PLEASE CALL :4.; [name]</div>
                <div className="text-sm">Prints the value of the Datasub with the specified name</div>
              </div>
              <div className="p-3 border rounded-md bg-secondary/10">
                <div className="font-mono font-bold mb-1">PLEASE BREACH :5.</div>
                <div className="text-sm">Deletes all Datalings and Datasubs from the Databer</div>
              </div>
              <div className="p-3 border rounded-md bg-secondary/10">
                <div className="font-mono font-bold mb-1">PLEASE EXIT :6.</div>
                <div className="text-sm">Exits the IDE (required at the end of every program)</div>
              </div>
              <div className="p-3 border rounded-md bg-secondary/10 bg-blue-500/10">
                <div className="font-mono font-bold mb-1">PLEASE SUB GO :7. [name]</div>
                <div className="text-sm">Deletes the Datasub with the specified name</div>
              </div>
              <div className="p-3 border rounded-md bg-secondary/10 bg-blue-500/10">
                <div className="font-mono font-bold mb-1">PLEASE LISTEN :8. [name]</div>
                <div className="text-sm">Waits for user input and stores it in the named Datasub</div>
              </div>
              <div className="p-3 border rounded-md bg-secondary/10 bg-blue-500/10">
                <div className="font-mono font-bold mb-1">PLEASE ADD :9. [name]</div>
                <div className="text-sm">Creates a Datasub with the specified name</div>
              </div>
              <div className="p-3 border rounded-md bg-secondary/10 bg-blue-500/10">
                <div className="font-mono font-bold mb-1">PLEASE CALC :10. [datasub]</div>
                <div className="text-sm">Calculates and stores result in [datasub]</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Way 1: Direct calculation<br />
                  <span className="font-mono">PLEASE CALC :10. Sum<br />50 + 50</span><br />
                  Way 2: Using datasubs<br />
                  <span className="font-mono">PLEASE CALC :10. Sum<br />Num1 + Num2</span><br />
                  Supports +, -, *, / (division by zero returns error)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Character Conversion Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Lowercase Letters (1-27)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {Array.from({
                length: 27
              }, (_, i) => i + 1).map(num => <div key={num} className="p-2 border rounded-md text-center">
                    <div className="font-mono font-bold">{num}</div>
                    <div className="text-sm">'{convertToChar(num)}'</div>
                  </div>)}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Uppercase Letters (28-53)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {Array.from({
                length: 26
              }, (_, i) => i + 28).map(num => <div key={num} className="p-2 border rounded-md text-center">
                    <div className="font-mono font-bold">{num}</div>
                    <div className="text-sm">'{convertToChar(num)}'</div>
                  </div>)}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Numbers (54-64)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {Array.from({
                length: 11
              }, (_, i) => i + 54).map(num => <div key={num} className="p-2 border rounded-md text-center">
                    <div className="font-mono font-bold">{num}</div>
                    <div className="text-sm">'{convertToChar(num)}'</div>
                  </div>)}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-2">Special Characters (65-74)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {Array.from({
                length: 10
              }, (_, i) => i + 65).map(num => <div key={num} className="p-2 border rounded-md text-center">
                    <div className="font-mono font-bold">{num}</div>
                    <div className="text-sm">'{convertToChar(num)}'</div>
                  </div>)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Error Types Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 border rounded-md bg-destructive/10">
                <div className="font-mono font-bold mb-1">AMNESIA ERROR</div>
                <div className="text-sm">Missing Orb (.) or Semi-Orb (:) in a command</div>
              </div>
              <div className="p-3 border rounded-md bg-destructive/10">
                <div className="font-mono font-bold mb-1">ORB OVERLOAD ERROR</div>
                <div className="text-sm">Too many Orbs (.) in a command</div>
              </div>
              <div className="p-3 border rounded-md bg-destructive/10">
                <div className="font-mono font-bold mb-1">SYNTAX ERROR</div>
                <div className="text-sm">Unknown command despite correct syntax structure</div>
              </div>
              <div className="p-3 border rounded-md bg-destructive/10">
                <div className="font-mono font-bold mb-1">STUPID ERROR</div>
                <div className="text-sm">Various errors like missing EXIT command, invalid index, etc.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={inputDialogOpen} onOpenChange={setInputDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Input Required</DialogTitle>
            <DialogDescription>
              Please enter a value for Datasub: <span className="font-mono font-bold">{currentSubName}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input id="user-input" value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Enter your input here..." autoFocus onKeyDown={e => {
            if (e.key === 'Enter') {
              handleInputSubmit();
            }
          }} />
          </div>
          <DialogFooter>
            <Button onClick={handleInputSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>;
};

export default InterfuckInterpreter;
