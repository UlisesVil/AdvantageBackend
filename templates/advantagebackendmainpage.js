'use strict'

const advantageBackendMainPage=
`<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Backend AdvantageMarketing</title>
        <link rel="icon" type="image/x-icon" href="https://www.crossroadsfund.org/sites/default/files/document%20icon.png">
        <style>
            body{
                display:flex;
                justify-content:center;
                align-items:center;
                background: url(https://get.wallhere.com/photo/lights-city-street-cityscape-night-cyberpunk-skyscraper-evening-bar-metropolis-light-color-downtown-screenshot-urban-area-16259.jpg);
                background-attachment: fixed;
                background-position: center;
                background-size: cover;
                color: white;
            }
            .content{
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                width:90%;
                border: 3px solid purple;
                border-radius: 10px;
                padding-bottom: 20px;
                margin: auto;
                text-align: center;
                text-shadow: 3px 3px 5px black;
                background: rgba(0,0,0,.8);
            }
            img{
                width:20%;
                min-width:200px;
                margin-top:30px;
            }
            a{
                text-decoration:none;
                color: yellowgreen;
            }
            a:hover{
                color: purple;
            }
        </style>
    </head>
    <body>
        <div class="content">
            <h1 style='color: white;'>Bienvenido esta es la API Rest from AdvantageMarketing Caso Practico</h1>
            <h2>You can visit my Git repositories here: <a href="https://github.com/UlisesVil" target="_blank">Ulises Villa - GitHub</a></h2>
            <img src="https://cdnb.artstation.com/p/assets/images/images/021/188/673/original/pixel-jeff-meow-s-sushi-600.gif?1570717603">
        </div>
    </body>
</html>`;

module.exports = advantageBackendMainPage;