import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';



function App() {
  //another state to keep data, that is not rly neccessary
  const [people,setPeople] = useState(data)
  //state for index which represents active slide
  const [index,setIndex] = useState(0)
  //effect to operate cases when we go above count of elements in data or when we go negative
  //notice array, so it means that effect will work only when one of those 2 changing
  useEffect(() => {
    const lastIndex = people.length - 1
    if (index < 0) {
      setIndex(lastIndex)
    }
    if (index > lastIndex) {
      setIndex(0)
    }
  },[index,people])
  //that effect is just for autoslide, notice 2nd parameter and return function which clears interval every render cuz sbros goes after every render by default
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1)
    },3000)
    //so when i click next-btn, i clear previous interval or evert btn click will make intervals
    return () => clearInterval(slider)
  },[index])
  //whole thing here w/ adding classes
  //we make 'nextSlide' as default, and active and last are just on conditions
  //so based on person in araay indexs we give each person some classes
  //w/ css it just active on center, last/previous are on the left, and all other on the right, leftnright are not visible
  //w/ click events we just change avctive index and w/ rerenders another persons will get another classes
  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className='section-center'>
        {people.map((person,presonIndex) => {
          const {id,image,name,title,quote} = person
          let position = 'nextSlide'
          if (presonIndex === index) {
            position = 'activeSlide'
          } 
          if (presonIndex === index - 1 || (index === 0 && presonIndex === people.length - 1) ) {
            position = 'lastSlide'
          }
          return <article className={position} key={id}>
            <img src={image} className='person-img' />
            <h4>{name}</h4>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon' />
          </article>
        })}
        <button className='prev' onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  )
}

export default App;
