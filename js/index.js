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
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        console.log('Test');*/
        
        document.getElementById('button1').addEventListener('click',function(){
            //
            
            

            navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
                destinationType: Camera.DestinationType.DATA_URL
            });
            
            function onSuccess(imageData) {
                var image = document.getElementById('myImage');
                image.src = "data:image/jpeg;base64," + imageData;
                // Speichern hier
            }
            
            function onFail(message) {
                alert('Failed because: ' + message);
            }

            
            
        });
        
    }

    
};


app.initialize();

/*
var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyCQCKqVSKAeOgvDz-zQNiLQEhQCY1YDhbM",
    authDomain: "camera2-21e00.firebaseapp.com",
    databaseURL: "https://camera2-21e00.firebaseio.com",
    projectId: "camera2-21e00",
    storageBucket: "camera2-21e00.appspot.com",
    messagingSenderId: "359640106474"
  };
  firebase.initializeApp(config);
*/
