const getBinarySearch = (arr, target) => {
  let animations = [];
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    animations.push([low, "low"]);
    animations.push([high, "high"]);
    animations.push([mid, "mid"]);

    if (arr[mid] === target) {
      animations.push([mid, "found"]);
      break;
    } else if (arr[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return animations;
};

export default getBinarySearch;
