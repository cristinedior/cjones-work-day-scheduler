$(function () {
  // Display the current date in the page header
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  // Function to update the time block classes according to the current time
  function updateTimeBlocks() {
    var currentHour = dayjs().hour(); // Get the current hour using dayjs

    // Loop over each time block
    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').replace('hour-', ''), 10);

      // Remove any old classes from the block
      $(this).removeClass('past present future');

      // Add the appropriate class based on the current time
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }

  // Load any saved data from localStorage and update the time block classes
  $('.time-block').each(function () {
    var hourId = $(this).attr('id');
    var savedText = localStorage.getItem(hourId);

    // Set the text to the textarea
    $(this).find('.description').val(savedText);
  });

  // Update the time blocks on initial load and then every 5 minutes to reflect the current time
  updateTimeBlocks();
  setInterval(updateTimeBlocks, 300000); // 300000 milliseconds = 5 minutes

  // Click event listener for save buttons
  $('.saveBtn').click(function () {
    var hourId = $(this).closest('.time-block').attr('id');
    var text = $(this).siblings('.description').val();

    // Save the text in local storage
    localStorage.setItem(hourId, text);
  });
});
