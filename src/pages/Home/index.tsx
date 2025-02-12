import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import Card from './components/Card'
import { Button } from '@/components/ui/button'
import { MagnifyingGlass } from 'phosphor-react'
import { Accommodation } from '@/types/accommodation' 
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'

function Home() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [city, setCity] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchAccommodations = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${apiUrl}/accommodations`)
        const data: Accommodation[] = await response.json()
        setAccommodations(data)
      } catch (error) {
        console.error('Erro ao buscar acomodações:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAccommodations()
  }, [apiUrl])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(`${apiUrl}/accommodations?city=${encodeURIComponent(city)}`)
      const data: Accommodation[] = await response.json()
      setAccommodations(data)
    } catch (error) {
      console.error('Erro ao buscar acomodações filtradas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center sm:pt-10 pt-2 px-3'>
      <section>
        <h1 className='sm:text-3xl text-1xl font-bold text-center text-gray-800 pb-5'>Encontre uma hospedagem para a temporada</h1>
      </section>

      <form onSubmit={handleSubmit} className='w-full relative flex flex-row items-center justify-center max-w-4xl pb-5'>
        <Input 
          placeholder='Buscar por cidade' 
          className='max-w-4xl h-17 rounded-full px-10 text-lg placeholder:text-lg pt-2'
          value={city}
          onChange={e => setCity(e.target.value)}
        />

        <Button type='submit' className='absolute right-3 rounded-full py-6 px-4 bg-primary-button box-content cursor-pointer'>
          <MagnifyingGlass className='icon-size' size={25} color="#f7f7f7" weight='bold'/>
        </Button>
        
      </form>

      <div className='w-full flex items-center justify-center'>
        <div className='flex flex-row gap-7 sm:gap-y-10 gap-y-5 justify-center items-center flex-wrap sm:py-10 py-5 '>
          {isLoading 
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="w-72 h-96 p-4 border rounded-md">
                  <Skeleton height={200} />
                  <div className="mt-4">
                    <Skeleton count={3} />
                  </div>
                </div>
              ))
            : accommodations.length === 0 
              ? <div className='text-center text-lg text-gray-600'>Que pena! Nenhuma hospedagem encontrada para essa busca.</div>
              : accommodations.map(accommodation => (
                  <Link
                    key={accommodation.id}
                    to={`/accommodation/${accommodation.id}`}
                    className="cursor-pointer"
                  >
                    <Card {...accommodation} />
                  </Link>
                ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home