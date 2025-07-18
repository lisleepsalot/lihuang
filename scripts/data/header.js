const headerUpperHTML = `
    <div class="header-upper">
        <div class="header-text header-block">
            <p style="margin: 0;">
                <a class="removeA hover-yellow" href="index.html">Li Huang</a>
                <div id="animation1">-->-->-->-->-->--> </div>
                <span class = "responsive-1" id="current-datetime"> <br></span>
                <span class = "responsive-1">(last updated on 03/2025)<br></span>
            </p>
        </div>
        <div class="header-block">
            <p class="header-text" style="margin: 0;">
                Brooklyn based Graphic Designer<br>
                Currently @<a class="removeA hover-yellow" href="https://www.familyoffice.is/" target="_blank">Family Office</a><br>
                Previously @<a class="removeA hover-yellow" href="https://www.apple.com/" target="_blank">Apple</a></span>, <a class="removeA hover-yellow" href="https://www.risdguild.com/" target="_blank">RISD Design Guild</a>
            </p>
        </div>
        <div class="header-block header-contact">
            <p class="header-text" style="margin: 0;">
                <a class="removeA hover-yellow header-social-links" href="https://www.instagram.com/lihuang.space/" target="_blank">Instagram,</a>
                <a class="removeA hover-yellow header-social-links" href="https://www.linkedin.com/in/li-huang-7810231b8/" target="_blank">LinkedIn,</a>
                <a class="removeA hover-yellow header-social-links" href="mailto:lhuang02@risd.edu">E-mail</a>
            </p>
        </div>
    </div>`;

const pageHeaderUpperHTML = `
    <div class="header-upper">
        <div class="header-text header-block">
            <p style="margin: 0;">
                <a class="removeA hover-yellow" href="../index.html">Li Huang</a>
            </p>
        </div>
        <div class="header-block">
            <span class = "header-text" id="current-datetime"></span><br>
        </div>
        <div class="header-block">
            <p class="header-text" style="margin: 0;">
                <a class="removeA hover-yellow" href="https://www.instagram.com/lihuang.space/" target="_blank">Instagram</a>, 
                <a class="removeA hover-yellow" href="https://www.linkedin.com/in/li-huang-7810231b8/" target="_blank">LinkedIn</a>,  
                <a class="removeA hover-yellow" href="mailto:lhuang02@risd.edu">E-mail</a>
            </p>
        </div>
    </div>`;

    const utilitySectionHTML = `
       <div class="utlity header-text">
        <div class="header-block">
            <p class="underline-div">My projects</p>
<div>
  <input type="checkbox" id="checkbox-editorial">
  <label for="checkbox-editorial" class="custom-checkbox"></label> editorial design
</div>
<div>
  <input type="checkbox" id="checkbox-identity">
  <label for="checkbox-identity" class="custom-checkbox"></label> identity design
</div>
<div>
  <input type="checkbox" id="checkbox-motion">
  <label for="checkbox-motion" class="custom-checkbox"></label> motion design
</div>
        </div>

        <div class="header-block utility-display">
            <p class="header-text underline-div">Display</p>
            <div class="display-type">grid</div>
            <div class="display-type" style = "color:lightgray"><s>list (unavailable)</s></div>
        </div>

        <div class="header-block">
            <p class="header-text underline-div">Archive of "MISC"</p>
            <div class="button-container">
                <div class="question-button">i</div> 
                <div class="info-button">?</div>
                <div class="clear-button">c</div>
            </div>
            <div class="archive-animation">
                <video class="animation-2" autoplay muted loop playsinline>
                    <source src="images/other/animation2.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </div>
    `