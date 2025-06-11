export function importAllImages(r) {
  let images = {};

  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });

  return images;
}

export function convertToCelcius(fahrenheit) {
  const result = (parseFloat(fahrenheit) - 32) / (9 / 5).toFixed(1);
  return result.toFixed(1);
}
