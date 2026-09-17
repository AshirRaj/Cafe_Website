import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { TABLES } from '../data/tables';
import { initialAdminOrders } from '../data/admin/adminOrders';
import { initialAdminInventory } from '../data/admin/adminInventory';
import { initialAdminExpenses } from '../data/admin/adminExpenses';
import { initialAdminCustomers } from '../data/admin/adminCustomers';
import { initialAdminPayments } from '../data/admin/adminPayments';
import { initialAdminSettings } from '../data/admin/adminSettings';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('admin_orders');
    return saved ? JSON.parse(saved) : initialAdminOrders;
  });

  // Products
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('admin_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Categories
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('admin_categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });

  // Tables
  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem('admin_tables');
    return saved ? JSON.parse(saved) : TABLES;
  });

  // Inventory
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('admin_inventory');
    return saved ? JSON.parse(saved) : initialAdminInventory;
  });

  // Expenses
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('admin_expenses');
    return saved ? JSON.parse(saved) : initialAdminExpenses;
  });

  // Customers
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('admin_customers');
    return saved ? JSON.parse(saved) : initialAdminCustomers;
  });

  // Payments
  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('admin_payments');
    return saved ? JSON.parse(saved) : initialAdminPayments;
  });

  // Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('admin_settings');
    return saved ? JSON.parse(saved) : initialAdminSettings;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('admin_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('admin_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('admin_tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('admin_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('admin_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('admin_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('admin_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('admin_settings', JSON.stringify(settings));
  }, [settings]);

  // Order Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Product Actions
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `prod_${Date.now()}`,
      inStock: productData.inStock !== false,
      rating: productData.rating || 4.8,
      ratingCount: productData.ratingCount || 1,
      createdAt: new Date().toISOString()
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (productId, updatedData) => {
    setProducts((prev) =>
      prev.map((item) => (String(item.id) === String(productId) ? { ...item, ...updatedData } : item))
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  };

  const toggleProductAvailability = (productId) => {
    setProducts((prev) =>
      prev.map((item) =>
        String(item.id) === String(productId) ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  // Category Actions
  const addCategory = (categoryData) => {
    const newCat = {
      ...categoryData,
      id: categoryData.id || categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      itemCount: 0
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (categoryId, updatedData) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, ...updatedData } : cat))
    );
  };

  const deleteCategory = (categoryId) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  // Table Actions
  const addTable = (tableData) => {
    const newTable = {
      ...tableData,
      id: tableData.id || `T${String(tables.length + 1).padStart(2, '0')}`,
      status: tableData.status || 'Available'
    };
    setTables((prev) => [...prev, newTable]);
    return newTable;
  };

  const updateTableStatus = (tableId, newStatus) => {
    setTables((prev) =>
      prev.map((tbl) => (tbl.id === tableId || tbl.number === tableId ? { ...tbl, status: newStatus } : tbl))
    );
  };

  const updateTable = (tableId, updatedData) => {
    setTables((prev) =>
      prev.map((tbl) => (tbl.id === tableId ? { ...tbl, ...updatedData } : tbl))
    );
  };

  const deleteTable = (tableId) => {
    setTables((prev) => prev.filter((tbl) => tbl.id !== tableId));
  };

  // Inventory Actions
  const updateInventoryStock = (itemId, amount, isDelta = false) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.max(0, isDelta ? item.currentStock + amount : Number(amount));
          const isLow = newQty <= item.minimumStock;
          return {
            ...item,
            currentStock: Number(newQty.toFixed(1)),
            status: isLow ? 'Low Stock' : 'Available',
            lastRestocked: isDelta && amount > 0 ? new Date().toISOString().split('T')[0] : item.lastRestocked
          };
        }
        return item;
      })
    );
  };

  const addInventoryItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: itemData.id || `INV${String(inventory.length + 1).padStart(3, '0')}`,
      status: Number(itemData.currentStock) <= Number(itemData.minimumStock) ? 'Low Stock' : 'Available',
      lastRestocked: new Date().toISOString().split('T')[0]
    };
    setInventory((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateInventoryItem = (itemId, updatedData) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const merged = { ...item, ...updatedData };
          merged.status = Number(merged.currentStock) <= Number(merged.minimumStock) ? 'Low Stock' : 'Available';
          return merged;
        }
        return item;
      })
    );
  };

  const deleteInventoryItem = (itemId) => {
    setInventory((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Expenses Actions
  const addExpense = (expenseData) => {
    const newExpense = {
      ...expenseData,
      id: expenseData.id || `EXP${Date.now().toString().slice(-4)}`,
      date: expenseData.date || new Date().toISOString().split('T')[0]
    };
    setExpenses((prev) => [newExpense, ...prev]);
    return newExpense;
  };

  const deleteExpense = (expenseId) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== expenseId));
  };

  // Settings Actions
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings
    }));
  };

  // Reset to original mock data
  const resetToDefaults = () => {
    setOrders(initialAdminOrders);
    setProducts(PRODUCTS);
    setCategories(CATEGORIES);
    setTables(TABLES);
    setInventory(initialAdminInventory);
    setExpenses(initialAdminExpenses);
    setCustomers(initialAdminCustomers);
    setPayments(initialAdminPayments);
    setSettings(initialAdminSettings);
    localStorage.clear();
  };

  const value = {
    orders,
    products,
    categories,
    tables,
    inventory,
    expenses,
    customers,
    payments,
    settings,
    updateOrderStatus,
    addOrder,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability,
    addCategory,
    updateCategory,
    deleteCategory,
    addTable,
    updateTableStatus,
    updateTable,
    deleteTable,
    updateInventoryStock,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    addExpense,
    deleteExpense,
    updateSettings,
    resetToDefaults
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
