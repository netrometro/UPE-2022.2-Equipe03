import './Style.css';
import Navbar from '../Components/Navbar';
import DailyButton from '../Components/DailyButton';
import DailyPButton from '../Components/DailyPButton';

export function Home() {
  return (
    <div>
      <Navbar />
      <div className='imagem'>  <img src = 'https://cdn.discordapp.com/attachments/440326168491720705/1091451539266211960/Untitled_design-removebg-preview.png' alt='GatoHome'></img></div>
      <div className='botoes'>
      <DailyButton />
      <DailyPButton />
        
      </div>

    </div>
  );
}

export default Home;