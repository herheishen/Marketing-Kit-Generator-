import React, { useState, useCallback } from 'react';
import ProductInputForm from './components/ProductInputForm';
import MarketingKitDisplay from './components/MarketingKitDisplay';
import { ProductData, MarketingKit } from './types';
import { generateMarketingKit } from './services/geminiService';
import Alert from './components/Alert';

function App() {
  const [marketingKit, setMarketingKit] = useState<MarketingKit | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateKit = useCallback(async (productData: ProductData) => {
    setLoading(true);
    setError(null);
    try {
      const kit = await generateMarketingKit(productData);
      setMarketingKit(kit);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on new kit generation
    } catch (err: any) {
      console.error("Failed to generate marketing kit:", err);
      setError("Error al generar el kit de marketing. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Marketing Kit Generator</h1>
        <p className="text-xl text-gray-600">
          Genera un kit completo de marketing con enfoque en conversión y estética premium.
        </p>
      </header>

      {error && (
        <Alert message={error} type="error" className="max-w-4xl mx-auto mb-8" />
      )}

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-1">
          <ProductInputForm onGenerate={handleGenerateKit} loading={loading} />
        </div>
        <div className="lg:col-span-2">
          <MarketingKitDisplay kit={marketingKit} />
        </div>
      </main>

      <footer className="mt-12 py-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Marketing Kit Generator. Desarrollado con ❤️.</p>
      </footer>
    </div>
  );
}

export default App;
