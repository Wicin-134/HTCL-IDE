// Interpreter for the Callback Programming Language (CBPL)

// Function to convert number to character
export function convertToChar(value: number): string {
  switch (value) {
    // Lowercase letters
    case 1: return ' ';
    case 2: return 'a';
    case 3: return 'b';
    case 4: return 'c';
    case 5: return 'd';
    case 6: return 'e';
    case 7: return 'f';
    case 8: return 'g';
    case 9: return 'h';
    case 10: return 'i';
    case 11: return 'j';
    case 12: return 'k';
    case 13: return 'l';
    case 14: return 'm';
    case 15: return 'n';
    case 16: return 'o';
    case 17: return 'p';
    case 18: return 'q';
    case 19: return 'r';
    case 20: return 's';
    case 21: return 't';
    case 22: return 'u';
    case 23: return 'v';
    case 24: return 'w';
    case 25: return 'x';
    case 26: return 'y';
    case 27: return 'z';
    
    // Uppercase letters
    case 28: return 'A';
    case 29: return 'B';
    case 30: return 'C';
    case 31: return 'D';
    case 32: return 'E';
    case 33: return 'F';
    case 34: return 'G';
    case 35: return 'H';
    case 36: return 'I';
    case 37: return 'J';
    case 38: return 'K';
    case 39: return 'L';
    case 40: return 'M';
    case 41: return 'N';
    case 42: return 'O';
    case 43: return 'P';
    case 44: return 'Q';
    case 45: return 'R';
    case 46: return 'S';
    case 47: return 'T';
    case 48: return 'U';
    case 49: return 'V';
    case 50: return 'W';
    case 51: return 'X';
    case 52: return 'Y';
    case 53: return 'Z';
    
    // Numbers
    case 54: return '0';
    case 55: return '1';
    case 56: return '2';
    case 57: return '3';
    case 58: return '4';
    case 59: return '5';
    case 60: return '6';
    case 61: return '7';
    case 62: return '8';
    case 63: return '9';
    case 64: return '10';
    
    // Special characters
    case 65: return '.';
    case 66: return ',';
    case 67: return '?';
    case 68: return '!';
    case 69: return '(';
    case 70: return ')';
    case 71: return '"';
    case 72: return '-';
    case 73: return '+';
    case 74: return '*';
    
    default: return value.toString();
  }
}

// Reprezentacja Databer - główny kontener danych
export class Databer {
  private datalings: number[] = [];
  private datasubs: Map<string, string> = new Map(); // New storage for datasubs
  private dataOrder: Array<{type: 'dataling' | 'datasub', name?: string, index?: number}> = []; // Track order of data elements

  // Dodaje nowy Dataling z podaną wartością
  addDataling(value: number): number {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error("Stupid error: Dataling value must be numeric");
    }
    const index = this.datalings.push(value) - 1;
    this.dataOrder.push({type: 'dataling', index});
    return index; // Return the index of the newly added dataling
  }

  // Dodaje nowy Datasub z podaną nazwą
  addDatasub(name: string, value: string = ""): void {
    if (!name || typeof name !== 'string') {
      throw new Error("Stupid error: Datasub name must be a non-empty string");
    }
    this.datasubs.set(name, value);
    this.dataOrder.push({type: 'datasub', name});
  }

  // Pobiera wartość Datasub o określonej nazwie
  getDatasub(name: string): string | undefined {
    return this.datasubs.get(name);
  }

  // Pobiera Dataling o określonym indeksie
  getDataling(index: number): number | undefined {
    if (index >= 0 && index < this.datalings.length) {
      return this.datalings[index];
    }
    return undefined;
  }

  // Ustawia wartość Datasub o określonej nazwie
  setDatasub(name: string, value: string): void {
    if (!this.datasubs.has(name)) {
      throw new Error(`Stupid error: Datasub '${name}' does not exist`);
    }
    this.datasubs.set(name, value);
  }

  // Sprawdza czy Datasub o określonej nazwie istnieje
  hasDatasub(name: string): boolean {
    return this.datasubs.has(name);
  }

  // Pobiera wszystkie Datasubs jako mapa
  getAllDatasubs(): Map<string, string> {
    return new Map(this.datasubs);
  }

  // Usuwa Dataling o określonym indeksie
  removeDataling(index: number): void {
    if (index >= 0 && index < this.datalings.length) {
      this.datalings.splice(index, 1);
      // Update data order
      this.dataOrder = this.dataOrder.filter(item => 
        !(item.type === 'dataling' && item.index === index)
      );
      // Update indexes for datalings that come after the removed one
      this.dataOrder = this.dataOrder.map(item => {
        if (item.type === 'dataling' && item.index !== undefined && item.index > index) {
          return { ...item, index: item.index - 1 };
        }
        return item;
      });
    } else {
      throw new Error(`Stupid error: Cannot remove Dataling at index ${index}, out of range`);
    }
  }

  // Usuwa Datasub o określonej nazwie
  removeDatasub(name: string): void {
    if (!this.datasubs.has(name)) {
      throw new Error(`Stupid error: Datasub '${name}' does not exist`);
    }
    this.datasubs.delete(name);
    // Update data order
    this.dataOrder = this.dataOrder.filter(item => 
      !(item.type === 'datasub' && item.name === name)
    );
  }

  // Aktualizuje wartość Dataling o określonym indeksie
  updateDataling(index: number, value: number): void {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error("Stupid error: Dataling value must be numeric");
    }
    
    if (index >= 0 && index < this.datalings.length) {
      this.datalings[index] = value;
    } else {
      throw new Error(`Stupid error: Cannot update Dataling at index ${index}, out of range`);
    }
  }

  // Zwraca wszystkie wartości Datalings jako string
  getValues(): string {
    if (this.datalings.length === 0 && this.datasubs.size === 0) {
      return "";
    }
    
    let output = "";
    
    // Process data in the order they were added
    for (const item of this.dataOrder) {
      if (item.type === 'dataling' && item.index !== undefined) {
        const value = this.datalings[item.index];
        if (value >= 1 && value <= 74) {
          output += convertToChar(value);
        } else {
          output += value.toString();
        }
      } else if (item.type === 'datasub' && item.name) {
        const value = this.datasubs.get(item.name);
        if (value !== undefined) {
          output += value;
        }
      }
    }
    
    return output;
  }

  // Zwraca pojedynczy Dataling jako string
  getDatalingAsString(index: number): string {
    const value = this.getDataling(index);
    if (value === undefined) {
      throw new Error(`Stupid error: Dataling at index ${index} does not exist`);
    }
    
    if (value >= 1 && value <= 74) {
      return `${value} (${convertToChar(value)})`;
    }
    return value.toString();
  }

  // Usuwa wszystkie Datalings
  clear(): void {
    this.datalings = [];
    this.datasubs.clear();
    this.dataOrder = [];
  }

  // Usuwa wszystkie Datasubs
  clearDatasubs(): void {
    this.datasubs.clear();
    this.dataOrder = this.dataOrder.filter(item => item.type !== 'datasub');
  }

  // Usuwa wszystkie dane (Datalings i Datasubs)
  clearAll(): void {
    this.datalings = [];
    this.datasubs.clear();
    this.dataOrder = [];
  }

  // Zwraca kopię wszystkich Datalings
  getAllDatalings(): number[] {
    return [...this.datalings];
  }

  // Evaluates a mathematical expression using datasub values
  evaluateExpression(expression: string, datasubs: string[]): string {
    try {
      // Replace datasub names with their values
      let processedExpression = expression;
      
      for (const subName of datasubs) {
        const value = this.getDatasub(subName);
        if (value === undefined) {
          throw new Error(`Datasub '${subName}' does not exist`);
        }
        
        // Only replace if the datasub name is a whole word
        const regex = new RegExp(`\\b${subName}\\b`, 'g');
        processedExpression = processedExpression.replace(regex, value);
      }
      
      // Check for division by zero before evaluation
      const divisionByZeroRegex = /\/\s*0(?![.\d])/;
      if (divisionByZeroRegex.test(processedExpression)) {
        throw new Error("Division by zero");
      }
      
      // Evaluate the expression
      // eslint-disable-next-line no-eval
      const result = eval(processedExpression);
      
      if (typeof result !== 'number' || isNaN(result)) {
        throw new Error(`Result is not a valid number: ${result}`);
      }
      
      return result.toString();
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "Division by zero") {
          return "Error: Division by zero";
        }
        throw new Error(`Math error: ${e.message}`);
      }
      throw new Error("Math error: Could not evaluate expression");
    }
  }
}

// Typu wejścia dla interpretera
export interface InterfuckInput {
  code: string;
  hideCommandOutput?: boolean; // Add option to hide command output
  onUserInput?: (subName: string) => Promise<string>; // Add callback for user input
}

// Rezultat wykonania kodu
export interface InterfuckResult {
  output: string[];
  error?: string;
  datasubs?: Map<string, string>; // Return datasubs for display
}

// Helper function to validate command syntax
function validateCommandSyntax(line: string): string | null {
  // Check for missing period (.)
  if ((line.startsWith('PLEASE') && !line.includes('.')) && 
      !(line.startsWith('PLEASE LISTEN :8.'))) { // Special case for LISTEN command
    return "AMNESIA ERROR - Missing Orb (.) in command.";
  }
  
  // Check for missing colon (:)
  if (line.startsWith('PLEASE') && line.includes('.') && !line.includes(':')) {
    return "AMNESIA ERROR - Missing Semi-Orb (:) in command.";
  }
  
  // Check for too many periods
  const periodCount = (line.match(/\./g) || []).length;
  if (periodCount > 1) {
    return "ORB OVERLOAD ERROR - Too many Orbs (.) in command.";
  }
  
  // Check for valid command structure but unknown command
  if (line.startsWith('PLEASE') && line.includes(':') && line.includes('.')) {
    const commandMatch = line.match(/PLEASE\s+([A-Z]+)\s+:/);
    if (commandMatch) {
      const command = commandMatch[1];
      if (!['DO', 'DONT', 'LET', 'CALL', 'BREACH', 'EXIT', 'ADD', 'LISTEN', 'SUB GO', 'CALC'].includes(command)) {
        return "SYNTAX ERROR - Unknown command despite correct syntax.";
      }
    }
  }
  
  return null;
}

// Główna funkcja interpretująca kod Callback Programming Language
export async function interpretInterfuck(input: InterfuckInput): Promise<InterfuckResult> {
  const { code, hideCommandOutput = false, onUserInput } = input;
  const databer = new Databer();
  const output: string[] = [];
  let error: string | undefined;

  try {
    // Check if the code contains EXIT command
    if (!code.includes('PLEASE EXIT :6.')) {
      throw new Error("Stupid error: Missing PLEASE EXIT :6. command at the end of the program");
    }

    // Dzielimy kod na linie
    const lines = code.split('\n').map(line => line.trim());

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Obsługa komentarzy - usuwamy wszystko po // z linii kodu
      if (line.includes('//')) {
        line = line.split('//')[0].trim();
        if (!line) continue; // Jeśli linia zawierała tylko komentarz, przechodzimy dalej
      }
      
      // Pomiń puste linie po usunięciu komentarzy
      if (!line) continue;
      
      // Validate command syntax
      const syntaxError = validateCommandSyntax(line);
      if (syntaxError) {
        throw new Error(syntaxError);
      }
      
      // PLEASE DO :1. - Tworzy Dataling
      if (line.startsWith('PLEASE DO :1.')) {
        // Szukamy wartości w następnej linii
        if (i + 1 < lines.length) {
          let nextLine = lines[i + 1].trim();
          
          // Usuwamy komentarze z linii wartości
          if (nextLine.includes('//')) {
            nextLine = nextLine.split('//')[0].trim();
          }
          
          if (nextLine && /^-?\d+$/.test(nextLine)) {
            const value = Number(nextLine);
            if (!isNaN(value)) {
              const index = databer.addDataling(value);
              if (!hideCommandOutput) {
                output.push(`Created Dataling with value: ${value} at index ${index}`);
              }
              i++; // Przesuwamy wskaźnik, aby pominąć linię wartości
            } else {
              throw new Error(`Stupid error: Value "${nextLine}" is not numeric`);
            }
          } else {
            throw new Error(`Stupid error: Expected numeric value in the next line after PLEASE DO :1.`);
          }
        } else {
          throw new Error("Stupid error: Missing value after PLEASE DO :1.");
        }
      }
      // PLEASE ADD :9. - Creates a Datasub
      else if (line.startsWith('PLEASE ADD :9.')) {
        const subNameMatch = line.match(/PLEASE ADD :9\.\s*(\w+)/);
        if (subNameMatch && subNameMatch[1]) {
          const subName = subNameMatch[1];
          databer.addDatasub(subName);
          if (!hideCommandOutput) {
            output.push(`Created Datasub with name: ${subName}`);
          }
        } else {
          throw new Error("Stupid error: PLEASE ADD :9. requires a name");
        }
      }
      // PLEASE LISTEN :8. - Gets user input for a Datasub
      else if (line.startsWith('PLEASE LISTEN :8.')) {
        const subNameMatch = line.match(/PLEASE LISTEN :8\.\s*(\w+)/);
        if (subNameMatch && subNameMatch[1]) {
          const subName = subNameMatch[1];
          
          if (!databer.hasDatasub(subName)) {
            throw new Error(`Stupid error: Datasub '${subName}' does not exist`);
          }
          
          if (onUserInput) {
            try {
              const userInput = await onUserInput(subName);
              databer.setDatasub(subName, userInput);
              if (!hideCommandOutput) {
                output.push(`Received input for Datasub '${subName}': ${userInput}`);
              }
            } catch (e) {
              throw new Error(`Stupid error: Failed to get user input for Datasub '${subName}'`);
            }
          } else {
            throw new Error("Stupid error: User input handler not provided");
          }
        } else {
          throw new Error("Stupid error: PLEASE LISTEN :8. requires a Datasub name");
        }
      }
      // PLEASE SUB GO :7. - Removes a Datasub
      else if (line.startsWith('PLEASE SUB GO :7.')) {
        const subNameMatch = line.match(/PLEASE SUB GO :7\.\s*(\w+)/);
        if (subNameMatch && subNameMatch[1]) {
          const subName = subNameMatch[1];
          try {
            databer.removeDatasub(subName);
            if (!hideCommandOutput) {
              output.push(`Removed Datasub with name: ${subName}`);
            }
          } catch (e) {
            if (e instanceof Error) {
              throw e;
            }
            throw new Error(`Stupid error: Failed to remove Datasub '${subName}'`);
          }
        } else {
          throw new Error("Stupid error: PLEASE SUB GO :7. requires a Datasub name");
        }
      }
      // PLEASE DONT :2. - Usuwa Dataling
      else if (line.startsWith('PLEASE DONT :2.')) {
        const indexMatch = line.match(/:2\.\s*(\d+)/);
        if (indexMatch && indexMatch[1]) {
          const index = Number(indexMatch[1]);
          databer.removeDataling(index);
          if (!hideCommandOutput) {
            output.push(`Removed Dataling at index: ${index}`);
          }
        } else {
          throw new Error("Stupid error: PLEASE DONT :2. requires an index");
        }
      }
      // PLEASE LET :3. - Edytuje wartość Dataling
      else if (line.startsWith('PLEASE LET :3.')) {
        const match = line.match(/PLEASE LET :3\.\s*(\d+)/);
        if (match && match[1]) {
          const index = Number(match[1]);
          
          // Szukamy wartości w następnej linii
          if (i + 1 < lines.length) {
            let nextLine = lines[i + 1].trim();
            
            // Usuwamy komentarze z linii wartości
            if (nextLine.includes('//')) {
              nextLine = nextLine.split('//')[0].trim();
            }
            
            if (nextLine && /^-?\d+$/.test(nextLine)) {
              const value = Number(nextLine);
              if (!isNaN(value)) {
                databer.updateDataling(index, value);
                if (!hideCommandOutput) {
                  output.push(`Updated Dataling at index ${index} with value: ${value}`);
                }
                i++; // Przesuwamy wskaźnik, aby pominąć linię wartości
              } else {
                throw new Error(`Stupid error: Value "${nextLine}" is not numeric`);
              }
            } else {
              throw new Error(`Stupid error: Expected numeric value in the next line after PLEASE LET :3.`);
            }
          } else {
            throw new Error("Stupid error: Missing value after PLEASE LET :3.");
          }
        } else {
          throw new Error("Stupid error: PLEASE LET :3. requires an index");
        }
      }
      // MODIFIED: Enhanced CALL command with three variants
      // PLEASE CALL :4. - Displays all Databer values (original behavior)
      // PLEASE CALL :4.: [index] - Displays a specific Dataling
      // PLEASE CALL :4.; [name] - Displays a specific Datasub
      else if (line.startsWith('PLEASE CALL :4.')) {
        // Check for specific Dataling display (with colon)
        if (line.includes(':4.:')) {
          const indexMatch = line.match(/:4\.:[ ]*(\d+)/);
          if (indexMatch && indexMatch[1]) {
            const index = Number(indexMatch[1]);
            try {
              const datalingValue = databer.getDataling(index);
              if (datalingValue !== undefined) {
                // Only show the raw value without extra text
                if (datalingValue >= 1 && datalingValue <= 74) {
                  output.push(`${convertToChar(datalingValue)}`);
                } else {
                  output.push(`${datalingValue}`);
                }
              } else {
                throw new Error(`Stupid error: Dataling at index ${index} does not exist`);
              }
            } catch (e) {
              if (e instanceof Error) {
                throw e;
              }
              throw new Error(`Stupid error: Failed to get Dataling at index ${index}`);
            }
          } else {
            throw new Error("Stupid error: PLEASE CALL :4.: requires a valid index");
          }
        } 
        // Check for specific Datasub display (with semicolon)
        else if (line.includes(':4.;')) {
          const subNameMatch = line.match(/:4\.\;[ ]*(\w+)/);
          if (subNameMatch && subNameMatch[1]) {
            const subName = subNameMatch[1];
            if (databer.hasDatasub(subName)) {
              const value = databer.getDatasub(subName) || "";
              // Only show the raw value without extra text
              output.push(`${value}`);
            } else {
              throw new Error(`Stupid error: Datasub '${subName}' does not exist`);
            }
          } else {
            throw new Error("Stupid error: PLEASE CALL :4.; requires a valid Datasub name");
          }
        }
        // Original behavior - display all Databer values 
        else {
          const values = databer.getValues();
          // Only show the raw values without the "Databer values:" prefix
          output.push(`${values || 'empty'}`);
        }
      }
      // PLEASE CALC :10. - Evaluates a mathematical expression (renamed from :14.)
      else if (line.startsWith('PLEASE CALC :10.')) {
        const subNameMatch = line.match(/PLEASE CALC :10\.\s*(\w+)/);
        if (subNameMatch && subNameMatch[1]) {
          const resultSubName = subNameMatch[1];
          
          if (!databer.hasDatasub(resultSubName)) {
            throw new Error(`Stupid error: Result Datasub '${resultSubName}' does not exist`);
          }
          
          // Get expression from next line
          if (i + 1 < lines.length) {
            let expressionLine = lines[i + 1].trim();
            
            // Remove comments
            if (expressionLine.includes('//')) {
              expressionLine = expressionLine.split('//')[0].trim();
            }
            
            if (!expressionLine) {
              throw new Error("Stupid error: Missing expression after PLEASE CALC :10.");
            }
            
            // Check if the expression is a direct calculation or references datasubs
            const hasVariable = /\b[a-zA-Z]\w*\b/.test(expressionLine);
            
            if (hasVariable) {
              // This is Way 2: Expression contains variable names
              // We need to parse the expression and find all datasub references
              const variableMatches = expressionLine.match(/\b[a-zA-Z]\w*\b/g) || [];
              const datasubs = variableMatches.filter(v => databer.hasDatasub(v));
              
              if (datasubs.length === 0) {
                throw new Error("Stupid error: No valid datasubs found in expression");
              }
              
              try {
                // Evaluate the expression using datasub values
                const result = databer.evaluateExpression(expressionLine, datasubs);
                
                // Store the result in the specified datasub
                databer.setDatasub(resultSubName, result);
                
                if (!hideCommandOutput) {
                  output.push(`Calculated expression: ${expressionLine} = ${result}`);
                  output.push(`Result stored in Datasub '${resultSubName}'`);
                }
              } catch (e) {
                if (e instanceof Error) {
                  throw e;
                }
                throw new Error("Stupid error: Failed to evaluate expression");
              }
            } else {
              // This is Way 1: Direct calculation
              try {
                // Evaluate the direct expression
                // eslint-disable-next-line no-eval
                const result = eval(expressionLine);
                
                if (typeof result !== 'number' || isNaN(result)) {
                  throw new Error(`Result is not a valid number: ${result}`);
                }
                
                // Store the result in the specified datasub
                databer.setDatasub(resultSubName, result.toString());
                
                if (!hideCommandOutput) {
                  output.push(`Calculated expression: ${expressionLine} = ${result}`);
                  output.push(`Result stored in Datasub '${resultSubName}'`);
                }
              } catch (e) {
                if (e instanceof Error) {
                  throw e;
                }
                throw new Error("Stupid error: Failed to evaluate expression");
              }
            }
            
            // Skip the expression line
            i++;
          } else {
            throw new Error("Stupid error: Missing expression after PLEASE CALC :10.");
          }
        } else {
          throw new Error("Stupid error: PLEASE CALC :10. requires a result Datasub name");
        }
      }
      // PLEASE BREACH :5. - Usuwa wszystkie Datalings i Datasubs
      else if (line.startsWith('PLEASE BREACH :5.')) {
        databer.clear(); // Now clears both datalings and datasubs
        if (!hideCommandOutput) {
          output.push("All Datalings and Datasubs removed from Databer");
        }
      }
      // PLEASE EXIT :6. - Wychodzi z interpretera
      else if (line.startsWith('PLEASE EXIT :6.')) {
        output.push("Exiting CBPL IDE");
        break;
      }
      // Nieznana komenda
      else if (line && !line.startsWith('#')) { // Ignorujemy również linie rozpoczynające się od #
        throw new Error(`Unrecognized action: ${line}`);
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = 'Unknown error occurred';
    }
  }

  return { 
    output, 
    error,
    datasubs: databer.getAllDatasubs()
  };
}

