export let setLocaleBCP47 = function (lang) {
  let locale;
  switch (lang) {
    case "fr":
      locale = "fr-FR";
      break;
    default:
      locale = "en-US";
  }
  return locale;
};
