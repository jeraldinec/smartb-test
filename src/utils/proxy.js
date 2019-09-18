const cors_api_url = 'https://cors-anywhere.herokuapp.com/';

export const doCORSRequest = (options, printResult) => {
  let x = new XMLHttpRequest();
  x.open(options.method, cors_api_url + options.url);
  x.onload = x.onerror = function() {
    printResult(x.response);
  };
  if (/^POST/i.test(options.method)) {
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
  x.send(options.data);
};
