    // Variables
    const formulario = document.querySelector('#formulario');
    const listaTweets = document.querySelector('#lista-tweets');
    let tweets = [];


    // Event Listeners
    eventListeners();

    function eventListeners(){
        // Cuando el usuario agrega un nuevo tweet
        formulario.addEventListener('submit', agregarTweet);

        // Cuando el documento esta listo
        document.addEventListener('DOMContentLoaded', () => {
            // Cuando el documento este listo va a leer de localstorage
            // busca en el localstorage los tweets y conviertelos a jsonparse pero si marca NULL asignalo como un arreglo vacio
            tweets = JSON.parse( localStorage.getItem('tweets')) || [];

            crearHTML();
        })
    }

    // Funciones
    function agregarTweet(e) {
        e.preventDefault();

        // textarea donde el usuario escribe
        const tweet = document.querySelector('#tweet').value;
        
        // Validacion...
        if(tweet === '') {
            mostrarError('No puede ir vacio');

            return; 
        }

        const tweetObj = {
            id: Date.now(),
            tweet
        }

        // Añadir al arreglo de tweets
        tweets = [...tweets, tweetObj];

        // Una vez agregado vamos a crear el HTML
        crearHTML();

        // Reiniciar el formulario
        formulario.reset();
    }

    // mostrar mensaje de error
    function mostrarError(error) {
        const mensajeError = document.createElement('p');
        mensajeError.textContent = error;
        mensajeError.classList.add('error');

        // insertarlo en el Contenido 
        const contenido = document.querySelector('#contenido');
        contenido.appendChild(mensajeError);

        // elimina la alerta despues de 3 segundos
        setTimeout(() => {
            mensajeError.remove();
        }, 3000);
    }

    // Muestra un listado de los tweets
    function crearHTML(){

        // El limpiarHTML se ejecuta antes que el codigo de abajo
        limpiarHTML();

        if(tweets.length > 0) {
            tweets.forEach( tweet => {
                // Agregar un boton de eliminar
                const btnEliminar = document.createElement('a');
                btnEliminar.classList.add('borrar-tweet');
                btnEliminar.innerText = 'Borrar';

                // Añadir la funcion de eliminar al dom
                btnEliminar.onclick = () => {
                        borrarTweet(tweet.id);
                }


                //Crear el HTML

                const li = document.createElement('li');

                //Añadir el texto
                li.innerText = tweet.tweet;

                // Asignar el boton
                li.appendChild(btnEliminar);

                // Insertarlo en el html
                listaTweets.appendChild(li);
            });
        }

        sincronizarStorage();
    }

    // Agregamos los tweets actuales a Localstorage        
    function sincronizarStorage() {
        localStorage.setItem('tweets', JSON.stringify(tweets));
    }

    // Eliminar un tweet
    function borrarTweet(id) {
        tweets = tweets.filter( tweet => tweet.id !== id);
        crearHTML();
    }

    // Limpiar HTML
    function limpiarHTML() {
        // mientras haya elementos
        while(listaTweets.firstChild) {
            listaTweets.removeChild(listaTweets.firstChild);  
        }
    }
