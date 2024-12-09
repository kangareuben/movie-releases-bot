export default async function getPostText() {
  // Generate the text for your post here. You can return a string or a promise that resolves to a string
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  var todaysDate = yyyy + '-' + mm + '-' + dd;
  var maxVariablePostChars = 225;
  
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=' + yyyy + '&primary_release_date.gte=' + todaysDate + '&primary_release_date.lte=' + todaysDate + '&release_date.gte=' + todaysDate + '&release_date.lte=' + todaysDate + '&sort_by=popularity.desc';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTllNTQ3ZjQ5ZmM2Yzg4YzYyNGJlMjhiOTdhMjJmNCIsIm5iZiI6MTczMzU0Mzc1OC4yMjEsInN1YiI6IjY3NTNjNzRlZGYzYWU5N2UxYzJmNDA0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u2tpTIDcWYBh3RsMaZcNKEkdXuDyfnJ6h7lRp029vAE'
    }
  };

  return new Promise<string>((resolve) => {
    fetch(url, options)
    .then(res => res.json())
    .then(json => resolve('Released today: ' + json.results[0].title + '\n\n' + (json.results[0].overview.length > maxVariablePostChars - json.results[0].title.length ? (json.results[0].overview.substring(0, maxVariablePostChars - json.results.title.length - 3) + '...') : json.results[0].overview) + '\n\nRetrieved via The Movie Database API (themoviedb.org).'))
    .catch(err => console.error(err))
	});
}
