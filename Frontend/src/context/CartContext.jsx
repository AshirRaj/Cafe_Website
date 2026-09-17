import React, { createContext, useContext, useState, useEffect } from 'react';
import { OFFERS } from '../data/offers';
import { createOrderObject, INITIAL_MOCK_ORDERS } from '../data/orders';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'cafe_adda_cart_v2';
const ORDERS_STORAGE_KEY = 'cafe_adda_orders_v2';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedOffer, setAppliedOffer] = useState(null);
  const [orderType, setOrderType] = useState('dine-in'); // 'dine-in' | 'takeaway' | 'delivery'
  const [selectedTable, setSelectedTable] = useState('T03');
  const [takeawayPickupTime, setTakeawayPickupTime] = useState('15 minutes');

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : INITIAL_MOCK_ORDERS;
    } catch {
      return INITIAL_MOCK_ORDERS;
    }
  });

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Generate unique item cart key based on product ID and selected add-ons
  const getItemKey = (product, selectedAddOns = []) => {
    const addOnIds = selectedAddOns.map((a) => a.id).sort().join('-');
    return `${product.id || product.slug}_${addOnIds}`;
  };

  const addToCart = (product, quantity = 1, selectedAddOns = [], instructions = '') => {
    const key = getItemKey(product, selectedAddOns);
    const addOnPriceTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
    const unitPrice = product.price + addOnPriceTotal;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.key === key);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        if (instructions) updated[existingIndex].instructions = instructions;
        return updated;
      }
      return [
        ...prevItems,
        {
          key,
          id: product.id,
          slug: product.slug || product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          basePrice: product.price,
          unitPrice,
          quantity,
          isVeg: product.isVeg,
          selectedAddOns,
          instructions,
        },
      ];
    });
  };

  const updateQuantity = (key, delta) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeItem = (key) => {
    setItems((prevItems) => prevItems.filter((item) => item.key !== key));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedOffer(null);
  };

  // Calculations
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedOffer) {
    if (appliedOffer.discountType === 'percentage') {
      const rawDiscount = (subtotal * appliedOffer.discountValue) / 100;
      discountAmount = appliedOffer.maxDiscount ? Math.min(rawDiscount, appliedOffer.maxDiscount) : rawDiscount;
    } else if (appliedOffer.discountType === 'flat') {
      discountAmount = Math.min(appliedOffer.discountValue, subtotal);
    }
  }

  // GST 5% standard food tax
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(discountedSubtotal * 0.05);

  // Delivery Fee: ₹40 if orderType is delivery and discountedSubtotal < ₹500
  const deliveryFee = orderType === 'delivery' && discountedSubtotal > 0 ? (discountedSubtotal >= 500 ? 0 : 40) : 0;
  const grandTotal = Math.max(0, discountedSubtotal + tax + deliveryFee);

  // Apply promo coupon
  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = OFFERS.find((o) => (o.code || o.couponCode || '').toUpperCase() === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Please check and try again.' };
    }
    if (found.minOrder && subtotal < found.minOrder) {
      return { success: false, message: `Minimum order amount of ₹${found.minOrder} required for code ${cleanCode}` };
    }
    setAppliedOffer(found);
    return { success: true, message: `Promo code ${cleanCode} applied successfully!` };
  };

  const removePromoCode = () => {
    setAppliedOffer(null);
  };

  // Place order with pure creator function
  const placeOrder = (customerDetails, paymentMethodName) => {
    const newOrder = createOrderObject({
      customer: customerDetails,
      items,
      orderType,
      selectedTable,
      takeawayPickupTime,
      paymentMethod: paymentMethodName,
      appliedOffer,
      subtotal,
      discountAmount,
      tax,
      deliveryFee,
      grandTotal,
    });

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId) => {
    const cleanId = (orderId || '').toUpperCase().replace(/^#/, '');
    return orders.find((o) => o.orderId.toUpperCase() === cleanId || o.orderId.toUpperCase() === `CAF-${cleanId}` || o.orderId.toUpperCase() === cleanId.replace('CAF-', 'CAF')) || null;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderId === orderId) {
          return {
            ...o,
            status: newStatus,
            orderStatus: newStatus.charAt(0) + newStatus.slice(1).toLowerCase(),
          };
        }
        return o;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemsCount,
        subtotal,
        discountAmount,
        appliedOffer,
        tax,
        deliveryFee,
        grandTotal,
        orderType,
        selectedTable,
        takeawayPickupTime,
        setOrderType,
        setSelectedTable,
        setTakeawayPickupTime,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        applyPromoCode,
        removePromoCode,
        placeOrder,
        getOrderById,
        updateOrderStatus,
        orders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
