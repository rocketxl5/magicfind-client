const timestampConverter = {
  longDate: (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = convertMonth(date.getMonth() + 1);
    const year = date.getFullYear();
    console.log(date);
    return `${day} ${month} ${year}`;
  },
  shortDate: (timestamp) => {
    // adds a 0 if num is under 10
    const standardize = (num) => {
      if (num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    };
    const date = new Date(timestamp);

    return `${date.getFullYear().toString().substring(2)}/${standardize(
      date.getMonth() + 1
    )}/${standardize(date.getDate())}`;
  }
};

const convertMonth = (num) => {
  let month = '';
  switch (parseInt(num)) {
    case 1:
      month = 'Jan';
      break;
    case 2:
      month = 'Feb';
      break;
    case 3:
      month = 'Mar';
      break;
    case 4:
      month = 'Apr';
      break;
    case 5:
      month = 'May';
      break;
    case 6:
      month = 'Jun';
      break;
    case 7:
      month = 'Jul';
      break;
    case 8:
      month = 'Aug';
      break;
    case 9:
      month = 'Sep';
      break;
    case 10:
      month = 'Oct';
      break;
    case 11:
      month = 'Nov';
      break;
    default:
      month = 'Dec';
  }

  return month;
};

export default timestampConverter;
