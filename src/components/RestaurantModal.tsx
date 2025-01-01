import React from 'react'
import { Restaurant } from '../api/restaurants'
import '../styles/RestaurantModal.css'

interface RestaurantModalProps {
  restaurant: Restaurant | null
  onClose: () => void
}

export const RestaurantModal: React.FC<RestaurantModalProps> = ({ restaurant, onClose }) => {
  if (!restaurant) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content" role="dialog" aria-modal="true">
        <img src={restaurant.photo.mobile.l} alt={restaurant.name} className="modal-image" />
        <div className="modal-body">
          <h2 className="modal-title">{restaurant.name}</h2>
          <div className="modal-info">
            <p className="modal-info-item">
              <svg className="modal-icon text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {restaurant.address}
            </p>
            <p className="modal-info-item">
              <svg className="modal-icon text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {restaurant.open}
            </p>
            <p className="modal-info-item">
              <svg className="modal-icon text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {restaurant.access}
            </p>
          </div>
          <div className="modal-buttons">
            <button
              onClick={onClose}
              className="modal-button modal-button-close"
            >
              閉じる
            </button>
            <a
              href={restaurant.urls.pc}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-button modal-button-details"
            >
              詳細を見る
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

