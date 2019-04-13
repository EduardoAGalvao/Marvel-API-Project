/**********************************MARVEL SLIDER API**********************************/
//ts - a timestamp (or other long string which can change on a request-by-request basis)
//hash - a md5 digest of the ts parameter, your private key and your public key (e.g. md5(ts+privateKey+publicKey)

//example: http://gateway.marvel.com/v1/public/comics?
//ts=1&
//apikey=1234&
//hash=ffd275c5130566a2916217b101f26150

//GitHub Projeto de exemplo: https://github.com/fernandoleonid/Algoritmos/tree/master/Marvel

//Hero example: https://gateway.marvel.com:443/v1/public/characters?name=hulk&apikey=494cf58f30be36502d5b7914f17df079
const $nome = document.querySelector("#opt");
const $btnOk = document.querySelector("#btn");
const $conteiner = document.querySelector(".conteiner-heroi");

const listarHerois = (nome) => {
    const privateKey = 'aa6d0ce8feb8125cc2691f198dc358b5b9ad2254';
    const publicKey  = '494cf58f30be36502d5b7914f17df079';
    const ts = Date.now();
    const hash = md5(ts + privateKey + publicKey);
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${nome}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
    const grupoHerois = [];
    let comprimento = 0;

    const marvel = fetch(url)
     .then(response => response.json())
     .then(response => {
         response.data.results.map(heroi => {
            grupoHerois.push(heroi);
            comprimento++;
        });
         exibirLista(grupoHerois, comprimento);
     });
 }

 const exibirLista = (grupoHerois, comprimento) => {

 const limiteExibicao = 5;

    if(comprimento == 0){

        $conteiner.innerHTML = `
            <div class="carousel slide" id="myslider" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="item active">
                        <h3>It's not in the S.H.I.E.L.D database yet.</h3>
                        <img id="notFound" src="img/notfound.png" alt="Character not found.">
                    </div>
                </div>
            </div>
        `;

    } else if(comprimento == 1 || comprimento < limiteExibicao){

        $conteiner.innerHTML = `
            <div class="carousel slide" id="myslider" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="item active">
                        <h3>${grupoHerois[0].name}</h3>
                        <img src="${grupoHerois[0].thumbnail.path}/portrait_uncanny.${grupoHerois[0].thumbnail.extension}" alt="${grupoHerois[0].name}">
                        <div class="carousel-caption">
                            <p>${grupoHerois[0].description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;   

    } else if(comprimento == limiteExibicao || comprimento > limiteExibicao){

        $conteiner.innerHTML = `
            <div class="carousel slide" id="myslider" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#myslider" data-slide-to="0" class="active"></li>
                    <li data-target="#myslider" data-slide-to="1"></li>
                    <li data-target="#myslider" data-slide-to="2"></li>
                    <li data-target="#myslider" data-slide-to="3"></li>
                    <li data-target="#myslider" data-slide-to="4"></li>
                </ol>
                <div class="carousel-inner">

                    <div class="item active">
                        <h3>${grupoHerois[0].name}</h3>
                        <img src="${grupoHerois[0].thumbnail.path}/portrait_uncanny.${grupoHerois[0].thumbnail.extension}" alt="${grupoHerois[0].name}">
                        <div class="carousel-caption">
                            <p>${grupoHerois[0].description}</p>
                        </div>
                    </div>

                    <div class="item">
                        <h3>${grupoHerois[1].name}</h3>
                        <img src="${grupoHerois[1].thumbnail.path}/portrait_uncanny.${grupoHerois[1].thumbnail.extension}" alt="${grupoHerois[1].name}">
                        <div class="carousel-caption">
                            <p>${grupoHerois[1].description}</p>
                        </div>
                    </div>

                    <div class="item">
                        <h3>${grupoHerois[2].name}</h3>
                        <img src="${grupoHerois[2].thumbnail.path}/portrait_uncanny.${grupoHerois[2].thumbnail.extension}" alt="${grupoHerois[2].name}">
                        <div class="carousel-caption">
                            <p>${grupoHerois[2].description}</p>
                        </div>
                    </div>

                    <div class="item">
                        <h3>${grupoHerois[3].name}</h3>
                        <img src="${grupoHerois[3].thumbnail.path}/portrait_uncanny.${grupoHerois[3].thumbnail.extension}" alt="${grupoHerois[3].name}">
                        <div class="carousel-caption">
                            <p>${grupoHerois[3].description}</p>
                        </div>
                    </div>

                    <div class="item">
                        <h3>${grupoHerois[4].name}</h3>
                        <img src="${grupoHerois[4].thumbnail.path}/portrait_uncanny.${grupoHerois[4].thumbnail.extension}" alt="${grupoHerois[4].name}">
                        <div class="carousel-caption">
                            <p>${grupoHerois[4].description}</p>
                        </div>
                    </div>
                </div>

                <a class="left carousel-control" href="#myslider" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                </a>

                <a class="right carousel-control" href="#myslider" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                </a>
            </div>
         `;

    } 
 	
   $(function(){
      $(".carousel").carousel({
         interval: 2500, 
         pause: false,
         wrap: true,
         keyboard: true
      });
   });
 }
 
$btnOk.addEventListener("click", () => listarHerois($nome.value));