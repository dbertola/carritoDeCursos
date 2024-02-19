//variables
const formuario= document.querySelector('#formulario');
const listaTweets= document.querySelector('#lista-tweets');
let tweets= [];


//eventlisteners

eventlisteners();

function eventlisteners(){
    formuario.addEventListener('submit',agregarTweet);
    document.addEventListener('DOMContentLoaded',()=>{
        tweets= JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}




//funciones
function agregarTweet(e){
    e.preventDefault();
    const tweet= document.querySelector('#tweet').value;
    if (tweet ===''){
        mostrarError('no puede enviarse vacio')
        return;
    }

    const tweetObj={
        id: Date.now(),
        tweet
    }
    tweets= [...tweets, tweetObj]
    crearHTML();
    formuario.reset();
}

function mostrarError(mensaje){
    const mensajeError= document.createElement('P');
    mensajeError.textContent=mensaje;
    mensajeError.classList.add('error','uppercase');
    const contenido= document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    setTimeout(()=>{
            mensajeError.remove();
    },4000)
}

function crearHTML(){
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach(tweet =>{
            const btnEliminar= document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent='x';
            btnEliminar.onclick=()=>{
                borrarTweet(tweet.id);
            }
            const li= document.createElement('li');
            li.textContent=tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        })
    }
    sincronizarStorage();
}

function borrarTweet(id){
    tweets= tweets.filter(tweet =>tweet.id != id);
    crearHTML();
}

function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}