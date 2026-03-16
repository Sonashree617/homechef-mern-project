import "./Hero.css"
import { FiSearch } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Hero() {

    const navigate = useNavigate()
    const [query, setQuery] = useState("")

    const handleSearch = () => {

        if (query.trim() === "") return

        navigate(`/?search=${query}`)

    }

    const exploreMenu = () => {

        document.getElementById("popular").scrollIntoView({
            behavior: "smooth"
        })

    }

    const orderNow = () => {

        navigate("/cart")

    }

    return (

        <>
            <section className="hero">

                <div className="hero-overlay"></div>

                <div className="hero-content container">

                    <h1>Discover Homemade Food</h1>

                    <p>
                        Fresh meals made by talented home chefs near you
                    </p>

                    
                    <div className="hero-buttons">

                        <button className="order-btn" onClick={orderNow}>
                            Order Now
                        </button>

                        <button className="explore-btn" onClick={exploreMenu}>
                            Explore Menu
                        </button>

                    </div>

                </div>

            </section>

        </>

    )

}

export default Hero