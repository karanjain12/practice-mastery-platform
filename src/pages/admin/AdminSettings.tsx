import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Building, 
  Globe, 
  Bell, 
  Shield, 
  CreditCard, 
  Mail,
  Upload,
  Save
} from 'lucide-react';

const AdminSettings = () => {
  const [siteName, setSiteName] = useState('TechSkills Academy');
  const [siteDescription, setSiteDescription] = useState('Learn, Practice & Master Real-World Tech Skills');
  const [supportEmail, setSupportEmail] = useState('support@techskills.com');
  const [timezone, setTimezone] = useState('UTC');
  const [currency, setCurrency] = useState('USD');
  
  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newUserNotify, setNewUserNotify] = useState(true);
  const [purchaseNotify, setPurchaseNotify] = useState(true);
  const [completionNotify, setCompletionNotify] = useState(false);
  
  // Security
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  return (
    <AdminLayout title="Settings">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border shadow-sm p-1">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Platform Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Site Name</label>
                  <Input 
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Site Description</label>
                  <Textarea 
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Support Email</label>
                  <Input 
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Branding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Logo</label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload logo</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, SVG (max. 200x50px)</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Favicon</label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload favicon</p>
                    <p className="text-xs text-muted-foreground mt-1">ICO, PNG (32x32px)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Localization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                        <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Default Currency</label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Default Language</label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">New User Registrations</p>
                  <p className="text-sm text-muted-foreground">Get notified when new users sign up</p>
                </div>
                <Switch checked={newUserNotify} onCheckedChange={setNewUserNotify} />
              </div>
              
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium">Course Purchases</p>
                  <p className="text-sm text-muted-foreground">Get notified when users purchase courses or labs</p>
                </div>
                <Switch checked={purchaseNotify} onCheckedChange={setPurchaseNotify} />
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Course Completions</p>
                  <p className="text-sm text-muted-foreground">Get notified when users complete courses</p>
                </div>
                <Switch checked={completionNotify} onCheckedChange={setCompletionNotify} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="grid grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                  <Input 
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Password Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Minimum Password Length</label>
                  <Input type="number" defaultValue="8" />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Require Special Characters</p>
                    <p className="text-sm text-muted-foreground">Passwords must contain symbols</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Payment Gateway</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="font-medium mb-2">Stripe Integration</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your Stripe account to accept payments for courses and labs.
                </p>
                <Button>Connect Stripe</Button>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="font-medium mb-2">PayPal Integration</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Enable PayPal as an additional payment option.
                </p>
                <Button variant="outline">Connect PayPal</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email */}
        <TabsContent value="email">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">SMTP Host</label>
                  <Input placeholder="smtp.example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">SMTP Port</label>
                  <Input placeholder="587" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">SMTP Username</label>
                  <Input placeholder="username" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">SMTP Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">From Email</label>
                <Input placeholder="noreply@example.com" />
              </div>
              
              <Button variant="outline">Send Test Email</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
