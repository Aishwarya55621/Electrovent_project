import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Loader2, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [authMethod, setAuthMethod] = useState<'email' | 'mobile'>('email');
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const resetForm = () => {
    setIdentifier('');
    setPassword('');
    setConfirmPassword('');
  };

  const validateIdentifier = () => {
    if (authMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(identifier);
    } else {
      const mobileRegex = /^[0-9]{10,15}$/;
      return mobileRegex.test(identifier.replace(/[\s-]/g, ''));
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier || !password) {
      toast({
        title: 'Error',
        description: `Please enter ${authMethod === 'email' ? 'email' : 'mobile number'} and password`,
        variant: 'destructive',
      });
      return;
    }

    if (!validateIdentifier()) {
      toast({
        title: 'Error',
        description: `Please enter a valid ${authMethod === 'email' ? 'email address' : 'mobile number'}`,
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      await login(identifier, password);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: `Invalid ${authMethod === 'email' ? 'email' : 'mobile number'} or password`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier || !password || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (!validateIdentifier()) {
      toast({
        title: 'Error',
        description: `Please enter a valid ${authMethod === 'email' ? 'email address' : 'mobile number'}`,
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      await signup(identifier, password);
      toast({
        title: 'Account Created',
        description: 'Welcome to MotorGuard! Redirecting to dashboard...',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'Could not create account',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const AuthMethodToggle = () => (
    <div className="flex rounded-lg border border-input p-1 mb-4">
      <button
        type="button"
        onClick={() => { setAuthMethod('email'); setIdentifier(''); }}
        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          authMethod === 'email' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Mail className="h-4 w-4" />
        Email
      </button>
      <button
        type="button"
        onClick={() => { setAuthMethod('mobile'); setIdentifier(''); }}
        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          authMethod === 'mobile' 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Phone className="h-4 w-4" />
        Mobile
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <Settings className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">MotorGuard</CardTitle>
          <CardDescription>
            Predictive Maintenance System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as 'signin' | 'signup'); resetForm(); }}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <AuthMethodToggle />
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-identifier">
                    {authMethod === 'email' ? 'Email' : 'Mobile Number'}
                  </Label>
                  <Input
                    id="signin-identifier"
                    type={authMethod === 'email' ? 'email' : 'tel'}
                    placeholder={authMethod === 'email' ? 'you@company.com' : '1234567890'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Enter any {authMethod === 'email' ? 'email' : 'mobile number'} and password to access the demo
              </p>
            </TabsContent>
            
            <TabsContent value="signup">
              <AuthMethodToggle />
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-identifier">
                    {authMethod === 'email' ? 'Email' : 'Mobile Number'}
                  </Label>
                  <Input
                    id="signup-identifier"
                    type={authMethod === 'email' ? 'email' : 'tel'}
                    placeholder={authMethod === 'email' ? 'you@company.com' : '1234567890'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                By signing up, you agree to our Terms of Service
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
