import "./Home.css"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import API from "../../api"
import { FaSearch } from "react-icons/fa"
import Hero from "../../components/Hero/hero"
import Categories from "../../components/Categories/Categories"
import Chefs from "../../components/Chefs/Chefs"
import FoodCard from "../../components/FoodCard/FoodCard"

function Home() {

   const [dishes, setDishes] = useState([])
   const [searchInput, setSearchInput] = useState("")
   const [search, setSearch] = useState("")
   const [category, setCategory] = useState("All")
   const location = useLocation()

   const demoDishes = [
      {
         _id: "69b77e5fa4de8e1cf97a0f6c",
         name: "Chicken Biryani",
         chef: "Chef Arjun",
         price: 299,
         rating: 4.8,
         category: "Non-Veg",
         image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800"
      },
      {
         _id: "69b77e5fa4de8e1cf97a0f6d",
         name: "Paneer Butter Masala",
         chef: "Chef Meera",
         price: 259,
         rating: 4.6,
         category: "Veg",
         image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7"
      },
      {
         _id: "69b77e5fa4de8e1cf97a0f6e",
         name: "Chicken Burger",
         chef: "Chef Kevin",
         price: 199,
         rating: 4.5,
         category: "Non-Veg",
         image: "https://images.unsplash.com/photo-1550547660-d9450f859349"
      },
      {
         _id: "69b77e5fa4de8e1cf97a0f6f",
         name: "Veg Pasta",
         chef: "Chef Luca",
         price: 279,
         rating: 4.4,
         category: "Veg",
         image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800"
      },
      {
         _id: "69b77e5fa4de8e1cf97a0f70",
         name: "Grilled Fish",
         chef: "Chef Arjun",
         price: 349,
         rating: 4.7,
         category: "Non-Veg",
         image: "https://images.unsplash.com/photo-1559847844-5315695dadae"
      },
      {
         _id: "69b77fd8a4de8e1cf97a0f77",
         name: "Paneer Tikka",
         chef: "Chef Meera",
         price: 199,
         rating: 4.6,
         category: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
      },
      {
         _id: "69b77fd8a4de8e1cf97a0f78",
         name: "Chocolate Brownie",
         chef: "Chef Kevin",
         price: 149,
         rating: 4.9,
         category: "Dessert",
         image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
      },
      {
         _id: "69b77fd8a4de8e1cf97a0f79",
         name: "Fruit Salad",
         chef: "Chef Luca",
         price: 129,
         rating: 4.5,
         category: "Dessert",
         image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea"
      },
      {
         _id: "69b77fd8a4de8e1cf97a0f7b",
         name: "Veg Sandwich",
         chef: "Chef Meera",
         price: 159,
         rating: 4.3,
         category: "Veg",
         image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af"
      }
   ];
   useEffect(() => {

      const fetchDishes = async () => {
         try {
            const res = await API.get("/dishes")
            setDishes(res.data.length ? res.data : demoDishes)
         } catch (err) {
            console.log(err)
            setDishes(demoDishes)
         }
      }

      fetchDishes()

   }, [])

   const filteredDishes = dishes.filter((dish) => {
      const matchSearch =
         dish.name.toLowerCase().includes(search.toLowerCase())

      const matchCategory =
         category === "All" || dish.category === category

      return matchSearch && matchCategory
   })
   return (

      <div>

         <Hero />
         <Categories />
         <Chefs />

         <section className="popular-section" id="popular">
            <h2 className="section-title">Popular Dishes</h2>

            <div className="category-filter">

               <button
                  className={category === "All" ? "active" : ""}
                  onClick={() => setCategory("All")}
               >
                  All
               </button>

               <button
                  className={category === "Veg" ? "active" : ""}
                  onClick={() => setCategory("Veg")}
               >
                  Veg
               </button>

               <button
                  className={category === "Non-Veg" ? "active" : ""}
                  onClick={() => setCategory("Non-Veg")}
               >
                  Non-Veg
               </button>

               <button
                  className={category === "Dessert" ? "active" : ""}
                  onClick={() => setCategory("Dessert")}
               >
                  Desserts
               </button>

            </div>

            <div className="search-container">

               <input
                  type="text"
                  className="search-input"
                  placeholder="Search dishes..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
               />


               <button
                  className="search-btn"
                  onClick={() => setSearch(searchInput)}
               >
                  <FaSearch />
               </button>

            </div>

            <div className="food-grid">

               {filteredDishes.map((dish) => (

                  <FoodCard
                     key={dish._id}
                     id={dish._id}
                     image={dish.image}
                     name={dish.name}
                     chef={dish.chef?.name || "Home Chef"}
                     price={dish.price}
                     rating={dish.rating || 4.5}
                  />

               ))}

            </div>

         </section>


      </div>

   )
}

export default Home