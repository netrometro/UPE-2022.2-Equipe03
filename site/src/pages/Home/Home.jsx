import './Style.css';
import Navbar from '../Components/Navbar';
import updateMoney from './server/src/allRoutes/dailyRoutes'
export function Home() {
  return (
    <div>
      <Navbar />
      <div className='container'>
      <div class="main-img">
            <img src="https://media.discordapp.net/attachments/1081023068358590586/1081023227842801704/logo-removebg-preview.png" alt="Gaturinhas" draggable="false"></img>
        </div>

        <button id="mybutton" onClick={updateMoney}>Collect your daily coins</button>
    </div>
    </div>
  );
}
const button = document.querySelector('#mybutton');
    let sec = 86400;
    let countdown = null;

    button.addEventListener ("click", function () {
 alert("10 coins straight to your pocket!")
 });
    
    const updateButton = () => {
    button.innerHTML = `You already collected your coins today`;

    if (sec === 0) {
   clearInterval(countdown);
sec = 10;
 button.innerHTML = 'collect your daily coins';
  button.disabled = false;
  return;
    }
  sec--;
}
button.onclick = () => {
    button.disabled = true;
    updateButton();
    countdown = setInterval(function() {
updateButton();
}, 1000);}
export default Home;