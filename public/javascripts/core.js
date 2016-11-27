var app = angular.module('myApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
app.controller('PlaylistController', function Playlistcontroller($scope) {
  $scope.phones = [
    {
      name: 'Nexus S',
      snippet: 'Fast just got faster with Nexus S.'
    }, {
      name: 'Motorola XOOM™ with Wi-Fi',
      snippet: 'The Next, Next Generation tablet.'
    }, {
      name: 'MOTOROLA XOOM™',
      snippet: 'The Next, Next Generation tablet.'
    }
  ];
  $scope.playlist="Hullo"
});