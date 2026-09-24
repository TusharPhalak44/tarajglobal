import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Save, CheckCircle2, Zap, Shield, Key } from 'lucide-react';

const PaymentGateways = () => {
  const [activeGateway, setActiveGateway] = useState(null);
  const [keys, setKeys] = useState({
    stripe: { publicKey: '', secretKey: '' },
    razorpay: { keyId: '', keySecret: '' },
    paypal: { clientId: '', clientSecret: '' }
  });

  const [savedMessage, setSavedMessage] = useState('');

  const gateways = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Accept credit cards, Google Pay, and Apple Pay globally.',
      color: 'bg-indigo-500',
      fields: [
        { name: 'publicKey', label: 'Publishable Key', placeholder: 'pk_test_...' },
        { name: 'secretKey', label: 'Secret Key', placeholder: 'sk_test_...' }
      ]
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'Optimized for Indian businesses (UPI, NetBanking, Cards).',
      color: 'bg-blue-500',
      fields: [
        { name: 'keyId', label: 'Key ID', placeholder: 'rzp_test_...' },
        { name: 'keySecret', label: 'Key Secret', placeholder: 'Enter Key Secret' }
      ]
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'The world\'s most popular digital wallet.',
      color: 'bg-sky-500',
      fields: [
        { name: 'clientId', label: 'Client ID', placeholder: 'Enter PayPal Client ID' },
        { name: 'clientSecret', label: 'Client Secret', placeholder: 'Enter PayPal Client Secret' }
      ]
    }
  ];

  const handleKeyChange = (gatewayId, fieldName, value) => {
    setKeys(prev => ({
      ...prev,
      [gatewayId]: {
        ...prev[gatewayId],
        [fieldName]: value
      }
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    setSavedMessage('Settings successfully saved to database.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Gateways</h1>
          <p className="text-gray-400">
            Configure your payment providers. Only one gateway can be active at a time to prevent checkout conflicts.
          </p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-5 py-2.5 rounded-lg transition-colors font-medium shadow-lg shadow-primary/20"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>

      {savedMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-success/10 border border-success/30 text-success px-4 py-3 rounded-lg mb-8 flex items-center gap-2"
        >
          <CheckCircle2 size={18} />
          {savedMessage}
        </motion.div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Shield size={20} />
          </div>
          <div>
            <h3 className="text-white font-medium">PCI-DSS Compliant</h3>
            <p className="text-gray-400 text-sm">Keys are encrypted before database storage.</p>
          </div>
        </div>
        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-white font-medium">Modular Architecture</h3>
            <p className="text-gray-400 text-sm">Switching gateways requires zero code changes.</p>
          </div>
        </div>
      </div>

      {/* Gateway Cards */}
      <div className="space-y-6">
        {gateways.map((gateway) => {
          const isActive = activeGateway === gateway.id;

          return (
            <motion.div 
              key={gateway.id}
              className={`bg-[#121212] rounded-2xl border transition-all duration-300 ${
                isActive ? 'border-primary shadow-[0_0_20px_rgba(0,166,255,0.1)]' : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Header section */}
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${gateway.color} shadow-lg`}>
                    <CreditCard size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{gateway.name}</h2>
                    <p className="text-gray-400 text-sm mt-1">{gateway.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveGateway(isActive ? null : gateway.id)}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                    isActive ? 'bg-primary' : 'bg-gray-700'
                  }`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-300 ${
                    isActive ? 'translate-x-8' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* API Keys Configuration Section */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-black/20 space-y-4">
                      {gateway.fields.map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                            <Key size={14} className="text-gray-500" />
                            {field.label}
                          </label>
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            value={keys[gateway.id][field.name]}
                            onChange={(e) => handleKeyChange(gateway.id, field.name, e.target.value)}
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentGateways;
