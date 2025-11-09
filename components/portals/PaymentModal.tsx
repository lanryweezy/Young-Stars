import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import CloseIcon from '../icons/CloseIcon';
import PaystackIcon from '../icons/PaystackIcon';
import FlutterwaveIcon from '../icons/FlutterwaveIcon';
import CheckmarkIcon from '../icons/CheckmarkIcon';

interface PaymentModalProps {
    invoice: { id: string; description: string; amount: number; };
    studentName: string;
    onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ invoice, studentName, onClose }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in-up">
            <Card className="p-6 w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><CloseIcon/></button>
                
                {isSuccess ? (
                    <div className="text-center p-8">
                        <CheckmarkIcon />
                        <h3 className="font-orbitron text-2xl font-bold text-white mt-4 mb-2">Payment Successful!</h3>
                        <p className="text-gray-400">Thank you. The invoice for {invoice.description} has been marked as paid.</p>
                        <Button onClick={onClose} className="mt-6">Close</Button>
                    </div>
                ) : (
                    <>
                        <h3 className="font-orbitron text-2xl font-bold text-white mb-2">Complete Your Payment</h3>
                        <p className="text-gray-400 mb-6">You are paying for <span className="font-semibold text-white">{studentName}</span>.</p>

                        <div className="bg-space-dark/50 p-4 rounded-lg mb-6">
                            <div className="flex justify-between items-center text-gray-300">
                                <span>{invoice.description}</span>
                                <span className="font-bold text-white">₦{invoice.amount.toLocaleString()}</span>
                            </div>
                        </div>

                        <p className="text-sm font-semibold text-gray-300 mb-3">Choose a payment method:</p>
                        <div className="space-y-4">
                            <Button onClick={handlePayment} disabled={isProcessing} className="w-full justify-start" size="lg">
                                <PaystackIcon /> <span className="ml-3">Pay with Paystack</span>
                            </Button>
                            <Button onClick={handlePayment} disabled={isProcessing} className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-black" size="lg">
                                <FlutterwaveIcon /> <span className="ml-3">Pay with Flutterwave</span>
                            </Button>
                        </div>
                        {isProcessing && <p className="text-center text-brand-green mt-4 animate-pulse">Processing payment...</p>}
                    </>
                )}
            </Card>
        </div>
    );
};

export default PaymentModal;
