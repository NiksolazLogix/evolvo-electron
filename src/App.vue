<template>
  <div id="app">
    <div class="container">
      <div class="text-center">
        <h2 class="text-center mt-5 alert alert-dark">Trending Movies 🍿</h2>
      </div>
      <div class="text-center">
        <div class="container">
          <label for="toggle">
            <button id="toggle" type="button" :class="'d-flex justify-content-center align-items-center mx-5 btn ' + online" @click="onToggle($event)">
              <i class="fa fa-wifi" style="color: #fff;"></i>
            </button>
            {{onLine()}}
          </label>
        </div>
      </div>
      <div class="my-4">
        <a href="#" @click="getTrendingMovies('day')" class="my-1 h4 btn btn-dark">
          DAY</a
        >
        <a href="#" @click="getTrendingMovies('week')" class="mx-3 my-1 h4 btn btn-dark"
          >WEEK</a
        >
      </div>

      <div class="row" v-if="movies.length > 0">
        <div class="col-md-3" v-for="(movie, i) in movies" :key="i">
          <movie-card :movie="movie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from "./components/MovieCard.vue";
export default {
  name: "App",
  components: {
    MovieCard,
  },
  data() {
    return {
      connect: false,
      online: 'btn-danger',
      movies: [],
      apiKey: "9637afe349c62f9da04ef69addf1442e",
    };
  },
  methods: {
    onToggle() {
      this.connect = !this.connect
      Navigator.onLine = this.connect
      if(this.connect) {
        this.online = 'btn-success'
      } else {
        this.online = 'btn-danger'
      }
    },
    getTrendingMovies(category) {
      return fetch(
        `https://api.themoviedb.org/3/trending/movie/${category}?api_key=${this.apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.movies = data.results;
        });
    },
    onLine() {
      if(Navigator.onLine) {
        return 'ONLINE'
      } else {
        return 'OFFLINE'
      }
    },
  },
  mounted() {
    console.log(`welcome on ${process.env.APPPLICATION_NAME}`)
    this.getTrendingMovies("day");
  },
};
</script>
<style>
#toggle {
  width: 30px;
  height: 30px;
  border-radius: 100px;
}
</style>
