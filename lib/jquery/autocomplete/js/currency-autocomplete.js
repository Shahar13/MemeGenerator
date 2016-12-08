$(function(){
  var currencies = [
    { value: 'summer', data: 'summer' },
    { value: 'animals', data: 'animals' },
    { value: 'cute', data: 'cute' },
    { value: 'movies', data: 'movies' },
    { value: 'flowers', data: 'flowers' },
    { value: 'funny', data: 'funny' },
    { value: 'horror', data: 'horror' },
    { value: 'faces', data: 'faces' },
    { value: 'kids', data: 'kids' },
    { value: 'emotions', data: 'emotions' },
  ];
  
  // setup autocomplete function pulling from currencies[] array
  $('#autocomplete').autocomplete({
    lookup: currencies,
    onSelect: function (suggestion) {
      var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
      $('#outputcontent').html(thehtml);
    }
  });
  
});