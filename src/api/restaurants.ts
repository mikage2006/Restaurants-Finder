export const RANGE_OPTIONS = [
    { value: '1', label: '300m' },
    { value: '2', label: '500m' },
    { value: '3', label: '1000m' },
    { value: '4', label: '2000m' },
    { value: '5', label: '3000m' },
  ];
  
  const HOTPEPPER_BASE_URL = '/api/hotpepper/gourmet/v1/'
  
  export interface Restaurant {
    id: string
    name: string
    address: string
    access: string
    photo: {
      mobile: {
        l: string
      }
    }
    urls: {
      pc: string
    }
    open: string
  }
  
  export interface HotpepperResponse {
    results: {
      shop: Restaurant[]
      results_available: number
      results_returned: string
      results_start: number
    }
  }
  
  export async function fetchRestaurants(lat: number, lng: number, range: string = '3', start: number = 1): Promise<HotpepperResponse> {
    const response = await fetch(
      `${HOTPEPPER_BASE_URL}?key=${import.meta.env.VITE_HOTPEPPER_API_KEY}&lat=${lat}&lng=${lng}&range=${range}&start=${start}&count=100&format=json`
    )
  
    if (!response.ok) {
      throw new Error('レストランの取得に失敗しました')
    }
  
    return response.json()
  }
  
  export interface Restaurant {
    id: string
    name: string
    address: string
    access: string
    lat: string
    lng: string
    photo: {
      mobile: {
        l: string
      }
    }
    urls: {
      pc: string
    }
    open: string
  }
  export interface Restaurant {
    id: string
    name: string
    address: string
    access: string
    lat: string
    lng: string
    photo: {
      mobile: {
        l: string
      }
    }
    urls: {
      pc: string
    }
    open: string
    budget: {
      average: string
    }
  }
  
  
  
  
  