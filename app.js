const loadData = (searchvalueString, dataLimit) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchvalueString}`)
    .then(res => res.json())
    .then(data => loadDatum(data.data, dataLimit))
}
const loadDatum = (data, dataLimit) => {
    const dataDiv = document.getElementById('phones-section');
    dataDiv.textContent = '';
    const viewAllBtn = document.getElementById('view-all-section');
    if(dataLimit && data.length >= 10){
        data = data.slice(0,10);
        viewAllBtn.classList.remove('d-none')
    }
    else{
        viewAllBtn.classList.add('d-none')
    }
    const notFound = document.getElementById('not-found-msg');
    if(data.length === 0){
        notFound.classList.remove('d-none')
    }
    else{
        notFound.classList.add('d-none')
    }
    for(const datum of data){
        console.log(datum)
        const datumDiv = document.createElement('div');
        datumDiv.innerHTML = `
        <div class="col">
            <div class="card h-100">
            <div class="p-5"><img src="${datum.image}" class="card-img-top m-3" alt="..."></div>
            <div class="card-body">
                <h5 class="card-title">${datum.phone_name}</h5>
                <p class="card-text">${datum.slug}.</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-success">Details</button>
            </div>
        </div>
        `
        dataDiv.appendChild(datumDiv)
    }
    toggleLoader(false);
    
}
function process(dataLimit){
    toggleLoader(true);
    const searchvalue = document.getElementById('search-fleld');
    const searchvalueString = searchvalue.value;
    loadData(searchvalueString, dataLimit)
}
document.getElementById('search-btn').addEventListener('click', function(){
    process(10)
})

const toggleLoader = (isLoading) => {
    const loadSection = document.getElementById('loader');
    if(isLoading){
        loadSection.classList.remove('d-none')
    }
    else{
        loadSection.classList.add('d-none')
    }
}

document.getElementById('view-all-button').addEventListener('click', function(){
    process()
})
    