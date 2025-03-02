import React from 'react'

export const Button = ({ name, onClick }) => (
  <button
    style={{
      backgroundColor: '#1a327b',
      border: '2px solid #1a327b',
      'border-radius': '8px',
      color: 'white',
      padding: '10px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '14px',
      margin: '5px',
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    {name}
  </button>
)
