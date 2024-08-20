// src/components/PromoCodeSection.tsx
interface PromoCodeSectionProps {
    promoCode: string;
    setPromoCode: (code: string) => void;
    handlePromoCode: () => void;
    error: string;
    discount: number;
    isCartEmpty: boolean;
  }
  
  const PromoCodeSection = ({
    promoCode,
    setPromoCode,
    handlePromoCode,
    error,
    discount,
    isCartEmpty
  }: PromoCodeSectionProps) => {
    return (
      <div className="mb-6">
        <label htmlFor="promoCode" className="block text-gray-700 mb-2">Promo Code</label>
        <div className="flex items-center mb-4">
          <input
            id="promoCode"
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className={`border rounded-l px-4 py-2 w-full ${isCartEmpty ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            placeholder="Enter promo code"
            disabled={isCartEmpty}
          />
          <button
            onClick={handlePromoCode}
            className={`bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600 ${isCartEmpty ? 'bg-gray-400 cursor-not-allowed' : ''}`}
            disabled={isCartEmpty}
          >
            Apply
          </button>
        </div>
        {discount > 0 && (
          <p className="text-green-500 font-semibold">Discount Applied: {discount * 100}%</p>
        )}
        {error && (
          <p className="text-red-500 font-semibold">{error}</p>
        )}
      </div>
    );
  };
  
  export default PromoCodeSection;
  