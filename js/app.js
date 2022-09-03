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
        <strong><a class="nav-link" aria-current="page" href="#">${category.category_name}</a></strong>
        
        `;
        categoryList.appendChild(list);
    });
    
}

loadCategory();