/*Milestone 1: Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente. Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato: Titolo Titolo Originale Lingua Votonome*/
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
    querySelect: "",
    api_key: "fd80e6d24b1bc63e99d958a4dec41cf2",
    flags,
  },
  methods: {
    searching: function(){
      axios.get("https://api.themoviedb.org/3/search/movie",{
        params: {
          'api_key' : this.api_key,
          query: this.querySelect,
        }
      }
    ).then(r =>
      {this.movies = r.data.results;
      }),
      axios.get("https://api.themoviedb.org/3/search/tv",{
        params: {
          'api_key' : this.api_key,
          query: this.querySelect,
        }
      }
    ).then(result =>
    {this.movies = [... result.data.results].map(e => {
      return {...e, title: e.name, original_title: e.original_name}});
    })
    },
    voting: function(n){
      return Math.round(n / 2);
    },
  imgError: function(e){
      e.target.src = 'img/logo.jpg'

  }
}
})
