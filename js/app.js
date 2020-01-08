'use strict';

Display.allDisplay = [];

function Display(potato){
  this.image_url = potato.image_url;
  this.title = potato.title;
  this.horns = potato.horns;
  this.description = potato.description;
  this.keyword = potato.keyword;
}
Display.prototype.render = function(){
    $('#sel-first').append(`<option>${this.image_url}</option>`);

//   let displaySelect = $('select[#sel-first]');
//   let displayHtml = $('.new').html();
//   displaySelect.html(displayHtml);

//   displaySelect.find('img').attr('src', this.image_url);
//   displaySelect.find('h2').text(this.title);
//   displaySelect.find('h3').text(this.description);
//   displaySelect.find('h4').text(this.keyword);
//   displaySelect.find('h3').text(this.horns);

};
Display.readJson = () => {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Display.allDisplay.push(new Display(item));
      });
    })
    .then(Display.loadDisplay);

};
Display.loadDisplay = () =>{
  Display.allDisplay.forEach(dis => dis.render());
};

$( () => Display.readJson() );





