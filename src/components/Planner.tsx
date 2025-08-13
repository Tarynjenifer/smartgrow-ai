import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarIcon, Plus, Edit, Trash2, Sprout, Droplets, Scissors, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  type: 'planting' | 'watering' | 'harvesting' | 'maintenance';
  crop: string;
  zone: string;
  date: Date;
  status: 'pending' | 'in-progress' | 'completed';
  notes?: string;
}

const Planner = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Plant Lettuce Seeds',
      type: 'planting',
      crop: 'Lettuce',
      zone: 'Zone A',
      date: new Date(2024, 11, 20),
      status: 'completed',
      notes: 'Planted in rows 1-3'
    },
    {
      id: '2',
      title: 'Water Tomato Plants',
      type: 'watering',
      crop: 'Tomatoes',
      zone: 'Zone B',
      date: new Date(2024, 11, 22),
      status: 'in-progress',
      notes: 'Check soil moisture before watering'
    },
    {
      id: '3',
      title: 'Harvest Herbs',
      type: 'harvesting',
      crop: 'Basil',
      zone: 'Zone C',
      date: new Date(2024, 11, 25),
      status: 'pending',
      notes: 'Ready for first harvest'
    },
    {
      id: '4',
      title: 'System Maintenance',
      type: 'maintenance',
      crop: 'All',
      zone: 'All Zones',
      date: new Date(2024, 11, 28),
      status: 'pending',
      notes: 'Monthly system check and cleaning'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    type: 'planting' as Task['type'],
    crop: '',
    zone: '',
    date: new Date(),
    notes: ''
  });

  const taskTypeIcons = {
    planting: <Sprout className="w-4 h-4" />,
    watering: <Droplets className="w-4 h-4" />,
    harvesting: <Scissors className="w-4 h-4" />,
    maintenance: <CheckCircle className="w-4 h-4" />
  };

  const taskTypeColors = {
    planting: 'bg-success/10 text-success border-success/20',
    watering: 'bg-sky/10 text-sky border-sky/20',
    harvesting: 'bg-accent/10 text-accent border-accent/20',
    maintenance: 'bg-primary/10 text-primary border-primary/20'
  };

  const statusColors = {
    pending: 'bg-warning/10 text-warning border-warning/20',
    'in-progress': 'bg-primary/10 text-primary border-primary/20',
    completed: 'bg-success/10 text-success border-success/20'
  };

  const handleSaveTask = () => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...editingTask, ...newTask }
          : task
      ));
    } else {
      const task: Task = {
        ...newTask,
        id: Date.now().toString(),
        status: 'pending'
      };
      setTasks([...tasks, task]);
    }
    
    setIsDialogOpen(false);
    setEditingTask(null);
    setNewTask({
      title: '',
      type: 'planting',
      crop: '',
      zone: '',
      date: new Date(),
      notes: ''
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      type: task.type,
      crop: task.crop,
      zone: task.zone,
      date: task.date,
      notes: task.notes || ''
    });
    setIsDialogOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  const upcomingTasks = tasks.filter(task => task.status !== 'completed').slice(0, 3);
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Farm Planner</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Task Type</Label>
                  <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value as Task['type'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planting">Planting</SelectItem>
                      <SelectItem value="watering">Watering</SelectItem>
                      <SelectItem value="harvesting">Harvesting</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="crop">Crop</Label>
                  <Input
                    id="crop"
                    value={newTask.crop}
                    onChange={(e) => setNewTask({ ...newTask, crop: e.target.value })}
                    placeholder="e.g., Lettuce"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zone">Zone</Label>
                  <Select value={newTask.zone} onValueChange={(value) => setNewTask({ ...newTask, zone: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Zone A">Zone A</SelectItem>
                      <SelectItem value="Zone B">Zone B</SelectItem>
                      <SelectItem value="Zone C">Zone C</SelectItem>
                      <SelectItem value="All Zones">All Zones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newTask.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTask.date ? format(newTask.date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newTask.date}
                        onSelect={(date) => date && setNewTask({ ...newTask, date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  placeholder="Add any additional notes..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveTask} className="flex-1">
                  {editingTask ? 'Update Task' : 'Add Task'}
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                <p className="text-3xl font-bold text-warning">{pendingTasks}</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-primary">{tasks.filter(t => t.status === 'in-progress').length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-success">{completedTasks}</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", taskTypeColors[task.type])}>
                    {taskTypeIcons[task.type]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{task.title}</h4>
                      <Badge className={statusColors[task.status]}>{task.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.crop} • {task.zone}</p>
                    <p className="text-sm text-muted-foreground">{format(task.date, 'MMM dd, yyyy')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditTask(task)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteTask(task.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Tasks */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", taskTypeColors[task.type])}>
                      {taskTypeIcons[task.type]}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{format(task.date, 'MMM dd')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={task.status} onValueChange={(value) => handleStatusChange(task.id, value as Task['status'])}>
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
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

export default Planner;