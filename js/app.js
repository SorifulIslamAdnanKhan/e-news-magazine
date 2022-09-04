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
    
    categories.forEach(category => {
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
    loader(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryNews(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

const displayCategoryNews = data =>{

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    const newsNumberByCategory = document.getElementById('news-number');
    const newsNumber = document.createElement('div');
    newsNumberByCategory.innerHTML = 
    `
        <h5>${data.length} news found for this category.</h5>
    `;
    newsNumberByCategory.appendChild(newsNumber);

    data.forEach(news =>{
        
        const singleNews = document.createElement('div');
        singleNews.classList.add('card', 'm-5');
        singleNews.innerHTML =

        `
            <div class ="row g-0">
                <div class="col-md-3">
                    <img src="${news ? news.thumbnail_url : 'Image not found'}" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h5 class="card-title">${news ? news.title : 'Title not found'}</h5>
                        <p id="news-description" class="card-text">${news ? news.details : 'No description available'}</p>
                    </div>
                    <div class="row col-md-12 p-3">
                        <div class="row col-md-4">
                            <div class="col-md-3">
                                <img src="${news.author ? news.author.img : 'Author image not found'}" alt="" class="img-thumbnail">
                            </div>
                            <div class="col-md-9">
                                <p class="m-0"><b>${news.author ? news.author.name : 'Author not found'}</b></p>
                                <p class="m-0">${news.author ? news.author.published_date : 'Published date not available'}</p>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <p><span><i class="fa-regular fa-eye"></i></span> ${news ? news.total_view : 'Data not found'}</p>
                        </div>
                        <div class="col-md-4">
                            <p>${news.rating ? news.rating.number : 'Data not available'}</p>
                        </div>
                        <div class="col-md-2">
                            <p onclick="newsDetailsById('${news._id}')" class="text-primary fs-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <span><i class="fa-solid fa-arrow-right"></i></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>    
        `;
        newsContainer.appendChild(singleNews);  
    });

    loader(false);
}

const newsDetailsById = async news_id =>{

    const url =  `https://openapi.programming-hero.com/api/news/${news_id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNewsModal(data.data);

    }
    catch(error){
        console.log(error);
    }
}

const displayNewsModal = data =>{

    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = data[0] ? data[0].title : 'Title not found' ;

    const modalBodySection = document.getElementById('modal-body');
    modalBodySection.innerHTML = '';
    const modalBody = document.createElement('div');
    modalBody.classList.add('card');
    modalBody.innerHTML = 
    
    `
        <img src="${data[0] ? data[0].image_url : 'Image not found'}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">Author: ${data[0].author ? data[0].author.name : 'Author not found'}</h5>
            <img src="${data[0].author ? data[0].author.img : 'Author image not found'}" alt="" class="modal-author-image">
            <p class="card-text">Published Date: ${data[0].author ? data[0].author.published_date : 'Date not found'}</p>
            <p class="card-text">${data[0] ? data[0].details : 'Description not found'}</p>
            <p class="card-text">Total View: ${data[0] ? data[0].total_view : 'Data not found'}</p>
        </div>
    `;
    modalBodySection.appendChild(modalBody);
}

const loader = isLoading =>{

    const newsLoader = document.getElementById('loader');
    if(isLoading){
        newsLoader.classList.remove('d-none');
    }
    else{
        newsLoader.classList.add('d-none');
    }

}


