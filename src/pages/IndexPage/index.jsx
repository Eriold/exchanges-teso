import React from 'react'

export const IndexPage = ({newArray}) => {
  return (
    <div>
      {console.log('newArray 2',newArray)}
      <ul>
        {newArray.map((item, index) => 
          <li key={index}> <img src={item.image} alt={item.name} /> {item.name}</li>
        )}
      </ul>
    </div>
  )
}
