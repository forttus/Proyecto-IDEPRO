import React from 'react'

const Home =() => {
  const url = 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z5bGljMTRwNXFpaDAxc2M1MGUyMHE2cGc1dDE3bHEycm45bGZieCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ccv6bzv2rNoBMEKZw4/giphy.gif'

  return (
    <div style={{
  textAlign: 'center',
  padding: '2rem',
  backgroundColor: '#fff8f0',
  borderRadius: '15px',
  fontFamily: "'Comic Sans MS', cursive",
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
}}>
  <h1> 🐾 ¡¡ SHIRLEY YA NO RENIEGUES !! 🐾</h1>
  <img 
    src={url} 
    alt="Un gato bonito para Shirley" 
    style={{ width: '100%', maxWidth: '600px', margin: '1rem auto', borderRadius: '10px' }}
  />
  <p>Los gatos están aquí para ayudarte... y también para dormir en tu teclado 💻</p>
</div>
  )
}

Home.propTypes = {}

export default Home

