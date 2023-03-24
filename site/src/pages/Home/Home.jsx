import './Style.css';
import Navbar from '../Components/Navbar';
import DailyButton from '../Components/DailyButton';
import DailyPButton from '../Components/DailyPButton';

export function Home() {
  return (
    <div>
      <Navbar />
      <div className='container'>
      <DailyButton />
      <DailyPButton />
        
      </div>

    </div>
  );
}

export default Home;