import './Style.css';
import Navbar from '../Components/Navbar';
import DailyButton from '../Components/DailyButton';
export function Home() {
  return (
    <div>
      <Navbar />
      <div className='container'>
      <DailyButton />
        
      </div>

    </div>
  );
}

export default Home;