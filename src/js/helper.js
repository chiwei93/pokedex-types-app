//function for timeout if the promise do not resolve
export const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`The request took too long! Timeout after ${sec} seconds`));
    }, sec * 1000);
  });
};

//function for making ajax call
export const AJAX = async function (url) {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Type of Pokemon not found ${res.status}`);

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
