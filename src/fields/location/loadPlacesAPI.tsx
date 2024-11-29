'use client'

import Script from 'next/script'
import React from 'react'

const LoadPlacesAPI: React.FC = () => {
  return (
    <Script
      defer
      id="googlemaps"
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`}
      strategy="beforeInteractive"
      type="text/javascript"
    />
  )
}


export default LoadPlacesAPI;