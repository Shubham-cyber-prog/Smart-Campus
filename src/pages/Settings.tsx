import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Database, 
  Globe,
  Save,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  Clock,
  Calendar,
  Globe as World,
  Download,
  Upload,
  Trash2,
  Check,
  X,
  ChevronRight,
  AlertTriangle,
  Server,
  Users,
  Key,
  LogOut,
  Search
} from 'lucide-react';

export function Settings() {
  // State for various settings
  const [activeSection, setActiveSection] = useState('security');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    emergency: true
  });
  const [backupSchedule, setBackupSchedule] = useState('daily');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC+05:30');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [campusName, setCampusName] = useState('Central University Campus');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ipAddresses, setIpAddresses] = useState(['192.168.1.1', '10.0.0.1']);
  const [newIpAddress, setNewIpAddress] = useState('');
  const [retentionPeriod, setRetentionPeriod] = useState(365);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedChanges, setSavedChanges] = useState(false);
  const [activeUsers, setActiveUsers] = useState(42);

  // Settings sections with enhanced data
  const settingsSections = [
    {
      id: 'security',
      icon: Shield,
      title: 'Security & Access',
      description: 'Manage authentication, passwords, and access control',
      items: [
        { id: '2fa', label: 'Two-factor authentication', value: twoFactorEnabled, type: 'toggle', icon: Key },
        { id: 'password', label: 'Password policy', value: 'Strong', type: 'badge', icon: Lock },
        { id: 'session', label: 'Session timeout', value: `${sessionTimeout} minutes`, type: 'slider', icon: Clock },
        { id: 'ip', label: 'IP whitelist', value: `${ipAddresses.length} IPs`, type: 'list', icon: Globe },
        { id: 'logout', label: 'Force logout all users', value: `${activeUsers} active users`, type: 'action', icon: LogOut, action: 'forceLogout' }
      ]
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Notifications',
      description: 'Configure notification channels and preferences',
      items: [
        { id: 'email', label: 'Email notifications', value: notifications.email, type: 'toggle', icon: Mail },
        { id: 'sms', label: 'SMS alerts', value: notifications.sms, type: 'toggle', icon: Smartphone },
        { id: 'push', label: 'Push notifications', value: notifications.push, type: 'toggle', icon: Bell },
        { id: 'emergency', label: 'Emergency alerts', value: notifications.emergency, type: 'toggle', icon: AlertTriangle }
      ]
    },
    {
      id: 'data',
      icon: Database,
      title: 'Data & Backup',
      description: 'Database management and backup configuration',
      items: [
        { id: 'backup', label: 'Automatic backups', value: backupSchedule, type: 'select', icon: Database, options: ['hourly', 'daily', 'weekly', 'monthly'] },
        { id: 'retention', label: 'Data retention', value: `${retentionPeriod} days`, type: 'slider', icon: Calendar },
        { id: 'export', label: 'Export data', value: 'Last export: 2 days ago', type: 'action', icon: Download, action: 'exportData' },
        { id: 'import', label: 'Import data', value: 'Ready for import', type: 'action', icon: Upload, action: 'importData' }
      ]
    },
    {
      id: 'general',
      icon: Globe,
      title: 'General Settings',
      description: 'System-wide preferences and configurations',
      items: [
        { id: 'campus', label: 'Campus name', value: campusName, type: 'input', icon: Globe },
        { id: 'timezone', label: 'Time zone', value: timezone, type: 'select', icon: Clock, options: ['UTC', 'UTC+05:30', 'UTC-05:00', 'UTC+01:00', 'UTC+08:00'] },
        { id: 'language', label: 'Language', value: language === 'en' ? 'English' : 'Spanish', type: 'select', icon: World, options: ['English', 'Spanish', 'French', 'German'] },
        { id: 'date', label: 'Date format', value: dateFormat, type: 'select', icon: Calendar, options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD MMM YYYY'] }
      ]
    }
  ];

  // System information data
  const systemInfo = [
    { label: 'Application Version', value: 'v2.5.1', status: 'latest', icon: SettingsIcon },
    { label: 'Database Version', value: 'PostgreSQL 14.5', status: 'connected', icon: Database },
    { label: 'Last Updated', value: 'December 12, 2025', status: 'info', icon: Calendar },
    { label: 'Server Status', value: 'All systems operational', status: 'healthy', icon: Server },
    { label: 'Active Users', value: `${activeUsers} users`, status: 'info', icon: Users },
    { label: 'Uptime', value: '99.8%', status: 'healthy', icon: Clock }
  ];

  // Handle setting changes
  const handleSettingChange = (sectionId, itemId, value) => {
    setSavedChanges(false);
    
    // Update specific setting based on section and item
    if (sectionId === 'security') {
      if (itemId === '2fa') {
        setTwoFactorEnabled(value);
      } else if (itemId === 'session') {
        setSessionTimeout(value);
      }
    } else if (sectionId === 'notifications') {
      setNotifications(prev => ({
        ...prev,
        [itemId]: value
      }));
    } else if (sectionId === 'data') {
      if (itemId === 'backup') {
        setBackupSchedule(value);
      } else if (itemId === 'retention') {
        setRetentionPeriod(value);
      }
    } else if (sectionId === 'general') {
      if (itemId === 'campus') {
        setCampusName(value);
      } else if (itemId === 'language') {
        setLanguage(value === 'English' ? 'en' : value === 'Spanish' ? 'es' : value === 'French' ? 'fr' : 'de');
      } else if (itemId === 'timezone') {
        setTimezone(value);
      } else if (itemId === 'date') {
        setDateFormat(value);
      }
    }
  };

  // Handle action buttons
  const handleAction = (action) => {
    switch(action) {
      case 'forceLogout':
        alert(`Force logout initiated for ${activeUsers} active users`);
        setActiveUsers(0);
        break;
      case 'exportData':
        alert('Data export started. You will receive a notification when complete.');
        break;
      case 'importData':
        alert('Please select a file to import data');
        break;
      default:
        break;
    }
  };

  // Add new IP address
  const addIpAddress = () => {
    if (newIpAddress && /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(newIpAddress)) {
      setIpAddresses([...ipAddresses, newIpAddress]);
      setNewIpAddress('');
      setSavedChanges(false);
    }
  };

  // Remove IP address
  const removeIpAddress = (ipToRemove) => {
    setIpAddresses(ipAddresses.filter(ip => ip !== ipToRemove));
    setSavedChanges(false);
  };

  // Save all changes
  const saveAllChanges = () => {
    // Simulate API call
    setTimeout(() => {
      setSavedChanges(true);
      alert('All settings have been saved successfully!');
    }, 800);
  };

  // Reset to defaults
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      setTwoFactorEnabled(true);
      setSessionTimeout(30);
      setNotifications({
        email: true,
        sms: false,
        push: true,
        emergency: true
      });
      setBackupSchedule('daily');
      setLanguage('en');
      setTimezone('UTC+05:30');
      setDateFormat('DD/MM/YYYY');
      setCampusName('Central University Campus');
      setIpAddresses(['192.168.1.1', '10.0.0.1']);
      setRetentionPeriod(365);
      setSavedChanges(false);
      alert('All settings have been reset to default values.');
    }
  };

  // Filter settings based on search query
  const filteredSections = settingsSections.filter(section => 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.items.some(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get active section data
  const activeSectionData = settingsSections.find(section => section.id === activeSection);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Configure your campus management system</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search settings..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            
            <button
              onClick={saveAllChanges}
              disabled={savedChanges}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${savedChanges ? 'bg-green-100 text-green-800 cursor-default' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              <Save className="w-4 h-4" />
              <span>{savedChanges ? 'Saved!' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
        
        {/* Settings Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${activeSection === section.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
            >
              <section.icon className="w-4 h-4" />
              <span className="font-medium">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${activeSection === 'security' ? 'bg-red-100 text-red-600' : activeSection === 'notifications' ? 'bg-orange-100 text-orange-600' : activeSection === 'data' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                  <activeSectionData.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{activeSectionData.title}</h3>
                  <p className="text-gray-600">{activeSectionData.description}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {activeSectionData.id === 'security' && (
                <div className="space-y-6">
                  {/* Two-factor authentication */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">Two-factor authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={twoFactorEnabled}
                        onChange={(e) => handleSettingChange('security', '2fa', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  {/* Password policy */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-5 h-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">Password Policy</h4>
                        <p className="text-sm text-gray-600">Configure password requirements for all users</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 ml-8">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Minimum length: 8 characters</span>
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Require uppercase letters</span>
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Require numbers</span>
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Require special characters</span>
                        <X className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Password expiry: 90 days</span>
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    
                    <button className="mt-4 ml-8 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                      Edit Policy <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Session timeout */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-medium text-gray-900">Session Timeout</h4>
                          <p className="text-sm text-gray-600">Automatically log out inactive users after {sessionTimeout} minutes</p>
                        </div>
                      </div>
                      <span className="font-medium">{sessionTimeout} min</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="120"
                      step="5"
                      value={sessionTimeout}
                      onChange={(e) => handleSettingChange('security', 'session', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5 min</span>
                      <span>120 min</span>
                    </div>
                  </div>
                  
                  {/* IP Whitelist */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="w-5 h-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">IP Whitelist</h4>
                        <p className="text-sm text-gray-600">Restrict access to specific IP addresses</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 ml-8 mb-4">
                      {ipAddresses.map((ip, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm font-mono">{ip}</span>
                          <button
                            onClick={() => removeIpAddress(ip)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Trash2 className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="ml-8 flex gap-2">
                      <input
                        type="text"
                        placeholder="Add IP address (e.g., 192.168.1.1)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={newIpAddress}
                        onChange={(e) => setNewIpAddress(e.target.value)}
                      />
                      <button
                        onClick={addIpAddress}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  
                  {/* Force logout */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-medium text-gray-900">Force Logout All Users</h4>
                          <p className="text-sm text-gray-600">Immediately log out all {activeUsers} active users</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAction('forceLogout')}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium"
                      >
                        Force Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Other sections would have similar detailed implementations */}
              {activeSectionData.id !== 'security' && (
                <div className="space-y-6">
                  {activeSectionData.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-medium text-gray-900">{item.label}</h4>
                          <p className="text-sm text-gray-600">{item.value}</p>
                        </div>
                      </div>
                      
                      {item.type === 'toggle' && (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={item.value}
                            onChange={(e) => handleSettingChange(activeSectionData.id, item.id, e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      )}
                      
                      {item.type === 'select' && (
                        <select
                          value={item.value}
                          onChange={(e) => handleSettingChange(activeSectionData.id, item.id, e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          {item.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      )}
                      
                      {item.type === 'action' && (
                        <button
                          onClick={() => handleAction(item.action)}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium"
                        >
                          {item.label.includes('Export') ? 'Export Now' : item.label.includes('Import') ? 'Import' : 'Execute'}
                        </button>
                      )}
                      
                      {item.type === 'badge' && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          {item.value}
                        </span>
                      )}
                      
                      {item.type === 'input' && (
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => handleSettingChange(activeSectionData.id, item.id, e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar with all settings overview and system info */}
        <div className="space-y-6">
          {/* All Settings Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">All Settings</h3>
            <div className="space-y-4">
              {filteredSections.map((section) => (
                <div 
                  key={section.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${activeSection === section.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${activeSection === section.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                      <section.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{section.title}</h4>
                      <p className="text-sm text-gray-600 truncate">{section.description}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${activeSection === section.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* System Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <SettingsIcon className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-bold text-gray-900">System Information</h3>
            </div>
            
            <div className="space-y-4">
              {systemInfo.map((info, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <info.icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{info.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{info.value}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${info.status === 'healthy' ? 'bg-green-100 text-green-800' : info.status === 'latest' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                      {info.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Storage Used</p>
                  <p className="text-lg font-bold text-gray-900">245 GB / 500 GB</p>
                </div>
                <div className="w-24">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '49%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">49% used</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Export All Settings</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Upload className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Import Settings</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Audit Logs</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Password policy updated</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">By: Admin User</span>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Notification settings modified</p>
                <p className="text-xs text-gray-500">Yesterday, 4:30 PM</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">By: System Admin</span>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Database backup scheduled</p>
                <p className="text-xs text-gray-500">Dec 10, 2025</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">Auto</span>
          </div>
        </div>
      </div>
    </div>
  );
}