const isOnJoinPage = () =>
  !!document
    .evaluate(
      "//i[contains(., 'more_vert')]",
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    )
    .iterateNext();

const hideSelfButton = () =>
  document
    .evaluate(
      "//span[i[contains(., 'close_fullscreen')]]",
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    )
    .iterateNext();

const moreButton = () =>
  document
    .evaluate(
      "//i[contains(., 'auto_awesome')]/following::i[contains(., 'more_vert')]",
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    )
    .iterateNext();

const closeSendingVideoButton = () =>
  document
    .evaluate(
      "//button[i[contains(., 'close')]]",
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    )
    .iterateNext();

const isElementVisible = (el) => el.offsetParent === null;

const areOthersInTheCall = () =>
  document.querySelectorAll("[data-self-name=You]").length > 1;

const interval = setInterval(() => {
  if (isOnJoinPage()) {
    return;
  }

  if (areOthersInTheCall()) {
    clearInterval(interval);
    moreButton().click();
    setTimeout(() => {
      hideSelfButton().click();
    }, 200);
    setTimeout(() => {
      closeSendingVideoButton().click();
    }, 4000);
  }
}, 2000);
