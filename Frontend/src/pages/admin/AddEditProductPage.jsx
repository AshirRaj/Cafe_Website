import React from 'react';
import { useParams } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import ProductForm from '../../components/admin/ProductForm';

export const AddEditProductPage = () => {
  const { productId } = useParams();
  const { products } = useAdmin();

  const isEdit = Boolean(productId);
  const existingProduct = isEdit
    ? products.find((p) => String(p.id) === String(productId))
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif font-bold text-2xl text-espresso-800">
          {isEdit ? `Edit "${existingProduct?.name || 'Item'}"` : 'Create New Menu Product'}
        </h2>
        <p className="text-xs text-warmgray-600">
          {isEdit
            ? 'Modify price, ingredients, categories, and custom add-ons'
            : 'Fill in details to launch a new delicacy on your café menu'}
        </p>
      </div>

      <ProductForm initialData={existingProduct} isEdit={isEdit} />
    </div>
  );
};

export default AddEditProductPage;
