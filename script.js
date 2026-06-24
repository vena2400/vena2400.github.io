let comics = [];
let current = '전체';

fetch('data/comics.json')
.then(r => r.json())
.then(data => {
    comics = data;
    render();
});

function render(){

    const q = (document.getElementById('search').value || '').toLowerCase();

    let list = comics.filter(c =>
        (current === '전체' || c.author === current) &&
        c.title.toLowerCase().includes(q)
    );

const sortEl = document.getElementById('sort');

if(!sortEl){
    alert("sort를 찾지 못함");
    return;
}

const sort = sortEl.value;

if(sort === 'new'){
    list.sort((a,b)=>
        b.date.localeCompare(a.date)
    );
}else{
    list.sort((a,b)=>
        a.date.localeCompare(b.date)
    );
}

    document.getElementById('stats').textContent =
        `총 ${list.length}화`;

    document.getElementById('comicList').innerHTML =
list.map(c=>`

<div class="card">

    <a class="title" href="comic.html?id=${c.id}">
        ${c.title}
    </a>

    <div class="meta">
        ✍️ ${c.author}
    </div>

    <div class="date">
        📅 ${c.date}
    </div>

    </div>

    `).join('');
}

document.addEventListener('click',e=>{

    if(e.target.dataset.author){

        current = e.target.dataset.author;

        document
            .querySelectorAll('.filters button')
            .forEach(btn => btn.classList.remove('active'));

        e.target.classList.add('active');

        render();
    }

});

document.addEventListener('input',e=>{

    if(
        e.target.id === 'search' ||
        e.target.id === 'sort'
    ){
        render();
    }

});

const darkBtn = document.getElementById('darkToggle');

if(localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark');
    darkBtn.textContent = '☀️';
}else{
    darkBtn.textContent = '🌙';
}

darkBtn.addEventListener('click',()=>{

    document.body.classList.toggle('dark');

    if(document.body.classList.contains('dark')){
        darkBtn.textContent = '☀️';
        localStorage.setItem('theme','dark');
    }else{
        darkBtn.textContent = '🌙';
        localStorage.setItem('theme','light');
    }

});
