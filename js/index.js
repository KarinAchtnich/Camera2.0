/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var firebase;

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.

    onDeviceReady: function () {
        this.receivedEvent('deviceready');

        document.getElementById("button1").addEventListener("click", function () {
            takePicture();
        });

        document.getElementById("umbenennen").addEventListener("click", function () {
            ons.notification.prompt('Geben Sie den Namen der Datei an:')
                .then(function (input) {
                    var message = input ? 'Entered: ' + input : 'Entered nothing!';
                    ons.notification.alert(message);
                });
        });

        document.getElementById("loeschen").addEventListener("click", function () {
            ons.notification.prompt('Geben Sie den Namen der Datei an:')
                .then(function (input) {
                    var message = input ? 'Entered: ' + input : 'Entered nothing!';
                    ons.notification.alert(message);
                });
        });

        document.getElementById("refresh").addEventListener("click", function () {
            downloadLink('img/test.jpg');
        });

        document.getElementById("switch").addEventListener("click", function () {
            alert("Funktion nicht verfügbar.");
        });


        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCQCKqVSKAeOgvDz-zQNiLQEhQCY1YDhbM",
            authDomain: "camera2-21e00.firebaseapp.com",
            databaseURL: "https://camera2-21e00.firebaseio.com",
            projectId: "camera2-21e00",
            storageBucket: "camera2-21e00.appspot.com",
            messagingSenderId: "359640106474"
        };

        firebase.initializeApp(config);

        console.log(firebase);

    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }


};

app.initialize();


function takePicture() {

    // take picture
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
        // create root reference
        var name = "name";
        var storageRef = firebase.storage().ref('img/');
        var timestamp = Math.round(+new Date() / 1000);
        var picture = storageRef.child(name + timestamp + '.jpg');
        // do upload
        picture.putString(imageData, 'base64', { contentType: 'image/jpg' });
        // wait until data is written
        setTimeout(function () {
            downloadLink(picture);
        }, 500);
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }

}

//galerie buttons
function showPrompt() {
    ons.notification.prompt('Geben Sie den Namen der Datei an:')
        .then(function (input) {
            var message = input ? 'Entered: ' + input : 'Entered nothing!';
            ons.notification.alert(message);
        });
}

function downloadLink(picture) {
    var storage = firebase.storage();
    var pathReference = storage.ref();
    pathReference.child(picture).getDownloadURL().then(function (url) {
        var image = document.getElementById('testThumb');
        image.src = String(url);
    }).catch(function (error) {
        console.log(error);
    });
}
