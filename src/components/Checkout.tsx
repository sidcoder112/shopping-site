// src/components/Checkout.tsx
import { useEffect } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Invoice from './Invoice';

const Checkout = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = total * 0.16;
  const true_total = total + tax;

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const generatePDF = () => {
    const doc = new jsPDF();
    const content = document.getElementById('invoice-content');
    
    if (content) {
      html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position -= pageHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        doc.save('invoice.pdf');
      });
    }
  };

  return (
    <div>
      <Header showCartButton={false} />
      <Invoice
        cart={cart}
        total={total}
        tax={tax}
        true_total={true_total}
      />
      <div className="mt-8 text-center">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600"
          onClick={generatePDF}
        >
          Download Invoice
        </button>
      </div>
      <div className="mt-4 text-center">
        <Link to="/cart">
          <button className="text-sm text-blue-500 hover:underline">
            &larr; Go Back to Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
