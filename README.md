<div id="top"></div>


<div align="center">
  <img src="https://github.com/Roar-Network/.github/blob/master/img/roar-banner.png?raw=true">

<br/><br/>  
[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]
[![Issues][issues-shield]][issues-url]
[![Pull Request][pull-request]][pull-request-url]
![Developed with Angular][angular-shield]
<h1>Roar Web</h1>

</div>


User interface to Roar Social Network

<p align="right"><a href="#top" style="text-decoration: none;">🔼</a></p>

## Usage

Before execute the server you must open file `./src/environment/environment.ts` and put your known IP of API, in IP field. Then, execute the following commands:

```
docker build ./ -t roar/ui
docker run -it --rm --network=<your-docker-net> --ip=<ip-in-range> roar/ui
ng serve --host 0.0.0.0
```

And open `https://<ip-container>:4200` in your browser.

<p align="right"><a href="#top" style="text-decoration: none;">🔼</a></p>

## Contributors

Before contribute, check the contribution guide [here](https://github.com/Roar-Network/roar-ui/blob/main/CONTRIBUTING.md)

<table align="center">
   <tr>
       <td align="center">
            <a href="https://github.com/rocioog00"><img height='60' src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/56322127?v=4&h=300&w=300&fit=cover&mask=circle"/></a>
            <br/>
            Rocio Ortiz Gancedo
            <br/>
            🤔📝💻
            <br/>
            <a href="https://github.com/rocioog00"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Github-desktop-logo-symbol.svg" height="18"></a>
            <a href="https://t.me/rocioog"><img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" height="18"/></a>
            <a href="mailto:rocio.ortiz@estudiantes.matcom.uh.cu"><img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Android_Email_4.0_Icon.png" height="18"/></a>
       </td>
       <td align="center">
            <a href="https://github.com/CTS-crypto"><img height='60' src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/72420685&v=4&w=300&h=300&fit=cover&mask=circle&fit=cover"/></a>
            <br/>
            Carlos Toledo Silva
            <br/>
            💻🤔📝
            <br/>
            <a href="https://github.com/CTS-crypto"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Github-desktop-logo-symbol.svg" height="18"></a>
            <a href="https://t.me/cts-crypto"><img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" height="18"/></a>
            <a href="mailto:carlos.toledo@estudiantes.matcom.uh.cu"><img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Android_Email_4.0_Icon.png" height="18"/></a>
       </td>
       <td align="center">
            <a href="https://github.com/ArielTriana"><img height='60' src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/61637781?v=4&h=300&w=300&fit=cover&mask=circle"/></a>
            <br/>
            Ariel Alfonso Triana Pérez
            <br/>
            💻🤔📝
            <br/>
            <a href="https://github.com/atp_ariel"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Github-desktop-logo-symbol.svg" height="18"></a>
            <a href="https://t.me/atp_ariel"><img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" height="18"/></a>
            <a href="mailto:usich37@gmail.com"><img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Android_Email_4.0_Icon.png" height="18"/></a>
       </td>
   </tr>
</table>

<p align="right"><a href="#top" style="text-decoration: none;">🔼</a></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Roar-Network/roar-ui.svg?style=flat
[contributors-url]: https://github.com/Roar-Network/roar-ui/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/Roar-Network/roar-ui.svg?style=flat
[issues-url]: https://github.com/Roar-Network/roar-ui/issues
[license-shield]: https://img.shields.io/github/license/Roar-Network/roar-ui.svg?style=flat
[license-url]: https://github.com/Roar-Network/roar-ui/blob/master/LICENSE.txt
[pull-request]: https://img.shields.io/github/issues-pr/Roar-Network/roar-ui.svg?style=flat
[pull-request-url]: https://github.com/Roar-Network/roar-ui/pulls
[angular-shield]: https://img.shields.io/badge/developed-Angular-yellow?styles=flat&logo=angular
