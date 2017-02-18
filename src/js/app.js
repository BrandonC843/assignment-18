import $ from 'jquery';

var forEach = function(arr, func){
    for(var i = 0 ; i < arr.length; i++){
        func(arr[i], i, arr)
    }
}

function renderActiveTab(CurrentRoute){
    var previousTabEl = document.querySelector('[class="tabcontent__tab active"]')
    previousTabEl.classList.remove('active')

    var currentTabEl = document.querySelector(`[data-route="${theCurrentRoute}"]`)
    currentTabEl.classList.add('active')
}

var tabContainerEl = document.querySelector('.tabcontent__list')

tabContainerEl.addEventListener('click', function(evt){
	var clickedTabEl = evt.target
	var route = clickedTabEl.dataset.route
	window.location.hash = route
})

// var displayInfoContainer document.querySelector('.fact-page');
// var currentRoute = window.location.hash.slice(1);
var appContainerEl = document.querySelector('#app-container')

// console.log(appContainerEl)
// ///////////////////////////////////home////////////////////////////////////////////////////////
function createHomePageTemplate(dataArray){
   var bigHTMLString = '<div class ="panel panel-default">'

      bigHTMLString += `
      <div class ='panel panel-default'>
      <div class ="panel-heading">
         The Basic Facts
       </div>
      <table class="table">
       <tbody
       <tr>
        <td>Native Name</td>
        <td>Island</td>
      </tr>
      <tr>
        <td>Demonym</td>
        <td>Islander</td>
      </tr>
      <tr>
         <td>area (m2)</td>
         <td>10300</td>
      </tr>
      <tr>
         <td>calling code</td>
         <td>352</td>
      </tr>
        </tbody>
        </table>
      `
   bigHTMLString += `</div>`
   return appContainerEl.innerHTML = bigHTMLString
}
// ////////////////////////////////concerts////////////////////////////////////////////////
function createConcertsPageTemplate(dataArray){
   var largeHTMLString = '<div class="row">'

      forEach(dataArray, function(articleObject){
               largeHTMLString += `
               <div class="fact-page">
                 <div class="col-sm-3">
                   <div class="thumbnail">
                     <img src="${articleObject.imageSource}">
                     <div class="caption">
                       <h2>${articleObject.name}</h2>
                       <p>${articleObject.eventHallName}</p>
                       <p>${articleObject.dateOfShow}</p>
                     </div>
                   </div>
                 </div>
               </div>
               `

      })

         largeHTMLString += `</div>`
         appContainerEl.innerHTML = largeHTMLString
}
// /////////////////////////////////////carpools/////////////////////////////////////////////////
function createCarpoolPageTemplate(dataArray){
   var largeHTMLString2 = [
      '<div class="panel panel-default">',
      '<div class = "panel-heading">carpools</div>'
   ]

      forEach(dataArray, function(articleObject){
         largeHTMLString2.push( `
         <div class="row">
         <table class ="table">
           <tr>
           <td>${articleObject.time}</td>
           <td>${articleObject.to}</td>
           <td>${articleObject.from}</td>
           </tr>
          </div>
           `)
      })

      largeHTMLString2.push( `</div>`)
      appContainerEl.innerHTML = largeHTMLString2.join('')
}
// /////////////////////////////////////////////////////////////////////////

function controllerRouter(){
   var currentRoute = window.location.hash.slice(1);
   console.log(currentRoute);

   if(currentRoute === 'home'){
      console.log(currentRoute, 'iff');
      createHomePageTemplate();
   }

	if (currentRoute === 'concerts'){
      // console.log('concert Route')
      $.getJSON('http://apis.is/concerts').then(function(serverRes){
		      createConcertsPageTemplate(serverRes.results)
	   })
   }

   if (currentRoute === 'rides'){
      $.getJSON('http://apis.is/rides/samferda-drivers/').then(function(serverRes){
         createCarpoolPageTemplate(serverRes.results)


      })
   }
   if(currentRoute === 'flights'){


      var arrivals = $.getJSON('http://apis.is/flight?language=en&type=arrivals').then((arrivalRes)=>{
         var departures = $.getJSON('http://apis.is/flight?language=en&type=departures').then((departRes)=>{
            console.log(departRes.results, arrivalRes.results)
            var arrivalStr = createArrivalsPageTemplate(arrivalRes.results)
            var deptStr = createDeparturesPageTemplate(departRes.results)
            // console.log(arrivalStr)
            // console.log(deptStr)
            appContainerEl.innerHTML = arrivalStr + deptStr
         })
      })

   }
}
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
////////// FLIGHTS TEMPLATES-ARRIVALS////////////////////////


function createArrivalsPageTemplate(dataArray, title){
		var largeHtmlString = `
<div class="col-md-6 flights-columns">
   <div class="panel panel-default flights-content">
         <div class="panel-heading flights-panel-heading">
            Arrivals
         </div>
            <table class="table">
               <thead>
                  <th>Date</th>
                  <th>Arrival Time</th>
                  <th>Origin</th>
                  <th>Airline</th>
               </thead>
`

   forEach(dataArray, function(articleObject){
         largeHtmlString += `
           <tr>
             <td>${articleObject.date}</td>
             <td>${articleObject.plannedArrival}</td>
             <td>${articleObject.from}</td>
             <td>${articleObject.airline}</td>
           </tr>
         `
   })
      return largeHtmlString +=
      `</table>
      </div>
      </div>
      `
      // appContainerEl.innerHTML = largeHtmlString
}
// ///////////DEPARTURE TEMPLATE PAGE//////////////
function createDeparturesPageTemplate(dataArray, title){

   var bigHTMLStr2 = `
<div class="col-md-6 flights-columns">
   <div class="panel panel-default flights-content">
      <div class="panel-heading flights-panel-heading">
         Departures
      </div>
         <table class="table">
            <thead>
               <tr>
                 <th>Date</th>
                 <th>arrival Time</th>
                 <th>Destination</th>
                 <th>Airline</th>
               </tr>
            </thead>`

      forEach (dataArray, function(articleObject){
         bigHTMLStr2 += `
            <tr>
             <td>${articleObject.date}</td>
             <td>${articleObject.plannedArrival}</td>
             <td>${articleObject.to}</td>
             <td>${articleObject.airline}</td>
            </tr>
         `

      })
      return bigHTMLStr2 += `
      </table>
      </div>
      </div>`

}

// var tabContainerEl = document.querySelector('.tabcontent__list')
//
// tabContainerEl.addEventListener('click', function(evt){
// 	var clickedTabEl = evt.target
// 	var route = clickedTabEl.dataset.route
// 	window.location.hash = route
// })

controllerRouter()
window.addEventListener('hashchange', controllerRouter)
