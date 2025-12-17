import { useEffect, useState, useRef } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Send, 
  Bell, 
  Clock, 
  Users, 
  Filter, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Calendar, 
  Paperclip,
  Eye,
  BarChart3,
  Target,
  Mail,
  Smartphone,
  Volume2,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Copy,
  History,
  Download,
  Upload,
  BellRing,
  Archive,
  Settings,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  ArrowUp
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Broadcast {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  target_audience: string[];
  channels: string[];
  scheduled_for: string | null;
  created_at: string;
  sent_at: string | null;
  read_count: number;
  profiles?: { full_name: string; avatar_url: string };
}

interface Template {
  id: string;
  name: string;
  content: string;
  type: string;
  used_count: number;
}

export function Communication() {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Emergency Alert',
      content: 'URGENT: Due to unforeseen circumstances, all classes are canceled for today. Please stay safe and check your email for updates.',
      type: 'emergency',
      used_count: 12
    },
    {
      id: '2',
      name: 'Maintenance Notice',
      content: 'Scheduled maintenance will occur on Saturday from 2 AM to 6 AM. The system will be unavailable during this time.',
      type: 'maintenance',
      used_count: 8
    },
    {
      id: '3',
      name: 'Event Announcement',
      content: 'Join us for the Annual Campus Fest this Friday! Food, games, and entertainment await. Register now to participate.',
      type: 'event',
      used_count: 15
    },
    {
      id: '4',
      name: 'Academic Update',
      content: 'Final exam schedule has been posted on the portal. Please check your timetable and prepare accordingly.',
      type: 'academic',
      used_count: 20
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    sentToday: 0,
    highPriority: 0,
    scheduled: 0,
    readRate: 0,
    engagement: 0
  });
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showNewBroadcastModal, setShowNewBroadcastModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedBroadcast, setSelectedBroadcast] = useState<Broadcast | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('12:00');
  
  const [newBroadcast, setNewBroadcast] = useState({
    title: '',
    message: '',
    type: 'announcement',
    priority: 'medium',
    target_audience: ['all'],
    channels: ['email'],
    scheduled_for: null as Date | null,
    status: 'draft'
  });

  // Sample analytics data
  const [analytics] = useState({
    totalRecipients: 1250,
    openRate: 78,
    clickRate: 42,
    deliveryRate: 99.2,
    topAudience: 'Students',
    peakTime: '10:00 AM',
    popularChannel: 'Email'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadBroadcasts();
    calculateStats();
    
    // Close date picker when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    calculateStats();
  }, [broadcasts]);

  const loadBroadcasts = async () => {
    try {
      // Mock data for demonstration
      const mockBroadcasts: Broadcast[] = [
        {
          id: '1',
          title: 'Campus Power Maintenance',
          message: 'There will be a scheduled power maintenance in Block A from 10 PM to 2 AM.',
          type: 'maintenance',
          priority: 'high',
          status: 'sent',
          target_audience: ['all'],
          channels: ['email', 'push'],
          scheduled_for: null,
          created_at: new Date().toISOString(),
          sent_at: new Date().toISOString(),
          read_count: 850,
          profiles: { full_name: 'Admin User', avatar_url: '' }
        },
        {
          id: '2',
          title: 'Annual Sports Day',
          message: 'Annual Sports Day is scheduled for next Friday. All students are encouraged to participate.',
          type: 'event',
          priority: 'medium',
          status: 'scheduled',
          target_audience: ['students'],
          channels: ['email', 'sms'],
          scheduled_for: new Date(Date.now() + 86400000 * 2).toISOString(),
          created_at: new Date().toISOString(),
          sent_at: null,
          read_count: 0,
          profiles: { full_name: 'Sports Dept', avatar_url: '' }
        },
        {
          id: '3',
          title: 'Library Closure Notice',
          message: 'The main library will be closed this Saturday for renovation work.',
          type: 'announcement',
          priority: 'medium',
          status: 'draft',
          target_audience: ['students', 'faculty'],
          channels: ['email'],
          scheduled_for: null,
          created_at: new Date().toISOString(),
          sent_at: null,
          read_count: 0,
          profiles: { full_name: 'Library Admin', avatar_url: '' }
        },
        {
          id: '4',
          title: 'Emergency Weather Alert',
          message: 'Severe weather warning for tomorrow. All outdoor activities are canceled.',
          type: 'emergency',
          priority: 'urgent',
          status: 'sent',
          target_audience: ['all'],
          channels: ['email', 'sms', 'push', 'announcement'],
          scheduled_for: null,
          created_at: new Date().toISOString(),
          sent_at: new Date().toISOString(),
          read_count: 1200,
          profiles: { full_name: 'Security Office', avatar_url: '' }
        }
      ];
      
      setBroadcasts(mockBroadcasts);
      
      // Real Supabase call (commented out for now)
      /*
      const { data, error } = await supabase
        .from('broadcasts')
        .select('*, profiles(full_name, avatar_url)')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setBroadcasts(data || []);
      */
    } catch (error) {
      console.error('Error loading broadcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const today = new Date().toDateString();
    const sentToday = broadcasts.filter(b => 
      b.sent_at && new Date(b.sent_at).toDateString() === today
    ).length;
    
    const highPriority = broadcasts.filter(b => 
      b.priority === 'urgent' || b.priority === 'high'
    ).length;
    
    const scheduled = broadcasts.filter(b => b.status === 'scheduled').length;
    
    const totalRead = broadcasts.reduce((sum, b) => sum + b.read_count, 0);
    const totalSent = broadcasts.filter(b => b.status === 'sent').length;
    const readRate = totalSent > 0 ? Math.round((totalRead / (totalSent * 1250)) * 100) : 0;
    
    setStats({
      total: broadcasts.length,
      sentToday,
      highPriority,
      scheduled,
      readRate,
      engagement: Math.round(readRate * 0.8)
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      emergency: 'bg-red-100 text-red-800 border-red-200',
      announcement: 'bg-blue-100 text-blue-800 border-blue-200',
      event: 'bg-green-100 text-green-800 border-green-200',
      maintenance: 'bg-amber-100 text-amber-800 border-amber-200',
      academic: 'bg-purple-100 text-purple-800 border-purple-200',
      alert: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      urgent: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-blue-500',
      low: 'bg-gray-500'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      sent: <CheckCircle2 className="w-4 h-4 text-green-500" />,
      scheduled: <Clock className="w-4 h-4 text-blue-500" />,
      draft: <Edit className="w-4 h-4 text-gray-500" />,
      failed: <AlertCircle className="w-4 h-4 text-red-500" />
    };
    return icons[status as keyof typeof icons];
  };

  const getChannelIcon = (channel: string) => {
    const icons = {
      email: <Mail className="w-4 h-4" />,
      sms: <Smartphone className="w-4 h-4" />,
      push: <Bell className="w-4 h-4" />,
      announcement: <Volume2 className="w-4 h-4" />
    };
    return icons[channel as keyof typeof icons] || <Send className="w-4 h-4" />;
  };

  const filteredBroadcasts = broadcasts.filter(broadcast => {
    if (activeTab !== 'all' && broadcast.status !== activeTab) return false;
    if (filterType !== 'all' && broadcast.type !== filterType) return false;
    if (filterPriority !== 'all' && broadcast.priority !== filterPriority) return false;
    if (searchQuery && !broadcast.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !broadcast.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleCreateBroadcast = async () => {
    try {
      const broadcastData = {
        ...newBroadcast,
        scheduled_for: newBroadcast.scheduled_for?.toISOString() || null,
        status: newBroadcast.scheduled_for ? 'scheduled' : 'draft'
      };

      // Mock creation
      const newId = `broadcast-${Date.now()}`;
      const newBroadcastItem: Broadcast = {
        id: newId,
        title: newBroadcast.title,
        message: newBroadcast.message,
        type: newBroadcast.type,
        priority: newBroadcast.priority,
        status: newBroadcast.scheduled_for ? 'scheduled' : 'draft',
        target_audience: newBroadcast.target_audience,
        channels: newBroadcast.channels,
        scheduled_for: newBroadcast.scheduled_for?.toISOString() || null,
        created_at: new Date().toISOString(),
        sent_at: null,
        read_count: 0,
        profiles: { full_name: 'Current User', avatar_url: '' }
      };

      setBroadcasts([newBroadcastItem, ...broadcasts]);
      setShowNewBroadcastModal(false);
      resetNewBroadcast();
      alert('Broadcast created successfully!');
      
      /*
      // Real Supabase call
      const { data, error } = await supabase
        .from('broadcasts')
        .insert([broadcastData])
        .select()
        .single();

      if (error) throw error;
      
      setBroadcasts([data, ...broadcasts]);
      setShowNewBroadcastModal(false);
      resetNewBroadcast();
      alert('Broadcast created successfully!');
      */
    } catch (error) {
      console.error('Error creating broadcast:', error);
      alert('Failed to create broadcast');
    }
  };

  const handleSendNow = async (broadcastId: string) => {
    try {
      setBroadcasts(broadcasts.map(b => 
        b.id === broadcastId 
          ? { ...b, status: 'sent', sent_at: new Date().toISOString() }
          : b
      ));
      alert('Broadcast sent successfully!');
      
      /*
      const { error } = await supabase
        .from('broadcasts')
        .update({ 
          status: 'sent',
          sent_at: new Date().toISOString()
        })
        .eq('id', broadcastId);

      if (error) throw error;
      
      setBroadcasts(broadcasts.map(b => 
        b.id === broadcastId 
          ? { ...b, status: 'sent', sent_at: new Date().toISOString() }
          : b
      ));
      alert('Broadcast sent successfully!');
      */
    } catch (error) {
      console.error('Error sending broadcast:', error);
      alert('Failed to send broadcast');
    }
  };

  const handleDeleteBroadcast = async (broadcastId: string) => {
    if (!confirm('Are you sure you want to delete this broadcast?')) return;
    
    try {
      setBroadcasts(broadcasts.filter(b => b.id !== broadcastId));
      alert('Broadcast deleted successfully!');
      
      /*
      const { error } = await supabase
        .from('broadcasts')
        .delete()
        .eq('id', broadcastId);

      if (error) throw error;
      
      setBroadcasts(broadcasts.filter(b => b.id !== broadcastId));
      alert('Broadcast deleted successfully!');
      */
    } catch (error) {
      console.error('Error deleting broadcast:', error);
      alert('Failed to delete broadcast');
    }
  };

  const handleUseTemplate = (template: Template) => {
    setNewBroadcast({
      ...newBroadcast,
      message: template.content,
      type: template.type,
      title: template.name.includes('Emergency') ? 'Emergency Alert' : template.name
    });
    setShowTemplatesModal(false);
  };

  const resetNewBroadcast = () => {
    setNewBroadcast({
      title: '',
      message: '',
      type: 'announcement',
      priority: 'medium',
      target_audience: ['all'],
      channels: ['email'],
      scheduled_for: null,
      status: 'draft'
    });
    setSelectedDate(null);
    setSelectedTime('12:00');
  };

  const exportBroadcasts = () => {
    const dataStr = JSON.stringify(broadcasts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `broadcasts_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Custom Date Picker Component
  const CustomDatePicker = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const quickDates = [
      { label: 'Today', date: today },
      { label: 'Tomorrow', date: tomorrow },
      { label: 'Next Week', date: nextWeek }
    ];

    const handleDateSelect = (date: Date) => {
      setSelectedDate(date);
      setNewBroadcast({ ...newBroadcast, scheduled_for: date });
    };

    const handleTimeChange = (time: string) => {
      setSelectedTime(time);
      if (selectedDate) {
        const [hours, minutes] = time.split(':');
        const newDate = new Date(selectedDate);
        newDate.setHours(parseInt(hours), parseInt(minutes));
        setNewBroadcast({ ...newBroadcast, scheduled_for: newDate });
      }
    };

    return (
      <div ref={datePickerRef} className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Quick Select</h4>
          <div className="space-y-2">
            {quickDates.map((quickDate) => (
              <button
                key={quickDate.label}
                onClick={() => handleDateSelect(quickDate.date)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                {quickDate.label} ({quickDate.date.toLocaleDateString()})
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Select Date</h4>
          <input
            type="date"
            min={today.toISOString().split('T')[0]}
            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              const date = new Date(e.target.value);
              setSelectedDate(date);
              setNewBroadcast({ ...newBroadcast, scheduled_for: date });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Select Time</h4>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t">
          <button
            onClick={() => {
              setSelectedDate(null);
              setSelectedTime('12:00');
              setNewBroadcast({ ...newBroadcast, scheduled_for: null });
            }}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Clear
          </button>
          <button
            onClick={() => setShowDatePicker(false)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  const audienceOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'students', label: 'Students Only' },
    { value: 'faculty', label: 'Faculty Only' },
    { value: 'staff', label: 'Staff Only' },
    { value: 'parents', label: 'Parents' },
    { value: 'admins', label: 'Administrators' }
  ];

  const channelOptions = [
    { value: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { value: 'sms', label: 'SMS', icon: <Smartphone className="w-4 h-4" /> },
    { value: 'push', label: 'Push Notification', icon: <Bell className="w-4 h-4" /> },
    { value: 'announcement', label: 'Announcement Board', icon: <Volume2 className="w-4 h-4" /> }
  ];

  const typeOptions = [
    { value: 'announcement', label: 'Announcement', color: 'bg-blue-500' },
    { value: 'emergency', label: 'Emergency', color: 'bg-red-500' },
    { value: 'event', label: 'Event', color: 'bg-green-500' },
    { value: 'maintenance', label: 'Maintenance', color: 'bg-amber-500' },
    { value: 'academic', label: 'Academic', color: 'bg-purple-500' },
    { value: 'alert', label: 'Alert', color: 'bg-orange-500' }
  ];

  const priorityOptions = [
    { value: 'urgent', label: 'Urgent', color: 'bg-red-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
    { value: 'medium', label: 'Medium', color: 'bg-blue-500' },
    { value: 'low', label: 'Low', color: 'bg-gray-500' }
  ];

  const timeOptions = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Communication Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Communication Center</h1>
            <p className="text-gray-600 mt-1">Manage campus-wide communications, notifications, and announcements</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAnalyticsModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </button>
            
            <button
              onClick={() => setShowTemplatesModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>Templates</span>
            </button>
            
            <button
              onClick={exportBroadcasts}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            
            <button
              onClick={() => setShowNewBroadcastModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              New Broadcast
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Broadcasts</p>
                <p className="text-3xl font-bold mt-2">{stats.total}</p>
              </div>
              <Send className="w-8 h-8 opacity-90" />
            </div>
            <div className="mt-4 text-sm opacity-90">
              <span className="inline-flex items-center gap-1">
                <ArrowUp className="w-4 h-4" />
                {stats.sentToday} sent today
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Engagement Rate</p>
                <p className="text-3xl font-bold mt-2">{stats.readRate}%</p>
              </div>
              <Eye className="w-8 h-8 opacity-90" />
            </div>
            <div className="mt-4">
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full" 
                  style={{ width: `${stats.readRate}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">High Priority</p>
                <p className="text-3xl font-bold mt-2">{stats.highPriority}</p>
              </div>
              <BellRing className="w-8 h-8 opacity-90" />
            </div>
            <div className="mt-4 text-sm opacity-90">
              {stats.scheduled > 0 && `${stats.scheduled} scheduled`}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Templates</p>
                <p className="text-3xl font-bold mt-2">{templates.length}</p>
              </div>
              <Sparkles className="w-8 h-8 opacity-90" />
            </div>
            <div className="mt-4 text-sm opacity-90">
              Most used: {templates[0]?.name || 'None'}
            </div>
          </div>
        </div>

        {/* Filters and Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                All Broadcasts
              </button>
              <button
                onClick={() => setActiveTab('draft')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'draft' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <Edit className="w-4 h-4" />
                Drafts ({broadcasts.filter(b => b.status === 'draft').length})
              </button>
              <button
                onClick={() => setActiveTab('scheduled')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'scheduled' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <Clock className="w-4 h-4" />
                Scheduled ({broadcasts.filter(b => b.status === 'scheduled').length})
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'sent' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Sent ({broadcasts.filter(b => b.status === 'sent').length})
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search broadcasts..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Types</option>
                {typeOptions.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Priorities</option>
                {priorityOptions.map(priority => (
                  <option key={priority.value} value={priority.value}>{priority.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcasts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Broadcasts</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{filteredBroadcasts.length} items</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title & Message</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channels</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBroadcasts.map((broadcast) => (
                <tr key={broadcast.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 mt-2 rounded-full ${getPriorityColor(broadcast.priority)}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 truncate">{broadcast.title}</h4>
                          {broadcast.priority === 'urgent' && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">URGENT</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{broadcast.message}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>{new Date(broadcast.created_at).toLocaleString()}</span>
                          {broadcast.profiles && (
                            <span className="flex items-center gap-1">
                              By: {broadcast.profiles.full_name}
                            </span>
                          )}
                          {broadcast.read_count > 0 && (
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" /> {broadcast.read_count} reads
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs px-3 py-1.5 rounded-full border ${getTypeColor(broadcast.type)}`}>
                      {broadcast.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {broadcast.target_audience.slice(0, 2).map(audience => (
                        <span key={audience} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {audience}
                        </span>
                      ))}
                      {broadcast.target_audience.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          +{broadcast.target_audience.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {broadcast.channels.map(channel => (
                        <div key={channel} className="p-1.5 bg-gray-100 rounded-lg">
                          {getChannelIcon(channel)}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(broadcast.status)}
                      <span className="capitalize">{broadcast.status}</span>
                      {broadcast.scheduled_for && (
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(broadcast.scheduled_for).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {broadcast.status === 'draft' && (
                        <button
                          onClick={() => handleSendNow(broadcast.id)}
                          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                        >
                          Send Now
                        </button>
                      )}
                      {broadcast.status === 'scheduled' && (
                        <button
                          onClick={() => handleSendNow(broadcast.id)}
                          className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                        >
                          Send Early
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteBroadcast(broadcast.id)}
                        className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBroadcasts.length === 0 && (
            <div className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No broadcasts found</p>
              <p className="text-gray-400 mb-6">Try adjusting your filters or create a new broadcast</p>
              <button
                onClick={() => setShowNewBroadcastModal(true)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Your First Broadcast
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Broadcast Modal */}
      {showNewBroadcastModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Create New Broadcast</h3>
                <p className="text-gray-600">Send a message to your campus community</p>
              </div>
              <button
                onClick={() => {
                  setShowNewBroadcastModal(false);
                  resetNewBroadcast();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Enter broadcast title..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={newBroadcast.title}
                      onChange={(e) => setNewBroadcast({...newBroadcast, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      placeholder="Write your message here..."
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      value={newBroadcast.message}
                      onChange={(e) => setNewBroadcast({...newBroadcast, message: e.target.value})}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={() => setShowTemplatesModal(true)}
                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <Sparkles className="w-4 h-4" />
                        Use Template
                      </button>
                      <span className="text-sm text-gray-500">
                        {newBroadcast.message.length}/5000 characters
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Paperclip className="w-4 h-4" />
                      Attach Files
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" />
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <CalendarDays className="w-4 h-4" />
                      Add Event
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {typeOptions.map(type => (
                        <button
                          key={type.value}
                          onClick={() => setNewBroadcast({...newBroadcast, type: type.value})}
                          className={`p-3 rounded-lg border flex items-center justify-center gap-2 ${newBroadcast.type === type.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                          <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                          <span className="text-sm">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <div className="flex flex-wrap gap-2">
                      {priorityOptions.map(priority => (
                        <button
                          key={priority.value}
                          onClick={() => setNewBroadcast({...newBroadcast, priority: priority.value})}
                          className={`px-4 py-2 rounded-lg border ${newBroadcast.priority === priority.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                          {priority.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto p-2">
                      {audienceOptions.map(audience => (
                        <label key={audience.value} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                          <input
                            type="checkbox"
                            checked={newBroadcast.target_audience.includes(audience.value)}
                            onChange={(e) => {
                              const newAudience = e.target.checked
                                ? [...newBroadcast.target_audience, audience.value]
                                : newBroadcast.target_audience.filter(a => a !== audience.value);
                              setNewBroadcast({...newBroadcast, target_audience: newAudience});
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">{audience.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Channels</label>
                    <div className="grid grid-cols-2 gap-2">
                      {channelOptions.map(channel => (
                        <button
                          key={channel.value}
                          onClick={() => {
                            const newChannels = newBroadcast.channels.includes(channel.value)
                              ? newBroadcast.channels.filter(c => c !== channel.value)
                              : [...newBroadcast.channels, channel.value];
                            setNewBroadcast({...newBroadcast, channels: newChannels});
                          }}
                          className={`p-3 rounded-lg border flex items-center justify-center gap-2 ${newBroadcast.channels.includes(channel.value) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                          {channel.icon}
                          <span className="text-sm">{channel.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule Broadcast
                    </label>
                    <button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {newBroadcast.scheduled_for ? (
                          <span>
                            {newBroadcast.scheduled_for.toLocaleDateString()} at {newBroadcast.scheduled_for.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        ) : (
                          <span className="text-gray-500">Select date and time</span>
                        )}
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                    
                    {showDatePicker && <CustomDatePicker />}
                    
                    {newBroadcast.scheduled_for && (
                      <button
                        onClick={() => {
                          setNewBroadcast({...newBroadcast, scheduled_for: null});
                          setSelectedDate(null);
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        Remove schedule
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Bell className="w-4 h-4" />
                <span>This will be sent to approximately 1,250 recipients</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowNewBroadcastModal(false);
                    resetNewBroadcast();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setNewBroadcast({...newBroadcast, status: 'draft'});
                    handleCreateBroadcast();
                  }}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                >
                  Save as Draft
                </button>
                <button
                  onClick={handleCreateBroadcast}
                  disabled={!newBroadcast.title || !newBroadcast.message}
                  className={`px-4 py-2 rounded-lg font-medium ${newBroadcast.scheduled_for ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {newBroadcast.scheduled_for ? 'Schedule Broadcast' : 'Send Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {showTemplatesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Message Templates</h3>
                  <p className="text-gray-600">Select a template to use for your broadcast</p>
                </div>
                <button
                  onClick={() => setShowTemplatesModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto p-2">
                {templates.map(template => (
                  <div 
                    key={template.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <span className="text-xs text-gray-500">{template.used_count} uses</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{template.content}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded ${getTypeColor(template.type)}`}>
                        {template.type}
                      </span>
                      <button className="text-sm text-blue-600 hover:text-blue-700">
                        Use Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalyticsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Communication Analytics</h3>
                <p className="text-gray-600">Performance metrics and insights</p>
              </div>
              <button
                onClick={() => setShowAnalyticsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">+12%</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{analytics.totalRecipients.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Recipients</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Eye className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">+5%</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{analytics.openRate}%</p>
                  <p className="text-sm text-gray-600 mt-1">Average Open Rate</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">+8%</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{analytics.clickRate}%</p>
                  <p className="text-sm text-gray-600 mt-1">Click-through Rate</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-100 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-amber-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">+0.2%</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{analytics.deliveryRate}%</p>
                  <p className="text-sm text-gray-600 mt-1">Delivery Rate</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-4">Performance by Channel</h4>
                  <div className="space-y-4">
                    {['Email', 'SMS', 'Push', 'Announcement Board'].map(channel => (
                      <div key={channel} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{channel}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 rounded-full" 
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{Math.floor(Math.random() * 100)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-4">Top Performing Broadcasts</h4>
                  <div className="space-y-4">
                    {broadcasts.slice(0, 3).map(broadcast => (
                      <div key={broadcast.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h5 className="font-medium text-gray-900">{broadcast.title}</h5>
                          <p className="text-xs text-gray-500">Sent {new Date(broadcast.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">{broadcast.read_count} reads</p>
                          <p className="text-xs text-gray-500">
                            {Math.round((broadcast.read_count / 1250) * 100)}% open rate
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}