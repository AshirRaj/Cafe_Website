import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  ...props
}) => {
  const Component = hoverEffect ? motion.div : 'div';
  const hoverProps = hoverEffect
    ? {
        whileHover: { y: -4, transition: { duration: 0.2 } },
      }
    : {};

  return (
    <Component
      onClick={onClick}
      className={`bg-white rounded-3xl border border-cream-200/80 shadow-soft transition-all duration-300 ${
        hoverEffect ? 'hover:shadow-soft-lg hover:border-coffee-300/60 cursor-pointer' : ''
      } ${className}`}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
