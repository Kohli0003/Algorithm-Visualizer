import React, { useEffect, useState } from "react";
import "./SortingVisualizer.css";
import getBubbleSort from "../sortingAlgorithm/bubbleSort";
import getSelectionSort from "../sortingAlgorithm/selectionSort";
import getMergeSortAnimations from "../sortingAlgorithm/mergeSort";
import getBinarySearch from "../sortingAlgorithm/binarySearch";
import getQuickSort from "../sortingAlgorithm/quickSort";
import toast, { Toaster } from "react-hot-toast";

const SortingVisualizer = () => {
  const [arr, setArr] = useState([]);

  const [speed, setSpeed] = useState("");
  const [w, setW] = useState(10);

  const handleSpeed = (e) => {
    const selectedSpeed = e.target.value;
    if (selectedSpeed === "slow") {
      setSpeed(200);
    } else if (selectedSpeed === "medium") {
      setSpeed(50);
    } else if (selectedSpeed === "fast") {
      setSpeed(10);
    }
  };
  const resetArray = () => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    setArr(array);
    resetBarColors();
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const resetToSortedArray = () => {
    const array = [];
    for (let i = 0; i < 20; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    array.sort((a, b) => a - b);
    setArr(array);
    resetBarColors();
  };
  const resetBarColors = () => {
    setTimeout(() => {
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let j = 0; j < arrayBars.length; j++) {
        const barStyle = arrayBars[j].style;
        barStyle.backgroundColor = "white";
      }
    }, 0);
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(arr);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : "white"; // Adjust colors as needed
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
        }, i * speed);
      }
    }

    // Turn all bars green after sorting is complete
    setTimeout(() => {
      for (let j = 0; j < arrayBars.length; j++) {
        const barStyle = arrayBars[j].style;
        barStyle.backgroundColor = "green";
      }
    }, animations.length * speed);
  };

  const quickSort = () => {
    const animations = getQuickSort(arr);
    animateSort(animations);
  };

  const animateSort = (animations) => {
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, action, barOneHeight, barTwoHeight] =
        animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle =
        barTwoIdx !== null ? arrayBars[barTwoIdx].style : null;

      if (action === "compare") {
        setTimeout(() => {
          barOneStyle.backgroundColor = "red";
          if (barTwoStyle) barTwoStyle.backgroundColor = "purple";
        }, i * speed);
      } else if (action === "swap") {
        setTimeout(() => {
          barOneStyle.height = `${barTwoHeight}px`;
          if (barTwoStyle) barTwoStyle.height = `${barOneHeight}px`;
        }, i * speed);
      } else if (action === "pivot") {
        setTimeout(() => {
          barOneStyle.backgroundColor = "purple";
        }, i * speed);
      } else if (action === "pivot-revert") {
        setTimeout(() => {
          barOneStyle.backgroundColor = "white";
        }, i * speed);
      }
      setTimeout(() => {
        barOneStyle.backgroundColor = "white";
        barTwoStyle.backgroundColor = "white";
      }, i * speed + 100); // Delay after comparison or swap
    }

    setTimeout(() => {
      for (let j = 0; j < arrayBars.length; j++) {
        const barStyle = arrayBars[j].style;
        barStyle.backgroundColor = "green";
      }
    }, animations.length * speed + 100);
  };

  const selectionSort = () => {
    const animations = getSelectionSort(arr); // Get animations from selection sort algorithm
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, isComparison] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      // Highlight bars being compared
      if (isComparison) {
        setTimeout(() => {
          barOneStyle.backgroundColor = "red";
          barTwoStyle.backgroundColor = "red";
        }, i * speed);
      } else {
        // Swap heights if necessary
        setTimeout(() => {
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, i * speed);
      }

      // Reset color after comparison or swap
      setTimeout(() => {
        barOneStyle.backgroundColor = "white";
        barTwoStyle.backgroundColor = "white";
      }, i * speed + 100); // Delay after comparison or swap
    }

    // Turn all bars green after sorting is complete
    setTimeout(() => {
      for (let j = 0; j < arrayBars.length; j++) {
        const barStyle = arrayBars[j].style;
        barStyle.backgroundColor = "green";
      }
    }, animations.length * speed);
  };

  const bubbleSort = () => {
    const animations = getBubbleSort(arr);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      // Change color of only the bars being compared
      setTimeout(() => {
        barTwoStyle.backgroundColor = "red";
      }, i * speed);

      // Change heights to simulate swapping
      setTimeout(() => {
        barOneStyle.height = `${barTwoHeight}px`;
        barTwoStyle.height = `${barOneHeight}px`;
      }, i * speed); // Add a delay after color change

      // Reset color after swap animation
      setTimeout(() => {
        barOneStyle.backgroundColor = "white";
        barTwoStyle.backgroundColor = "white";
      }, i * speed + speed); // Reset color after swapping heights
    }

    // Turn all bars green after sorting is complete
    setTimeout(() => {
      for (let j = 0; j < arrayBars.length; j++) {
        const barStyle = arrayBars[j].style;
        barStyle.backgroundColor = "green";
      }
    }, animations.length * speed);
  };
  const binarySearch = async () => {
    // Delay to allow the array to render

    const newArray = [];
    for (let i = 0; i < 100; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    newArray.sort((a, b) => a - b);
    setArr(newArray);
    console.log(newArray);

    // Select a random index for the target
    let targetInd = randomIntFromInterval(0, newArray.length - 1);
    let target = newArray[targetInd];

    console.log(`Target: ${target} at index ${targetInd}`); // Log target and index

    const animations = getBinarySearch(newArray, target);
    console.log(animations); // Log animations

    const arrayBars = document.getElementsByClassName("array-bar");

    let prevLow, prevHigh, prevMid;
    arrayBars[targetInd].style.backgroundColor = "blue";
    for (let i = 0; i < animations.length; i++) {
      const [ind, action] = animations[i];

      setTimeout(() => {
        if (action === "low") {
          if (prevLow !== undefined)
            arrayBars[prevLow].style.backgroundColor = "white";
          arrayBars[ind].style.backgroundColor = "red";
          prevLow = ind;
        } else if (action === "high") {
          if (prevHigh !== undefined)
            arrayBars[prevHigh].style.backgroundColor = "white";
          arrayBars[ind].style.backgroundColor = "yellow";
          prevHigh = ind;
        } else if (action === "mid") {
          if (prevMid !== undefined)
            arrayBars[prevMid].style.backgroundColor = "white";
          arrayBars[ind].style.backgroundColor = "orange";
          prevMid = ind;
        } else if (action === "found") {
          arrayBars[ind].style.backgroundColor = "green";
          console.log("Reached Here");

          toast.success("success");
        }
      }, i * 500);
    }
  };
  useEffect(() => {
    resetArray();
  }, []);

  return (
    <>
      <h1>Sorting Visualizer</h1>
      <div className="array-container">
        {arr.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px`, width: `${w}px` }}
          ></div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={() => resetArray()} id="">
          Generate New Array
        </button>
        <button onClick={() => mergeSort()} id="merge-sort-button">
          Merge Sort
        </button>
        <button onClick={() => selectionSort()} id="selection-sort-button">
          Selection Sort
        </button>
        <button onClick={() => quickSort()} id="quick-sort-button">
          Quick Sort
        </button>
        <button onClick={() => bubbleSort()} id="bubble-sort-button">
          Bubble Sort
        </button>
        <button onClick={() => binarySearch()} id="binary-search-btn">
          Binary Search
        </button>
        <select id="myList" onChange={handleSpeed}>
          <option value="">Choose Speed</option>
          <option value="slow">Slow</option>
          <option value="medium">Medium</option>
          <option value="fast">Fast</option>
        </select>
      </div>
    </>
  );
};

export default SortingVisualizer;
