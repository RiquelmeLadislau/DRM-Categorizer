import React from 'react';
import { Check } from 'lucide-react';
import { PricingPlan } from '../types';

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$29',
    articles: '5,000 Articles',
    features: [
      'Standard Classification',
      'API Access',
      'Community Support',
      'Daily Usage Stats'
    ]
  },
  {
    name: 'Pro',
    price: '$99',
    articles: '20,000 Articles',
    features: [
      'Advanced Tagging',
      'Priority API Access',
      'Email Support',
      'Export to CSV',
      'Sentiment Analysis'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: '$299',
    articles: '100,000 Articles',
    features: [
      'Dedicated Instance',
      'Custom Taxonomy',
      '24/7 Premium Support',
      'SLA Guarantee',
      'On-premise Options'
    ]
  }
];

export const Pricing: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Scalable Classification Plans
        </h2>
        <p className="mt-4 text-xl text-slate-500">
          Choose the volume that fits your editorial needs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative rounded-2xl border ${
              plan.recommended 
                ? 'border-indigo-600 shadow-xl bg-white scale-105 z-10' 
                : 'border-slate-200 bg-white shadow-sm'
            } p-8 flex flex-col`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                Best Value
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
              <p className="text-indigo-600 font-semibold mt-1">{plan.articles} / mo</p>
            </div>
            
            <div className="flex items-baseline mb-8">
              <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
              <span className="ml-2 text-slate-500">/month</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-slate-600">
                  <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${
              plan.recommended
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};