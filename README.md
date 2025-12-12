# Smart Campus Admin

**Smart-Campus** is a production-ready campus management system designed to make campus life smarter, faster, and more efficient.  
Built using **React, TypeScript, Vite, Supabase**, and modern web technologies.

## 🖥️ Demo

> Add your deployed Netlify / Vercel URL here once live.  
Example:  
[https://smart-campus.netlify.app](https://smart-campus.netlify.app)


## Features

### User Management
- Role-based access control (Admin, Staff, Security, Student)
- User profiles with department and contact information
- Secure authentication system with Supabase Auth

### Campus Management
- Building management with floor plans and locations
- Facility tracking (labs, libraries, cafeterias, gyms)
- Room allocation and monitoring
- Asset management and tracking

### Emergency Management
- Real-time emergency reporting and tracking
- Severity levels (Critical, High, Medium, Low)
- Emergency response team coordination
- Incident report management

### Communication Center
- Campus-wide broadcast system
- Priority-based notifications
- Multiple communication types (announcements, emergencies, events, maintenance)
- Targeted messaging to specific user roles

### Analytics & Reports
- User growth metrics
- Building utilization statistics
- Emergency response trends
- Real-time campus activity monitoring

### Settings & Configuration
- Security settings and access control
- Notification preferences
- Data backup and retention
- System customization

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   The `.env` file already contains your Supabase credentials:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Database Schema

The application uses the following main tables:

- **profiles** - User profiles with roles and information
- **buildings** - Campus buildings with locations
- **facilities** - Facilities within buildings
- **rooms** - Individual rooms
- **assets** - Campus assets and equipment
- **emergencies** - Emergency incidents
- **incident_reports** - Detailed incident documentation
- **response_teams** - Emergency response teams
- **team_members** - Team member assignments
- **notifications** - User notifications
- **broadcasts** - Campus-wide communications
- **audit_logs** - System audit trail

## Security

- Row Level Security (RLS) enabled on all tables
- Role-based access policies
- JWT-based authentication
- Secure password handling
- Audit logging for all critical operations

## Default Roles

1. **Admin**: Full system access, user management, system settings
2. **Staff**: Campus and facility management, reports
3. **Security**: Emergency management, incident reporting
4. **Student**: Limited read access to public information

## Usage

1. **Create an Account**: Navigate to `/register` and create a new account
2. **Login**: Use your credentials to log in at `/login`
3. **Dashboard**: View campus overview and recent activity
4. **Manage Users**: (Admin only) Add and manage campus users
5. **Campus Management**: Track buildings, facilities, and rooms
6. **Emergency Response**: Report and manage campus emergencies
7. **Communications**: Send campus-wide broadcasts and notifications
8. **Analytics**: View reports and insights

## Project Structure
```
SMART-CAMPUS-ADMIN/
│
├── 📁 client/                           # React Frontend Application
│   ├── 📁 public/                       # Static Assets
│   │   ├── index.html
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   ├── service-worker.js            # PWA Service Worker
│   │   ├── 📁 icons/                    # App Icons
│   │   └── 📁 images/                   # Static Images
│   │
│   ├── 📁 src/                          # Source Code
│   │   ├── 📁 assets/                   # Assets
│   │   │   ├── 📁 fonts/                # Custom Fonts
│   │   │   ├── 📁 styles/               # Global Styles
│   │   │   │   ├── global.css
│   │   │   │   ├── variables.css
│   │   │   │   └── animations.css
│   │   │   └── 📁 svgs/                 # SVG Components
│   │   │
│   │   ├── 📁 components/               # Reusable Components
│   │   │   ├── 📁 common/               # Common Components
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Table/
│   │   │   │   ├── Card/
│   │   │   │   ├── Loader/
│   │   │   │   ├── Toast/
│   │   │   │   └── Tooltip/
│   │   │   │
│   │   │   ├── 📁 layout/               # Layout Components
│   │   │   │   ├── Sidebar/
│   │   │   │   ├── Navbar/
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   └── Breadcrumb/
│   │   │   │
│   │   │   ├── 📁 forms/                # Form Components
│   │   │   │   ├── FormBuilder/
│   │   │   │   ├── FileUpload/
│   │   │   │   ├── RichTextEditor/
│   │   │   │   └── DateRangePicker/
│   │   │   │
│   │   │   ├── 📁 maps/                 # Map Components
│   │   │   │   ├── CampusMap/
│   │   │   │   ├── BuildingEditor/
│   │   │   │   ├── FloorPlan/
│   │   │   │   └── LocationPicker/
│   │   │   │
│   │   │   ├── 📁 charts/               # Chart Components
│   │   │   │   ├── ActivityChart/
│   │   │   │   ├── UtilizationChart/
│   │   │   │   └── CustomChart/
│   │   │   │
│   │   │   └── 📁 widgets/              # Dashboard Widgets
│   │   │       ├── StatsCard/
│   │   │       ├── ActivityFeed/
│   │   │       └── QuickActions/
│   │   │
│   │   ├── 📁 pages/                    # Application Pages
│   │   │   ├── 📁 Auth/                 # Authentication Pages
│   │   │   │   ├── Login/
│   │   │   │   ├── Register/
│   │   │   │   ├── ForgotPassword/
│   │   │   │   └── ResetPassword/
│   │   │   │
│   │   │   ├── 📁 Dashboard/            # Dashboard Pages
│   │   │   │   ├── Overview/
│   │   │   │   ├── Analytics/
│   │   │   │   └── CustomDashboard/
│   │   │   │
│   │   │   ├── 📁 Users/                # User Management
│   │   │   │   ├── UserList/
│   │   │   │   ├── UserCreate/
│   │   │   │   ├── UserEdit/
│   │   │   │   ├── UserProfile/
│   │   │   │   └── RolesPermissions/
│   │   │   │
│   │   │   ├── 📁 Campus/               # Campus Management
│   │   │   │   ├── Buildings/
│   │   │   │   ├── Facilities/
│   │   │   │   ├── Rooms/
│   │   │   │   ├── Assets/
│   │   │   │   └── Maps/
│   │   │   │
│   │   │   ├── 📁 Emergency/            # Emergency Management
│   │   │   │   ├── LiveAlerts/
│   │   │   │   ├── ResponseTeam/
│   │   │   │   ├── IncidentReports/
│   │   │   │   ├── EmergencyPlans/
│   │   │   │   └── Drills/
│   │   │   │
│   │   │   ├── 📁 Communication/        # Communication
│   │   │   │   ├── Notifications/
│   │   │   │   ├── Broadcasts/
│   │   │   │   ├── Announcements/
│   │   │   │   └── Templates/
│   │   │   │
│   │   │   ├── 📁 Analytics/            # Analytics & Reports
│   │   │   │   ├── Reports/
│   │   │   │   ├── Insights/
│   │   │   │   ├── Export/
│   │   │   │   └── CustomReports/
│   │   │   │
│   │   │   ├── 📁 Settings/             # System Settings
│   │   │   │   ├── General/
│   │   │   │   ├── Security/
│   │   │   │   ├── Integration/
│   │   │   │   └── Backup/
│   │   │   │
│   │   │   └── 📁 Admin/                # Admin Pages
│   │   │       ├── AuditLogs/
│   │   │       ├── SystemHealth/
│   │   │       └── APIKeys/
│   │   │
│   │   ├── 📁 hooks/                    # Custom React Hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useWebSocket.js
│   │   │   ├── useNotifications.js
│   │   │   ├── useMap.js
│   │   │   ├── useForm.js
│   │   │   └── useLocalStorage.js
│   │   │
│   │   ├── 📁 store/                    # State Management
│   │   │   ├── 📁 slices/               # Redux Slices
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── userSlice.js
│   │   │   │   ├── campusSlice.js
│   │   │   │   ├── emergencySlice.js
│   │   │   │   └── notificationSlice.js
│   │   │   ├── 📁 services/             # RTK Query Services
│   │   │   │   ├── authApi.js
│   │   │   │   ├── userApi.js
│   │   │   │   └── campusApi.js
│   │   │   └── store.js
│   │   │
│   │   ├── 📁 services/                 # API Services
│   │   │   ├── apiClient.js
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   ├── campusService.js
│   │   │   └── emergencyService.js
│   │   │
│   │   ├── 📁 utils/                    # Utility Functions
│   │   │   ├── validators.js
│   │   │   ├── formatters.js
│   │   │   ├── helpers.js
│   │   │   ├── constants.js
│   │   │   ├── enums.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── 📁 contexts/                 # React Contexts
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   │
│   │   ├── 📁 types/                    # TypeScript Types
│   │   │   ├── user.types.ts
│   │   │   ├── campus.types.ts
│   │   │   ├── emergency.types.ts
│   │   │   └── api.types.ts
│   │   │
│   │   ├── 📁 config/                   # Configuration
│   │   │   ├── routes.js
│   │   │   ├── theme.js
│   │   │   └── settings.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js                    # Vite Configuration
│   └── .env.example
│
├── 📁 server/                           # Node.js Backend
│   ├── 📁 src/                          # Source Code
│   │   ├── 📁 config/                   # Configuration
│   │   │   ├── database.js
│   │   │   ├── redis.js
│   │   │   ├── passport.js
│   │   │   ├── constants.js
│   │   │   ├── environment.js
│   │   │   └── swagger.js
│   │   │
│   │   ├── 📁 models/                   # Database Models
│   │   │   ├── User/
│   │   │   │   ├── User.js
│   │   │   │   ├── Admin.js
│   │   │   │   ├── Student.js
│   │   │   │   └── Staff.js
│   │   │   ├── Campus/
│   │   │   │   ├── Building.js
│   │   │   │   ├── Facility.js
│   │   │   │   ├── Room.js
│   │   │   │   └── Asset.js
│   │   │   ├── Emergency/
│   │   │   │   ├── Emergency.js
│   │   │   │   ├── Incident.js
│   │   │   │   └── ResponseTeam.js
│   │   │   ├── Communication/
│   │   │   │   ├── Notification.js
│   │   │   │   ├── Broadcast.js
│   │   │   │   └── Template.js
│   │   │   ├── Analytics/
│   │   │   │   ├── Report.js
│   │   │   │   ├── Log.js
│   │   │   │   └── Metric.js
│   │   │   └── System/
│   │   │       ├── AuditLog.js
│   │   │       ├── Settings.js
│   │   │       └── Backup.js
│   │   │
│   │   ├── 📁 controllers/              # Route Controllers
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── campusController.js
│   │   │   ├── emergencyController.js
│   │   │   ├── notificationController.js
│   │   │   ├── analyticsController.js
│   │   │   └── systemController.js
│   │   │
│   │   ├── 📁 routes/                   # API Routes
│   │   │   ├── 📁 v1/                   # API Version 1
│   │   │   │   ├── authRoutes.js
│   │   │   │   ├── userRoutes.js
│   │   │   │   ├── campusRoutes.js
│   │   │   │   ├── emergencyRoutes.js
│   │   │   │   └── analyticsRoutes.js
│   │   │   └── index.js
│   │   │
│   │   ├── 📁 middleware/               # Middleware
│   │   │   ├── auth.js
│   │   │   ├── roleCheck.js
│   │   │   ├── validation.js
│   │   │   ├── errorHandler.js
│   │   │   ├── logger.js
│   │   │   ├── rateLimiter.js
│   │   │   └── upload.js
│   │   │
│   │   ├── 📁 services/                 # Business Logic
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   ├── campusService.js
│   │   │   ├── emergencyService.js
│   │   │   ├── notificationService.js
│   │   │   ├── analyticsService.js
│   │   │   └── aiService.js
│   │   │
│   │   ├── 📁 utils/                    # Utilities
│   │   │   ├── jwt.js
│   │   │   ├── bcrypt.js
│   │   │   ├── validators.js
│   │   │   ├── emailTemplates.js
│   │   │   ├── pushNotification.js
│   │   │   ├── fileUpload.js
│   │   │   └── reportGenerator.js
│   │   │
│   │   ├── 📁 sockets/                  # WebSocket Handlers
│   │   │   ├── emergencySocket.js
│   │   │   ├── notificationSocket.js
│   │   │   ├── campusSocket.js
│   │   │   └── index.js
│   │   │
│   │   ├── 📁 jobs/                     # Cron Jobs
│   │   │   ├── backupJob.js
│   │   │   ├── cleanupJob.js
│   │   │   ├── notificationJob.js
│   │   │   └── reportJob.js
│   │   │
│   │   ├── 📁 scripts/                  # Utility Scripts
│   │   │   ├── seedDatabase.js
│   │   │   ├── backupDatabase.js
│   │   │   └── migrateData.js
│   │   │
│   │   ├── 📁 docs/                     # API Documentation
│   │   │   ├── swagger.json
│   │   │   └── api.yaml
│   │   │
│   │   ├── app.js
│   │   ├── server.js
│   │   └── index.js
│   │
│   ├── package.json
│   ├── .env.example
│   ├── .eslintrc.js
│   ├── .prettierrc
│   └── Dockerfile
│
├── 📁 mobile/                          # React Native Admin App
│   ├── 📁 src/
│   │   ├── 📁 screens/
│   │   ├── 📁 components/
│   │   ├── 📁 navigation/
│   │   └── 📁 utils/
│   ├── package.json
│   └── app.json
│
├── 📁 docker/                          # Docker Configuration
│   ├── Dockerfile.client
│   ├── Dockerfile.server
│   ├── Dockerfile.nginx
│   ├── docker-compose.dev.yml
│   ├── docker-compose.prod.yml
│   └── nginx.conf
│
├── 📁 docs/                           # Documentation
│   ├── 📁 api/                        # API Documentation
│   │   ├── overview.md
│   │   ├── endpoints.md
│   │   └── examples.md
│   ├── 📁 deployment/                 # Deployment Guides
│   │   ├── local.md
│   │   ├── production.md
│   │   └── aws.md
│   ├── 📁 development/                # Development Guides
│   │   ├── setup.md
│   │   ├── coding-standards.md
│   │   └── testing.md
│   ├── 📁 user-guides/                # User Manuals
│   │   ├── admin-guide.md
│   │   ├── user-guide.md
│   │   └── emergency-guide.md
│   └── 📁 architecture/               # Architecture Docs
│       ├── system-design.md
│       ├── database-design.md
│       └── security.md
│
├── 📁 tests/                          # Test Suites
│   ├── 📁 unit/
│   ├── 📁 integration/
│   ├── 📁 e2e/
│   ├── 📁 performance/
│   └── jest.config.js
│
├── 📁 scripts/                        # Build & Utility Scripts
│   ├── build.sh
│   ├── deploy.sh
│   ├── backup.sh
│   └── seed.sh
│
├── .github/                           # GitHub Configuration
│   ├── 📁 workflows/                  # GitHub Actions
│   │   ├── ci.yml
│   │   ├── cd.yml
│   │   └── security.yml
│   ├── dependabot.yml
│   └── CODEOWNERS
│
├── .husky/                           # Git Hooks
├── .vscode/                          # VS Code Settings
├── .dockerignore
├── .gitignore
├── .env.example
├── package.json                      # Root Package.json
├── README.md
└── LICENSE
```
## Contributing

This is a production-ready campus management system. When contributing:

1. Follow the existing code style
2. Write meaningful commit messages
3. Test all features before submitting
4. Ensure RLS policies are properly configured
5. Document any new features


🤝 Maintainers & Contributors

Maintained by Shubham-cyber-prog

Contributors can join via GitHub Pull Requests
.

## License

MIT License
