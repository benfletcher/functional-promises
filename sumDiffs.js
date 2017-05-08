
// return all pairs in the array that add up to Sum

function twoSum(arr, S) {
  const pairs = [];
  const nums = {};

  arr.forEach((el) => {
    const diff = S - el;

    if (nums[diff]) {
      pairs.push([el, diff]);
    }

    nums[el] = true;
  });

  return pairs;
}

const result = twoSum([12, 19, 3, 4, 8, -10, 5, 2], 6);
