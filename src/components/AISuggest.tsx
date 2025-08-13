import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Brain, 
  Thermometer, 
  Activity, 
  Square, 
  Sprout, 
  Star,
  TrendingUp,
  Clock,
  Droplets,
  Sun,
  CheckCircle
} from 'lucide-react';

interface CropSuggestion {
  name: string;
  confidence: number;
  growthTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  yield: string;
  waterNeeds: 'Low' | 'Medium' | 'High';
  lightNeeds: 'Low' | 'Medium' | 'High';
  benefits: string[];
  tips: string[];
}

const AISuggest = () => {
  const [parameters, setParameters] = useState({
    temperature: [24],
    humidity: [65],
    pH: [6.5],
    soilType: '',
    area: [10],
    experience: ''
  });

  const [suggestions, setSuggestions] = useState<CropSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI suggestions based on parameters
  const generateSuggestions = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockSuggestions: CropSuggestion[] = [
        {
          name: 'Butterhead Lettuce',
          confidence: 95,
          growthTime: '45-55 days',
          difficulty: 'Easy',
          yield: '8-12 heads/sq ft',
          waterNeeds: 'Medium',
          lightNeeds: 'Medium',
          benefits: ['Fast growing', 'High nutrition', 'Low maintenance'],
          tips: ['Harvest outer leaves first', 'Keep soil consistently moist', 'Provide 14-16h light daily']
        },
        {
          name: 'Cherry Tomatoes',
          confidence: 88,
          growthTime: '60-80 days',
          difficulty: 'Medium',
          yield: '4-6 lbs/plant',
          waterNeeds: 'High',
          lightNeeds: 'High',
          benefits: ['High yield', 'Continuous harvest', 'Popular crop'],
          tips: ['Support with trellises', 'Prune suckers regularly', 'Monitor for pests']
        },
        {
          name: 'Fresh Basil',
          confidence: 92,
          growthTime: '30-40 days',
          difficulty: 'Easy',
          yield: '2-3 oz/plant',
          waterNeeds: 'Medium',
          lightNeeds: 'Medium',
          benefits: ['Aromatic herb', 'Quick harvest', 'High value'],
          tips: ['Pinch flowers to promote growth', 'Harvest regularly', 'Great companion plant']
        },
        {
          name: 'Swiss Chard',
          confidence: 85,
          growthTime: '50-60 days',
          difficulty: 'Easy',
          yield: '6-8 leaves/plant',
          waterNeeds: 'Medium',
          lightNeeds: 'Medium',
          benefits: ['Cut-and-come-again', 'Colorful leaves', 'High nutrients'],
          tips: ['Harvest outer leaves', 'Tolerates light shade', 'Great for beginners']
        }
      ];

      setSuggestions(mockSuggestions);
      setIsLoading(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/10 text-success border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'Hard': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getNeedsColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'High': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Crop Suggestions</h1>
          <p className="text-muted-foreground">Get personalized crop recommendations based on your growing conditions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters */}
        <Card className="lg:col-span-1 border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Growing Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Temperature */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                Temperature: {parameters.temperature[0]}°C
              </Label>
              <Slider
                value={parameters.temperature}
                onValueChange={(value) => setParameters({ ...parameters, temperature: value })}
                max={35}
                min={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10°C</span>
                <span>35°C</span>
              </div>
            </div>

            {/* Humidity */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Humidity: {parameters.humidity[0]}%
              </Label>
              <Slider
                value={parameters.humidity}
                onValueChange={(value) => setParameters({ ...parameters, humidity: value })}
                max={90}
                min={30}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>30%</span>
                <span>90%</span>
              </div>
            </div>

            {/* pH Level */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Soil pH: {parameters.pH[0]}
              </Label>
              <Slider
                value={parameters.pH}
                onValueChange={(value) => setParameters({ ...parameters, pH: value })}
                max={8.5}
                min={4.5}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>4.5</span>
                <span>8.5</span>
              </div>
            </div>

            {/* Growing Area */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Square className="w-4 h-4" />
                Growing Area: {parameters.area[0]} sq ft
              </Label>
              <Slider
                value={parameters.area}
                onValueChange={(value) => setParameters({ ...parameters, area: value })}
                max={100}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 sq ft</span>
                <span>100 sq ft</span>
              </div>
            </div>

            {/* Soil Type */}
            <div className="space-y-2">
              <Label>Soil Type</Label>
              <Select value={parameters.soilType} onValueChange={(value) => setParameters({ ...parameters, soilType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hydroponic">Hydroponic</SelectItem>
                  <SelectItem value="coco-coir">Coco Coir</SelectItem>
                  <SelectItem value="perlite">Perlite Mix</SelectItem>
                  <SelectItem value="rockwool">Rockwool</SelectItem>
                  <SelectItem value="organic">Organic Potting Mix</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select value={parameters.experience} onValueChange={(value) => setParameters({ ...parameters, experience: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={generateSuggestions} 
              className="w-full" 
              disabled={isLoading || !parameters.soilType || !parameters.experience}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Get AI Suggestions
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <div className="lg:col-span-2 space-y-6">
          {suggestions.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-12 text-center">
                <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Ready for AI Analysis</h3>
                <p className="text-muted-foreground">
                  Set your growing parameters and click "Get AI Suggestions" to receive personalized crop recommendations.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Recommended Crops</h2>
                <Badge variant="outline" className="text-success border-success">
                  {suggestions.length} suggestions found
                </Badge>
              </div>
              
              <div className="space-y-4">
                {suggestions.map((crop, index) => (
                  <Card key={index} className="border-border hover:shadow-card transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-nature rounded-full flex items-center justify-center">
                            <Sprout className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground">{crop.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="w-4 h-4 text-warning fill-warning" />
                              <span className="text-sm font-medium text-foreground">{crop.confidence}% match</span>
                              <Badge className={getDifficultyColor(crop.difficulty)}>{crop.difficulty}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <Clock className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                          <p className="text-sm font-medium text-foreground">{crop.growthTime}</p>
                          <p className="text-xs text-muted-foreground">Growth Time</p>
                        </div>
                        <div className="text-center">
                          <TrendingUp className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                          <p className="text-sm font-medium text-foreground">{crop.yield}</p>
                          <p className="text-xs text-muted-foreground">Expected Yield</p>
                        </div>
                        <div className="text-center">
                          <Droplets className={`w-5 h-5 mx-auto mb-1 ${getNeedsColor(crop.waterNeeds)}`} />
                          <p className="text-sm font-medium text-foreground">{crop.waterNeeds}</p>
                          <p className="text-xs text-muted-foreground">Water Needs</p>
                        </div>
                        <div className="text-center">
                          <Sun className={`w-5 h-5 mx-auto mb-1 ${getNeedsColor(crop.lightNeeds)}`} />
                          <p className="text-sm font-medium text-foreground">{crop.lightNeeds}</p>
                          <p className="text-xs text-muted-foreground">Light Needs</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-success" />
                            Benefits
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {crop.benefits.map((benefit, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                            <Brain className="w-4 h-4 text-primary" />
                            Growing Tips
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {crop.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISuggest;