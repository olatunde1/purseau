import React from 'react'
import Cloth from '../assets/images/clothCategory.png'
import Bags from '../assets/images/bagCategory.png'
import Shoes from '../assets/images/shoeCategory.png'
import Jewelry from '../assets/images/necklaceCategory.png'
import Hat from '../assets/images/hatCategory.png'
import Brush from '../assets/images/faceBrushCategory.png'


const ExploreCategories = () => {
    return <>
    <div className="explore-wrapper">
        <div className="explore-by-categories">
        <h1 className='explore-text'>Explore By Categories</h1>
        <p className='browse-favorites'>Browse you favorites by categories</p>
        </div>
        <div className="explore-by-categories-images">
            <img src={Cloth} alt="" />
            <img src={Bags} alt="" />
            <img src={Shoes} alt="" />
            <img src={Jewelry} alt="" />
            <img src={Hat} alt="" />
            <img src={Brush} alt="" />

        </div>
    </div>
 </>
}

export default ExploreCategories



