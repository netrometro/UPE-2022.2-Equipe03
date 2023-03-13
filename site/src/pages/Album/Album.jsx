import './Style.css';
import Navbar from '../Components/Navbar';
import CardGridAlbum from '../Components/CardGridAlbum';
import CreateAlbumButton from '../Components/CreateAlbumButton';


export function Album() {
 
  return (
    <div>
      <Navbar/>
      <CreateAlbumButton/>
      <CardGridAlbum/>
      <div>
      
      </div>

    </div>
  );
}

export default Album;