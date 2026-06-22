
let comics=[];let current='전체';
fetch('data/comics.json').then(r=>r.json()).then(data=>{comics=data;render();});
function render(){
 const q=(document.getElementById('search').value||'').toLowerCase();
 let list=comics.filter(c=>(current==='전체'||c.author===current)&&c.title.toLowerCase().includes(q));
 list.sort((a,b)=>b.date.localeCompare(a.date));
 document.getElementById('stats').textContent=`총 ${list.length}화`;
 document.getElementById('comicList').innerHTML=list.map(c=>`

 <div class="card">
 <h3>
   <a href="comic.html?id=${c.id}">
     ${c.title}
   </a>
 </h3>
 <div>${c.author}</div>
 <div>${c.date}</div>
 </div>
`).join('');
}
document.addEventListener('click',e=>{
 if(e.target.dataset.author){current=e.target.dataset.author;render();}
 if(e.target.id==='darkToggle'){document.body.classList.toggle('dark');}
});
document.addEventListener('input',e=>{if(e.target.id==='search')render();});
