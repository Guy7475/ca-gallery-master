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
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="renderModal('${proj.id}')">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="">
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

function renderModal(projId) {
    const proj = getProjByID(projId);

    var $elModal = $('.modal-body');
    $elModal.find('h2').text(proj.name);
    $elModal.find('.item-intro').text(proj.title);
    $elModal.find('.proj-btn').attr('href',proj.url );
    $elModal.find('.img-fluid').attr('src', `img/portfolio/${proj.id}.jpg` );
    $elModal.find('.desc').text(proj.desc);
    $elModal.find('.date span').text(proj.published);
    $elModal.find('.lables span').text(proj.labels);
}

function onOpenContactPage() {
    var $elContact = $('#contact')
    var $userEmail = $('#user-email').val()
    var $userSubject = $('#user-subject').val()
    var $messageBody = $('#messageBody').val()

    var destination = `https://mail.google.com/mail/?view=cm&fs=1&to='${$userEmail}'&su='${$userSubject}'&body='${$messageBody}'`

    $elModal.find('#submit-button').attr('href', destination);
    
}

