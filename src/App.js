import './index.css';
import { Routes, Route } from 'react-router-dom';
import AllCountries from './components/AllCountries';
import CountryInfo from './components/CountryInfo';

function App() {
  return (
    <>
     <div className="header">
      <header className="container">
       <h5>Where in the World?</h5>
      </header>
    </div>

    <div className='container'>
      <Routes>
        <Route path='/' element={ <AllCountries/>}/>
        <Route path='/country/:countryName' element={ <CountryInfo/>}/>

      </Routes>
    </div>
    </>
  )
   
}

export default App;
