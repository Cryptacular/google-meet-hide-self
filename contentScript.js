const isOnJoinPage = () =>
  !!document
    .evaluate(
      "//i[contains(., 'phone_forwarded')]",
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    )
    .iterateNext();

const hideSelfButton = () =>
  document
    .evaluate(
      "//div[following-sibling::span//i[contains(., 'close_fullscreen')]]",
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    )
    .iterateNext();

const isElementVisible = (el) => el.offsetParent === null;

const areOthersInTheCall = () =>
  document.querySelectorAll("[data-self-name=You]").length > 2;

const interval = setInterval(() => {
  if (isOnJoinPage()) {
    console.log("On join page, waiting...");
    return;
  }

  if (areOthersInTheCall()) {
    console.log("Hiding self...");
    clearInterval(interval);
    hideSelfButton().click();
  }
}, 2000);
