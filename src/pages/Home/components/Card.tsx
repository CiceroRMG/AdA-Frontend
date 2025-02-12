import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
} from "@/components/ui/carousel"
import { Heart } from "phosphor-react"
import { Accommodation } from '@/types/accommodation'

function Card({ name, image, night_price, location }: Accommodation) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (favorites.includes(name)) {
      setIsFavorite(true)
    }
  }, [name])

  const handleFavorite = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    let updatedFavorites

    if (!isFavorite) {
      updatedFavorites = [...favorites, name]
      setIsFavorite(true)
    } else {
      updatedFavorites = favorites.filter((fav: string) => fav !== name)
      setIsFavorite(false)
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const hasImages = image && image.length > 0

  return (
    <div className='flex flex-col justify-center w-full max-w-xs'>
      <div className='flex justify-center'>
        <Carousel className="group relative cursor-pointer">
          <CarouselContent>
            {hasImages ? (
              image.map((img, index) => (
                <CarouselItem key={index}>
                  <div>
                    <img src={img} alt={`${name} ${index + 1}`} className="flex aspect-square items-center justify-center rounded-xl object-cover" />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <div>
                  <img src='https://placehold.co/150' alt="Sem imagem" className="flex aspect-square items-center justify-center rounded-xl object-cover" />
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <Heart 
            onClick={handleFavorite}
            className={isFavorite ? "absolute top-3 right-3 transition duration-100 ease-in-out hover:scale-110 cursor-pointer fill-red-600" : "absolute top-3 right-3 transition duration-100 ease-in-out hover:scale-110 cursor-pointer fill-black"}
            size={28} 
            weight="duotone" 
            color={isFavorite ? "red" : "#f7f7f7"}
          />
          <CarouselIndicators className="bottom-3"/>
          <CarouselPrevious className="!left-4 !top-1/2 !-translate-y-1/2 opacity-100 sm:opacity-0 transition group-hover:opacity-100 cursor-pointer" />
          <CarouselNext className="!right-4 !top-1/2 !-translate-y-1/2 opacity-100 sm:opacity-0 transition group-hover:opacity-100 cursor-pointer" />
        </Carousel>
      </div>
      <div className='flex flex-col justify-center pt-2 gap-0.5'>
        <h3 className='text-gray-900 text-lg font-bold'>{name}</h3>
        <p className='text-gray-600 font-semibold'>{location}</p>
        <p className='flex gap-1 items-center'>
          <span className='text-gray-800 text-lg font-bold'>R$</span>
          <span className='text-gray-800 text-lg font-bold'>{night_price}</span>
          <span className='text-gray-600 font-semibold'>noite</span>
        </p>
      </div>
    </div>
  )
}

export default Card
