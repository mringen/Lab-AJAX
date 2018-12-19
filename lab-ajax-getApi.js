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
  })
  .fail(data => {
    $('#apiRequest').append('<p>Failed to delete book!!</p>');
  });
 });

}); // When Loaded
