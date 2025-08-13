import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Lightbulb,
  Sprout,
  Droplets,
  Bug,
  Calendar,
  Trash2
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'suggestion' | 'normal';
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your VertiGrow AI assistant. I can help you with farming questions, crop suggestions, pest management, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'normal'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "How do I prevent pest infestations?",
    "What's the optimal pH for tomatoes?",
    "When should I harvest lettuce?",
    "How much light do herbs need?",
    "What causes yellowing leaves?",
    "How often should I water plants?"
  ];

  // Mock AI responses based on keywords
  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('pest') || message.includes('bug') || message.includes('insect')) {
      return "For pest management in vertical farms, I recommend: 1) Regular inspection of plants 2) Use beneficial insects like ladybugs 3) Maintain proper air circulation 4) Keep growing area clean 5) Use organic neem oil if needed. Prevention is key - healthy plants are more resistant to pests!";
    }
    
    if (message.includes('ph') || message.includes('acid')) {
      return "Optimal pH levels vary by crop: Lettuce (6.0-7.0), Tomatoes (5.5-6.5), Herbs (6.0-7.5), Peppers (5.5-6.8). Most vegetables prefer slightly acidic to neutral conditions. Test pH weekly and adjust with pH up/down solutions as needed.";
    }
    
    if (message.includes('harvest') || message.includes('ready')) {
      return "Harvest timing depends on the crop: Lettuce - harvest outer leaves when 4-6 inches long, Tomatoes - when fully colored but still firm, Herbs - pinch flowers and harvest regularly to encourage growth. Look for visual cues like size, color, and firmness.";
    }
    
    if (message.includes('light') || message.includes('led')) {
      return "LED lighting requirements: Leafy greens need 14-16 hours at 20-30 watts/sq ft, Fruiting plants like tomatoes need 16-18 hours at 30-50 watts/sq ft. Use full spectrum LEDs and maintain 12-18 inches distance from plants.";
    }
    
    if (message.includes('yellow') || message.includes('leaf') || message.includes('leaves')) {
      return "Yellowing leaves can indicate: 1) Nitrogen deficiency (add fertilizer) 2) Overwatering (reduce watering frequency) 3) Natural aging (remove old leaves) 4) Light stress (adjust distance) 5) pH imbalance (test and adjust). Check these factors systematically.";
    }
    
    if (message.includes('water') || message.includes('irrigation')) {
      return "Watering guidelines: Check soil moisture daily, water when top inch is dry. Most crops need consistent moisture but not waterlogged conditions. Use drip irrigation or bottom watering to avoid leaf diseases. Seedlings need more frequent, lighter watering.";
    }
    
    if (message.includes('nutrient') || message.includes('fertilizer') || message.includes('feed')) {
      return "Nutrient management: Use balanced hydroponic nutrients (N-P-K 20-20-20 for general use). Feed every watering for hydroponic systems, weekly for soil. Monitor for deficiency signs: yellow leaves (nitrogen), purple stems (phosphorus), brown edges (potassium).";
    }
    
    if (message.includes('temperature') || message.includes('heat') || message.includes('cold')) {
      return "Temperature control: Most crops thrive at 65-75°F (18-24°C) during day, 60-65°F (15-18°C) at night. Use fans for air circulation, heating/cooling as needed. Monitor daily highs/lows and maintain consistent temperatures for best growth.";
    }
    
    return "That's a great question! For specific advice, I'd recommend checking your environmental parameters (temperature, humidity, pH), ensuring proper lighting, and maintaining consistent watering schedules. Could you provide more details about your specific growing situation?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'normal'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
        type: 'normal'
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your VertiGrow AI assistant. I can help you with farming questions, crop suggestions, pest management, and more. What would you like to know?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'normal'
      }
    ]);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getSuggestionIcon = (suggestion: string) => {
    if (suggestion.includes('pest')) return <Bug className="w-4 h-4" />;
    if (suggestion.includes('pH')) return <Droplets className="w-4 h-4" />;
    if (suggestion.includes('harvest')) return <Calendar className="w-4 h-4" />;
    if (suggestion.includes('light')) return <Lightbulb className="w-4 h-4" />;
    return <Sprout className="w-4 h-4" />;
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Farming Assistant</h1>
            <p className="text-muted-foreground">Get expert advice for your vertical farming questions</p>
          </div>
        </div>
        <Button variant="outline" onClick={clearChat} className="gap-2">
          <Trash2 className="w-4 h-4" />
          Clear Chat
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Suggestions Sidebar */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Quick Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full justify-start text-left h-auto p-3 hover:bg-muted"
                >
                  <div className="flex items-start gap-2">
                    {getSuggestionIcon(suggestion)}
                    <span className="text-sm">{suggestion}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-3 border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Chat with AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages Area */}
            <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {message.sender === 'user' && (
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted text-foreground p-3 rounded-lg">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about vertical farming..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs">
                  💡 Tip: Ask about specific crops, growing conditions, or farming techniques
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;