export const formatNumberWithCommas = (numberString) => {
    const parts = numberString.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
};

export const formatHotline = (str) => {
  return str.replace(/(.{4})/g, "$1 ");
};

export const formatPhone = (str) => {
  const len = str.length;
  if (len === 10) {
    return str.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 $3");
  } else if (len === 11) {
    return str.replace(/(\d{3})(\d{4})(\d{4})/, "($1) $2 $3");
  } else {
    return str;
  }
};

export const getFirstParagraph = (content) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const firstParagraph = doc.querySelector('p');

  return firstParagraph ? firstParagraph.outerHTML : '';
};

export const getLocalTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export const formatOperatingHours = (operatingTime) => {
  let result = "";
  const days = Object.keys(operatingTime);
  let currentStartDay = null;
  let currentEndDay = null;
  let currentTime = null;
  let groupedHours = [];

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const time = operatingTime[day];

    if (
      currentStartDay === null &&
      currentEndDay === null &&
      currentTime === null
    ) {
      currentStartDay = day;
      currentEndDay = day;
      currentTime = time;
    } else if (time === currentTime) {
      currentEndDay = day;
    } else {
      if (currentStartDay === currentEndDay) {
        groupedHours.push(`${currentStartDay}: ${currentTime}`);
      } else {
        groupedHours.push(
          `${currentStartDay} - ${currentEndDay}: ${currentTime}`
        );
      }
      currentStartDay = day;
      currentEndDay = day;
      currentTime = time;
    }
  }

  if (currentStartDay === currentEndDay) {
    groupedHours.push(`${currentStartDay}: ${currentTime}`);
  } else {
    groupedHours.push(
      `${currentStartDay} - ${currentEndDay}: ${currentTime}`
    );
  }

  result = groupedHours.join("\n");
  return result;
};