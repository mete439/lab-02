'use strict';

Display.allDisplay = [];

function Display(display){
  this.image_url = display.image_url;
  this.title = display.title;
  this.horns = display.horns;
  this.description = display.description;
  this.keyword = display.keyword;
}


Display.prototype.render = function(){
  $('main').append('<div class="get"></div>');
  let displaySelect = $('div[class = "get"]');
  let displayGet = $('#template').html();
  displaySelect.html(displayGet);

  displaySelect.find('img').attr('src', this.image_url);
  displaySelect.find('h2').text(this.title);
  displaySelect.find('h3').text(this.description);
  displaySelect.find('h4').text(this.keyword);
  displaySelect.find('h5').text(this.horns);
  displaySelect.removeClass('get');
  displaySelect.attr('class', this.keyword);

};
Display.prototype.loadDisplay = function(){
};
Display.readJson = () => {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Display.allDisplay.push(new Display(item));
      });
    })
    .then(() => Display.allDisplay.forEach(display => display.render()))
    .then(Display.imagesFilter);
};
Display.loadDisplay = () =>{
  Display.allDisplay.forEach(dis => dis.render());
};

Display.imagesFilter = () => {
  let filterkeyword = [];
  $('option').not(':first').remove();
  Display.allDisplay.forEach(display =>{
    if(!filterkeyword.includes(display.keyword)) filterkeyword.push(display.keyword);
  });
  filterkeyword.sort();
  filterkeyword.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  });
};
$('select').on('change',(event)=>{
  let option = event.target.value;
  $('div').hide();
  $(`.${option}`).show();
});
$(Display.readJson());





