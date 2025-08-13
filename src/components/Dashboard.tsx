import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Thermometer,
  Droplets,
  Sun,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  // Mock environmental data
  const environmentalData = [
    { time: '00:00', temperature: 22, humidity: 65, pH: 6.2 },
    { time: '04:00', temperature: 21, humidity: 68, pH: 6.1 },
    { time: '08:00', temperature: 24, humidity: 62, pH: 6.3 },
    { time: '12:00', temperature: 26, humidity: 58, pH: 6.2 },
    { time: '16:00', temperature: 25, humidity: 60, pH: 6.4 },
    { time: '20:00', temperature: 23, humidity: 63, pH: 6.2 },
  ];

  // Mock crop growth data
  const cropGrowthData = [
    { name: 'Week 1', lettuce: 15, tomatoes: 10, herbs: 20 },
    { name: 'Week 2', lettuce: 25, tomatoes: 18, herbs: 35 },
    { name: 'Week 3', lettuce: 40, tomatoes: 30, herbs: 55 },
    { name: 'Week 4', lettuce: 65, tomatoes: 45, herbs: 75 },
    { name: 'Week 5', lettuce: 85, tomatoes: 65, herbs: 90 },
    { name: 'Week 6', lettuce: 95, tomatoes: 80, herbs: 95 },
  ];

  // Mock harvest data
  const harvestData = [
    { name: 'Lettuce', value: 45, color: '#10B981' },
    { name: 'Tomatoes', value: 25, color: '#F59E0B' },
    { name: 'Herbs', value: 20, color: '#8B5CF6' },
    { name: 'Peppers', value: 10, color: '#EF4444' },
  ];

  const currentMetrics = {
    temperature: { value: 24, status: 'optimal', trend: 'up' },
    humidity: { value: 62, status: 'optimal', trend: 'stable' },
    pH: { value: 6.3, status: 'optimal', trend: 'up' },
    sunlight: { value: 8.5, status: 'good', trend: 'up' }
  };

  const alerts = [
    { type: 'warning', message: 'Tomato section needs watering in 2 hours', time: '10 mins ago' },
    { type: 'success', message: 'Lettuce harvest ready in zone A', time: '1 hour ago' },
    { type: 'info', message: 'Weekly growth report generated', time: '2 hours ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-success';
      case 'good': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Farm Dashboard</h1>
        <Badge variant="outline" className="text-success border-success">
          All Systems Operational
        </Badge>
      </div>

      {/* Environmental Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{currentMetrics.temperature.value}°C</div>
                <p className={`text-xs ${getStatusColor(currentMetrics.temperature.status)}`}>
                  {currentMetrics.temperature.status}
                </p>
              </div>
              {getTrendIcon(currentMetrics.temperature.trend)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Humidity</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{currentMetrics.humidity.value}%</div>
                <p className={`text-xs ${getStatusColor(currentMetrics.humidity.status)}`}>
                  {currentMetrics.humidity.status}
                </p>
              </div>
              {getTrendIcon(currentMetrics.humidity.trend)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Soil pH</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{currentMetrics.pH.value}</div>
                <p className={`text-xs ${getStatusColor(currentMetrics.pH.status)}`}>
                  {currentMetrics.pH.status}
                </p>
              </div>
              {getTrendIcon(currentMetrics.pH.trend)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-card transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sunlight Hours</CardTitle>
            <Sun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{currentMetrics.sunlight.value}h</div>
                <p className={`text-xs ${getStatusColor(currentMetrics.sunlight.status)}`}>
                  {currentMetrics.sunlight.status}
                </p>
              </div>
              {getTrendIcon(currentMetrics.sunlight.trend)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Environmental Trends */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Environmental Trends (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={environmentalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line type="monotone" dataKey="temperature" stroke="hsl(var(--primary))" strokeWidth={2} name="Temperature (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="hsl(var(--accent))" strokeWidth={2} name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crop Growth Progress */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Crop Growth Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cropGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Area type="monotone" dataKey="lettuce" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success) / 0.3)" name="Lettuce %" />
                <Area type="monotone" dataKey="tomatoes" stackId="1" stroke="hsl(var(--accent))" fill="hsl(var(--accent) / 0.3)" name="Tomatoes %" />
                <Area type="monotone" dataKey="herbs" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.3)" name="Herbs %" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Harvest Distribution */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Harvest Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={harvestData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {harvestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {harvestData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Alerts & Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />}
                  {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-success mt-0.5" />}
                  {alert.type === 'info' && <Activity className="w-5 h-5 text-primary mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;