const getQuickSort = (arr) => {
  const animations = [];
  if (arr.length <= 1) return arr;
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
};

const quickSortHelper = (arr, start, end, animations) => {
  if (start < end) {
    let pivotIdx = partition(arr, start, end, animations);
    quickSortHelper(arr, start, pivotIdx - 1, animations);
    quickSortHelper(arr, pivotIdx + 1, end, animations);
  }
};

const partition = (arr, start, end, animations) => {
  let pivotValue = arr[end];
  let pivotIdx = start;

  // Highlight the pivot
  animations.push([end, null, "pivot"]);

  for (let i = start; i < end; i++) {
    // Push indices to highlight comparison
    animations.push([i, end, "compare"]);

    if (arr[i] < pivotValue) {
      // Push indices and values to swap elements
      animations.push([i, pivotIdx, "swap", arr[i], arr[pivotIdx]]);
      // Swap elements
      [arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];
      pivotIdx++;
    }
  }

  // Push indices and values to swap pivot with pivotIdx element
  animations.push([pivotIdx, end, "swap", arr[pivotIdx], arr[end]]);
  // Swap pivot with pivotIdx element
  [arr[pivotIdx], arr[end]] = [arr[end], arr[pivotIdx]];

  // Revert pivot color
  animations.push([pivotIdx, null, "pivot-revert"]);

  return pivotIdx;
};

export default getQuickSort;
