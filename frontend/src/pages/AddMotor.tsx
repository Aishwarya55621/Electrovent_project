import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const motorTypes = [
  'Induction Motor',
  'Synchronous Motor',
  'DC Motor',
  'Servo Motor',
  'Stepper Motor',
  'Other',
];

export default function AddMotor() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !location.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Motor name and location are required',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // In production, this would call motorsApi.create()
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: 'Motor Added',
        description: `${name} has been successfully added to the system`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add motor. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Add New Motor</CardTitle>
          <CardDescription>
            Register a new motor to the monitoring system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Motor Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Motor A-101"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g., Production Line 1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Motor Type (Optional)</Label>
              <Select value={type} onValueChange={setType} disabled={isLoading}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select motor type" />
                </SelectTrigger>
                <SelectContent>
                  {motorTypes.map((motorType) => (
                    <SelectItem key={motorType} value={motorType}>
                      {motorType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Motor'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
