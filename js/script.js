// My Images
$(function(){
  console.log('scripts loaded');

  var key = 'b10ecf9f52c7a7e8e4094e71debdcb8e';
  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b10ecf9f52c7a7e8e4094e71debdcb8e&tags=bees&extras=url_o&per_page=50&format=json&nojsoncallback=1';

  $.ajax({
    type: 'GET',
    url: url,
    success: function(data){
      console.log(data.photos.photo);
      buildStuff(data);
    },
    error: function(error){
      console.log(error);
    }
  });

  function buildStuff(data){
    for(i=0; i< data.photos.photo.length; i++) {
      var url = data.photos.photo[i].url_o;

      if(url) {
        $('#owl-demo').append('<div class="item"><img src=' + url + '/></div>');
      }
    }

    $("#owl-demo").owlCarousel({
      navigation : true, // Show next and prev buttons

      slideSpeed : 300,
      paginationSpeed : 400,

      items : 1,
      itemsDesktop : false,
      itemsDesktopSmall : false,
      itemsTablet: false,
      itemsMobile : false
    });
  };
});

// My Honey Map
// Set up data
var locations = [
  {
    name: 'Roadside Stand',
    description: '2928 Alamance Church Rd., Greensboro, NC 27406',
    lat: 35.989598,
    lng: -79.66246
  }, {
    name: 'Bailey Bee Supply',
    description: '147 Boone Square Street, Hillsborough, NC 27278',
    lat: 36.06249,
    lng: -79.099981
  }, {
    name: 'Apiary Only',
    description: '14 Dogwood Acres Dr., Chapel Hill, NC 27516',
    lat: 35.87957,
    lng: -79.08117
  }, {
    name: 'Grandpa\'s Honey',
    description: '130 Lorax Ln, Pittsboro, NC 27312',
    lat: 35.7143,
    lng: -79.17302
  }, {
    name: 'Honey From The Land',
    description: '8324 Broken Yolk Trail, Apex, NC 27523',
    lat: 35.748813,
    lng: -78.928754
  },  {
    name: 'West Orange Farms',
    description: '1057 Gold Rock Ln., Morrisville, NC 27560',
    lat: 35.861022,
    lng: -78.855427
  }, {
    name: 'Tickel Bees',
    description: '6212 Krandon Dr., Raleigh, NC 28603',
    lat: 35.689936,
    lng: -78.671659
  }, {
    name: 'Buck Naked Farm',
    description: '7125 Old Stage Rd., Raleigh, NC 27603',
    lat: 35.678197,
    lng: -78.653426
  }, {
    name: 'CG\'s Bees',
    description: '118 South Ave, Wake Forest, NC 27587',
    lat: 35.97817,
    lng: -78.51135
  }, {
    name: 'Steve Hildebrand',
    description: '603 S. Smithfield Rd., Knightdale, NC 27545',
    lat: 35.782264,
    lng: -78.478189
  }, {
    name: 'Jim and Cheryl\'s Beeyard',
    description: '9209 Hunters Greene Dr., Zebulon, NC 27597',
    lat: 35.85982,
    lng: -78.320744
  }
];

function initMap() {
  // The location of CH
  var ch = {lat: 35.9, lng: -79.1};

  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {
        zoom: 10.5,
        center:  ch
    });

  var infowindow = new google.maps.InfoWindow();
  var marker, i;

  // for loop
  for(i=0; i<locations.length; i++) {
    // console.log(locations[i]);

    // New marker for each point
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i].name + '<br>' + locations[i].description);
        infowindow.open(map, marker);
      }
    })(marker, i));
  };
};

// My Line Chart
$(document).ready(function(){
  // Set up any variables needed
  var url ='../json/honeyData.json';
  var honeyYield = [];
  var year = [];

  $.ajax({
    type: 'GET',
    url: url,
    async: true,
    success: function(data){
      doLogic(data);
      buildChart(data);
    },

    error: function(error){
      console.log(error);
    }
  });

  // Function to do logic
  function doLogic(data) {
    for(i = 0; i < data.length; i++) {
      honeyYield.push(data[i].honeyYield);
      year.push(data[i].year);
    }
  };

  function buildChart(data) {
    Highcharts.chart('line-chart', {
      chart: {
          type: 'line'
      },
      title: {
          text: 'Honey Yield Throughout The Years'
      },
      subtitle: {
          text: 'Source: United States Department of Agriculture'
      },
      xAxis: {
          categories: year,
          crosshair: true
      },
      yAxis: {
          title: {
              text: 'Average Yield in Pounds per Colony',
              color: 'orange'
          }
      },
      plotOptions: {
        series: {
          color: '#B66228'
        },

        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
      },
      series: [{
          data: honeyYield,
          name: 'Honey Yield'
      }]
    });
  };
});

// My Column Chart
$(document).ready(function(){

  // Set up any variables needed
  var url ='../json/climateData.json';
  var anomalies = [];
  var year = [];

  $.ajax({
    type: 'GET',
    url: url,
    async: true,
    success: function(data){
      doLogic(data);
      buildChart(data);
    },

    error: function(error){
      console.log(error);
    }
  });

  function doLogic(data) {
    for(i = 0; i < data.length; i++) {
      anomalies.push(data[i].celcius);
      year.push(data[i].year);
    }
  };

  function buildChart(data) {
    Highcharts.chart('column-chart', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'North American Climate Change 1967-2017'
      },
      subtitle: {
          text: 'National Oceanic and Atmospheric Administration'
      },
      xAxis: {
          categories: year
      },
      yAxis: {
        title: {
          text: 'Temperature (C)'
        }
      },
      credits: {
          enabled: false
      },
      series: [
        {
          name: 'Average Temps from Baseline Average',
          data: anomalies,
          color: '#B66228'
        }
      ]
    });
  };
});


// My Data Table
$(document).ready(function(){
  console.log('scripts loaded');

  $.ajax({
    type: 'GET',
    url: '../json/honeyData.json',
    success: function(data){
      // Console log the data and examine it
      dowork(data);
    },
    error: function(error){
      console.log(error);
    }
  });

  function dowork(data) {
    for(var i=0; i < data.length; i++) {
      $('#results').append('<tr><td>' + data[i].year + '</td><td class="honeyPro">'
      + data[i].honeyYield + ' lbs' + '</td></tr>');
    }
  }
});
