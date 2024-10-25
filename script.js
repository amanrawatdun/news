import { languages , countries } from "./constants.js";

let btn = document.querySelector('.btn');
let main = document.querySelector('.main');
let a = document.querySelector('.a');
let select = document.querySelector('.select');

languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code; 
    option.textContent = lang.language; 
    select.appendChild(option); 
});


let fun = async (e) => {
     e.preventDefault();
    main.innerHTML = ''; 
    let query = a.value;
   
    try {
        let url;
        if(query===''){
            url = await fetch(`https://newsapi.org/v2/everything?q=tesla&language=en&from=2024-09-25&sortBy=publishedAt&apiKey=18bc1a5a32174f69b3491097422c1190`);
        }
        else{

            url = await fetch(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${query}&language=${select.value}&from=2024-09-25&sortBy=publishedAt&apiKey=18bc1a5a32174f69b3491097422c1190`);
        }
      
        let data = await url.json();

        console.log(data);

        if (data.articles.length === 0) {
            main.innerHTML = '<p>No articles found. Try a different query.</p>';
            return;
        }
        let n=20;
        for (let i = 0; i <=n && i < data.articles.length; i++) {
            
            let imageUrl = data.articles[i].urlToImage|| 'error';
            let sourceName = data.articles[i].source.name|| 'error';
            let title = data.articles[i].title|| 'error';
            let author = data.articles[i].author || 'error';
            let description = data.articles[i].description  || 'error';

            if (title === 'error' || author === 'error' || description === 'error' ||imageUrl ==='error' || sourceName==='error') {
                n=n+1;
                continue; 
            }

            let div = document.createElement('div');
            div.classList.add('box');
            div.innerHTML = `
                <div class="imgbox">
                    <img src="${data.articles[i].urlToImage || 'https://placeholder.pics/svg/300'}" alt="News Image" class="img">
                    <div class="source">${data.articles[i].source.name}</div>
                </div>
                <div class="title">${data.articles[i].title}</div>
                <div class="auth date-time">${data.articles[i].author || 'Unknown'} | ${new Date(data.articles[i].publishedAt).toLocaleDateString()}</div>
                <div class="discription">${data.articles[i].description || 'No description available.'}</div>
            `;
            main.append(div);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        main.innerHTML = '<p>Failed to fetch articles. Please try again later.</p>';
    }
    
};

btn.addEventListener('click', fun);
