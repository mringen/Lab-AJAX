$(document).ready(() => {

$('#apiRequest').on('click', event => {
  const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
  const settings = {
    method: 'GET',
    data: {
      requestKey: ''
    },
  }
  $.ajax(url, settings)
  .done(data => {
     let newData = JSON.parse(data);
     let output = newData.key;
    $('#getApiKey').html(output);
  });
});

}); // When Loaded



/*function addedNewBook (event) {
    let newBook = $('#titleBook').val();
    let newBookAuthor = $('#authorBook').val();
    $('#bookList').append(`Title: ${newBook}, Author: ${newBookAuthor}</li>`);

};*/
