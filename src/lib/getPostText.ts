import { tmdbToken } from "./config.js";

const maxVariablePostChars = 225;

interface TmdbMovie {
  title: string;
  overview: string;
}

// Returns null when no movies were released today, so the bot can skip posting.
export default async function getPostText(): Promise<string | null> {
  // GitHub Actions runners use UTC, so "today" is the UTC date
  const todaysDate = new Date().toISOString().slice(0, 10);
  const yyyy = todaysDate.slice(0, 4);

  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=' + yyyy + '&primary_release_date.gte=' + todaysDate + '&primary_release_date.lte=' + todaysDate + '&release_date.gte=' + todaysDate + '&release_date.lte=' + todaysDate + '&sort_by=popularity.desc';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + tmdbToken,
    }
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json() as { results?: TmdbMovie[] };

  const movie = json.results?.[0];
  if (!movie) {
    return null;
  }

  const maxOverviewChars = maxVariablePostChars - movie.title.length;
  const overview = movie.overview.length > maxOverviewChars
    ? movie.overview.substring(0, maxOverviewChars - 3) + '...'
    : movie.overview;

  return 'Released today: ' + movie.title + '\n\n' + overview + '\n\nRetrieved via The Movie Database API (themoviedb.org).';
}
