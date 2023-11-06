export function pagination(currentPage, totalPage) {
  var delta = 2,
    left = currentPage - delta,
    right = currentPage + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= totalPage; i++) {
    if (i == 1 || i == totalPage || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

export function calculateFistLastPageTable(rowData, total, pageSize, currentPage) {
  let first, last, pages;

  if (!rowData && rowData.length === 0) {
    first = 0;
    last = 0;
  } else {
    pages = Array(Math.ceil(total / pageSize)).fill(0).map((value, index) => index + 1);
    first = pageSize * (currentPage - 1) + 1;
    last = rowData.length + (pageSize * (currentPage - 1));
  }

  return { first, last, pages };
}

