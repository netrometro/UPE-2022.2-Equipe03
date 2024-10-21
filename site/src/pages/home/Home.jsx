import './Style.css';
import Navbar from '../Components/Navbar';
import DailyButton from '../Components/DailyButton';
import DailyPButton from '../Components/DailyPButton';

export function Home() {
  return (
    <div>
      <Navbar />
      <div className='imagem'>  <img src = 'https://i.imgur.com/o4e1qWl.png' alt='GatoHome'></img></div>
      <div className='botoes'>
      <DailyButton />
      <DailyPButton />
        
      </div>

    </div>
  );
}

export default Home;