const apikey = 'zbX4E';

$(document).ready(() => {

  $('#addBook').on('click', event => {
    const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    const settings = {
      method: 'GET',
      data: {
      op: 'insert',
      key: apikey,
      title: $('.titleBook').val(),
      author: $('.authorBook').val()
      },
    }
    $.ajax(url,settings)
    .done(addedBooks)
    .fail(errorAddBook);
  });

  $('#viewBook').on('click', event  => {
    const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    const settings = {
      method: 'GET',
      data: {
      op: 'select',
      key: apikey
      },
    }
    $.ajax(url, settings)
    .done(viewBooks)
    .fail(ErrorViewBooks);
  });

  $('#changeBook').on('click', event  => {
    const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    const settings = {
      method: 'GET',
      data: {
      op: 'update',
      key: apikey,
      id: $('#bookId').val(),
      title: $('#changeTitle').val(),
      author: $('#changeAuthor').val()
      },
    };
    $.ajax(url, settings)
    .done(ChangeBookInfo)
    .fail(errorChangeBook);
  });

});
// when Loaded

// addBook
function addedBooks (data) {
  $('#newBooks').empty();
  let ajaxData = JSON.parse(data);
  let title = $('.titleBook').val();
  let author = $('.authorBook').val();
  $('#newBooks').append(`<li>Title: ${title} Author: ${author}</li>`);
  if (ajaxData.status == 'success') {
    $('.messageAdd').html('Book added succsessfully');
  }
  else {
    $('.messageAdd').html('Failed to add book!!');
  }
}
function errorAddBook (data) {
  $('.messageAdd').html('Failed to add book!!');
};

// viewBook, 'deleteBook'
function viewBooks (data) {
  $('#bookList').empty();
  let dataViewList = JSON.parse(data);
  $.each(dataViewList.data, function (index, value) {
    $('#bookList').append(`<li> Title: ${value.title}, Author: ${value.author},
      Id: ${value.id}</li><button id="${value.id}"class="deleteBook">Delete button</button>`);
      console.log(dataViewList.status);
      if (dataViewList.status == 'success') {
        $('#containerViewBook span').html('books loaded');
      }
      else {
        $('#containerViewBook span').html('books failed to load');
      }
  });
  // deleteBook
  $('.deleteBook').on('click', event  => {
    let id =  $(event.target).prop('id');
    const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    const settings = {
      method: 'GET',
      data: {
        op: 'delete',
        key: apikey,
        id: id
      },
    }
    $.ajax(url, settings)
    .done(data => {
      $('span').empty();
      let removedObj = JSON.parse(data);
      if (removedObj.status == 'success') {
    $('#containerViewBook span').html('Book was succsessfully deleted');
    }
    else {
      $('#containerViewBook span').html('Fail to delete book');
    }
  });
  });
};
function ErrorViewBooks () {
  $('#containerViewBook span').html('Failed to show booklist!!');
}

// changeBook
function ChangeBookInfo (data) {
  $('.messageChange').empty();
  let obj  = JSON.parse(data);
  if (obj.status == 'success') {
    $('.messageChange').html('Book info changed');
  }
  else {
    $('.messageChange').html('Something went wrong!! try again');
  }
};
function  errorChangeBook () {
  $('.messageChange').html('Something went wrong!! try again');
};





//
