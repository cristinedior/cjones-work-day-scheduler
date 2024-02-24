$(function () {
  // Display the current day at the top of the calendar
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  // Function to color-code each time block to indicate whether it's in the past, present, or future
  function updateTimeBlocks() {
    var currentHour = dayjs().hour(); // Get the current hour using Day.js

    // Loop over each time block and update its class based on the current time
    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').replace('hour-', ''), 10);
      $(this).removeClass('past present future');

      // Apply color coding: past, present, future
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }

  // Load any saved events from localStorage and populate the time blocks
  $('.time-block').each(function () {
    var hourId = $(this).attr('id');
    var savedText = localStorage.getItem(hourId);
    $(this).find('.description').val(savedText);
  });

  // Update the time block classes on initial load and then every 5 minutes
  updateTimeBlocks();
  setInterval(updateTimeBlocks, 300000); // 300000 milliseconds = 5 minutes

  // Event listener for save buttons to save the corresponding event in local storage
  $('.saveBtn').click(function () {
    var hourId = $(this).closest('.time-block').attr('id');
    var text = $(this).siblings('.description').val();
    localStorage.setItem(hourId, text);
  });
});