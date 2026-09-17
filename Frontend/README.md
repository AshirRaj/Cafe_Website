# ☕ Cafe Adda — Modern Café Website & Management System

> **Artisanal Brews, Sourdough & Heartfelt Comfort in Bhubaneswar, Odisha.**

A full-featured, responsive **Café Web Application & Staff Admin Panel** built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Designed around the real-world operational workflow of an artisanal coffee house.

---

## 🌟 Key Highlights

### 🛍️ Customer Storefront
- **Cinematic Video Hero**: Seamless ambient video background with smooth mobile and desktop responsiveness.
- **Interactive Menu & Filtering**: Browse by categories (*Coffee, Teas, Breakfast, Sandwiches, Burgers, Snacks, Desserts, Cold Brews*) with live dietary tags (*Veg / Non-Veg*) and search.
- **Custom Add-ons & Modifiers**: Extra espresso shots, oat milk alternatives, caramel drizzle, and artisanal dips.
- **Multi-Fulfillment Checkout**:
  - **Dine-In**: Select table and enjoy contactless ordering.
  - **Takeaway**: Choose counter pickup time windows.
  - **Doorstep Delivery**: Address validation with pin code and live delivery fee calculation.
- **Coupon & Offers System**: Instant promotional codes (`WELCOME50`, `WEEKENDCOFFEE`, `FLAT100`) with dynamic subtotal discounts.
- **Live 5-Stage Order Tracking**: Real-time status progression (*New → Confirmed → Preparing → Ready → Completed*).
- **Table Reservation**: Visual guest selector, time-slot reservation, and occasion tags.

---

### 📋 Staff & Admin Panel (`/admin`)
- **Operational Dashboard**: Real-time daily gross sales, order volume, pending kitchen tickets, and low-stock alerts.
- **Kitchen Order Management**: Filter orders by status (*New, Preparing, Ready, Completed, Cancelled*) and fulfillment type with inline status progression updates.
- **Menu Management (CRUD)**: Add, edit, and delete products, toggle real-time kitchen availability (*In Stock / Out of Stock*), and manage custom add-ons.
- **Visual Table Layout**: Interactive seating grid with occupancy indicators (*Available*, *Occupied*, *Reserved*).
- **Café Inventory & Low-Stock Alerts**: Track pantry ingredients (*Arabica Beans, Whole Milk, Oat Milk, Sourdough Loaves, Packaging*) with quick `+` / `-` stock adjustments.
- **Operating Expense Ledger**: Track overheads (*Rent, Gas, Utilities, Maintenance, Packaging, Salaries*).
- **Payment Logs**: Complete transaction history with Cash, UPI, Card, and Online payment methods.
- **Performance & Sales Reports**: Filter reports by *Today*, *Last 7 Days*, and *Last 30 Days* with net profit estimation and category share bars.
- **Café Operational Settings**: Manage store address, weekly opening hours, tax percentages, and invoice numbering prefixes.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Pure JavaScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom warm café theme)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API + LocalStorage Session Persistence
- **Routing**: [React Router v6](https://reactrouter.com/)

---

## 🎨 Color Palette & Aesthetics

| Color Token | Hex Code | Purpose |
|---|---|---|
| **Cream 50 / 100** | `#FDFBF7` / `#F7F3EB` | Warm ivory & card backgrounds |
| **Espresso 800 / 900** | `#2C1810` / `#1A1412` | Headings, primary buttons, branding |
| **Coffee 600** | `#6F4E37` | Secondary accents, badges, and icons |
| **Terracotta 500** | `#C86446` | Highlights, CTA buttons, and sale tags |
| **Sage 600** | `#606C38` | Vegetarian badges & success statuses |

---

## 📂 Project Structure

```bash
frontend/
├── src/
│   ├── assets/              # Images, video background, and image registry
│   ├── components/
│   │   ├── admin/           # Reusable Admin UI (Sidebar, Header, StatCard, etc.)
│   │   ├── checkout/        # Customer info form & payment gateways
│   │   ├── common/          # Buttons, modals, badges, section headings
│   │   ├── layout/          # Customer Navbar, Footer, and Shell Layout
│   │   ├── menu/            # Menu cards, search, and category selectors
│   │   └── order/           # Order summary cards & tracking steppers
│   ├── context/
│   │   ├── AdminContext.jsx       # State for Products, Orders, Tables, Stock & Expenses
│   │   ├── CartContext.jsx        # Cart items, discounts, and customer checkout
│   │   ├── ReservationContext.jsx # Table bookings state
│   │   └── ToastContext.jsx       # Global notification toasts
│   ├── data/
│   │   ├── admin/           # Mock data (adminOrders, inventory, expenses, reports)
│   │   ├── products.js      # Café food and beverage catalog
│   │   ├── categories.js    # Menu categories
│   │   ├── tables.js        # Table layout definitions
│   │   └── cafeInfo.js      # Location, contact, and operating hours
│   ├── pages/
│   │   ├── about/           # Brand story & heritage
│   │   ├── admin/           # All 13 Admin Dashboard & Management views
│   │   ├── cart/            # Interactive shopping cart
│   │   ├── checkout/        # Multi-fulfillment checkout & success page
│   │   ├── contact/         # Store location, map, and query form
│   │   ├── home/            # Homepage with video hero, menu highlights, and reviews
│   │   ├── menu/            # Full filterable menu catalog
│   │   ├── offers/          # Active coupons & promo deals
│   │   └── reservation/     # Table booking system
│   └── routes/
│       └── AppRoutes.jsx    # Application route definitions
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AshirRaj/Cafe_Website.git
cd Cafe_Website/Frontend
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open your browser and navigate to:
- **Customer Storefront**: `http://localhost:3000/`
- **Café Admin Panel**: `http://localhost:3000/admin`

### 4. Build for Production

```bash
npm run build
```

---

## 🗺️ Routes Reference

### Customer Storefront
| Route | Page |
|---|---|
| `/` | Homepage with Video Hero, Specialties & Reviews |
| `/menu` | Live Filterable Café Menu |
| `/menu/:productId` | Product Details with Custom Add-ons |
| `/cart` | Cart Review & Coupon Application |
| `/checkout` | Multi-fulfillment Checkout (Dine-in / Takeaway / Delivery) |
| `/order-success/:orderId` | Order Confirmation Receipt |
| `/orders/:orderId` | Live 5-Stage Kitchen Tracker |
| `/reservation` | Table Booking Form |
| `/offers` | Promotional Vouchers |
| `/about` | Café Heritage & Coffee Philosophy |
| `/contact` | Bhubaneswar Store Location & Contact Form |

### Admin Panel
| Route | Page |
|---|---|
| `/admin` | Operations Dashboard & Quick Stats |
| `/admin/orders` | Live Kitchen Orders & Filter Ledger |
| `/admin/orders/:orderId` | Itemized Order Details & Status Stepper |
| `/admin/menu` | Menu Catalog & Stock Availability Toggles |
| `/admin/menu/add` | Create New Menu Item & Add-ons |
| `/admin/menu/:productId/edit` | Edit Menu Item |
| `/admin/categories` | Manage Category Hierarchy |
| `/admin/tables` | Live Table Occupancy Seating Grid |
| `/admin/customers` | Customer Directory & Spend History |
| `/admin/inventory` | Café Stock Tracker & Low-Stock Alerts |
| `/admin/payments` | Payment Transaction Logs |
| `/admin/expenses` | Overhead & Operating Expense Tracker |
| `/admin/reports` | Sales, Revenue & Net Profit Reports |
| `/admin/settings` | Store Profile, Timings & Invoice Settings |

---

## 📍 Location & Contact



## 📄 License

This project is licensed under the MIT License.
