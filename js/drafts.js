'use strict';

function onInit() {
    renderProjs();
    // renderModal();
}

function renderProjs() {
    const projs = getProjsForDisplay();
    var strHTML = projs.map(proj => {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="renderModal(${proj})" >
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/01-thumbnail.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.title}</p>
        </div>
      </div>     
        `;
    });
    $('.proj-list').html(strHTML);
}

function renderModal(proj) {
    console.log('yay', proj);
    
    // var $elModal = $('.modal-body')
    // $elModal.find('h2').text()

    // const projs = getProjsForDisplay();
    // var strHTML = projs.map(proj => {
    //     return `
    //     <h2>${proj.name}</h2>
    //     <p class="item-intro text-muted">${proj.title}</p>
    //     <img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
    //     <p>${proj.desc}</p>
    //     <ul class="list-inline">
    //       <li>Date: ${proj.published}</li>
    //       <li>Labels: ${proj.labels}</li>
    //     </ul>
    //     <button class="btn btn-primary" data-dismiss="modal" type="button">
    //         <i class="fa fa-times"></i>
    //         Close Project</button>
    //     `;
    // });
    // $('.modal-body').html(strHTML);

}