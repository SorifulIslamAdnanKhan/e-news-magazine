const loadCategory = async () =>{

    const url = `https://openapi.programming-hero.com/api/news/categories`;

    try{
        const res =  await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch (error){
        console.log(error);
    }
}

const displayCategory = (categories) =>{
    //console.log(categories)
    categories.forEach(category => {
        //console.log(category.category_id);
        const categoryList = document.getElementById('category-list');
        const list = document.createElement('li');
        list.classList.add('nav-item');
        list.innerHTML = 
        `
            <strong>
                <a onclick="categoryNewsById('${category.category_id}')" class="nav-link" aria-current="page" href="#">${category.category_name}</a>
            </strong>
        `;
        categoryList.appendChild(list);
    });
}

loadCategory();

const categoryNewsById = async category_id =>{

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryNews(data.data);
   
}

const displayCategoryNews = data =>{
    //console.log(data);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    
    data.forEach(news =>{
       // console.log(news);
        const singleNews = document.createElement('div');
        singleNews.classList.add('row', 'g-0');
        singleNews.innerHTML =

        `
            <div class="col-md-3">
                <img src="${news.image_url}" class="img-fluid rounded-start" alt="">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details}</p>
                </div>
                <div class="row col-md-12 p-3">
                    <div class="row col-md-4">
                        <div class="col-md-3">
                            <img src="${news.author.img}" alt="" class="img-thumbnail">
                        </div>
                        <div class="col-md-9">
                            <p class="m-0"><b>${news.author.name}</b></p>
                            <p class="m-0">${news.author.published_date}</p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <p><span><i class="fa-regular fa-eye"></i></span> ${news.total_view}</p>
                    </div>
                    <div class="col-md-4">
                        <p>${news.rating.number}</p>
                    </div>
                    <div class="col-md-2">
                        <p class="text-primary fs-5"><span><i class="fa-solid fa-arrow-right"></i></span></p>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(singleNews);  
    })
}

