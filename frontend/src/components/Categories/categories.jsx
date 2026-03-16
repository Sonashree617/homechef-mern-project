 import "./categories.css"

const categories = [
{ name:"Pizza", icon:"🍕" },
{ name:"Burger", icon:"🍔" },
{ name:"Biryani", icon:"🍛" },
{ name:"Healthy", icon:"🥗" },
{ name:"Desserts", icon:"🍰" },
{ name:"Drinks", icon:"🥤" }
]

function Categories(){

return(

<section className="categories container section">

<h2 className="section-title">
Browse Categories
</h2>

<div className="category-grid">

{categories.map((cat,index)=>(

<div className="category-card" key={index}>

<span className="category-icon">
{cat.icon}
</span>

<p>{cat.name}</p>

</div>

))}

</div>

</section>

)

}

export default Categories;