function handleButtonClick() {
  chrome.tabs.create({
    // index: 0,
    url: "https://b2bpolis.atlassian.net/browse/SCRUM-3099"
  }, function (tab) {
    console.log(tab);
  });
}
