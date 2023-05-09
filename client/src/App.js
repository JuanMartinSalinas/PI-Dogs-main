import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import Form from './components/Form/Form';
import styles from './App.module.css'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.main}>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/dogs/:id' component={Details}/>
        <Route path='/newDog/' component={Form}/>
      </div>
    </BrowserRouter>
  );
}

export default App;