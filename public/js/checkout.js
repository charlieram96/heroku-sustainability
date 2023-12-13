const costWeights = {
  'No Cost': 0,
  '$0-5k': 1,
  '$6-15k': 2,
  '$16-25k': 3,
  '$26-100k': 4,
  '$100k+': 5
};

const timeWeights = {
  'Immediate': 0,
  '0-3 Months': 1,
  '4-6 Months': 2,
  '7-9 Months': 3,
  '10-12+ Months': 4
};

let costTotal = 0;
let timeTotal = 0;

const rowCount = checkoutTable.rows()[0].length;
if (rowCount > 0) {
  for (let row = 0; row < rowCount; row++) {
    const costCellValue = checkoutTable.cells(row, 2).data()[0];
    const timeCellValue = checkoutTable.cells(row, 3).data()[0];
    if (costWeights.hasOwnProperty(costCellValue)) {
      costTotal += costWeights[costCellValue];
    }

    if (timeWeights.hasOwnProperty(timeCellValue)) {
      timeTotal += timeWeights[timeCellValue];
    }
  }

  const costAverage = costTotal / rowCount;
  const timeAverage = timeTotal / rowCount;

  const getCostLabel = (value) => {
    if (value <= 0) return "No Cost";
    if (value <= 1) return "$0-5k";
    if (value <= 2) return "$6-15k";
    if (value <= 3) return "$16-25k";
    if (value <= 4) return "$26-100k";
    if (value <= 5) return "$100k+";
  };

  const getTimeLabel = (value) => {
    if (value <= 0) return "Immediate";
    if (value <= 1) return "0-3 Months";
    if (value <= 2) return "4-6 Months";
    if (value <= 3) return "7-9 Months";
    if (value <= 4) return "10-12+ Months";
  };

  const costLabel = getCostLabel(costAverage);
  const timeLabel = getTimeLabel(timeAverage);

  document.getElementById("costAvg").innerHTML = "<strong>Avg. Cost: </strong>" + costLabel;
  document.getElementById("timeAvg").innerHTML = "<strong>Avg. Time: </strong>" + timeLabel;
}

