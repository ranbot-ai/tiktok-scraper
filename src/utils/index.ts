const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

const humanize = (text: any): number => {
  if (text === undefined || text === null || text.length === 0) null

  let finalValue = '';
  let value = text.replace(/,/g, '');

  if (value.includes('.')) {
    value.split('.').map((itemValue: any) => {
      if (itemValue.includes('M')) { // Handle millions
        finalValue += itemValue.replace("M", "000000").substring(0, 6);
      } else if (itemValue.includes('K')) { // Handle thousands
        finalValue += itemValue.replace("K", "000").substring(0, 3);
      } else {
        finalValue += itemValue;
      }
    })
  } else {
    finalValue = value;
    if (value.includes('M')) {
      finalValue = value.replace("M", "000000");
    } else if (value.includes('K')) {
      finalValue = value.replace("K", "000");
    }
  }

  return parseInt(finalValue);
}

export { sleep, humanize }