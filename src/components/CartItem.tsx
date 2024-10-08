
interface CartItemProps {
    item: {
      id: number;
      title: string;
      price: number;
      image: string;
      quantity: number;
    };
    increaseQuantity: () => void;
    decreaseQuantity: () => void;
    removeFromCart: () => void;
  }
  
  const CartItem = ({ item, increaseQuantity, decreaseQuantity, removeFromCart }: CartItemProps) => {
    return (
      <div className="flex justify-between items-center border-b py-4">
        <div className="flex items-center">
          <img src={item.image} alt={item.title} className="w-24 h-24 object-cover mr-6" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={increaseQuantity}
          >
            +
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <button onClick={removeFromCart}
            className="group flex h-10 items-center justify-center rounded-md border border-orange-600 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 px-4 text-neutral-50 shadow-[inset_0_1px_0px_0px_#fdba74] active:[box-shadow:none]"><span className="block group-active:[transform:translate3d(0,1px,0)]"></span>
            Remove
          </button>
        </div>
      </div>
    );
  };
  
  export default CartItem;
  