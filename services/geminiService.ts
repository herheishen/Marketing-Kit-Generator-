import {
  GoogleGenAI,
  GenerateContentResponse,
  Part,
  Type,
} from "@google/genai";
import { ProductData, MarketingKit } from '../types';

// Mock API key, as in a real scenario, it would be provided via process.env
const API_KEY = process.env.API_KEY || "YOUR_GEMINI_API_KEY";

const ai = new GoogleGenAI({ apiKey: API_KEY });

const MOCK_MARKETING_KIT_RESPONSE: MarketingKit = {
  designBrief: {
    conceptualIdea: "Modern, dynamic, and clean aesthetic focusing on user interaction and the sleek design of the SmartPulse Pro. Emphasize performance and lifestyle integration.",
    visualStyle: "Minimalist with strong typography, vibrant accents (orange/teal), and high-contrast imagery. Use sharp lines and subtle gradients for a tech-forward feel.",
    suggestedFonts: ["Inter (Sans-serif, modern)", "Montserrat (Headline, bold)"],
    appliedColorPalette: ["#0A0A0A", "#0E7490", "#E0F2F7", "#D4D4D4", "#F97316"],
    recommendedComposition: "Hero shots with the product centered, dynamic action shots showing product use (running, swimming), clean grid layouts for benefits, and close-ups highlighting features. Keep plenty of white space.",
    accessibilityRules: ["WCAG 2.1 AA compliant for text contrast (e.g., #0A0A0A on #E0F2F7, #F97316 on #0A0A0A for accents). Use alt text for all images. Ensure clickable areas are large enough for touch targets."],
    finalDeliverables: {
      feed: "1080x1080px (Square, for Instagram/Facebook feed)",
      storiesReelsTikTok: "1080x1920px (Vertical, full screen for Stories/Reels/TikTok)",
      thumbnail: "1280x720px (Horizontal, for YouTube/Video thumbnails)"
    }
  },
  imagePrompts: [
    {
      name: "Hero studio",
      text: "Photorealistic studio shot of SmartPulse Pro fitness tracker. The device is centered on a minimalist, gradient white-to-light-grey background. Soft, diffused overhead lighting with a subtle reflection. Shot with a prime lens, wide aperture (f/1.8). The tracker screen is subtly lit, displaying a clean heart rate interface. Premium, sleek, high-tech.",
      negativePrompt: "hands deform, ugly, blur, text artifacts, watermark, extra limbs, distorted shape, unrealistic, busy background, low quality"
    },
    {
      name: "Lifestyle social",
      text: "Cinematic shot of a diverse young person (25-35, athletic build) jogging outdoors at sunrise in an urban park, wearing the SmartPulse Pro. Dynamic angle from slightly below, sun flare, golden hour lighting. Product clearly visible on wrist. Motion blur in background to emphasize movement. Shot with a 50mm lens. Energetic, inspiring, authentic.",
      negativePrompt: "hands deform, ugly, blur, text artifacts, watermark, extra limbs, distorted shape, unrealistic, distracting elements, poorly lit"
    },
    {
      name: "Minimal aesthetic",
      text: "Premium flat lay composition. SmartPulse Pro lies on a smooth, matte light grey surface next to a clean glass of water and a single, perfectly ripe avocado. Overhead softbox lighting. Focus on clean lines, simple shapes. Product is main focus. Minimalist, serene, health-oriented.",
      negativePrompt: "hands deform, ugly, blur, text artifacts, watermark, extra limbs, distorted shape, unrealistic, busy, cluttered, unaligned"
    },
    {
      name: "Urban street",
      text: "Photorealistic, slightly low-angle shot of a hand with SmartPulse Pro resting on a graffiti-covered brick wall in a vibrant urban alley. Late afternoon shadow play, gritty but clean aesthetic. Product screen shows a dynamic GPS map. Shot with a wide-angle lens (24mm). Modern, cool, connected.",
      negativePrompt: "hands deform, ugly, blur, text artifacts, watermark, extra limbs, distorted shape, unrealistic, blurry background, bad lighting"
    },
    {
      name: "Close Up detalles",
      text: "Extreme close-up, macro shot of the SmartPulse Pro's intricate sensor array on the back, or the texture of its band. Sharp focus on details, shallow depth of field. Professional studio lighting highlighting material quality. Shot with a macro lens. Precision, craftsmanship, quality.",
      negativePrompt: "hands deform, ugly, blur, text artifacts, watermark, extra limbs, distorted shape, unrealistic, dust, scratches, blurry focus"
    },
    {
      name: "Packshot comercial",
      text: "Clean commercial packshot of the SmartPulse Pro in its retail packaging, standing upright, with the product slightly out of the box. White studio background with subtle gradient. Even, bright lighting. High-resolution, crisp details. Ready for e-commerce. Professional, trustworthy.",
      negativePrompt: "hands deform, ugly, blur, text artifacts, watermark, extra limbs, distorted shape, unrealistic, shadows, reflections"
    }
  ],
  videoPrompts: [
    {
      name: "Short Ad (6-8s)",
      description: "Fast-paced montage showcasing the SmartPulse Pro's key features and benefits, designed for high impact on social media.",
      audio: "Upbeat, energetic electronic track with a driving beat. Style: Synthwave/Future Bass.",
      textOverlay: [
        { text: "SmartPulse Pro", timing: "0-2s" },
        { text: "Monitorea. Supera. Vive.", timing: "2-4s" },
        { text: "¡Obtén el tuyo hoy!", timing: "5-7s" },
        { text: "¡20% OFF + Envío Gratis!", timing: "7-8s" }
      ]
    },
    {
      name: "Storytelling (12-20s)",
      description: "Narrative-driven video following a user's journey of self-improvement and how SmartPulse Pro helps them achieve their goals.",
      audio: "Inspiring, uplifting orchestral-electronic hybrid. Builds from calm to powerful. Style: Cinematic motivational.",
      textOverlay: [
        { text: "Tu historia. Tu progreso.", timing: "0-4s" },
        { text: "SmartPulse Pro: Diseñado para ti.", timing: "5-9s" },
        { text: "Descubre tu potencial.", timing: "10-14s" },
        { text: "Compra ahora.", timing: "17-20s" }
      ]
    },
    {
      name: "UGC realista (8-10s)",
      description: "Authentic, user-generated style content featuring an influencer unboxing and demonstrating the SmartPulse Pro in a casual setting.",
      audio: "Trendy, popular acoustic pop/lo-fi track. Style: Chill vibes, modern pop.",
      textOverlay: [
        { text: "¡Mi nuevo SmartPulse Pro!", timing: "0-3s" },
        { text: "Amando el monitoreo 24/7", timing: "3-6s" },
        { text: "#SmartPulsePro #FitnessTech", timing: "7-10s" }
      ]
    }
  ],
  marketingCopy: {
    shortHooks: [
      "¿Listo para llevar tu fitness al límite? Conoce SmartPulse Pro.",
      "Tu aliado inteligente para cada latido y cada paso.",
      "Desbloquea tu potencial. Vive más, entrena mejor.",
      "Más que un tracker, es tu entrenador personal en la muñeca.",
      "La salud y el estilo se encuentran: SmartPulse Pro."
    ],
    longEmotionalCopy: `
¡Hola, campeón/a! ¿Sientes esa chispa dentro de ti? Esa motivación que te impulsa a ir un paso más allá, a sudar una gota más, a superar tus propios límites. Pero a veces, necesitas el compañero perfecto que entienda tu ritmo, que celebre tus logros y que te empuje suavemente cuando más lo necesitas.

Presentamos SmartPulse Pro: No es solo un rastreador de actividad, es tu confidente, tu coach, tu espejo de progreso. Imagina tener un monitor cardíaco que nunca descansa, un GPS que mapea cada aventura, y un analista de sueño que te asegura la recuperación que mereces. Todo en un diseño tan elegante que querrás llevarlo siempre.

**SmartPulse Pro te acompaña en cada pulsación, cada zancada, cada sueño.** Descubre la libertad de entrenar con datos precisos, la seguridad de una batería que dura días y la tranquilidad de saber que estás invirtiendo en ti. Porque tu salud no tiene precio, y tu rendimiento merece lo mejor.

Es hora de escuchar a tu cuerpo como nunca antes. Es hora de SmartPulse Pro.

`,
    testimonialVersion: `
"¡Desde que uso mi SmartPulse Pro, mis entrenamientos han cambiado por completo! El GPS es increíblemente preciso para mis rutas en bici y el monitoreo de sueño me ha ayudado a entender cómo mejorar mi descanso. ¡Súper recomendado!" - María S., Entusiasta del Running.

"Con SmartPulse Pro, finalmente tengo todos mis datos de salud en un solo lugar. La batería dura una eternidad y se ve súper elegante. ¡Vale cada centavo!" - Juan P., Aficionado al Gimnasio.
`,
    lightHumorVersion: `
¡Mi SmartPulse Pro me regaña si no me muevo! (Bueno, no de verdad, pero casi). Es como tener a tu abuela preocupada por tu salud, pero en versión chic y tech. Lo amo, ¡y mis pasos también! 😂
`,
    directCTA: "¡Comienza tu transformación hoy! Compra SmartPulse Pro y aprovecha el 20% de descuento + envío gratis.",
    shortAdHeadline: "SmartPulse Pro: Tu Mejor Versión",
    hashtags: [
      "#SmartPulsePro", "#FitnessTracker", "#SaludDigital", "#DeporteYCuidarte", "#ViveActivo",
      "#TecnologíaWearable", "#RendimientoExtremo", "#BienestarTotal", "#EntrenamientoInteligente",
      "#GPSFitness", "#EstiloDeVidaFit", "#OfertaSmartPulse", "#FitnessLatino", "#MotivacionDiaria"
    ]
  },
  abVariants: [
    {
      headline: "SmartPulse Pro: Tu Mejor Versión",
      suggestedImage: "https://picsum.photos/800/600?random=1",
      copy: "Desbloquea tu potencial con el SmartPulse Pro. Monitoreo 24/7, GPS, batería de 10 días. ¡20% OFF + Envío Gratis! #FitnessInteligente",
      cta: "Comprar Ahora",
      keyDifference: "Enfoque en beneficios clave y oferta directa."
    },
    {
      headline: "¿Listo para Superar Tus Límites?",
      suggestedImage: "https://picsum.photos/800/600?random=2",
      copy: "La motivación que necesitas, en tu muñeca. SmartPulse Pro te guía hacia tus metas. Descubre el poder de tus datos. #TuAliadoFitness",
      cta: "Descubre Más",
      keyDifference: "Enfoque emocional y aspiracional, CTA más suave."
    },
    {
      headline: "El Tracker Que Lo Tiene Todo",
      suggestedImage: "https://picsum.photos/800/600?random=3",
      copy: "Monitoreo cardíaco preciso, GPS, análisis de sueño. El SmartPulse Pro no deja detalle al azar. Eleva tu salud y rendimiento. #TechFitness",
      cta: "Ver Características",
      keyDifference: "Enfoque en las características técnicas y la exhaustividad."
    },
    {
      headline: "¡Entrena, Monitorea, Gana!",
      suggestedImage: "https://picsum.photos/800/600?random=4",
      copy: "Con SmartPulse Pro, cada sesión cuenta. Transforma tus datos en victorias. ¡Oferta por tiempo limitado! #SmartGoals",
      cta: "Aprovechar Oferta",
      keyDifference: "Enfoque en acción, resultados y urgencia de la oferta."
    }
  ],
  testingStrategy: {
    targetCTR: "Mínimo 1.5% - 2% en Feed, 0.8% - 1.2% en Stories/Reels. Si es más bajo, revisar creativo.",
    baseMetrics: "CPC < $0.50, CPM < $10.00, CVR > 1.5%. Estos son puntos de partida, ajusta según el sector.",
    scaleKillGuide: "Escalar ads con CTR > 2% y CVR > 2.5%, reduciendo el CPA. Matar ads con CTR < 1% o CPA excesivamente alto (>2x el promedio de objetivos).",
    recommendedDuration: "Iniciar con un presupuesto pequeño durante 3-5 días para cada variante. Una vez identificados los ganadores, escalar el presupuesto por otros 7-14 días para consolidar datos.",
    changeBasedOnMetrics: "Si el CTR es bajo: cambiar imagen/video o headline. Si el CVR es bajo (pero el CTR es bueno): revisar el copy, la oferta, o la landing page. Si la interacción (comentarios/shares) es baja: probar con humor o preguntas en el copy."
  },
  technicalChecklist: {
    dimensionsByNetwork: [
      "Instagram/Facebook Feed: 1080x1080px (Square), 1200x628px (Landscape), 1080x1350px (Portrait).",
      "Instagram Stories/Reels/TikTok: 1080x1920px (Vertical, 9:16).",
      "YouTube Thumbnails: 1280x720px (16:9)."
    ],
    recommendedFormats: [
      "Imágenes: JPG para fotos, PNG para gráficos con transparencia. Optimizadas para web.",
      "Videos: MP4 (H.264) a 30fps. Resolución Full HD (1080p) o HD (720p)."
    ],
    qualityCompression: "Imágenes: Calidad 80-90% para JPG. Videos: Bitrate entre 5-10 Mbps para 1080p, 3-5 Mbps para 720p. Usar herramientas de compresión sin pérdida notoria de calidad.",
    exportGuidelines: "Exportar gráficos con perfiles de color sRGB. Asegurar que los videos no superen los límites de tamaño y duración de cada plataforma.",
    accessibilityNotes: "Todo texto debe tener suficiente contraste (WCAG AA). Usar subtítulos en videos. Proveer descripciones de imagen (alt text) siempre. Evitar animaciones que puedan causar convulsiones o distracciones excesivas."
  }
};

/**
 * Simulates a call to the Gemini API to generate a marketing kit based on product data.
 * In a real application, this would make an actual API call.
 */
export async function generateMarketingKit(productData: ProductData): Promise<MarketingKit> {
  console.log("Simulating Gemini API call with product data:", productData);

  // In a real scenario, you would structure your prompt here
  const prompt = `
    Generate a complete marketing kit for the following product.
    Product Name: ${productData.name}
    Short Headline: ${productData.shortHeadline}
    Key Benefits: ${productData.keyBenefits.join(', ')}
    Target Audience: ${productData.targetAudience}
    Brand Tone: ${productData.brandTone}
    SEO Keywords: ${productData.seoKeywords.join(', ')}
    Color Palette (HEX): ${productData.colorPalette.join(', ')}
    Available Assets: ${productData.availableAssets}
    Current Offer: ${productData.currentOffer || 'N/A'}
    Product URL: ${productData.productUrl || 'N/A'}

    Please provide the following deliverables:
    1) Design Brief (conceptual idea, visual style, fonts, palette, composition, accessibility, final deliverable dimensions).
    2) 6 AI Image Prompts (photorealistic/cinematic/premium, various types, with negative prompts).
    3) 3 AI Video Prompts (script with timestamps, camera movement, music, editing style, color grading, text overlays).
    4) 8 Marketing Copies/Captions (hooks, long emotional copy, testimonial, humor, CTA, short headline, hashtags).
    5) 4 A/B Creativities (headline, image, copy, CTA, key difference).
    6) Simple Testing Strategy (target CTR, base metrics, scale/kill guide, duration, changes based on metrics).
    7) Technical Checklist (dimensions, formats, quality/compression, export, accessibility).

    The output should be in a JSON format that matches the MarketingKit interface.
    Be creative and conversion-focused. Use a Latin/Cuban/Urban tone where appropriate for the copies.
  `;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // If the Gemini API were actually used, the response would be parsed here.
  // For this example, we return a mock response.
  // const response: GenerateContentResponse = await ai.models.generateContent({
  //   model: "gemini-3-pro-preview", // Or a more suitable model for content generation
  //   contents: [{ parts: [{ text: prompt }] }],
  //   config: {
  //     responseMimeType: "application/json",
  //     responseSchema: { /* ... define schema for MarketingKit ... */ },
  //   },
  // });
  //
  // const generatedJson = JSON.parse(response.text.trim());
  // return generatedJson as MarketingKit;

  return MOCK_MARKETING_KIT_RESPONSE;
}
