const getSelectionSort = (arr) => {
  let animations = [];
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      // Push indices of elements being compared
      animations.push([minIdx, j, true]); // true indicates comparison

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Push indices to highlight swap
    animations.push([minIdx, i, false]); // false indicates swap

    // Swap elements in the array
    let temp = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i] = temp;
  }
  return animations;
};
export default getSelectionSort;
