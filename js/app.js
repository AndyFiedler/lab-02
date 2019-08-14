class Image {
    constructor(imageJson) {
      this.url = imageJson.image_url;
      this.title = imageJson.title;
      this.description = imageJson.description;
      this.keyword = imageJson.keyword;
      this.horns = imageJson.horns;
      //Element
      this.element = $('<section class=\'image\'></section>');
      this.element.append(`<h3>${this.title}</h3>`);
      this.element.append(`<img id='${this.title}-image' src='${this.url}'></img>`);
      this.element.append(`<p class'description'>${this.description}</p>`);
    }
  
    getElement() {
      return this.element;
    }
  }
  
  $(document).ready(() => {
    const images = [];
    $.get('./data/page-1.json', (data) => {

      for (const imageJson of data) {
        images.push(new Image(imageJson));
      }
      for (const image of images) {
        $('main').append(image.getElement());
      }
	  Image.all = images;
	  populateFilter();
    });
  });

const populateFilter = () => {
  let filterKeywords = [];
  $('#keywords').empty();
  $('#keywords').append($('<option value="default">Filter by Keyword</option>'));
  Image.all.forEach(image => {
    if (!filterKeywords.includes(image.keyword)) filterKeywords.push(image.keyword);
  });
  console.log(filterKeywords);
  filterKeywords.sort();
  filterKeywords.forEach(keyword => {
    let optionTag = $(`<option value="${keyword}">${keyword}</option>`);
    optionTag.appendTo($('#keywords'));
  });
  console.log($('#keywords'));
};