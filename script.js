const ADMIN_PASS = 'nitin';
let isAdmin = false;

let animeList = JSON.parse(localStorage.getItem('anime')) || [];
let links = JSON.parse(localStorage.getItem('links')) || [
  'https://linkvertise.com',
  'https://t.me'
];

function save(){
  localStorage.setItem('anime', JSON.stringify(animeList));
  localStorage.setItem('links', JSON.stringify(links));
}

function render(){
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  animeList.forEach((a, index) => {
    grid.innerHTML += `
      <div class="card">
        <img src="${a.image}">
        <div class="info">
          <h3>${a.title}</h3>
          <p>${a.genre} ⭐${a.rating}</p>
          <button onclick="watch()">Watch</button>
          ${isAdmin ? `<button class="delete" onclick="deleteAnime(${index})">Delete</button>` : ``}
        </div>
      </div>
    `;
  });
}

render();

function watch(){
  const r = links[Math.floor(Math.random() * links.length)];
  window.open(r, '_blank');
}

function toggleAdmin(){
  document.getElementById('adminPanel').classList.toggle('hidden');
}

function login(){
  if(document.getElementById('adminPass').value === ADMIN_PASS){
    isAdmin = true;
    alert('Admin logged in');
    render();
  } else {
    alert('Wrong password');
  }
}

function addAnime(){
  animeList.push({
    title: title.value,
    image: image.value,
    genre: genre.value,
    rating: rating.value
  });
  save();
  render();
}

function deleteAnime(index){
  if(!confirm('Delete this anime?')) return;
  animeList.splice(index, 1);
  save();
  render();
}

function addLink(){
  links.push(link.value);
  save();
}
