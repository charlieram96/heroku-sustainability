var noCost = 0;
var oneCost = 0;
var twoCost = 0;
var threeCost = 0;
var fourCost = 0;
var fiveCost = 0;
var costTotal = 0;
var costAverage = 0;

var rowCount = checkoutTable.rows()[0].length;

console.log(rowCount);
for (var row=0;row<rowCount;row++) {
  if (checkoutTable.cells(row, 2).data().indexOf('No Cost')>-1) {
      noCost++;
  } else if (checkoutTable.cells(row, 2).data().indexOf('$')>-1) {
      oneCost++;
  } else if (checkoutTable.cells(row, 2).data().indexOf('$$')>-1) {
      twoCost++;
  } else if (checkoutTable.cells(row, 2).data().indexOf('$$$')>-1) {
      threeCost++;
  } else if (checkoutTable.cells(row, 2).data().indexOf('$$$$')>-1) {
      fourCost++;
  } else if (checkoutTable.cells(row, 2).data().indexOf('$$$$$')>-1) {
      fiveCost++;
  }
}
noCost = noCost * 0; oneCost = oneCost * 1; twoCost = twoCost * 2; threeCost = threeCost * 3; fourCost = fourCost * 4; fiveCost = fiveCost * 5; 
costTotal = noCost + oneCost + twoCost + threeCost + fourCost + fiveCost;
costAverage = costTotal / rowCount;
if (costAverage <= 0) {
  costAverage = "No Cost";
} else if (costAverage <= 1) {
  costAverage = "$";
} else if (costAverage <= 2) {
  costAverage = "$$";
} else if (costAverage <= 3) {
  costAverage = "$$$";
} else if (costAverage <= 4) {
  costAverage = "$$$$";
} else if (costAverage <= 5) {
  costAverage = "$$$$$";
};
console.log("Average: ",costAverage, " Total: ",costTotal);

var immediate = 0;
var zeroMonth = 0;
var fourMonth = 0;
var sevenMonth = 0;
var tenMonth = 0;
var timeTotal = 0;
var timeAverage = 0;
var rowCount = checkoutTable.rows()[0].length;
for (var row=0;row<rowCount;row++) {
  if (checkoutTable.cells(row, 3).data().indexOf('Immediate')>-1) {
    immediate++;
  } else if (checkoutTable.cells(row, 3).data().indexOf('0-3 Months')>-1) {
    zeroMonth++;
  } else if (checkoutTable.cells(row, 3).data().indexOf('4-6 Months')>-1) {
    fourMonth++;
  } else if (checkoutTable.cells(row, 3).data().indexOf('7-9 Months')>-1) {
    sevenMonth++;
  } else if (checkoutTable.cells(row, 3).data().indexOf('10-12+ Months')>-1) {
    tenMonth++;
  }
}
immediate = immediate * 0; zeroMonth = zeroMonth * 1; fourMonth = fourMonth * 2; sevenMonth = sevenMonth * 3; tenMonth = tenMonth * 4;  
timeTotal = immediate + zeroMonth + fourMonth + sevenMonth + tenMonth;
timeAverage = timeTotal / rowCount;
if (timeAverage <= 0) {
  timeAverage = "Immediate";
} else if (timeAverage <= 1) {
  timeAverage = "0-3 Months";
} else if (timeAverage <= 2) {
  timeAverage = "4-6 Months";
} else if (timeAverage <= 3) {
  timeAverage = "7-9 Months";
} else if (timeAverage <= 4) {
  timeAverage = "10-12+ Months";
};
console.log("Average: ",timeAverage, " Total: ",timeTotal);

document.getElementById("costAvg").innerHTML = "<strong>Avg. Cost: </strong>" + costAverage;
document.getElementById("timeAvg").innerHTML = "<strong>Avg. Time: </strong>" + timeAverage;