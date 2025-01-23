import React from 'react'
import './About.css'
import abimg from './aboutimg/aboutimg.png'
const About = () => {
  return (
    <div className="about-main-div">
    <div className='continer'>
      <div className="m-h">About Us</div>
      <div className="about-div">
        <div className="left-about">
          <img src={abimg}/>
        </div>
        <div className="right-about">
          <p className='mt-[2rem]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae incidunt et, vel omnis aperiam ipsam quo assumenda fugiat molestiae distinctio! Ea illum veritatis nam consequatur.</p>
          <p className='mt-[1.5rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. ipsum dolor sit amet consectetur adipisicing elitNisi fugiat nesciunt suscipit rerum exercitationem aspernatur delectus quas esse porro. Architecto atque possimus nam exercitationem sequi.</p>
          <h3 className='mt-[2rem] font-bold'>Our Vision</h3>
          <p className='mt-[1rem] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, nihil! Nam, unde. Ratione provident ut ipsam cupiditate iure illum assumenda a, harum vitae sequi error.</p>
        </div>
      </div>
      <div className="botton-about">
        <h2 className='mt-[2rem] mb-[2rem]'>Why Choose Us</h2>
        <div className="ab-blocks">
          <div className="block">
            <h3 className='font-bold mb-[15px]'>Efficiency</h3>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="block">
          <h3 className='font-bold  mb-[15px]'>Convience</h3>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="block">
          <h3 className='font-bold  mb-[15px]'>Personalization</h3>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
        </div>
      </div>

    </div>
    </div>
  )
}

export default About