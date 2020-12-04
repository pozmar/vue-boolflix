/*Milestone 1: Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato: Titolo Titolo Originale Lingua Votonome
Milestone 2:
Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).

Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)

Milestone 3:
In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse. Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la parte finale dell’URL passata dall’API.
Milestone 4:
Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp, creando un layout completo simil-Netflix:
Un header che contiene logo e search bar
Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio la poster_path con w342)
Andando con il mouse sopra una card (on hover), appaiono le informazioni aggiuntive già prese nei punti precedenti più la overview
*/
const flags = {
  EN: 'css/img/EN.png',
  ES: 'css/img/ES.png',
  DE: 'css/img/DE.png',
  DA: 'css/img/DA.png',
  EL: 'css/img/EL.png',
  FR: 'css/img/FR.png',
  IT: 'css/img/IT.png',
  KO: 'css/img/KO.png',
  CN: 'css/img/CN.png',
  NL: 'css/img/NL.png',
  PT: 'css/img/PT.png',
  RU: 'css/img/RU.png',
  NOTF: 'css/img/logo.jpg'
}
const myApp = new Vue ({
  el: "#root",
  data: {
    movies: [],
    people: [],
    querySelect: "",
    api_key: "fd80e6d24b1bc63e99d958a4dec41cf2",
    flags,
    page: 1,
    selection: "",
  },
  methods: {
    searchingMovie: function(){
      axios.get("https://api.themoviedb.org/3/search/movie",{
        params: {
          'api_key' : this.api_key,
          query: this.querySelect,
          page: this.page
        }
      }
    ).then(r =>
      {this.movies = r.data.results;
      })
    },
    searchingSeries: function(){
      axios.get("https://api.themoviedb.org/3/search/tv",{
        params: {
          'api_key' : this.api_key,
          query: this.querySelect,
          page: this.page,
        }
      }
    ).then(result =>
      {this.movies = [... result.data.results].map(e => {
        return {...e, title: e.name, original_title: e.original_name}});
      })
    },
whatSearch: function(){
  if(this.selection == "film"){
    this.searchingMovie();
  }
  if(this.selection == "series"){
    this.searchingSeries();
  }
  if(this.selection == "people"){
    this.searchingPeople();
  }
},
voting: function(n){
  return Math.round(n / 2);
},
imgError: function(e){
  e.target.src = 'img/logo.jpg'

}
}
})
