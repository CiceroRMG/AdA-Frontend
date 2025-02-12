import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Accommodation } from '@/types/accommodation' 
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { CaretLeft, Heart } from 'phosphor-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AccommodationDetails() {
  const { id } = useParams<{ id: string }>()
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchAccommodation = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${apiUrl}/accommodation/${id}`)
        if (response.ok) {
          const data: Accommodation = await response.json()
          return setAccommodation(data)
        }
        return setAccommodation(null)
      } catch (error) {
        console.error('Erro ao buscar detalhes da acomodação:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAccommodation()
  }, [id, apiUrl])

  useEffect(() => {
    if (accommodation) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      if (favorites.includes(accommodation.name)) {
        setIsFavorite(true)
      }
    }
  }, [accommodation])

  const handleFavorite = () => {
    if (!accommodation) return
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    let updatedFavorites
    if (!isFavorite) {
      updatedFavorites = [...favorites, accommodation.name]
      setIsFavorite(true)
    } else {
      updatedFavorites = favorites.filter((fav: string) => fav !== accommodation.name)
      setIsFavorite(false)
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  if (isLoading) {
    return (
      <div className='p-8'>
        <Skeleton height={40} />
        <Skeleton count={5} />
      </div>
    )
  }

  if (!accommodation) {
    return <div className='py-8 pt-12 text-center text-2xl text-gray-600'>Detalhes não encontrados.</div>
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className='sm:p-8 p-2 relative'>
      <div className="relative flex flex-col sm:items-center sm:flex-row justify-between gap-4">
        <div className='flex items-center gap-4'>
          <Link to="/" className='md:hidden' >
            <CaretLeft size={30} color="#000" weight='bold'/>
          </Link>
          <h1 className='sm:text-3xl text-2xl font-bold'>{accommodation.name}</h1>
        </div>

        <div className='flex gap-2 items-center sm:pr-4 pl-1'>
            {isFavorite  ? <p className='text-gray-700'>Favorito</p> : <p className='text-gray-700' >Favoritar</p>}
            <Heart 
            onClick={handleFavorite}
            className={isFavorite 
                ? "transition duration-100 ease-in-out hover:scale-110 cursor-pointer fill-red-600" 
                : "transition duration-100 ease-in-out hover:scale-110 cursor-pointer fill-black"}
            size={28} 
            weight="duotone" 
            color={isFavorite ? "red" : "#F3F4F6"}
            />
        </div>

      </div>
      
      {accommodation.image && accommodation.image.length > 0 && (
        <>
          {/* mobile */}
          <div className="mt-5 block md:hidden pb-4">
            <Slider {...sliderSettings}>
              {accommodation.image.map((img, idx) => (
                <div key={idx}>
                  <img 
                    src={img} 
                    className="w-full h-auto object-cover rounded" 
                    alt={`Imagem ${idx + 1}`} 
                  />
                </div>
              ))}
            </Slider>
          </div>
          {/* Desktop */}
          <div className="mt-5 hidden md:block relative">
            <div className="flex gap-2">
              <div className="flex-1">
                <img 
                  src={accommodation.image[0]} 
                  className="w-full h-full object-cover rounded-bl-lg rounded-tl-lg max-h-[500px]"
                  alt="Imagem principal" 
                />
              </div>

              <div className="flex-1 grid grid-cols-2 gap-2 relative">
                {accommodation.image.slice(1, 5).map((img, idx) => {
                  const getImageClasses = (index: number) => {
                    if (index === 1) return "w-full h-full object-cover rounded-tr-lg max-h-[300px]"
                    if (index === 3) return "w-full h-full object-cover rounded-br-lg max-h-[300px]"
                    return "w-full h-full object-cover max-h-[300px]"
                  }
                  return (
                    <img 
                      key={idx} 
                      src={img} 
                      className={getImageClasses(idx)} 
                      alt="" 
                    />
                  )
                })}

                {(() => {
                  const count = accommodation.image.slice(1, 5).length
                  const placeholders = 4 - count
                  return Array.from({ length: placeholders }).map((_, index) => (
                    <div 
                      key={`placeholder-${index}`} 
                      className="w-full h-full flex items-center justify-center bg-gray-100 text-sm text-gray-600 rounded max-h-[300px]"
                    >
                      mais fotos em breve
                    </div>
                  ))
                })()}

                {accommodation.image.length > 5 && !showAllPhotos && (
                  <button 
                    onClick={() => setShowAllPhotos(true)}
                    className="absolute bottom-2 right-2 bg-gray-600 bg-opacity-50 text-white text-sm p-2 rounded-md cursor-pointer "
                  >
                    Mostrar todas as fotos
                  </button>
                )}

              </div>

            </div>
            {showAllPhotos && (
              <>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {accommodation.image.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      className="w-full h-full object-cover rounded-lg max-h-[300px]" 
                      alt=""
                    />
                  ))}
                </div>

                <div className="text-left mt-2">
                  <Button onClick={() => setShowAllPhotos(false)} className='bg-gray-600 text-white text-sm p-2 rounded-md cursor-pointer '>
                    Recolher fotos
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
      )}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mt-7 px-2 gap-4'>
        <div>
            <p className='text-lg pb-2'>{accommodation.location}</p>

            <p className='text-2xl font-bold flex items-baseline gap-2 pb-4 sm:pb-0'>
                <span className='text-gray-700'>R$ {accommodation.night_price}</span>
                <span className='font-semibold text-xl'> noite</span>
            </p>

        </div>

        <Button disabled className='sm:text-lg py-6 text-md bg-primary-button'>
            Já reservado
        </Button>

      </div>

      <Card className='flex flex-col gap-2 mt-10 p-5 sm:max-w-1/2 text-lg'>
        <h3 className='text-2xl font-bold'>Sobre o lugar</h3>

        <p>
            Desfrute de dias inesquecíveis nesta charmosa casa de praia localizada a apenas 200 metros do mar! Com um design moderno e acolhedor, o imóvel conta com 3 quartos (sendo 1 suíte), 2 banheiros, sala de estar espaçosa, cozinha totalmente equipada e área gourmet com churrasqueira.
        </p>

        <p>
            Aproveite o amplo quintal com piscina privativa e redes para relaxar ao som das ondas. A casa dispõe de Wi-Fi de alta velocidade, ar-condicionado em todos os cômodos, Smart TV com streaming e garagem para 2 carros.
            Situada em um bairro tranquilo, mas próximo a mercados, restaurantes e atrações locais, é o lugar ideal para famílias e grupos de amigos que buscam conforto, lazer e praticidade.
        </p>

        <p>📍 Localização privilegiada</p>
        <p>🏖️ A poucos passos da praia</p>
        <p>🔥 Área gourmet com churrasqueira</p>
        <p>📶 Wi-Fi e Smart TV</p>
        <p>Reserve agora e viva momentos incríveis! 🌅✨</p>

      </Card>
    </div>
  )
}

export default AccommodationDetails
