
export interface PromoCode {
    code: string;
    discount: number; 
  }
  

  export const promoCodes: PromoCode[] = [
    { code: 'SHOP30', discount: 0.30 },
    { code: 'NEWUSER', discount: 0.40 }

  ];
  

  export const getDiscount = (code: string): number => {
    const promoCode = promoCodes.find((promo) => promo.code === code);
    return promoCode ? promoCode.discount : 0;
  };
  