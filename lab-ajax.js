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
    $('#newBooks').append('<li>Book added succsessfully</li>')
  }
  else {
    $('#newBooks').append('<li>Failed to add book!!</li>')
  }
}
function errorAddBook (data) {
  $('#containerAddBook').append('<p>Failed to add book!!</p>');
};

// viewBook
function viewBooks (data) {
  $('#bookList').empty();
  let dataViewList = JSON.parse(data);
  $.each(dataViewList.data, function (index, value) {
    $('#bookList').append(`<li> Title: ${value.title}, Author: ${value.author},
      Id: ${value.id}</li><button id="${value.id}" class="deleteBook">Delete button</button>`);
      console.log('done view');
  })
  $('.deleteBook').on('click', event  => {
    console.log($('.deleteBook').prop('id'));
    const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    const settings = {
      method: 'GET',
      data: {
        op: 'delete',
        key: apikey,
        id: $('.deleteBook').prop('id')
      },
    }
    console.log($('.deleteBook').attr('id'));
    $.ajax(url, settings)
    .done(data => {
      let removedObj = JSON.parse(data);
      if (removedObj.status == 'success') {
    $('#containerDeleteBook').append('<p>Mission complete</p>');
    }
    else {
      $('#containerDeleteBook').append('<p>Abort, mission collapsed</p>');
    }
  });
});

};
function ErrorViewBooks () {
  $('#containerViewBook').append('<p>Failed to show booklist!!</p>');
  console.log('errorview');
}

// changeBook
function ChangeBookInfo (data) {
  let obj  = JSON.parse(data);
  if (obj.status == 'success') {
    $('#containerChangeBook').append('<p>Book info changed</p>').css;
  }
  else {
    $('#containerChangeBook').append('<p>Something went wrong!!</p>');
  }
};
function  errorChangeBook () {
  $('#containerChangeBook').append('<p>Failed to change book info!!</p>');
};






//
