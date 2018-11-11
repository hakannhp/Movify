import axios from 'axios';

export default class NetworkAccess {
  static MAIN_URL = 'http://52.58.179.173/';
  static IMAGE_PATH = 'http://image.tmdb.org/t/p/original';

  static loginUser(user,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
    axios.post(`${this.MAIN_URL}login`, {
      key: user.key,
      password: user.password,
      })
      .then(() => success())
      .catch(err => {
        failure(err);
      });
  }

  static getMovieDetails(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
    axios.get(`${this.MAIN_URL}title/${id}`)
      .then(res => {
        success(res.data.results);
      })
      .catch(err => {
        failure(err);
      });
  }

  static getUserWatchlist(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
      axios.get(`${this.MAIN_URL}profile/${id}/watchlist`)
        .then(res => {
          success(res.data.results);
        })
        .catch((err) => {
          failure(err);
        })
  }

  static getHomeFeed(
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
      axios.get(`${this.MAIN_URL}feed/0`)
        .then((res) => {
          success(res.data.results);
        })
        .catch((err) => {
          failure(err);
        });
  }

  static getUserWatched(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
      axios.get(`${this.MAIN_URL}profile/${id}/watched`)
        .then(res => {
          success(res.data.results);
        })
        .catch((err) => {
          failure(err);
        })
  }

  static addMovieToWatchlist(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
    axios.post(`${this.MAIN_URL}watchlist`, {titleID: id})
      .then(res => {
        success(res.data.results);
      })
      .catch(err => {
        failure(err);
      });
  }

  static addMovieToWatched(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
    axios.post(`${this.MAIN_URL}watched`, {titleID: id})
      .then(res => {
        success(res.data.results);
      })
      .catch(err => {
        failure(err);
      });
  }

  static getArtistDetails(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
      axios.get(`${this.MAIN_URL}artist/${id}`)
        .then(res => {
          success(res.data.results);
        })
        .catch(err => {
          failure(err);
        });
    }
  static getRecommendations(
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
      axios.get(`${this.MAIN_URL}recommended`)
        .then(res => {
          success(res.data.results);
        })
        .catch(err => {
          failure(err);
        });
    }
}
