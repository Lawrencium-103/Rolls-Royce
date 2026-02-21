'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import CustomCursor from '../components/ui/CustomCursor'
import Navigation from '../components/ui/Navigation'
import Preloader from '../components/ui/Preloader'
import CinematicHero from '../components/sections/CinematicHero'
import ShowcaseSection from '../components/sections/ShowcaseSection'
import CinematicInterior from '../components/sections/CinematicInterior'
import CinematicStats from '../components/sections/CinematicStats'
import CinematicCTA from '../components/sections/CinematicCTA'

const LenisGSAP = dynamic(
  () => import('../components/ui/LenisGSAP'),
  { ssr: false }
)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {!isLoading && <CustomCursor />}
      
      <Preloader 
        onLoadingComplete={() => setIsLoading(false)} 
        minimumDuration={2000}
      />
      
      {!isLoading && (
        <LenisGSAP>
          <Navigation />
          <main>
            <CinematicHero />
            <ShowcaseSection />
            <CinematicInterior />
            <CinematicStats />
            <CinematicCTA />
          </main>
        </LenisGSAP>
      )}
    </>
  )
}
