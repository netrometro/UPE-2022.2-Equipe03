import "./Style.css"
function Home (){
    return (
        <div>
            <header> 
    <div className="logo" >
    <img src="https://media.discordapp.net/attachments/1081023068358590586/1081023228631318579/nome-removebg-preview.png" alt="Gaturinhas" draggable="false"></img>
   </div>
    <div class="topbar">
        <nav class="navbar">
            <nav>
                <ul class="nav-bar">
                    <li class="nav-item"><a href="#" class="nav-link">Gadex</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Lojinha</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Inventário</a></li>
                    <li class="nav-item"><a href="#" class="nav-link">Configurações</a></li>
                </ul>
            </nav>
        </nav>
    </div>
</header>
<body>
    <div class="container">
        <div class="main-img">
            <img src="https://media.discordapp.net/attachments/1081023068358590586/1081023227842801704/logo-removebg-preview.png" alt="Gaturinhas" draggable="false"></img>
        </div>
        <div class="textmain">
            <h1> Colecione com a gente!</h1>
            <p>Este é o "Gaturinhas", um novo colecionar de figurinhas temático.</p>
            </div>
    </div>     
</body>
</div>)}
             const button = document.createElement("button");
             button.innerHTML = "Inicie a Aventura";
             button.id = 'mainButton'

             button.addEventListener ("click", function () {
             alert("Escolha o tema das suas gaturinhas para iniciar sua coleção!")
             });

             document.body.appendChild(button)

             