$(document).ready(function() {
  $('#checkoutTable').DataTable( {
      dom: 'Brt',
      buttons: [
          'excel', 'pdf', 'print'
      ]
  } );
} );