import { useState, useEffect } from 'react'
import { RANGE_OPTIONS, fetchRestaurants, type Restaurant } from './api/restaurants'
import { RestaurantModal } from './components/RestaurantModal'
import { Header } from './components/Header'
import { Map } from './components/Map'
import './styles/App.css'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [range, setRange] = useState('3')
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | undefined>()

  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  const fetchAllRestaurants = async (latitude: number, longitude: number, range: string) => {
    let allRestaurants: Restaurant[] = []
    let start = 1
    let hasMore = true

    while (hasMore) {
      const data = await fetchRestaurants(latitude, longitude, range, start)
      allRestaurants = [...allRestaurants, ...data.results.shop]
      start += parseInt(data.results.results_returned)
      hasMore = start < data.results.results_available
    }

    return allRestaurants
  }

  const getLocation = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('お使いのブラウザは位置情報をサポートしていません')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          
          setCurrentLocation({ lat: latitude, lng: longitude })

          const allRestaurants = await fetchAllRestaurants(
            latitude,
            longitude,
            range
          )
          setRestaurants(allRestaurants)
          setTotalResults(allRestaurants.length)
          setCurrentPage(1)
        } catch (err) {
          setError('レストランの取得に失敗しました')
        } finally {
          setLoading(false)
        }
      },
      () => {
        setError('位置情報の取得に失敗しました')
        setLoading(false)
      }
    )
  }

  const restaurantsPerPage = 21
  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage)
  const paginatedRestaurants = restaurants.slice(
    (currentPage - 1) * restaurantsPerPage,
    currentPage * restaurantsPerPage
  )

  return (
    <div className="min-h-screen bg-background font-sans text-text">
      <Header />
      <main className="container content-wrapper">
        <div className="search-card">
          <div className="mb-4">
            <label htmlFor="range" className="search-label">
              検索範囲
            </label>
            <select
              id="range"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="search-select"
            >
              {RANGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={getLocation}
            disabled={loading}
            className="search-button"
          >
            {loading ? (
              <>
                <svg
                  className="spinner"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                検索中...
              </>
            ) : (
              <>
                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                現在地から検索
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="error-message" role="alert">
            <p>{error}</p>
          </div>
        )}

        {totalResults > 0 && (
          <div className="results-count">
            検索結果: {totalResults}件
          </div>
        )}

        {restaurants.length > 0 && (
          <Map
            restaurants={paginatedRestaurants}
            selectedRestaurant={selectedRestaurant}
            onRestaurantClick={setSelectedRestaurant}
            currentLocation={currentLocation}
          />
        )}

        {restaurants.length > 0 && totalPages > 1 && (
          <div className="pagination-container">
            <nav className="pagination-nav" aria-label="Pagination">
              <button
                onClick={() => {
                  setCurrentPage(1);
                  scrollToTop();
                }}
                disabled={currentPage === 1}
                className="pagination-button rounded-l-md"
                aria-label="Go to first page"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  scrollToTop();
                }}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="pagination-text">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  scrollToTop();
                }}
                disabled={currentPage === totalPages}
                className="pagination-button rounded-r-md"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}

        <div className="restaurant-grid">
          {paginatedRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => setSelectedRestaurant(restaurant)}
              className="restaurant-card"
            >
              <img
                src={restaurant.photo.mobile.l}
                alt={restaurant.name}
                className="restaurant-image"
              />
              <div className="restaurant-info">
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <p className="restaurant-address">
                  <svg className="icon text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {restaurant.address}
                </p>
                <p className="restaurant-access">
                  <svg className="icon text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {restaurant.access}
                </p>
              </div>
            </div>
          ))}
        </div>

        <RestaurantModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      </main>
    </div>
  )
}

export default App

