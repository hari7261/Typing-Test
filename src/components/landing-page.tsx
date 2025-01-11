import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GitHubProfile } from "@/components/github-profile";
import { FAQSection } from "@/components/faq-section";
import {
  Keyboard,
  Rocket,
  Timer,
  Trophy,
  Zap,
  Github,
  Code2,
} from "lucide-react";
import { useState } from "react";
import { TypingTest } from "./typing-test";

export function LandingPage() {
  const [showTest, setShowTest] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {!showTest ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          {/* Hero Section */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Keyboard className="w-8 h-8" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
                TypeMaster Pro
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Master your typing skills with our advanced typing speed test. Challenge yourself
              across multiple difficulty levels and track your progress.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20 transform hover:scale-105 transition-transform">
              <Rocket className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Multiple Levels</h3>
              <p className="text-muted-foreground">
                Choose from easy, intermediate, or hard difficulty levels to match your skill.
              </p>
            </Card>
            <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20 transform hover:scale-105 transition-transform">
              <Timer className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Real-time Feedback</h3>
              <p className="text-muted-foreground">
                Get instant feedback on your typing speed, accuracy, and mistakes.
              </p>
            </Card>
            <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20 transform hover:scale-105 transition-transform sm:col-span-2 lg:col-span-1">
              <Trophy className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your improvement with detailed performance metrics.
              </p>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-20">
            <Button
              size="lg"
              onClick={() => setShowTest(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-500 dark:hover:to-blue-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Typing Test
            </Button>
          </div>

          {/* About Section */}
          <div className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">About the Developer</h2>
            <GitHubProfile />
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Card className="p-6 backdrop-blur-sm bg-card/50 border-primary/20">
              <FAQSection />
            </Card>
          </div>

          {/* Contribute Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contribute to TypeMaster Pro</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We welcome contributions from developers of all skill levels. Help us make
              typing practice more engaging and effective.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.open("https://github.com/hari7261", "_blank")}
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.open("https://github.com/hari7261/typemaster-pro/fork", "_blank")}
              >
                <Code2 className="w-4 h-4" />
                Fork Project
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 px-4">
          <Button
            variant="ghost"
            onClick={() => setShowTest(false)}
            className="mb-4"
          >
            ← Back to Home
          </Button>
          <TypingTest />
        </div>
      )}
    </div>
  );
}