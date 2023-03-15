import './Style.css';
import Navbar from '../Components/Navbar';
import DailyButton from '../Components/DailyButton';
export function Home() {
  return (
    <div>
      <Navbar />
      <DailyButton />
      <div className='container'>
        
      </div>

    </div>
  );
}

export default Home;