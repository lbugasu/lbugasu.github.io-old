document.addEventListener("DOMContentLoaded", main);

function main() {
  let item  = document.getElementsByClassName('daysLeft')
  console.log(item)
  item.innerText
  let d = formatDate(new Date())
  document.getElementById("weeklyInsight").value = d;
  inspire();
  document
    .getElementById("weeklyInsight")
    .addEventListener("change", function (evt) {
      inspire();
    });
}


function inspire() {
  let days = (new Date(document.getElementById("weeklyInsight").value)).getUTCDay()
  let weekOf = new Date(document.getElementById("weeklyInsight").value)
  weekOf.setDate(weekOf.getDate()-days+1)
  fetch('https://raw.githubusercontent.com/lbugasu/lbugasu.github.io/master/scripts/weeklyVideos.json')
  .then(response => response.json())
  .then(data=>{
    getThisVideo = data[formatDate(weekOf)]
    link = document.getElementById("video");
    link.setAttribute("src", getThisVideo["embed-link"]);
    vidname = document.getElementById("videoname");
    vidname.setAttribute("href", getThisVideo["video-link"]);
    vidname.innerText = getThisVideo["title"];
  } )
  .catch(error => console.error(error));
}


function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}