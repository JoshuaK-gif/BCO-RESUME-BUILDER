'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Unlock, CreditCard, CheckCircle } from 'lucide-react';

interface PremiumTemplateAccessProps {
  templateId: string;
  templateName: string;
  price: number;
  onAccessGranted?: () => void;
}

export function PremiumTemplateAccess({
  templateId,
  templateName,
  price,
  onAccessGranted,
}: PremiumTemplateAccessProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsUnlocked(true);
      onAccessGranted?.();
    }, 2000);
  };

  if (isUnlocked) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div>
            <h4 className="font-medium text-green-800">Premium Template Unlocked</h4>
            <p className="text-sm text-green-600">
              You now have access to {templateName}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
          <Lock className="h-5 w-5 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Premium Template</h4>
          <p className="text-sm text-gray-600">{templateName}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">one-time payment</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Get lifetime access to this premium template with all future updates included.
        </p>
      </div>

      <ul className="space-y-2 mb-6">
        {[
          'Premium design quality',
          'Lifetime access',
          'Future updates included',
          'Commercial license',
          'Priority support',
        ].map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        onClick={handlePurchase}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Unlock for ${price.toFixed(2)}
          </div>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Secure payment powered by Stripe
      </p>
    </div>
  );
}