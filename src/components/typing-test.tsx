import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Difficulty, generateTest } from '@/lib/words';
import { Keyboard, Timer, Trophy } from 'lucide-react';

interface TestResult {
  wpm: number;
  accuracy: number;
  mistakes: number;
  timeTaken: number;
}

export function TypingTest() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isWordCorrect, setIsWordCorrect] = useState(true);
  const { toast } = useToast();

  const startTest = useCallback(() => {
    setWords(generateTest(difficulty));
    setCurrentWordIndex(0);
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setMistakes(0);
    setIsTestActive(true);
    setTestResult(null);
    setTimeLeft(60);
    setIsWordCorrect(true);
  }, [difficulty]);

  const calculateResults = useCallback(() => {
    if (startTime && endTime) {
      const timeTaken = (endTime - startTime) / 1000; // seconds
      const totalWords = currentWordIndex;
      const wpm = Math.round((totalWords / timeTaken) * 60);
      const accuracy = Math.round(((totalWords - mistakes) / totalWords) * 100);

      setTestResult({
        wpm,
        accuracy,
        mistakes,
        timeTaken: Math.round(timeTaken),
      });

      toast({
        title: "Test Complete! 🎉",
        description: `WPM: ${wpm} | Accuracy: ${accuracy}%`,
      });
    }
  }, [startTime, endTime, currentWordIndex, mistakes, toast]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!startTime && value) {
      setStartTime(Date.now());
    }

    // Real-time word validation
    const currentWord = words[currentWordIndex];
    setIsWordCorrect(currentWord.startsWith(value.trim()));

    if (value.endsWith(' ')) {
      const typedWord = value.trim();

      if (typedWord !== currentWord) {
        setMistakes(prev => prev + 1);
      }

      if (currentWordIndex === words.length - 1) {
        setEndTime(Date.now());
        setIsTestActive(false);
      } else {
        setCurrentWordIndex(prev => prev + 1);
      }
      setInput('');
      setIsWordCorrect(true);
    } else {
      setInput(value);
    }
  }, [currentWordIndex, words, startTime]);

  useEffect(() => {
    if (endTime) {
      calculateResults();
    }
  }, [endTime, calculateResults]);

  useEffect(() => {
    let timer: number;
    if (isTestActive && startTime) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setEndTime(Date.now());
            setIsTestActive(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestActive, startTime]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Keyboard className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Typing Speed Test</h2>
          </div>
          <div className="flex items-center gap-4">
            {isTestActive && startTime && (
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-semibold">{timeLeft}s</span>
              </div>
            )}
            <Select
              value={difficulty}
              onValueChange={(value: Difficulty) => setDifficulty(value)}
              disabled={isTestActive}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {!isTestActive && !testResult && (
          <div className="text-center py-12">
            <Button onClick={startTest} size="lg" className="bg-gradient-to-r from-primary to-blue-500">
              Start Test
            </Button>
          </div>
        )}

        {isTestActive && (
          <>
            <div className="mb-6 p-4 bg-muted/50 rounded-lg backdrop-blur-sm">
              <p className="text-lg leading-relaxed">
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={`mr-2 ${
                      index === currentWordIndex
                        ? 'bg-primary text-primary-foreground px-1 rounded'
                        : index < currentWordIndex
                        ? 'text-muted-foreground'
                        : ''
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>

            <Input
              value={input}
              onChange={handleInput}
              placeholder="Type here..."
              className={`text-lg transition-colors ${
                !isWordCorrect ? 'border-red-500 bg-red-500/10' : ''
              }`}
              autoFocus
            />

            <Progress
              value={(currentWordIndex / words.length) * 100}
              className="mt-4"
            />
          </>
        )}

        {testResult && (
          <div className="space-y-4 text-center py-6">
            <Trophy className="w-12 h-12 mx-auto text-yellow-500" />
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold">WPM</h3>
                <p className="text-3xl font-bold">{testResult.wpm}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Accuracy</h3>
                <p className="text-3xl font-bold">{testResult.accuracy}%</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Mistakes</h3>
                <p className="text-3xl font-bold">{testResult.mistakes}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold">Time</h3>
                <p className="text-3xl font-bold">{testResult.timeTaken}s</p>
              </div>
            </div>
            <Button 
              onClick={startTest} 
              size="lg" 
              className="mt-6 bg-gradient-to-r from-primary to-blue-500"
            >
              Try Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}