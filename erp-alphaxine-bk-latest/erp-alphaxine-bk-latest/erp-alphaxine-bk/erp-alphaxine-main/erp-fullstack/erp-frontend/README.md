<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# Alphaxine ERP

<div align="center">
  <img src="public/img/alphaxine-logo.webp" alt="Alphaxine ERP-CRM" width="300"/>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![PHP Version](https://img.shields.io/badge/PHP-8.2+-blue.svg)](https://php.net)
  [![Laravel](https://img.shields.io/badge/Laravel-10.x-red.svg)](https://laravel.com)
  [![Vue.js](https://img.shields.io/badge/Vue.js-3.x-green.svg)](https://vuejs.org)
  
  **Next-Generation Business Management Platform**
  
  A comprehensive ERP-CRM solution designed for modern businesses to streamline operations, enhance customer relationships, and drive growth.
</div>

## 🚀 Overview

Alphaxine ERP-CRM is a powerful, all-in-one business management platform that combines Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM) capabilities. Built with modern technologies including Laravel 10, Vue.js 3, and Tailwind CSS, it provides businesses with the tools they need to manage their operations efficiently and scale effectively.

## ✨ Key Features

### 📊 **Customer Relationship Management (CRM)**
- **Lead Management**: Capture, track, and nurture leads through the entire sales pipeline
- **Opportunity Tracking**: Monitor sales opportunities with probability scoring and value estimation
- **Proposal Management**: Create, send, and track business proposals with automated workflows
- **Contact Management**: Comprehensive customer database with interaction history
- **Sales Pipeline**: Visual pipeline management with customizable stages
- **Activity Tracking**: Log calls, meetings, emails, and other customer interactions
- **Reporting & Analytics**: Advanced CRM reporting with conversion metrics and performance KPIs

### 💰 **Financial Management**
- **Invoicing**: Professional invoice creation with customizable templates
- **Payment Processing**: Multi-gateway payment integration (Stripe, PayPal, Razorpay)
- **Expense Tracking**: Comprehensive expense management with categorization
- **Tax Management**: Automated tax calculations with multi-jurisdiction support
- **Financial Reporting**: P&L statements, balance sheets, and cash flow reports
- **Multi-Currency Support**: Handle transactions in multiple currencies
- **Recurring Billing**: Automated subscription and recurring invoice management

### 📦 **Inventory & Product Management**
- **Product Catalog**: Comprehensive product and service management
- **Inventory Tracking**: Real-time stock level monitoring
- **Item Categories**: Organized product categorization system
- **Unit Management**: Flexible unit of measurement handling
- **Stock Alerts**: Automated low-stock notifications

### 👥 **User & Access Management**
- **Role-Based Access Control (RBAC)**: Granular permission system
- **Multi-User Support**: Team collaboration with defined roles
- **User Profiles**: Detailed user management with avatar support
- **Activity Logging**: Comprehensive audit trail of user actions
- **Company Management**: Multi-company support with data isolation

### 📈 **Business Intelligence & Reporting**
- **Dashboard Analytics**: Real-time business metrics and KPIs
- **Sales Reports**: Detailed sales performance analysis
- **Financial Reports**: Comprehensive financial insights
- **CRM Analytics**: Lead conversion and sales funnel analysis
- **Custom Reports**: Flexible reporting with filters and date ranges
- **Data Export**: Export reports in multiple formats (PDF, Excel, CSV)

### 🔧 **System Administration**
- **Company Settings**: Comprehensive business profile management
- **Email Configuration**: SMTP setup and email template customization
- **Backup Management**: Automated database and file backups
- **System Updates**: Built-in update mechanism
- **File Storage**: Flexible file storage options (local, cloud)
- **Notification System**: Real-time notifications and alerts

### 🌐 **Multi-Language & Localization**
- **International Support**: Multi-language interface
- **Currency Management**: Global currency support with real-time exchange rates
- **Time Zone Support**: Global time zone compatibility
- **Date Formats**: Localized date and number formatting

## 🛠 Technology Stack

### **Backend**
- **Framework**: Laravel 10.x
- **PHP**: 8.2+
- **Database**: MySQL 8.0+ / PostgreSQL
- **Authentication**: Laravel Sanctum
- **Queue System**: Redis/Database queues
- **Storage**: Local/S3/Digital Ocean Spaces

### **Frontend**
- **Framework**: Vue.js 3.x (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.x
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Components**: Custom component library

### **Development Tools**
- **Code Quality**: PHP CS Fixer, ESLint, Prettier
- **Testing**: PHPUnit, Pest
- **Package Manager**: Composer, NPM
- **Version Control**: Git

## 📋 System Requirements

### **Server Requirements**
- **PHP**: 8.2 or higher
- **Extensions**: OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath, GD/Imagick
- **Database**: MySQL 8.0+ or PostgreSQL 12+
- **Web Server**: Apache 2.4+ or Nginx 1.18+
- **Memory**: 512MB RAM minimum (2GB recommended)
- **Storage**: 10GB available space

### **Development Environment**
- **Node.js**: 18.x or higher
- **NPM**: 8.x or higher
- **Composer**: 2.x
- **Git**: Latest version

## 🚀 Installation


```bash
# Clone the repository
git clone https://github.com/your-organization/alphaxine-erp.git
cd alphaxine-erp

# Start with Docker
docker-compose up -d

# Access the application
open http://localhost:8000
```

### **Manual Installation**

#### **1. Clone and Setup**
```bash
# Clone the repository
cd alphaxine-erp

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

#### **2. Environment Configuration**
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=alphaxine_erp
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### **3. Database Setup**
```bash
# Run migrations
php artisan migrate

# Seed the database
php artisan db:seed

# Create storage link
php artisan storage:link
```

#### **4. Build Assets**
```bash
# Development build
npm run dev

# Production build
npm run build
```

#### **5. Start the Application**
```bash
# Start the development server
php artisan serve

# Or use the included batch file
./start-server.bat
```


```

## 📱 Usage

### **Getting Started**
1. **Setup Company Profile**: Configure your business information, logo, and settings
2. **Add Users**: Create user accounts and assign appropriate roles
3. **Configure Products/Services**: Set up your product catalog
4. **Import Customers**: Add your existing customer database
5. **Start Creating**: Begin with leads, opportunities, and invoices

### **CRM Workflow**
1. **Lead Capture**: Add leads from various sources (website, referrals, campaigns)
2. **Lead Qualification**: Score and qualify leads based on predefined criteria
3. **Opportunity Creation**: Convert qualified leads to sales opportunities
4. **Proposal Management**: Create and send proposals to prospects
5. **Deal Closure**: Track opportunity progress and close deals
6. **Customer Management**: Maintain ongoing customer relationships

### **Financial Management**
1. **Create Invoices**: Generate professional invoices with your branding
2. **Track Payments**: Monitor payment status and send reminders
3. **Expense Management**: Record and categorize business expenses
4. **Financial Reporting**: Generate reports for business insights
5. **Tax Compliance**: Manage tax calculations and reporting

## 🔐 Security Features

- **Authentication**: Secure user authentication with password hashing
- **Authorization**: Role-based access control with granular permissions
- **CSRF Protection**: Cross-site request forgery protection
- **SQL Injection Prevention**: Prepared statements and query builders
- **XSS Protection**: Input sanitization and output encoding
- **Data Encryption**: Sensitive data encryption at rest
- **Audit Logging**: Comprehensive activity logging for compliance
- **Session Security**: Secure session management
- **API Security**: Token-based API authentication

## 🌍 Multi-Tenant Support

Alphaxine ERP supports multi-company operations:
- **Data Isolation**: Complete separation of company data
- **Custom Branding**: Company-specific logos and themes
- **Role Management**: Company-specific user roles and permissions
- **Reporting**: Company-specific reports and analytics
- **Settings**: Independent company settings and configurations

## 📊 API Documentation

Alphaxine ERP provides a comprehensive RESTful API:

### **Authentication**
```bash
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh
```

### **CRM Endpoints**
```bash
# Leads
GET    /api/v1/crm/leads
POST   /api/v1/crm/leads
GET    /api/v1/crm/leads/{id}
PUT    /api/v1/crm/leads/{id}
DELETE /api/v1/crm/leads/{id}

# Opportunities
GET    /api/v1/crm/opportunities
POST   /api/v1/crm/opportunities
GET    /api/v1/crm/opportunities/{id}
PUT    /api/v1/crm/opportunities/{id}
DELETE /api/v1/crm/opportunities/{id}

# Proposals
GET    /api/v1/crm/proposals
POST   /api/v1/crm/proposals
GET    /api/v1/crm/proposals/{id}
PUT    /api/v1/crm/proposals/{id}
DELETE /api/v1/crm/proposals/{id}
```

### **Financial Endpoints**
```bash
# Invoices
GET    /api/v1/invoices
POST   /api/v1/invoices
GET    /api/v1/invoices/{id}
PUT    /api/v1/invoices/{id}
DELETE /api/v1/invoices/{id}

# Payments
GET    /api/v1/payments
POST   /api/v1/payments
GET    /api/v1/payments/{id}

# Expenses
GET    /api/v1/expenses
POST   /api/v1/expenses
GET    /api/v1/expenses/{id}
PUT    /api/v1/expenses/{id}
DELETE /api/v1/expenses/{id}
```

## 🧪 Testing

### **Running Tests**
```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature
php artisan test --testsuite=Unit

# Run with coverage
php artisan test --coverage

# Frontend tests
npm run test
```

### **Test Database**
```bash
# Create test database
php artisan migrate --env=testing

# Seed test data
php artisan db:seed --env=testing
```



### **Performance Optimization**
```bash
# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimize autoloader
composer dump-autoload --optimize

# Queue optimization
php artisan queue:restart
```

### **Troubleshooting**

#### **Common Issues**

**Installation Issues**
```bash
# Permission errors
sudo chown -R $USER:www-data storage
sudo chmod -R 775 storage

# Composer memory limit
php -d memory_limit=-1 /usr/local/bin/composer install
```

**Database Issues**
```bash
# Migration errors
php artisan migrate:fresh --seed

# Connection errors
php artisan config:clear
```

**Asset Building Issues**
```bash
# Node.js version issues
nvm use 18
npm install

# Build errors
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🌟 Acknowledgments

- **Laravel Team**: For the amazing PHP framework
- **Vue.js Team**: For the progressive JavaScript framework
- **Tailwind CSS**: For the utility-first CSS framework
- **All Contributors**: Thanks to everyone who has contributed to this project

---

<div align="center">
  Made with ❤️ by the Alphaxine Team
  
  **[Website](https://alphaxine.com) • [Documentation](https://docs.alphaxine.com) • [Support](mailto:support@alphaxine.com)**
</div>
>>>>>>> 370083796f17e25db7cb81a46e436adef2243417
