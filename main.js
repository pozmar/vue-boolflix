/*Milestone 1: Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato: Titolo Titolo Originale Lingua Votonome*/
const API_KEY = "fd80e6d24b1bc63e99d958a4dec41cf2";
const myApp = new Vue ({
  el: "#root",
  data: {
    movies: [],
    querySelect: "",
  },
  methods: {
    searching: function(){
      axios.get("https://api.themoviedb.org/3/search/movie",{
        params: {
          'api_key' : API_KEY,
          query: this.querySelect,
        }
      }
    ).then(r =>
      {this.movies = r.data.results;
        console.log(this.movies);
      })
    }
  }
})
