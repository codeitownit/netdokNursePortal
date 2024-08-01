/* eslint-disable */

function capitalizeWords(str) {
  if (!str) return;
  if (str === "") return;

  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  return words.join(" ");
}

function capSentence(str) {
  if (!str || str === "") return str;

  let capitalizedString = str.charAt(0).toUpperCase() + str.slice(1);

  capitalizedString = capitalizedString.replace(/\. *([a-zA-Z])/g, function (
    match,
    p1
  ) {
    return ". " + p1.toUpperCase();
  });

  return capitalizedString;
}

function addCommas(number) {
  number = String(number);
  if (number.length <= 3) {
    return number;
  } else {
    return addCommas(number.slice(0, -3)) + "," + number.slice(-3);
  }
}

function formatNumberWithCommas(number) {
  const parts = String(number).split(".");
  parts[0] = addCommas(parts[0]);
  return parts.join(".");
}

function truncate(str, length = 10) {
  if (str.length > length) return str.slice(0, length) + "...";
  else return str;
}

const limitText = (txt, lim = 30) => {
  if (txt === null || txt === undefined) return "";
  if (txt.length < lim) return txt;
  return txt.slice(0, lim) + " ...";
};

const limitTextFillEmpty = (txt, lim = 30) => {
  let s = "";

  for (let i = 0; i < lim; i++) {
    let c = txt[i];

    if (!c) {
      s = s + "-";
      continue;
    }

    s = s + c;
  }

  return s + " ";
};

const transforms = {
  capWord: capitalizeWords,
  capSentence: capSentence,
  upCase: function (txt) {
    return txt.toUpperCase();
  },
  downCase: function (txt) {
    return txt.toLowerCase();
  },
  truncate,
};

const dataTransfrom = ({ str = "", trans = () => "" }) => {
  if (typeof str !== "string") return "";

  return trans(str);
};

function removeLastS(str) {
  if (typeof str !== "string") return str;

  if (str.endsWith("s")) {
    return str.slice(0, -1);
  } else {
    return str;
  }
}

export {
  capitalizeWords,
  capSentence,
  formatNumberWithCommas,
  transforms,
  limitText,
  limitTextFillEmpty,
  dataTransfrom,
  removeLastS,
};
