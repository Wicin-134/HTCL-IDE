
// Interpreter for the INTERFUCK programming language

// Funkcja konwersji liczby na znak
export function convertToChar(value: number): string {
  switch (value) {
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
    default: return value.toString();
  }
}

// Reprezentacja Databer - główny kontener danych
export class Databer {
  private datalings: number[] = [];

  // Dodaje nowy Dataling z podaną wartością
  addDataling(value: number): number {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error("Stupid error: Dataling value must be numeric");
    }
    this.datalings.push(value);
    return this.datalings.length - 1; // Return the index of the newly added dataling
  }

  // Usuwa Dataling o określonym indeksie
  removeDataling(index: number): void {
    if (index >= 0 && index < this.datalings.length) {
      this.datalings.splice(index, 1);
    } else {
      throw new Error(`Stupid error: Cannot remove Dataling at index ${index}, out of range`);
    }
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
    if (this.datalings.length === 0) {
      return "";
    }
    
    // Updated to only return the characters (only for values 1-27)
    return this.datalings.map(value => {
      if (value >= 1 && value <= 27) {
        return convertToChar(value);
      }
      return value.toString();
    }).join("");
  }

  // Usuwa wszystkie Datalings
  clear(): void {
    this.datalings = [];
  }

  // Zwraca kopię wszystkich Datalings
  getAllDatalings(): number[] {
    return [...this.datalings];
  }
}

// Typu wejścia dla interpretera
export interface InterfuckInput {
  code: string;
  hideCommandOutput?: boolean; // Add option to hide command output
}

// Rezultat wykonania kodu
export interface InterfuckResult {
  output: string[];
  error?: string;
}

// Główna funkcja interpretująca kod INTERFUCK
export function interpretInterfuck(input: InterfuckInput): InterfuckResult {
  const { code, hideCommandOutput = false } = input;
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
      // PLEASE CALL :4. - Wyświetla wartości Databer
      else if (line.startsWith('PLEASE CALL :4.')) {
        const values = databer.getValues();
        // Only show the raw values without the "Databer values:" prefix
        output.push(`${values || 'empty'}`);
      }
      // PLEASE BREACH :5. - Usuwa wszystkie Datalings
      else if (line.startsWith('PLEASE BREACH :5.')) {
        databer.clear();
        if (!hideCommandOutput) {
          output.push("All Datalings removed from Databer");
        }
      }
      // PLEASE EXIT :6. - Wychodzi z interpretera
      else if (line.startsWith('PLEASE EXIT :6.')) {
        output.push("Exiting INTERFUCK IDE");
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

  return { output, error };
}
