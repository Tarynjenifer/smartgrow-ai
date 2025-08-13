import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  Calendar, 
  Brain, 
  MessageSquare,
  Sprout,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';
import heroImage from '@/assets/hero-vertical-farm.jpg';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage = ({ onPageChange }: HomePageProps) => {
  const features = [
    {
      icon: LayoutDashboard,
      title: 'Real-time Dashboard',
      description: 'Monitor environmental parameters and crop growth with interactive charts',
      page: 'dashboard'
    },
    {
      icon: Calendar,
      title: 'Smart Planner',
      description: 'Schedule and track planting, watering, and harvesting tasks',
      page: 'planner'
    },
    {
      icon: Brain,
      title: 'AI Crop Suggestions',
      description: 'Get intelligent recommendations based on your growing conditions',
      page: 'ai-suggest'
    },
    {
      icon: MessageSquare,
      title: 'Expert Chatbot',
      description: 'Ask farming questions and get instant AI-powered answers',
      page: 'chatbot'
    }
  ];

  const stats = [
    { icon: Sprout, value: '250+', label: 'Crop Varieties' },
    { icon: BarChart3, value: '95%', label: 'Growth Accuracy' },
    { icon: Shield, value: '100%', label: 'Organic Certified' },
    { icon: Zap, value: '40%', label: 'Energy Efficient' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Modern vertical farming facility" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            VertiGrow AI
            <span className="block text-accent">Smart Planner</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Revolutionize your vertical farming with AI-powered insights, 
            real-time monitoring, and intelligent crop management.
          </p>
          <Button 
            size="lg" 
            onClick={() => onPageChange('dashboard')}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-glow"
          >
            Start Growing Smart
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to optimize your vertical farming operations 
              with cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-card transition-all duration-300 cursor-pointer border-border hover:border-primary/20"
                  onClick={() => onPageChange(feature.page)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-nature">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of farmers already growing smarter
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/90">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experience the future of agriculture with VertiGrow AI Smart Planner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => onPageChange('dashboard')}
              className="px-8 py-6 text-lg"
            >
              Explore Dashboard
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => onPageChange('ai-suggest')}
              className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Try AI Suggestions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;