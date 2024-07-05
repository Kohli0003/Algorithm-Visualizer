const getBubbleSort = (arr) => {
  let animations = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Push both indices and their values before and after swap
        animations.push([j, j + 1, arr[j], arr[j + 1]]);

        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return animations;
};
export default getBubbleSort;
