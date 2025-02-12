import { Link } from "react-router-dom"

function Header() {
    return (
      <div className="fixed top-0 left-0 right-0 flex justify-center items-center bg-white border-b sm:py-8 py-6 z-50">
        <header>
          <Link to="/">
            <img src="/logo.png" className="sm:w-50 w-40"/>
          </Link>
        </header>
      </div>
    )
  }
  
  export default Header