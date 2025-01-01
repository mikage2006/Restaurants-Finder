import React, { useEffect, useRef, useState } from 'react'
import { Restaurant } from '../api/restaurants'
import '../styles/Map.css'

interface MapProps {
  restaurants: Restaurant[]
  selectedRestaurant: Restaurant | null
  onRestaurantClick: (restaurant: Restaurant) => void
  currentLocation?: { lat: number; lng: number }
}

declare global {
  interface Window {
    initMap?: () => void
    google?: any
  }
}

export const Map: React.FC<MapProps> = ({ 
  restaurants, 
  selectedRestaurant, 
  onRestaurantClick,
  currentLocation 
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const currentLocationMarkerRef = useRef<any>(null)
  const [mapError, setMapError] = useState<string | null>(null)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  // Google Maps API
  useEffect(() => {
    if (window.google || isScriptLoaded) return

    const loadGoogleMaps = () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        setMapError('Google Maps APIキーが設定されていません')
        return
      }

      const script = document.createElement('script')
      script.id = 'google-maps-script'
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
      script.async = true
      script.defer = true
      
      script.onload = () => {
        setIsScriptLoaded(true)
        initializeMap()
      }

      script.onerror = () => {
        setMapError('Google Maps APIの読み込みに失敗しました')
      }

      const existingScript = document.getElementById('google-maps-script')
      if (existingScript) {
        existingScript.remove()
      }

      document.head.appendChild(script)
    }

    loadGoogleMaps()

    return () => {
      const script = document.getElementById('google-maps-script')
      if (script) {
        script.remove()
      }
    }
  }, [])

  // Mapの初期化
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return

    try {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: currentLocation || { lat: 35.6812, lng: 139.7671 }, 
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      })
    } catch (error) {
      console.error('Map initialization error:', error)
      setMapError('地図の初期化に失敗しました')
    }
  }

  // 現在地の更新
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google || !currentLocation) return

    try {
      // 既存の現在地マーカーを削除
      if (currentLocationMarkerRef.current) {
        currentLocationMarkerRef.current.setMap(null)
      }

      // 現在地マーカーを作成
      currentLocationMarkerRef.current = new window.google.maps.Marker({
        position: currentLocation,
        map: mapInstanceRef.current,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        title: '現在地',
        zIndex: 2
      })

      // 現在地を中心に表示
      mapInstanceRef.current.panTo(currentLocation)
    } catch (error) {
      console.error('Current location marker error:', error)
      setMapError('現在地マーカーの作成に失敗しました')
    }
  }, [currentLocation, isScriptLoaded])

  // レストランマーカーの更新
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google || restaurants.length === 0) return

    try {
      // 既存のマーカーをクリア
      markersRef.current.forEach(marker => marker.setMap(null))
      markersRef.current = []

      const bounds = new window.google.maps.LatLngBounds()

      // 現在地の追加
      if (currentLocation) {
        bounds.extend(currentLocation)
      }

      // レストランごとのマーカーを追加
      restaurants.forEach((restaurant, index) => {
        const position = {
          lat: parseFloat(restaurant.lat || "35.6812"),
          lng: parseFloat(restaurant.lng || "139.7671")
        }

        const marker = new window.google.maps.Marker({
          position,
          map: mapInstanceRef.current,
          animation: window.google.maps.Animation.DROP,
          label: {
            text: (index + 1).toString(),
            color: 'white'
          },
          zIndex: 1
        })

        marker.addListener('click', () => {
          onRestaurantClick(restaurant)
        })

        markersRef.current.push(marker)
        bounds.extend(position)
      })

      // マップの表示半径を調整
      if (restaurants.length > 0) {
        mapInstanceRef.current.fitBounds(bounds)
      }
    } catch (error) {
      console.error('Marker creation error:', error)
      setMapError('マーカーの作成に失敗しました')
    }
  }, [restaurants, onRestaurantClick, isScriptLoaded, currentLocation])

  // 選択された店舗への移動
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google || !selectedRestaurant) return

    try {
      const position = {
        lat: parseFloat(selectedRestaurant.lat || "35.6812"),
        lng: parseFloat(selectedRestaurant.lng || "139.7671")
      }

      mapInstanceRef.current.panTo(position)
      mapInstanceRef.current.setZoom(17)
    } catch (error) {
      console.error('Pan to location error:', error)
      setMapError('選択した場所への移動に失敗しました')
    }
  }, [selectedRestaurant])

  if (mapError) {
    return (
      <div className="map-error">
        <div className="map-error-content">
          <svg className="map-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
          <p className="map-error-message">{mapError}</p>
        </div>
      </div>
    )
  }

  return <div ref={mapRef} className="map-container" />
}

