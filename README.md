# 💰 Personal Finance Dashboard

A modern, full-stack personal finance management application built with **Next.js**, **TypeScript**, and **MongoDB**. Track your expenses, set budgets, and visualize your financial data with beautiful charts and analytics.

## ✨ Features

### 📊 Dashboard Overview
- **Real-time financial metrics** with total expenses, budget utilization, and savings
- **Interactive charts** showing spending patterns and budget comparisons
- **Clean, modern UI** with dark theme and gradient effects

### 💳 Transaction Management
- Add, edit, and delete transactions
- Categorize expenses (Food, Transport, Entertainment, Utilities, Shopping, Health, Other)
- Date-based transaction tracking
- Real-time transaction list with search and filtering

### 🎯 Budget Management
- Set monthly budget limits by category
- Track budget vs actual spending
- Visual budget comparison charts
- Budget alerts and notifications

### 📈 Data Visualization
- **Monthly Bar Charts** - Track spending trends over time
- **Category Pie Charts** - Visualize expense distribution
- **Budget Comparison Charts** - Monitor budget performance
- Interactive chart tabs for different views

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Recharts** - Responsive chart library
- **Lucide React** - Beautiful icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### UI Components
- **Custom UI components** built with Radix UI primitives
- **Responsive design** with mobile-first approach
- **Dark theme** with gradient accents
- **Modal dialogs** for adding/editing data

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or cloud)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assignment2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/finance-dashboard
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finance-dashboard
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── budgets/       # Budget CRUD operations
│   │   └── transactions/  # Transaction CRUD operations
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── charts/           # Chart components
│   ├── layout/           # Layout components
│   ├── modals/           # Modal dialogs
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and hooks
│   ├── hooks/            # Custom React hooks
│   ├── db.ts             # Database connection
│   └── utils.ts          # Utility functions
└── model/                # MongoDB schemas
    ├── Budget.ts         # Budget model
    └── Transaction.ts    # Transaction model
```

## 🎨 Key Components

### Dashboard Cards
Displays key financial metrics including:
- Total expenses for the current month
- Budget utilization percentage
- Available budget remaining

### Transaction Management
- **TransactionList**: Displays all transactions with edit/delete functionality
- **TransactionModal**: Form for adding/editing transactions
- Real-time updates with optimistic UI

### Budget Management
- **BudgetList**: Shows budget limits by category
- **BudgetModal**: Form for setting budget limits
- Visual indicators for budget status

### Data Visualization
- **MonthlyBarChart**: Monthly spending trends
- **CategoryPieChart**: Expense breakdown by category
- **BudgetComparisonChart**: Budget vs actual spending

## 🔧 Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📊 Data Models

### Transaction
```typescript
{
  amount: number;
  description: string;
  category: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Budget
```typescript
{
  month: string;
  category: string;
  limit: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Categories
- Food
- Transport
- Entertainment
- Utilities
- Shopping
- Health
- Other

## 🌟 Features in Detail

### Real-time Updates
- Optimistic UI updates for instant feedback
- Automatic data refreshing
- Error handling with user notifications

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface

### Data Persistence
- MongoDB integration with Mongoose ODM
- Proper error handling and validation
- RESTful API design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- [ ] User authentication and multi-user support
- [ ] Export data to CSV/PDF
- [ ] Advanced filtering and search
- [ ] Budget alerts and notifications
- [ ] Recurring transactions
- [ ] Financial goals tracking
- [ ] Bank account integration
- [ ] Mobile app with React Native

---

Built with ❤️ using Next.js and TypeScript