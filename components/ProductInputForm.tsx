import React, { useState } from 'react';
import Input from './Input';
import TextArea from './TextArea';
import Button from './Button';
import { ProductData } from '../types';

interface ProductInputFormProps {
  onGenerate: (data: ProductData) => void;
  loading: boolean;
}

const ProductInputForm: React.FC<ProductInputFormProps> = ({ onGenerate, loading }) => {
  const [productData, setProductData] = useState<ProductData>({
    name: 'SmartPulse Pro',
    shortHeadline: 'Lleva tu rendimiento al siguiente nivel con SmartPulse Pro.',
    keyBenefits: ['Monitoreo cardiaco 24/7 y SpO2 preciso', 'GPS integrado para rutas y distancias exactas', 'Batería de larga duración (hasta 10 días)', 'Resistente al agua (natación, ducha)', 'Análisis de sueño avanzado para mejor recuperación', 'Notificaciones inteligentes y control de música'],
    targetAudience: 'Hombres y mujeres, 25-45 años, deportistas aficionados, entusiastas del fitness, personas activas con estilo de vida moderno que buscan mejorar su salud y rendimiento con tecnología. Motivados por el bienestar, la superación personal y la estética.',
    brandTone: 'Premium, aspiracional, tecnológico, motivador',
    seoKeywords: ['SmartPulse', 'SmartPulse Pro', 'fitness tracker', 'reloj deportivo', 'monitor cardiaco', 'GPS running', 'pulsera actividad', 'salud digital', 'wearable fitness'],
    colorPalette: ['#0A0A0A', '#0E7490', '#E0F2F7', '#D4D4D4', '#F97316'],
    availableAssets: 'Fotos de producto de alta resolución, mockups en uso, logo en SVG.',
    currentOffer: '20% de descuento + envío gratis por tiempo limitado.',
    productUrl: 'https://example.com/smartpulse-pro',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'keyBenefits' || id === 'seoKeywords' || id === 'colorPalette') {
      setProductData(prev => ({
        ...prev,
        [id]: value.split(',').map(item => item.trim()).filter(item => item !== '')
      }));
    } else {
      setProductData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(productData);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos del Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre del Producto"
          id="name"
          value={productData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Headline Corta"
          id="shortHeadline"
          value={productData.shortHeadline}
          onChange={handleChange}
          required
        />
        <TextArea
          label="Beneficios Clave (separados por coma)"
          id="keyBenefits"
          value={productData.keyBenefits.join(', ')}
          onChange={handleChange}
          required
        />
        <TextArea
          label="Público Objetivo"
          id="targetAudience"
          value={productData.targetAudience}
          onChange={handleChange}
          required
        />
        <Input
          label="Tono de Marca"
          id="brandTone"
          value={productData.brandTone}
          onChange={handleChange}
          required
        />
        <TextArea
          label="Palabras Clave SEO (separadas por coma)"
          id="seoKeywords"
          value={productData.seoKeywords.join(', ')}
          onChange={handleChange}
          required
        />
        <Input
          label="Paleta de Colores (HEX, separados por coma)"
          id="colorPalette"
          value={productData.colorPalette.join(', ')}
          onChange={handleChange}
          required
        />
        <TextArea
          label="Assets Disponibles"
          id="availableAssets"
          value={productData.availableAssets}
          onChange={handleChange}
        />
        <Input
          label="Oferta Actual (Opcional)"
          id="currentOffer"
          value={productData.currentOffer || ''}
          onChange={handleChange}
        />
        <Input
          label="URL del Producto (Opcional)"
          id="productUrl"
          value={productData.productUrl || ''}
          onChange={handleChange}
          type="url"
        />
        <Button type="submit" loading={loading} className="w-full">
          Generar Kit de Marketing
        </Button>
      </form>
    </div>
  );
};

export default ProductInputForm;
