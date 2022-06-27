let div,all;
var jobListings = [];
var copyListing = [];
var filters = [];
var phoneWidth = window.innerWidth;
//fetch all movie titles
async function getJobListins(){
    let response = await fetch('data.json', {
                  method: 'GET',
                  mode: 'cors',
                  headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json',
                  }})
    
      let allchars = await response.json();
      return allchars;
  }
  getJobListins().then(resp =>{
    resp.forEach(val =>{
        val.languages.push(val.role)
        val.languages.push(val.level)
    })
    jobListings = resp
    copyListing = resp;
    
    displayListings()

  })
  .catch(error =>{
    console.log('Oops,Something Went Wrong '+error)
  })

//creating array of joblistings card in dom
function displayListings(){
  let html = jobListings.map(item => 
    allHtml(item)
   )

  document.querySelector('.jobListings').innerHTML = html.join('')
}

//binding data with html
function allHtml(item){
  phoneWidth = window.innerWidth;
    var html = '';
                if(item.featured){
                    html += `<div class="card mt-5 d-grid border-left box-shadow">`;
                }
                else{
                    html += ` <div class="card mt-5 d-grid box-shadow">`;
                }
                 html +=`<div class="card-body p-2">
                        <div class="row g-0">`
                        if(phoneWidth < 720){
                          html += `<div class="col-md-1 col-lg-1 align-self-center"><img src="${item.logo}" class="img-fluid logo rounded-start" alt="image1">`
                        }
                        else
                        {
                          html +=`<div class="col-md-1 col-lg-1 align-self-center"><img src="${item.logo}" class="img-fluid logo rounded-start ml-20" alt="image1">`
                        }
                            
                          html += `
                            </div>
                            <div class="col-md-6 col-lg-5">`;
                          if(phoneWidth < 720){
                            html += `<div class="card-body">`
                          }
                          else {
                           html += `<div class="card-body ml-20">`
                          }
                              html += ` <p class="card-text clr-1 fw-bolder m-0 gap-3">${item.company}`;
                                if(item.new){
                                html +=  `<button class="btn btn-clr-1 borderRad ml-20 fw-semibold mr-5" type="button">New!</button>`
                                }
                                if(item.featured){
                                    html +=   `<button class="btn btn-dark borderRad fw-semibold" type="button">Featured</button>`
                                }
                                html += `</p>
                                <h5 class="card-title cursor titleHover fw-bolder">${item.position}</h5>
                                <p class="card-text"><small class="text-muted">${item.postedAt}</small><small class="text-muted pr-1">${item.contract}</small><small class="text-muted">${item.location}</small></p>
                            </div>`
                            if(phoneWidth < 720){
                              html += `<div class="separator"></div>`
                            }
                                
                            html += `</div>
                            <div class="col-md-4 col-lg-5 offset-md-1 offset-lg-1 gap-3 align-self-center">`
                                if(item.languages.length > 0){
                                    item.languages.forEach(val =>{
                                        html +=  `<button type="button" class="btn btn-light clr-1 align-middle fw-bolder langHover mr-5 mb-10" onClick="selectedFilter('${val}')">${val}</button>`
                                    })
                                }
                                html += `</div>
                        </div>
                    </div>
                </div>`;
    return html;
}

//function to filter role
function selectedRole(role){
    var self = this;
    var temp = self.copyListing.filter(rec => rec.role == role)
    if(temp.length > 0){
        self.jobListings = temp;
        displayListings();
        if(!filters.includes(role)){
            self.filters.push(role)
        }
        showFilters();
    }
}


//function to filter level
function selectedLevel(level){
    var self = this;
    var temp = self.copyListing.filter(rec => rec.level == level)
    if(temp.length > 0){
        self.jobListings = temp;
        displayListings();
        if(!filters.includes(level)){
            self.filters.push(level)
        }
        showFilters();
    }
}

//function to filter lang
function selectedFilter(lang){
    var self = this,temp=[];
    if(!filters.includes(lang)){
        self.filters.push(lang)
    }
    temp = filters.map(item =>{
        return self.copyListing.filter(rec => {
            return rec.languages.includes(item)
        })
    })
    if(temp.length > 0){
      temp.forEach(val =>{
        self.jobListings = val;
      })
        
        displayListings();
        
        showFilters();
    }
}

// function myfunction(lang,rec){
//     var self = this;
//     var temp = rec.languages.filter(rec => rec == lang)
//     return temp;
// }

// function to display selected filter
function showFilters(){
    let html = `<div class="card box-shadow position-absolute top-1 wd-98">
        <div class="card-body p-2">
          <div class="row g-0">
            <div class="col-md-10 align-self-center gap-3">`;
             filters.forEach(val => {
            html +=  `<div class="btn-group mr-10 mb-10" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-light clr-1 fw-bolder">${val}</button>
                <button type="button" class="btn btn-clr-1 removeIcon"><img src="images/icon-remove.svg"></button>
              </div>`})
            html += `</div>
            <div class="col-md-2 align-self-center">
              <span class="fw-semibold cursor borderBottom flt-r" onClick="clearFilter()">Clear</Span>
            </div>
          </div>
        </div>
      </div>`
    
      document.querySelector('.filtersCard').innerHTML = html
}

function clearFilter(){
    var self = this;
    self.filters = [];
    var data = getJobListins()
    data.then(resp =>{
    
        jobListings = resp
        copyListing = resp;
        
        displayListings()
    
      })
      .catch(error =>{
        console.log('Oops,Something Went Wrong '+error)
      })
    document.querySelector('.filtersCard').innerHTML = '';
}

