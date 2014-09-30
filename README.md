ionic-google-maps
=================
Just for testing

Installation
------------

npm install -g ionic
git clone https://github.com/asedano/ionic-google-maps.git
ionic platform add android
ionic plugin add https://github.com/wf9a5m75/phonegap-googlemaps-plugin#test_224 -variable API_KEY_FOR_ANDROID="blahblah"
ionic run android

Api key can be omitted because the app slows down even when the map doesn't load
