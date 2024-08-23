

interface InvoiceProps {
  cart: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  total: number;
  tax: number;
  true_total: number;
}

const Invoice = ({ cart, total, tax, true_total }: InvoiceProps) => {
  return (
    <div id="invoice-content" className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg mt-10">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold">Sidharth Store</h1>
        <p className="text-gray-700">Vytilla Hub, Vytila 671102</p>
        <p className="text-gray-500">Phone: 123-4567890 | Email: support@sidharthstore.com</p>
        <hr className="my-4" />
        <h2 className="text-xl font-semibold">Receipt</h2>
      </header>
      <section className="mb-6">
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">Date:</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">Order Number:</p>
            <p>{Math.floor(Math.random() * 1000000)}</p>
          </div>
        </div>
      </section>
      <section className="border-t border-gray-300 pt-4">
        <h3 className="text-lg font-semibold mb-4">Items Purchased:</h3>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
              <div>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </section>
      <section className="border-t border-gray-300 pt-4 mt-4">
        <div className="flex justify-between text-lg">
          <p className="font-medium">Subtotal:</p>
          <p>${total.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-lg">
          <p className="font-medium">Tax (16%):</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-xl font-bold mt-4">
          <p>Total:</p>
          <p>${true_total.toFixed(2)}</p>
        </div>
      </section>
      <footer className="mt-8 text-center">
        <p className="text-sm text-gray-500">Thank you for shopping with us!</p>
        <p className="text-sm text-gray-500">Returns accepted within 30 days. See our website for more details.</p>
      </footer>
    </div>
  );
};

export default Invoice;
