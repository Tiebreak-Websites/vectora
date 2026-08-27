(function ($) {
  "use strict";

  $(document).ready(function () {

    $.getJSON(`https://sc.vectoralogic.ai/assets/Vectora/en/Websites.json`, function (json) {

      PlexopAPI.setAdvertiser(json["_PAdvertiser"]);
      PlexopAPI.setUnknown(json["_PUnknown"]);
      PlexopAPI.setBdomain(json["_PBDomain"]);
      PlexopAPI.setA(json["_PA"]);
      PlexopAPI.sendVisit();

      json.nxReg_Google = "false";
      json.nxReg_Facebook = "false";
      json.nxReg_VerificationCode = "false";

      //json.nxReg_PrivacyNoticeCheckbox = "true";
      //json.nxReg_RemoveFlags = "true";

      window.nxStaticUrl = "https://sc.finansero.com";

      window.nxRegSignUp = new nxReg(json);
      nxRegSignUp.initSignUp();


    });

  });


}(jQuery));

/**
 * Get the language from the HTML lang attribute or from the URL query parameter
 */
function getLang() {
  // check if there is lang query param in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get("lang");
  if (lang) {
    document.documentElement.lang = lang;
    return lang;
  }
  return document.documentElement.lang;
}