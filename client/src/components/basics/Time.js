import React from 'react'

const Time = () => {

const Crrdate = new Date().toLocaleDateString();
const Crrtime = new Date().toLocaleTimeString();


  return (
    <div>
      <p>this is the component which tell the time and date</p>
        <h4>Today's Date = {Crrdate}</h4>
        <h4>current  time = {Crrtime}</h4>
    </div>
  )
}

export default Time
