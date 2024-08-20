
interface CartSummaryProps {
    total: number;
    tax: number;
    discountAmount: number;
    true_total: number;
  }
  
  const CartSummary = ({ total, tax, discountAmount, true_total }: CartSummaryProps) => {
    return (
      <div className="flex justify-between text-right font-bold mb-6">
        <div>
          <p>Subtotal: ${total.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          {discountAmount > 0 && <p>Discount: -${discountAmount.toFixed(2)}</p>}
          <p>Total: ${true_total.toFixed(2)}</p>
        </div>
      </div>
    );
  };
  
  export default CartSummary;
  