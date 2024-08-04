import { useState } from 'react';
import React from 'react';

const Search = ({onSearch}) => {
    const [input, setInput] = useState('');
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        onSearch(input)
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Search for Countries...' value={input} onChange={(e)=>setInput(e.target.value)}/>
    </form>
  )
}

export default Search;