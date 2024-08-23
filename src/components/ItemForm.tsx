import { ChangeEvent, FormEvent, useState } from 'react';

export interface ChangeItem {
  id?: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

interface ItemFormProps {
  initialData?: ChangeItem;
  onSubmit: (formData: ChangeItem) => void;
}

const ItemForm = ({ initialData, onSubmit }: ItemFormProps) => {
  const [formData, setFormData] = useState<ChangeItem>(initialData || {
    title: '',
    price: '',
    category: 'electronics',
    description: '',
    image: ''
  });

  const [validationErrors, setValidationErrors] = useState<Partial<ChangeItem>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm(formData)) {
      onSubmit(formData);
    }
  };

  const validateForm = (formData: ChangeItem): boolean => {
    let formIsValid = true;
    const validationErrors: Partial<ChangeItem> = {};

    
    const priceString = formData.price.toString().trim();
    const trimmedTitle = formData.title.trim();
    const trimmedDescription = formData.description.trim();
    const trimmedImage = formData.image.trim();

    if (!trimmedTitle) {
      validationErrors.title = 'Title is required';
      formIsValid = false;
    }

    
    const numericPrice = parseFloat(priceString);
    
    if (isNaN(numericPrice) || numericPrice <= 0 || numericPrice > 1000000) {
      validationErrors.price = 'Please enter a valid price (1 - 1,000,000)';
      formIsValid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(priceString)) {
      validationErrors.price = 'Price must be a number with up to 2 decimal places';
      formIsValid = false;
    }

    
    const wordCount = trimmedDescription.split(/\s+/).length;
    if (wordCount < 10) {
      validationErrors.description = 'Description must be at least 10 words long';
      formIsValid = false;
    }

    
    if (!trimmedImage.startsWith('https://')) {
      validationErrors.image = 'Image URL must start with "https://"';
      formIsValid = false;
    }

    setValidationErrors(validationErrors);
    return formIsValid;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {validationErrors.title && <p className="text-red-500 text-sm">{validationErrors.title}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {validationErrors.price && <p className="text-red-500 text-sm">{validationErrors.price}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {validationErrors.description && <p className="text-red-500 text-sm">{validationErrors.description}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Image URL:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {validationErrors.image && <p className="text-red-500 text-sm">{validationErrors.image}</p>}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default ItemForm;
