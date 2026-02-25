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
      color: '#00a6ff',
      size: 3,
    },
  ]

  const globeData = [
    { order: 1, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 40.7128, endLng: -74.006, arcAlt: 0.35, color: '#ffffff' },
    { order: 2, startLat: 35.6762, startLng: 139.6503, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.35, color: '#ffffff' },
    { order: 3, startLat: PARIS.lat, startLng: PARIS.lng, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.6, color: '#ffffff' },
    { order: 4, startLat: 39.9042, startLng: 116.4074, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.3, color: '#ffffff' },
    { order: 5, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.3, color: '#ffffff' },
    { order: 6, startLat: 1.3521, startLng: 103.8198, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.32, color: '#ffffff' },
    { order: 7, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 19.076, endLng: 72.8777, arcAlt: 0.3, color: '#ffffff' },
    { order: 8, startLat: 41.0082, startLng: 28.9784, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.28, color: '#ffffff' },
    { order: 9, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 19.4326, endLng: -99.1332, arcAlt: 0.36, color: '#ffffff' },
    { order: 10, startLat: -23.5505, startLng: -46.6333, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.38, color: '#ffffff' },
    { order: 11, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 13.7563, endLng: 100.5018, arcAlt: 0.3, color: '#ffffff' },
    { order: 12, startLat: 22.3193, startLng: 114.1694, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.35, color: '#ffffff' },
    { order: 13, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.4, color: '#ffffff' },
    { order: 14, startLat: 55.7558, startLng: 37.6173, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.28, color: '#ffffff' },
    { order: 15, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 33.5731, endLng: -7.5898, arcAlt: 0.25, color: '#ffffff' },
    { order: 16, startLat: -33.9249, startLng: 18.4241, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.36, color: '#ffffff' },
    { order: 17, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 43.6532, endLng: -79.3832, arcAlt: 0.32, color: '#ffffff' },
    { order: 18, startLat: -34.6037, startLng: -58.3816, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.38, color: '#ffffff' },
    { order: 19, startLat: 40.7128, startLng: -74.006, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.35, color: '#ffffff' },
    { order: 20, startLat: -33.8688, startLng: 151.2093, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.6, color: '#ffffff' },
    { order: 21, startLat: 25.2048, startLng: 55.2708, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.3, color: '#ffffff' },
    { order: 22, startLat: 19.076, startLng: 72.8777, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.3, color: '#ffffff' },
    { order: 23, startLat: 19.4326, startLng: -99.1332, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.36, color: '#ffffff' },
    { order: 24, startLat: 13.7563, startLng: 100.5018, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.3, color: '#ffffff' },
    { order: 25, startLat: 34.0522, startLng: -118.2437, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.4, color: '#ffffff' },
    { order: 26, startLat: 33.5731, startLng: -7.5898, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.25, color: '#ffffff' },
    { order: 27, startLat: 43.6532, startLng: -79.3832, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.32, color: '#ffffff' },
    { order: 28, startLat: 53.3498, startLng: -6.2603, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.2, color: '#ffffff' },
    { order: 29, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 53.3498, endLng: -6.2603, arcAlt: 0.2, color: '#ffffff' },
    { order: 30, startLat: 52.5200, startLng: 13.4050, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.15, color: '#ffffff' },
    { order: 31, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 52.5200, endLng: 13.4050, arcAlt: 0.15, color: '#ffffff' },
    { order: 32, startLat: 41.9028, startLng: 12.4964, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.18, color: '#ffffff' },
    { order: 33, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 41.9028, endLng: 12.4964, arcAlt: 0.18, color: '#ffffff' },
    { order: 34, startLat: 59.9139, startLng: 10.7522, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.22, color: '#ffffff' },
    { order: 35, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 59.9139, endLng: 10.7522, arcAlt: 0.22, color: '#ffffff' },
    { order: 36, startLat: 49.2827, startLng: -123.1207, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.4, color: '#ffffff' },
    { order: 37, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 49.2827, endLng: -123.1207, arcAlt: 0.4, color: '#ffffff' },
    { order: 38, startLat: 14.6928, startLng: -17.0467, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.28, color: '#ffffff' },
    { order: 39, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 14.6928, endLng: -17.0467, arcAlt: 0.28, color: '#ffffff' },
    { order: 40, startLat: 30.0444, startLng: 31.2357, endLat: PARIS.lat, endLng: PARIS.lng, arcAlt: 0.25, color: '#ffffff' },
    { order: 41, startLat: PARIS.lat, startLng: PARIS.lng, endLat: 30.0444, endLng: 31.2357, arcAlt: 0.25, color: '#ffffff' },
  ]

  return (
    <section id="about" className="py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              L&apos;esprit Clyvuum
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed text-pretty">
            Des systèmes conçus ici, performants partout. <br/>
            Clyvuum redonne aux entreprises leur ressource <br/> la plus précieuse : le temps. 
            </p>
          </div>

          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
            <World globeConfig={globeConfig} data={globeData} specialPoints={specialPoints} />
          </div>
        </div>
      </div>
    </section>
  )
}
