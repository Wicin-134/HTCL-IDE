
// Interpreter for the INTERFUCK programming language

// Reprezentacja Databer - główny kontener danych
export class Databer {
  private datalings: number[] = [];

  // Dodaje nowy Dataling z podaną wartością
  addDataling(value: number): void {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error("Stupid error: Dataling value must be numeric");
    }
    this.datalings.push(value);
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
    return this.datalings.join(", ");
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
}

// Rezultat wykonania kodu
export interface InterfuckResult {
  output: string[];
  error?: string;
}

// Główna funkcja interpretująca kod INTERFUCK
export function interpretInterfuck(input: InterfuckInput): InterfuckResult {
  const { code } = input;
  const databer = new Databer();
  const output: string[] = [];
  let error: string | undefined;

  try {
    // Dzielimy kod na linie
    const lines = code.split('\n').map(line => line.trim()).filter(line => line);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // PLEASE DO :1. - Tworzy Dataling
      if (line.startsWith('PLEASE DO :1.')) {
        output.push("Enter value for new Dataling: ...");
        // Szukamy wartości po ". . ." w kolejnej linii
        if (i + 1 < lines.length && lines[i + 1].includes('. . .')) {
          const valuePart = lines[i + 1].split('. . .')[1]?.trim();
          if (valuePart) {
            const value = Number(valuePart);
            if (!isNaN(value)) {
              databer.addDataling(value);
              output.push(`Created Dataling with value: ${value}`);
            } else {
              throw new Error(`Stupid error: Value "${valuePart}" is not numeric`);
            }
          }
          i++; // Przesuwamy się do następnej linii, ponieważ już ją przetworzyliśmy
        } else {
          throw new Error("Stupid error: Expected value input after PLEASE DO :1.");
        }
      }
      // PLEASE DONT :2. - Usuwa Dataling
      else if (line.startsWith('PLEASE DONT :2.')) {
        const indexMatch = line.match(/:2\.\s*(\d+)/);
        if (indexMatch && indexMatch[1]) {
          const index = Number(indexMatch[1]);
          databer.removeDataling(index);
          output.push(`Removed Dataling at index: ${index}`);
        } else {
          throw new Error("Stupid error: PLEASE DONT :2. requires an index");
        }
      }
      // PLEASE LET :3. - Edytuje wartość Dataling
      else if (line.startsWith('PLEASE LET :3.')) {
        const indexMatch = line.match(/:3\.\s*(\d+)/);
        if (indexMatch && indexMatch[1]) {
          const index = Number(indexMatch[1]);
          
          output.push(`Enter new value for Dataling at index ${index}: ...`);
          // Szukamy wartości po ". . ." w kolejnej linii
          if (i + 1 < lines.length && lines[i + 1].includes('. . .')) {
            const valuePart = lines[i + 1].split('. . .')[1]?.trim();
            if (valuePart) {
              const value = Number(valuePart);
              if (!isNaN(value)) {
                databer.updateDataling(index, value);
                output.push(`Updated Dataling at index ${index} with value: ${value}`);
              } else {
                throw new Error(`Stupid error: Value "${valuePart}" is not numeric`);
              }
            }
            i++; // Przesuwamy się do następnej linii, ponieważ już ją przetworzyliśmy
          } else {
            throw new Error(`Stupid error: Expected value input after PLEASE LET :3. ${index}`);
          }
        } else {
          throw new Error("Stupid error: PLEASE LET :3. requires an index");
        }
      }
      // PLEASE CALL :4. - Wyświetla wartości Databer
      else if (line.startsWith('PLEASE CALL :4.')) {
        const values = databer.getValues();
        output.push(`Databer values: ${values || 'empty'}`);
      }
      // PLEASE BREACH :5. - Usuwa wszystkie Datalings
      else if (line.startsWith('PLEASE BREACH :5.')) {
        databer.clear();
        output.push("All Datalings removed from Databer");
      }
      // PLEASE EXIT :6. - Wychodzi z interpretera
      else if (line.startsWith('PLEASE EXIT :6.')) {
        output.push("Exiting INTERFUCK interpreter");
        break;
      }
      // Nieznana komenda
      else if (line && !line.startsWith('//') && !line.startsWith('#')) {
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
