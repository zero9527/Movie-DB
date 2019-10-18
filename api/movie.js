const HttpUtil = require('./index.js');

export function getMovieLine(params=null) {
  return HttpUtil('/v2/movie/in_theaters', {
    data: params
  });
}

export function getMovieComing(params=null) {
  return HttpUtil('/v2/movie/coming_soon', {
    data: params
  });
}

export function getMovieTop250(params=null) {
  return HttpUtil('/v2/movie/top250', {
    data: params
  });
}

export function getMovieDetail({ id }) {
  return HttpUtil('/v2/movie/subject/'+id);
}

export const heihei = '';
