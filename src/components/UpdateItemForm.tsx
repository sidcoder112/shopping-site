// src/components/UpdateItemForm.tsx
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

interface Item {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

interface UpdateItemFormProps {
  item: Item;
  onUpdate: (updatedItem: Item) => void;
}

function UpdateItemForm({ item, onUpdate }: UpdateItemFormProps) {
  const [formData, setFormData] = useState<Item>(item);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(formData);
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
      </div>
      <div>
        <label className="block text-sm font-medium">Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
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
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Update</button>
      <Link to="/" className="absolute bottom left-4 mt-4">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-normal py-2 px-4 rounded"
        >
          Go Home
        </button>
      </Link>
    </form>
  );
}

export default UpdateItemForm;
