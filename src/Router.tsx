import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { DefaultLayout } from './layouts/defaultLayout'
import AccommodationDetails from './pages/AccommodationDetails'
import NotFound from './components/NotFound'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/accommodation/:id" element={<AccommodationDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}