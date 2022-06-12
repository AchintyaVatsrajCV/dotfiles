function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

Swal.fire(
    // `Your meeting will be started in while`,
    // `The time is ${timeConverter((Date.now()-(Date.now()%1000))/1000)}`,
    {footer: '<h3>Google Meet Attendance (Works with New UI)</h3>',
    title: `The time is ${timeConverter((Date.now()-(Date.now()%1000))/1000)}`,
    text: 'Your meeting will start now'}
  )