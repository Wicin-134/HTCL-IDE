
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Copy } from "lucide-react";
import { toast } from "sonner";

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
  const navigate = useNavigate();
  
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

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const handleTryIt = () => {
    navigate('/try', { state: { code } });
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
        <div className="bg-secondary/50 p-3 rounded-md font-mono text-xs max-h-[200px] overflow-y-auto">
          {code}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={handleCopy}>
          <Copy size={12} />
          Copy
        </Button>
        <Button size="sm" className="gap-1 text-xs" onClick={handleTryIt}>
          <Play size={12} />
          Try it
        </Button>
      </CardFooter>
    </Card>
  );
};

const Examples = () => {
  const examples = [
    {
      title: "Hello World",
      description: "Simple hello world program showing basic character output",
      code: `// Hello World program in CBPL
PLEASE ADD :9. Output

// Set output characters one by one (Hello World)
PLEASE DO :1.
8
PLEASE DO :1.
5
PLEASE DO :1.
12
PLEASE DO :1.
12
PLEASE DO :1.
15
PLEASE DO :1.
32
PLEASE DO :1.
23
PLEASE DO :1.
15
PLEASE DO :1.
18
PLEASE DO :1.
12
PLEASE DO :1.
4

// Display the characters
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "beginner" as const,
    },
    {
      title: "User Name Greeter",
      description: "Asks for user's name and creates a personalized greeting",
      code: `// Create a greeter program
PLEASE ADD :9. UserName

// Create characters for prompt "Enter your name"
PLEASE DO :1.
69
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
121
PLEASE DO :1.
111
PLEASE DO :1.
117
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
110
PLEASE DO :1.
97
PLEASE DO :1.
109
PLEASE DO :1.
101

// Display prompt
PLEASE CALL :4.

// Get user input
PLEASE LISTEN :8. UserName

// Clear the output before next message
PLEASE CLEAR :7.

// Create characters for "Hello"
PLEASE DO :1.
72
PLEASE DO :1.
101
PLEASE DO :1.
108
PLEASE DO :1.
108
PLEASE DO :1.
111
PLEASE DO :1.
32

// Display greeting
PLEASE CALL :4.
PLEASE CALL :4.; UserName
PLEASE EXIT :6.`,
      level: "beginner" as const,
    },
    {
      title: "Simple Calculator",
      description: "A basic calculator that adds two numbers from user input",
      code: `// Simple addition calculator
PLEASE ADD :9. Num1
PLEASE ADD :9. Num2
PLEASE ADD :9. Result

// Create characters for first prompt
PLEASE DO :1.
69
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
102
PLEASE DO :1.
105
PLEASE DO :1.
114
PLEASE DO :1.
115
PLEASE DO :1.
116
PLEASE DO :1.
32
PLEASE DO :1.
110
PLEASE DO :1.
117
PLEASE DO :1.
109
PLEASE DO :1.
98
PLEASE DO :1.
101
PLEASE DO :1.
114

// Display first prompt
PLEASE CALL :4.

// Get first number input
PLEASE LISTEN :8. Num1

// Clear the output before next prompt
PLEASE CLEAR :7.

// Create characters for second prompt
PLEASE DO :1.
69
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
115
PLEASE DO :1.
101
PLEASE DO :1.
99
PLEASE DO :1.
111
PLEASE DO :1.
110
PLEASE DO :1.
100
PLEASE DO :1.
32
PLEASE DO :1.
110
PLEASE DO :1.
117
PLEASE DO :1.
109
PLEASE DO :1.
98
PLEASE DO :1.
101
PLEASE DO :1.
114

// Display second prompt
PLEASE CALL :4.

// Get second number input
PLEASE LISTEN :8. Num2

// Clear the output before showing result
PLEASE CLEAR :7.

// Calculate result
PLEASE CALC :10. Result
Num1 + Num2

// Create characters for "Result"
PLEASE DO :1.
82
PLEASE DO :1.
101
PLEASE DO :1.
115
PLEASE DO :1.
117
PLEASE DO :1.
108
PLEASE DO :1.
116
PLEASE DO :1.
58
PLEASE DO :1.
32

// Display result
PLEASE CALL :4.
PLEASE CALL :4.; Result
PLEASE EXIT :6.`,
      level: "beginner" as const,
    },
    {
      title: "Four Function Calculator",
      description: "Advanced calculator supporting addition, subtraction, multiplication, and division",
      code: `// Four function calculator
PLEASE ADD :9. Num1
PLEASE ADD :9. Num2
PLEASE ADD :9. Operation
PLEASE ADD :9. Result

// Create characters for first prompt
PLEASE DO :1.
69
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
102
PLEASE DO :1.
105
PLEASE DO :1.
114
PLEASE DO :1.
115
PLEASE DO :1.
116
PLEASE DO :1.
32
PLEASE DO :1.
110
PLEASE DO :1.
117
PLEASE DO :1.
109
PLEASE DO :1.
98
PLEASE DO :1.
101
PLEASE DO :1.
114

// Display first prompt
PLEASE CALL :4.

// Get first number
PLEASE LISTEN :8. Num1

// Clear the output before next prompt
PLEASE CLEAR :7.

// Create characters for second prompt
PLEASE DO :1.
69
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
115
PLEASE DO :1.
101
PLEASE DO :1.
99
PLEASE DO :1.
111
PLEASE DO :1.
110
PLEASE DO :1.
100
PLEASE DO :1.
32
PLEASE DO :1.
110
PLEASE DO :1.
117
PLEASE DO :1.
109
PLEASE DO :1.
98
PLEASE DO :1.
101
PLEASE DO :1.
114

// Display second prompt
PLEASE CALL :4.

// Get second number
PLEASE LISTEN :8. Num2

// Clear the output before operation prompt
PLEASE CLEAR :7.

// Create characters for operation prompt
PLEASE DO :1.
69
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
111
PLEASE DO :1.
112
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
97
PLEASE DO :1.
116
PLEASE DO :1.
105
PLEASE DO :1.
111
PLEASE DO :1.
110
PLEASE DO :1.
32
PLEASE DO :1.
40
PLEASE DO :1.
43
PLEASE DO :1.
44
PLEASE DO :1.
45
PLEASE DO :1.
44
PLEASE DO :1.
42
PLEASE DO :1.
44
PLEASE DO :1.
47
PLEASE DO :1.
41

// Display operation prompt
PLEASE CALL :4.

// Get operation
PLEASE LISTEN :8. Operation

// Clear the output before showing result
PLEASE CLEAR :7.

// Calculate result
PLEASE CALC :10. Result
Num1 Operation Num2

// Create characters for "Result"
PLEASE DO :1.
82
PLEASE DO :1.
101
PLEASE DO :1.
115
PLEASE DO :1.
117
PLEASE DO :1.
108
PLEASE DO :1.
116
PLEASE DO :1.
58
PLEASE DO :1.
32

// Display result
PLEASE CALL :4.
PLEASE CALL :4.; Result
PLEASE EXIT :6.`,
      level: "intermediate" as const,
    },
    {
      title: "Temperature Converter",
      description: "Converts temperatures between Celsius and Fahrenheit",
      code: `// Temperature converter Celsius to Fahrenheit
PLEASE ADD :9. Celsius
PLEASE ADD :9. Fahrenheit

// Create characters for temperature prompt
PLEASE DO :1.
69
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
109
PLEASE DO :1.
112
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
97
PLEASE DO :1.
116
PLEASE DO :1.
117
PLEASE DO :1.
114
PLEASE DO :1.
101
PLEASE DO :1.
32
PLEASE DO :1.
105
PLEASE DO :1.
110
PLEASE DO :1.
32
PLEASE DO :1.
67
PLEASE DO :1.
101
PLEASE DO :1.
108
PLEASE DO :1.
115
PLEASE DO :1.
105
PLEASE DO :1.
117
PLEASE DO :1.
115

// Display prompt
PLEASE CALL :4.

// Get Celsius input
PLEASE LISTEN :8. Celsius

// Clear the output before showing result
PLEASE CLEAR :7.

// Convert to Fahrenheit
PLEASE CALC :10. Fahrenheit
Celsius * 9 / 5 + 32

// Create characters for result message
PLEASE DO :1.
84
PLEASE DO :1.
101
PLEASE DO :1.
109
PLEASE DO :1.
112
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
97
PLEASE DO :1.
116
PLEASE DO :1.
117
PLEASE DO :1.
114
PLEASE DO :1.
101
PLEASE DO :1.
32
PLEASE DO :1.
105
PLEASE DO :1.
110
PLEASE DO :1.
32
PLEASE DO :1.
70
PLEASE DO :1.
97
PLEASE DO :1.
104
PLEASE DO :1.
114
PLEASE DO :1.
101
PLEASE DO :1.
110
PLEASE DO :1.
104
PLEASE DO :1.
101
PLEASE DO :1.
105
PLEASE DO :1.
116
PLEASE DO :1.
58
PLEASE DO :1.
32

// Display result
PLEASE CALL :4.
PLEASE CALL :4.; Fahrenheit
PLEASE EXIT :6.`,
      level: "intermediate" as const,
    },
    {
      title: "Area Calculator",
      description: "Calculates the area of a rectangle from user input",
      code: `// Area calculator for rectangles
PLEASE ADD :9. Length
PLEASE ADD :9. Width
PLEASE ADD :9. Area

// Create characters for length prompt
PLEASE DO :1.
69
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
114
PLEASE DO :1.
101
PLEASE DO :1.
99
PLEASE DO :1.
116
PLEASE DO :1.
97
PLEASE DO :1.
110
PLEASE DO :1.
103
PLEASE DO :1.
108
PLEASE DO :1.
101
PLEASE DO :1.
32
PLEASE DO :1.
108
PLEASE DO :1.
101
PLEASE DO :1.
110
PLEASE DO :1.
103
PLEASE DO :1.
116
PLEASE DO :1.
104

// Display length prompt
PLEASE CALL :4.

// Get length input
PLEASE LISTEN :8. Length

// Clear the output before width prompt
PLEASE CLEAR :7.

// Create characters for width prompt
PLEASE DO :1.
69
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
114
PLEASE DO :1.
101
PLEASE DO :1.
99
PLEASE DO :1.
116
PLEASE DO :1.
97
PLEASE DO :1.
110
PLEASE DO :1.
103
PLEASE DO :1.
108
PLEASE DO :1.
101
PLEASE DO :1.
32
PLEASE DO :1.
119
PLEASE DO :1.
105
PLEASE DO :1.
100
PLEASE DO :1.
116
PLEASE DO :1.
104

// Display width prompt
PLEASE CALL :4.

// Get width input
PLEASE LISTEN :8. Width

// Clear the output before showing result
PLEASE CLEAR :7.

// Calculate area
PLEASE CALC :10. Area
Length * Width

// Create characters for area result
PLEASE DO :1.
82
PLEASE DO :1.
101
PLEASE DO :1.
99
PLEASE DO :1.
116
PLEASE DO :1.
97
PLEASE DO :1.
110
PLEASE DO :1.
103
PLEASE DO :1.
108
PLEASE DO :1.
101
PLEASE DO :1.
32
PLEASE DO :1.
97
PLEASE DO :1.
114
PLEASE DO :1.
101
PLEASE DO :1.
97
PLEASE DO :1.
58
PLEASE DO :1.
32

// Display result
PLEASE CALL :4.
PLEASE CALL :4.; Area
PLEASE EXIT :6.`,
      level: "intermediate" as const,
    },
    {
      title: "Text Art Generator",
      description: "Creates a simple text banner with user input",
      code: `// Text art generator
PLEASE ADD :9. UserText

// Create characters for prompt
PLEASE DO :1.
69
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
120
PLEASE DO :1.
116
PLEASE DO :1.
32
PLEASE DO :1.
116
PLEASE DO :1.
111
PLEASE DO :1.
32
PLEASE DO :1.
100
PLEASE DO :1.
105
PLEASE DO :1.
115
PLEASE DO :1.
112
PLEASE DO :1.
108
PLEASE DO :1.
97
PLEASE DO :1.
121

// Display prompt
PLEASE CALL :4.

// Get user text
PLEASE LISTEN :8. UserText

// Clear the output before displaying art
PLEASE CLEAR :7.

// Create top border
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42

// Display top border
PLEASE CALL :4.

// Create left side of frame
PLEASE DO :1.
42
PLEASE DO :1.
32
PLEASE DO :1.
32

// Display left side
PLEASE CALL :4.

// Display user text
PLEASE CALL :4.; UserText

// Create right side of frame
PLEASE DO :1.
32
PLEASE DO :1.
32
PLEASE DO :1.
42

// Display right side
PLEASE CALL :4.

// Create bottom border (same as top)
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42
PLEASE DO :1.
42

// Display bottom border
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "beginner" as const,
    },
    {
      title: "Number Guessing Game",
      description: "A simple guessing game where the user tries to guess a number",
      code: `// Number guessing game
PLEASE ADD :9. Secret
PLEASE ADD :9. Guess
PLEASE ADD :9. Attempts
PLEASE ADD :9. MaxAttempts

// Set the secret number and max attempts
PLEASE CALC :10. Secret
42
PLEASE CALC :10. MaxAttempts
5
PLEASE CALC :10. Attempts
0

// Create welcome message
PLEASE DO :1.
71
PLEASE DO :1.
117
PLEASE DO :1.
101
PLEASE DO :1.
115
PLEASE DO :1.
115
PLEASE DO :1.
32
PLEASE DO :1.
116
PLEASE DO :1.
104
PLEASE DO :1.
101
PLEASE DO :1.
32
PLEASE DO :1.
110
PLEASE DO :1.
117
PLEASE DO :1.
109
PLEASE DO :1.
98
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
40
PLEASE DO :1.
49
PLEASE DO :1.
45
PLEASE DO :1.
49
PLEASE DO :1.
48
PLEASE DO :1.
48
PLEASE DO :1.
41

// Display welcome message
PLEASE CALL :4.

// Game loop start
LOOP_START:

// Increment attempts
PLEASE CALC :10. Attempts
Attempts + 1

// Clear the output before guess prompt
PLEASE CLEAR :7.

// Create guess prompt with attempts info
PLEASE DO :1.
65
PLEASE DO :1.
116
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
109
PLEASE DO :1.
112
PLEASE DO :1.
116
PLEASE DO :1.
32

// Display attempts counter
PLEASE CALL :4.
PLEASE CALL :4.; Attempts
PLEASE CALL :4.; MaxAttempts

// Create remainder of prompt
PLEASE DO :1.
47
PLEASE DO :1.
32
PLEASE DO :1.
45
PLEASE DO :1.
32
PLEASE DO :1.
69
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
121
PLEASE DO :1.
111
PLEASE DO :1.
117
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
103
PLEASE DO :1.
117
PLEASE DO :1.
101
PLEASE DO :1.
115
PLEASE DO :1.
115
PLEASE DO :1.
58
PLEASE DO :1.
32

// Display remainder of prompt
PLEASE CALL :4.

// Get user's guess
PLEASE LISTEN :8. Guess

// Check if guess is correct
PLEASE IF :11. Guess = Secret
CORRECT_GUESS
PLEASE IF :11. Guess < Secret
TOO_LOW
PLEASE IF :11. Guess > Secret
TOO_HIGH

// Too low message
TOO_LOW:
PLEASE DO :1.
84
PLEASE DO :1.
111
PLEASE DO :1.
111
PLEASE DO :1.
32
PLEASE DO :1.
108
PLEASE DO :1.
111
PLEASE DO :1.
119
PLEASE DO :1.
33
PLEASE CALL :4.
PLEASE GOTO :12. CHECK_CONTINUE

// Too high message
TOO_HIGH:
PLEASE DO :1.
84
PLEASE DO :1.
111
PLEASE DO :1.
111
PLEASE DO :1.
32
PLEASE DO :1.
104
PLEASE DO :1.
105
PLEASE DO :1.
103
PLEASE DO :1.
104
PLEASE DO :1.
33
PLEASE CALL :4.
PLEASE GOTO :12. CHECK_CONTINUE

// Correct guess message
CORRECT_GUESS:
PLEASE DO :1.
67
PLEASE DO :1.
111
PLEASE DO :1.
110
PLEASE DO :1.
103
PLEASE DO :1.
114
PLEASE DO :1.
97
PLEASE DO :1.
116
PLEASE DO :1.
117
PLEASE DO :1.
108
PLEASE DO :1.
97
PLEASE DO :1.
116
PLEASE DO :1.
105
PLEASE DO :1.
111
PLEASE DO :1.
110
PLEASE DO :1.
115
PLEASE DO :1.
33
PLEASE DO :1.
32
PLEASE DO :1.
89
PLEASE DO :1.
111
PLEASE DO :1.
117
PLEASE DO :1.
32
PLEASE DO :1.
103
PLEASE DO :1.
117
PLEASE DO :1.
101
PLEASE DO :1.
115
PLEASE DO :1.
115
PLEASE DO :1.
101
PLEASE DO :1.
100
PLEASE DO :1.
32
PLEASE DO :1.
116
PLEASE DO :1.
104
PLEASE DO :1.
101
PLEASE DO :1.
32
PLEASE DO :1.
110
PLEASE DO :1.
117
PLEASE DO :1.
109
PLEASE DO :1.
98
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
33
PLEASE CALL :4.
PLEASE EXIT :6.

// Check if attempts are maxed out
CHECK_CONTINUE:
PLEASE IF :11. Attempts >= MaxAttempts
GAME_OVER
PLEASE GOTO :12. LOOP_START

// Game over message
GAME_OVER:
PLEASE DO :1.
71
PLEASE DO :1.
97
PLEASE DO :1.
109
PLEASE DO :1.
101
PLEASE DO :1.
32
PLEASE DO :1.
111
PLEASE DO :1.
118
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
33
PLEASE DO :1.
32
PLEASE DO :1.
84
PLEASE DO :1.
104
PLEASE DO :1.
101
PLEASE DO :1.
32
PLEASE DO :1.
110
PLEASE DO :1.
117
PLEASE DO :1.
109
PLEASE DO :1.
98
PLEASE DO :1.
101
PLEASE DO :1.
114
PLEASE DO :1.
32
PLEASE DO :1.
119
PLEASE DO :1.
97
PLEASE DO :1.
115
PLEASE DO :1.
32
PLEASE CALL :4.
PLEASE CALL :4.; Secret
PLEASE EXIT :6.`,
      level: "advanced" as const,
    },
    {
      title: "Countdown Timer",
      description: "Simple countdown timer visualization with text output",
      code: `// Countdown timer visualization
PLEASE ADD :9. Counter
PLEASE ADD :9. StartValue

// Set initial values
PLEASE CALC :10. StartValue
10
PLEASE CALC :10. Counter
StartValue

// Create beginning message
PLEASE DO :1.
67
PLEASE DO :1.
111
PLEASE DO :1.
117
PLEASE DO :1.
110
PLEASE DO :1.
116
PLEASE DO :1.
100
PLEASE DO :1.
111
PLEASE DO :1.
119
PLEASE DO :1.
110
PLEASE DO :1.
32
PLEASE DO :1.
115
PLEASE DO :1.
116
PLEASE DO :1.
97
PLEASE DO :1.
114
PLEASE DO :1.
116
PLEASE DO :1.
105
PLEASE DO :1.
110
PLEASE DO :1.
103
PLEASE DO :1.
46
PLEASE DO :1.
46
PLEASE DO :1.
46

// Display start message
PLEASE CALL :4.

// Start the countdown loop
COUNTDOWN_LOOP:

// Clear screen for clean display
PLEASE CLEAR :7.

// Display current count
PLEASE CALL :4.; Counter

// Check if we've reached zero
PLEASE IF :11. Counter <= 0
COUNTDOWN_DONE

// Decrement the counter
PLEASE CALC :10. Counter
Counter - 1

// Continue the loop
PLEASE GOTO :12. COUNTDOWN_LOOP

// Countdown completion message
COUNTDOWN_DONE:
PLEASE CLEAR :7.

// Create blast off message
PLEASE DO :1.
66
PLEASE DO :1.
108
PLEASE DO :1.
97
PLEASE DO :1.
115
PLEASE DO :1.
116
PLEASE DO :1.
32
PLEASE DO :1.
111
PLEASE DO :1.
102
PLEASE DO :1.
102
PLEASE DO :1.
33

// Display completion message
PLEASE CALL :4.
PLEASE EXIT :6.`,
      level: "intermediate" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight">Example Programs</h2>
        <p className="text-muted-foreground mt-2">
          Explore these sample programs to understand CBPL capabilities and
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
            Try the IDE
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Examples;
