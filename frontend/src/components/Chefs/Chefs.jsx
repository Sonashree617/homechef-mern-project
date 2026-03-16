import "./Chefs.css"

const chefs = [
  { name:"Chef Arjun", rating:4.9, image:"https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },
  { name:"Chef Rahul", rating:4.7, image:"https://images.unsplash.com/photo-1551218808-94e220e084d2" },
  { name:"Chef Priya", rating:4.8, image:"https://images.unsplash.com/photo-1607746882042-944635dfe10e" }
]

function Chefs(){

  return(
    <section className="chefs section container">

      <h2 className="section-title">
        Top Chefs
      </h2>

      <div className="chefs-grid">

        {chefs.map((chef,index)=>(
          <div className="chef-card" key={index}>

            <img src={chef.image} alt={chef.name}/>

            <h3>{chef.name}</h3>

            <p>⭐ {chef.rating}</p>

          </div>
        ))}

      </div>

    </section>
  )
}

export default Chefs