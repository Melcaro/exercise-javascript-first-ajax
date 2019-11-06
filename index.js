// Niveau 2: Trivial poursuite API

function fetchQuestions(amount = 1, difficulty = 'easy', type = 'multiple') {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=15&difficulty=${difficulty}&type=${type}`;
  axios
    .get(url)
    .then(({ data }) => {
      const questions = data.results.map(({ question }) => question);
      console.log(questions);
    })
    .catch(e => console.error(e));
}

//fetchQuestions(5, 'medium');

// Niveau 2: Géolocation

function forwardGeocoding(adress, format = 'json') {
  const url = `https://geocode.xyz/${adress}?${format}=1`;
  axios
    .get(url)
    .then(({ data }) => console.log(data))
    .catch(e => console.error(e));
}
//forwardGeocoding('tour eiffel paris');

function reverseGeocoding(latitude, longitude, format = 'json') {
  const url = `https://geocode.xyz/${latitude},${longitude}?geoit=${format}`;
  console.log(url);
  axios
    .get(url)
    .then(data => console.log(data))
    .catch(e => console.error(e));
}
//reverseGeocoding(51.50354, -0.12768);

function sentimentAnalysis(textToAnalyse) {
  axios
    .post('https://geocode.xyz', {
      scantest:
        'The most important museums of Amsterdam are located on the Museumplein, located at the southwestern side of the Rijksmuseum.',
      geoit: 'json',
      sentiment: 'analysis',
    })
    .then(({ data }) => {
      const sentiments = data.sentimentanalysis.filter(
        ({ score }) => score > 0
      );
      console.log(sentiments);
    })
    .catch(e => console.error(e));
}

// Niveau 2: Chuck Norris

function randomChuck() {
  const url = `https://api.chucknorris.io/jokes/random`;
  axios
    .get(url)
    .then(({ data }) => console.log(data.value))
    .catch(e => console.error(e));
}
//randomChuck();

function chuckNorrisInCategory(category) {
  if (category) {
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    axios
      .get(url)
      .then(({ data }) => console.log(data.value))
      .catch(e => console.error(e));
  }
  randomChuck();
}
//chuckNorrisInCategory();

function searchChuckNorrisFact(search) {
  const url = `https://api.chucknorris.io/jokes/search?query=${search}`;
  axios
    .get(url)
    .then(({ data }) => console.log(data.result.map(fact => fact.value)))
    .catch(e => console.error(e));
}
//searchChuckNorrisFact('cat');

// Niveau 2: Hacker News

function getTopHackerNewsStories() {
  return axios
    .get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(({ data }) => data);
}
//getTopHackerNewsStories();

function getHackerNewsTitleById(storyId) {
  const url = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;
  axios
    .get(url)
    .then(({ data: { title } }) => console.log(title))
    .catch(e => console.error(e));
}
//getHackerNewsTitleById(21459237);

function getTopStoriesTitles() {
  getTopHackerNewsStories().then(ids => ids.map(getHackerNewsTitleById));
}
//getTopStoriesTitles();

// Niveau 2 : City Bike

function getBikeInCity(selectedCity) {
  axios
    .get('http://api.citybik.es/v2/networks')
    .then(({ data: { networks } }) =>
      networks.find(({ location: { city } }) => city === selectedCity)
    )
    .then(({ id }) => axios.get(`http://api.citybik.es/v2/networks/${id}`))
    .then(({ data: { network: { stations } } }) =>
      stations.map(({ name, free_bikes: freeBikes }) => ({
        name,
        freeBikes,
      }))
    )
    .then(stations => console.log(stations));
}

//getBikeInCity('Paris');

// Niveau 2: Game of Throne

function getHouses() {
  axios
    .get('https://www.anapioficeandfire.com/api/houses')
    .then(({ data }) => console.log(data));
}

//getHouses();

function getMembersOfHousesById(houseId) {
  axios
    .get(`https://www.anapioficeandfire.com/api/houses/${houseId}`)
    .then(({ data: { swornMembers } }) => swornMembers)
    .then(swornMembers =>
      swornMembers.map(memberUrl =>
        axios.get(memberUrl).then(({ data: { name } }) => console.log(name))
      )
    );
}

getMembersOfHousesById(362);
