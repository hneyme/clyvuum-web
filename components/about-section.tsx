'use client'

import dynamic from 'next/dynamic'
import type { GlobeConfig } from '@/components/ui/globe'

const World = dynamic(() => import('@/components/ui/globe').then(mod => ({ default: mod.World })), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg" />,
})

export function AboutSection() {
  const globeConfig: GlobeConfig = {
    pointSize: 2,
    globeColor: '#1d072e',
    showAtmosphere: true,
    atmosphereColor: '#ffffff',
    atmosphereAltitude: 0.1,
    emissive: '#000000',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: 'rgba(255,255,255,0.7)',
    ambientLight: '#ffffff',
    directionalLeftLight: '#ffffff',
    directionalTopLight: '#ffffff',
    pointLight: '#ffffff',
    arcTime: 1600,
    arcLength: 1,
    rings: 1,
    maxRings: 3,
  }

  const PARIS = { lat: 48.8566, lng: 2.3522 }

  const specialPoints = [
    {
      lat: PARIS.lat,
      lng: PARIS.lng,
      color: '#0000ff',
      size: 3,
    },
  ]

  const globeData = [
    // Arc 1: Paris → New York
    { order: 1, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 40.7128, endLng: -74.006, arcAlt: 0.35, color: '#ffffff' },
    // Arc 2: Tokyo → Paris
    { order: 2, startLat: 35.6762, startLng: 139.6503, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.35, color: '#ffffff' },
    // Arc 3: Paris → Sydney
    { order: 3, startLat: PARIS.lat, startLng: PARIS.lng, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.6, color: '#ffffff' },
    // Arc 4: Beijing → Paris
    { order: 4, startLat: 39.9042, startLng: 116.4074, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.3, color: '#ffffff' },
    // Arc 5: Paris → Dubai
    { order: 5, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.3, color: '#ffffff' },
    // Arc 6: Singapour → Paris
    { order: 6, startLat: 1.3521, startLng: 103.8198, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.32, color: '#ffffff' },
    // Arc 7: Paris → Mumbai
    { order: 7, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 19.076, endLng: 72.8777, arcAlt: 0.3, color: '#ffffff' },
    // Arc 8: Istanbul → Paris
    { order: 8, startLat: 41.0082, startLng: 28.9784, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.28, color: '#ffffff' },
    // Arc 9: Paris → Mexico City
    { order: 9, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 19.4326, endLng: -99.1332, arcAlt: 0.36, color: '#ffffff' },
    // Arc 10: São Paulo → Paris
    { order: 10, startLat: -23.5505, startLng: -46.6333, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.38, color: '#ffffff' },
    // Arc 11: Paris → Bangkok
    { order: 11, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 13.7563, endLng: 100.5018, arcAlt: 0.3, color: '#ffffff' },
    // Arc 12: Hong Kong → Paris
    { order: 12, startLat: 22.3193, startLng: 114.1694, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.35, color: '#ffffff' },
    // Arc 13: Paris → Los Angeles
    { order: 13, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.4, color: '#ffffff' },
    // Arc 14: Moscow → Paris
    { order: 14, startLat: 55.7558, startLng: 37.6173, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.28, color: '#ffffff' },
    // Arc 15: Paris → Casablanca
    { order: 15, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 33.5731, endLng: -7.5898, arcAlt: 0.25, color: '#ffffff' },
    // Arc 16: Cape Town → Paris
    { order: 16, startLat: -33.9249, startLng: 18.4241, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.36, color: '#ffffff' },
    // Arc 17: Paris → Toronto
    { order: 17, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 43.6532, endLng: -79.3832, arcAlt: 0.32, color: '#ffffff' },
    // Arc 18: Buenos Aires → Paris
    { order: 18, startLat: -34.6037, startLng: -58.3816, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.38, color: '#ffffff' },
    // Arc 19: New York → Paris
    { order: 19, startLat: 40.7128, startLng: -74.006, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.35, color: '#ffffff' },
    // Arc 20: Sydney → Paris
    { order: 20, startLat: -33.8688, startLng: 151.2093, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.6, color: '#ffffff' },
    // Arc 21: Dubai → Paris
    { order: 21, startLat: 25.2048, startLng: 55.2708, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.3, color: '#ffffff' },
    // Arc 22: Mumbai → Paris
    { order: 22, startLat: 19.076, startLng: 72.8777, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.3, color: '#ffffff' },
    // Arc 23: Mexico City → Paris
    { order: 23, startLat: 19.4326, startLng: -99.1332, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.36, color: '#ffffff' },
    // Arc 24: Bangkok → Paris
    { order: 24, startLat: 13.7563, startLng: 100.5018, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.3, color: '#ffffff' },
    // Arc 25: Los Angeles → Paris
    { order: 25, startLat: 34.0522, startLng: -118.2437, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.4, color: '#ffffff' },
    // Arc 26: Casablanca → Paris
    { order: 26, startLat: 33.5731, startLng: -7.5898, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.25, color: '#ffffff' },
    // Arc 27: Toronto → Paris
    { order: 27, startLat: 43.6532, startLng: -79.3832, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.32, color: '#ffffff' },
    // Arc 28: Dublin → Paris
    { order: 28, startLat: 53.3498, startLng: -6.2603, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.2, color: '#ffffff' },
    // Arc 29: Paris → Dublin
    { order: 29, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 53.3498, endLng: -6.2603, arcAlt: 0.2, color: '#ffffff' },
    // Arc 30: Berlin → Paris
    { order: 30, startLat: 52.5200, startLng: 13.4050, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.15, color: '#ffffff' },
    // Arc 31: Paris → Berlin
    { order: 31, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 52.5200, endLng: 13.4050, arcAlt: 0.15, color: '#ffffff' },
    // Arc 32: Rome → Paris
    { order: 32, startLat: 41.9028, startLng: 12.4964, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.18, color: '#ffffff' },
    // Arc 33: Paris → Rome
    { order: 33, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 41.9028, endLng: 12.4964, arcAlt: 0.18, color: '#ffffff' },
    // Arc 34: Oslo → Paris
    { order: 34, startLat: 59.9139, startLng: 10.7522, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.22, color: '#ffffff' },
    // Arc 35: Paris → Oslo
    { order: 35, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 59.9139, endLng: 10.7522, arcAlt: 0.22, color: '#ffffff' },
    // Arc 36: Vancouver → Paris
    { order: 36, startLat: 49.2827, startLng: -123.1207, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.4, color: '#ffffff' },
    // Arc 37: Paris → Vancouver
    { order: 37, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 49.2827, endLng: -123.1207, arcAlt: 0.4, color: '#ffffff' },
    // Arc 38: Dakar → Paris
    { order: 38, startLat: 14.6928, startLng: -17.0467, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.28, color: '#ffffff' },
    // Arc 39: Paris → Dakar
    { order: 39, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 14.6928, endLng: -17.0467, arcAlt: 0.28, color: '#ffffff' },
    // Arc 40: Le Caire → Paris
    { order: 40, startLat: 30.0444, startLng: 31.2357, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.25, color: '#ffffff' },
    // Arc 41: Paris → Le Caire
    { order: 41, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 30.0444, endLng: 31.2357, arcAlt: 0.25, color: '#ffffff' },
  ]

  return (
    <section id="about" className="py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              L&apos;esprit Clyvuum
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed text-pretty">
            Des systèmes conçus ici, performants partout. <br/>
            Clyvuum redonne aux entreprises leur ressource <br/> la plus pr&eacute;cieuse : le temps. 
            </p>
          </div>

          {/* Right side - Globe */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
            <World globeConfig={globeConfig} data={globeData} specialPoints={specialPoints} />
          </div>
        </div>
      </div>
    </section>
  )
}
