import React from 'react';
import { MarketingKit } from '../types';
import SectionCard from './SectionCard';
import Pill from './Pill';

// Utility function to render markdown-like text
const renderMarkdown = (text: string | undefined) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, index) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-semibold my-1">{line.substring(2, line.length - 2)}</p>;
        }
        if (line.startsWith('###')) {
          return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.substring(3).trim()}</h3>;
        }
        if (line.startsWith('##')) {
          return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{line.substring(2).trim()}</h2>;
        }
        if (line.startsWith('* ') || line.startsWith('- ')) {
          return <li key={index} className="ml-5 list-disc">{line.substring(2).trim()}</li>;
        }
        return <p key={index} className="my-1">{line}</p>;
      })}
    </>
  );
};


interface MarketingKitDisplayProps {
  kit: MarketingKit | null;
}

const MarketingKitDisplay: React.FC<MarketingKitDisplayProps> = ({ kit }) => {
  if (!kit) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500 text-lg">
        <p>Introduce los datos del producto y haz clic en 'Generar Kit de Marketing' para ver los resultados.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 1) BRIEF DE DISEÑO */}
      <SectionCard title="📐 BRIEF DE DISEÑO">
        <p><span className="font-semibold">Idea Conceptual:</span> {kit.designBrief.conceptualIdea}</p>
        <p><span className="font-semibold">Estilo Visual:</span> {kit.designBrief.visualStyle}</p>
        <p><span className="font-semibold">Tipografías Sugeridas:</span> {kit.designBrief.suggestedFonts.join(', ')}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold">Paleta de Colores Aplicada:</span>
          {kit.designBrief.appliedColorPalette.map((color, index) => (
            <div key={index} className="w-6 h-6 rounded-full border border-gray-300" style={{ backgroundColor: color }}></div>
          ))}
        </div>
        <p className="mt-2"><span className="font-semibold">Composición Recomendada:</span> {kit.designBrief.recommendedComposition}</p>
        <p><span className="font-semibold">Reglas de Accesibilidad (WCAG):</span> {kit.designBrief.accessibilityRules}</p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Entregables Finales:</h3>
        <ul className="list-disc pl-5">
          <li><span className="font-semibold">Feed:</span> {kit.designBrief.finalDeliverables.feed}</li>
          <li><span className="font-semibold">Stories/Reels/TikTok:</span> {kit.designBrief.finalDeliverables.storiesReelsTikTok}</li>
          <li><span className="font-semibold">Thumbnail:</span> {kit.designBrief.finalDeliverables.thumbnail}</li>
        </ul>
      </SectionCard>

      {/* 2) PROMPTS PARA IA DE IMAGEN */}
      <SectionCard title="📸 PROMPTS PARA IA DE IMAGEN">
        <div className="space-y-6">
          {kit.imagePrompts.map((prompt, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-semibold mb-2">{prompt.name}:</h3>
              <p className="font-mono bg-gray-50 p-3 rounded-md text-sm whitespace-pre-wrap">{prompt.text}</p>
              <p className="mt-2 text-sm font-semibold">NEGATIVE PROMPT:</p>
              <p className="font-mono bg-gray-50 p-3 rounded-md text-sm whitespace-pre-wrap">{prompt.negativePrompt}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 3) PROMPTS PARA IA DE VIDEO */}
      <SectionCard title="🎥 PROMPTS PARA IA DE VIDEO">
        <div className="space-y-6">
          {kit.videoPrompts.map((prompt, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-semibold mb-2">{prompt.name}:</h3>
              <p className="mb-1">{prompt.description}</p>
              <p><span className="font-semibold">AUDIO:</span> {prompt.audio}</p>
              <p className="font-semibold mt-2">TEXT OVERLAY:</p>
              <ul className="list-disc pl-5">
                {prompt.textOverlay.map((overlay, idx) => (
                  <li key={idx}>{overlay.text} (<span className="font-mono text-xs">{overlay.timing}</span>)</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 4) COPIES Y CAPTIONS */}
      <SectionCard title="🧠 COPIES Y CAPTIONS">
        <h3 className="text-lg font-semibold mt-4 mb-2">Hooks Cortos:</h3>
        <ul className="list-disc pl-5 mb-4">
          {kit.marketingCopy.shortHooks.map((hook, index) => <li key={index}>{hook}</li>)}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Copy Largo Emocional (para Facebook Ads):</h3>
        <div className="bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{renderMarkdown(kit.marketingCopy.longEmotionalCopy)}</div>

        <h3 className="text-lg font-semibold mt-4 mb-2">Versión Testimonial:</h3>
        <div className="bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{renderMarkdown(kit.marketingCopy.testimonialVersion)}</div>

        <h3 className="text-lg font-semibold mt-4 mb-2">Versión Humor Ligera:</h3>
        <div className="bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{renderMarkdown(kit.marketingCopy.lightHumorVersion)}</div>

        <p className="mt-4"><span className="font-semibold">CTA Directa:</span> {kit.marketingCopy.directCTA}</p>
        <p><span className="font-semibold">Headline Corta para Ads:</span> {kit.marketingCopy.shortAdHeadline}</p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Paquete de Hashtags:</h3>
        <div className="flex flex-wrap gap-2">
          {kit.marketingCopy.hashtags.map((tag, index) => (
            <Pill key={index}>{tag}</Pill>
          ))}
        </div>
      </SectionCard>

      {/* 5) CREATIVIDADES A/B */}
      <SectionCard title="🧠 CREATIVIDADES A/B">
        <div className="space-y-6">
          {kit.abVariants.map((variant, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-semibold mb-2">A/B Variant {index + 1}</h3>
              <p><span className="font-semibold">HEADLINE:</span> {variant.headline}</p>
              <p><span className="font-semibold">IMAGEN SUGERIDA:</span></p>
              <img src={variant.suggestedImage} alt={`Suggested image for variant ${index + 1}`} className="my-2 rounded-lg max-w-full h-auto w-64 object-cover" />
              <p><span className="font-semibold">COPY:</span> {variant.copy}</p>
              <p><span className="font-semibold">CTA:</span> {variant.cta}</p>
              <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">Diferencia clave:</span> {variant.keyDifference}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 6) ESTRATEGIA SIMPLE DE PRUEBAS */}
      <SectionCard title="📊 ESTRATEGIA SIMPLE DE PRUEBAS">
        <p><span className="font-semibold">CTR Objetivo:</span> {kit.testingStrategy.targetCTR}</p>
        <p><span className="font-semibold">Métricas Base:</span> {kit.testingStrategy.baseMetrics}</p>
        <p><span className="font-semibold">Guía de Escalar o Matar Ads:</span> {kit.testingStrategy.scaleKillGuide}</p>
        <p><span className="font-semibold">Duración Recomendada:</span> {kit.testingStrategy.recommendedDuration}</p>
        <p><span className="font-semibold">Qué Cambiar Según Métricas:</span> {kit.testingStrategy.changeBasedOnMetrics}</p>
      </SectionCard>

      {/* 7) CHECKLIST TÉCNICO */}
      <SectionCard title="🔗 CHECKLIST TÉCNICO">
        <h3 className="text-lg font-semibold mt-4 mb-2">Dimensiones por Red:</h3>
        <ul className="list-disc pl-5 mb-4">
          {kit.technicalChecklist.dimensionsByNetwork.map((dim, index) => <li key={index}>{dim}</li>)}
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-2">Formatos Recomendados:</h3>
        <ul className="list-disc pl-5 mb-4">
          {kit.technicalChecklist.recommendedFormats.map((format, index) => <li key={index}>{format}</li>)}
        </ul>

        <p><span className="font-semibold">Calidad/Compresión:</span> {kit.technicalChecklist.qualityCompression}</p>
        <p><span className="font-semibold">Export:</span> {kit.technicalChecklist.exportGuidelines}</p>
        <p><span className="font-semibold">Accesibilidad:</span> {kit.technicalChecklist.accessibilityNotes}</p>
      </SectionCard>
    </div>
  );
};

export default MarketingKitDisplay;
