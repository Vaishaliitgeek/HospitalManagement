import React from 'react'
import './Category.css'
import catimg1 from './catimg/download.svg'
import dermatology from './catimg/dermatology.svg'
import gastro from './catimg/Gastro.svg'
import gyno from './catimg/Gyno.svg'
import neuro from './catimg/neuro.svg'
import pedia from './catimg/pedia.svg'

const Category = () => {
  const categoryJson = [{ image: catimg1, categoryName: 'General Physician' }, 
    { image: dermatology , categoryName: 'Dermatologist' },  { image: gastro , categoryName: 'Gaestroentronologist' },  
    { image: gyno , categoryName: 'Gynecologist' }, { image:  neuro , categoryName: 'Neurologist' }, 
     ]
  return (
    <div className='continer'>
      <div className="center-heading">
        <h1>Find By Speciality</h1>
        <p>Lorem ipsum dolor sit amet conseanimi sint voluptates officia veritatis odio <br></br>ad tempore mollitia eaque recusandae, voluptatem quasi fuga, repellendus autem?</p>
      </div>
      <div className="category-div">
        {categoryJson.map((item) => (
          <div className="cat1">
            <img src={item.image} />
            <h4>{item.categoryName}</h4>
            {/* <h2>vghvh</h2> */}
          </div>
        ))}
        {/* <div className="cat1">
          <img src={catimg1} />
          <h4>General Physician</h4>
        </div>
        <div className="cat1">
          <img src={catimg1} />
          <h4>General Physician</h4>
        </div><div className="cat1">
          <img src={catimg1} />
          <h4>General Physician</h4>
        </div><div className="cat1">
          <img src={catimg1} />
          <h4>General Physician</h4>
        </div><div className="cat1">
          <img src={catimg1} />
          <h4>General Physician</h4>
        </div><div className="cat1">
          <img src={catimg1} />
          <h4>General Physician</h4>
        </div> */}
      </div>
    </div>
  )
}

export default Category