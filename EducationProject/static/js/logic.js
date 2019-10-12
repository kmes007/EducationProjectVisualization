// create a counter to track remaining async function calls
var remainingCalls = 4;
// create a variable to store results after fetching retention data
var retentionData = [];
// create a variable to store results after fetching scores data
var scoresData = [];
// create a variable to store results after fetching budget data
var budgetData = [];
// create a variable to store results after fetching salary data
var salaryData = [];

d3.json('/retention').then(data => {
    // preview data array
    // console.log(data)

    // loop through retention data to exclude non-teacher data
    for (var i = 0; i < data.length; i++) {
        // add current element to retentionData array if teacher data
        if (data[i]["Job Classification"] === "Teachers") {
            retentionData.push(data[i])
        }
    }

    // preview retentionData array
    // console.log(retentionData)

    // decrement remainingCalls by 1
    --remainingCalls;
    console.log(`Fetched retention data. Remaining calls: ${remainingCalls}`)

    // check if ready to call draw functions
    if (remainingCalls === 0) {
        drawRetentionChart(retentionData)
        drawScoresChart(scoresData)
        drawBudgetChart(budgetData)
        drawSalaryChart(salaryData)
    }
})

d3.json('/scores').then(data => {
    // preview the data
    // console.log(data)

    // loop through scores data to only include
    //   1) Academic Year 2018-2019
    //   2) Grade 8
    //   3) Subject Math
    for (var i = 0; i < data.length; i++) {
        // add current element to scoresData array if teacher data
        if (
            data[i]["Academic Year"] === "2018-19" &&
            data[i]["Grade                         "] === "Grade 08" &&
            data[i]["Subject"] === "Math"
        ) {
            scoresData.push(data[i])
        }
    }

    // preview scoresData array
    // console.log(scoresData)

    // decrement remainingCalls by 1
    --remainingCalls;
    console.log(`Fetched scores data. Remaining calls: ${remainingCalls}`)

    // check if ready to call draw functions
    if (remainingCalls === 0) {
        drawRetentionChart(retentionData)
        drawScoresChart(scoresData)
        drawBudgetChart(budgetData)
        drawSalaryChart(salaryData)
    }
})

d3.json('/budget').then(data => {
    // preview the data
    // console.log(data)

    // loop through scores data to only include
    //   1) Year 2017-2018
    //   2) Category Total Program After Negative Factor
    for (var i = 0; i < data.length; i++) {
        // add current element to budgetData array if teacher data
        if (
            data[i]["Year"] === "2017-2018" &&
            data[i]["Category"] === "Total Program After Negative Factor"
        ) {
            budgetData.push(data[i])
        }
    }

    // preview budgetData array
    // console.log(budgetData)

    // decrement remainingCalls by 1
    --remainingCalls;
    console.log(`Fetched budget data. Remaining calls: ${remainingCalls}`)

    // check if ready to call draw functions
    if (remainingCalls === 0) {
        drawRetentionChart(retentionData)
        drawScoresChart(scoresData)
        drawBudgetChart(budgetData)
        drawSalaryChart(salaryData)
    }
})

d3.json('/salary').then(data => {
    // preview the data
    // console.log(data)

    // slice the first 15 elements from the array of data
    salaryData = data.slice(0,15)

    // preview salaryData array
    // console.log(salaryData)

    // decrement remainingCalls by 1
    --remainingCalls;
    console.log(`Fetched salary data. Remaining calls: ${remainingCalls}`)

    // check if ready to call draw functions
    if (remainingCalls === 0) {
        drawRetentionChart(retentionData)
        drawScoresChart(scoresData)
        drawBudgetChart(budgetData)
        drawSalaryChart(salaryData)
    }
})

function drawRetentionChart(retentionData) {
    // create variables to store arrays of chart info
    var labels = []
    var data = []
    var backgroundColor = []
    var borderColor = []

    // loop through the retentionData array and build arrays of chart info
    for (var i = 0; i < retentionData.length; i++) {
        labels.push(retentionData[i]["District Name"])
        data.push(retentionData[i]["Mean"])
        switch (i % 5) {
            case 1:
                backgroundColor.push('rgba(54, 162, 235, 0.2)')
                borderColor.push('rgba(54, 162, 235, 1)')
                break
            case 2:
                backgroundColor.push('rgba(255, 206, 86, 0.2)')
                borderColor.push('rgba(255, 206, 86, 1)')
                break
            case 3:
                backgroundColor.push('rgba(75, 192, 192, 0.2)')
                borderColor.push('rgba(75, 192, 192, 1)')
                break
            case 4:
                backgroundColor.push('rgba(153, 102, 255, 0.2)')
                borderColor.push('rgba(153, 102, 255, 1)')
                break
            default:
                backgroundColor.push('rgba(255, 99, 132, 0.2)')
                borderColor.push('rgba(255, 99, 132, 1)')
                break
        }
    }

    // use arrays of chart info to build chart
    var ctx = document.getElementById('teacher-turnover-canvas').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Retention Rate by District',
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function drawScoresChart(scoresData) {
    // create variables to store arrays of chart info
    var labels = []
    var data = []
    var backgroundColor = []
    var borderColor = []

    // loop through the retentionData array and build arrays of chart info
    for (var i = 0; i < scoresData.length; i++) {
        labels.push(scoresData[i]["State/District/School"])
        data.push(scoresData[i]["Mean Scale Score"])
        switch (i % 5) {
            case 1:
                backgroundColor.push('rgba(54, 162, 235, 0.2)')
                borderColor.push('rgba(54, 162, 235, 1)')
                break
            case 2:
                backgroundColor.push('rgba(255, 206, 86, 0.2)')
                borderColor.push('rgba(255, 206, 86, 1)')
                break
            case 3:
                backgroundColor.push('rgba(75, 192, 192, 0.2)')
                borderColor.push('rgba(75, 192, 192, 1)')
                break
            case 4:
                backgroundColor.push('rgba(153, 102, 255, 0.2)')
                borderColor.push('rgba(153, 102, 255, 1)')
                break
            default:
                backgroundColor.push('rgba(255, 99, 132, 0.2)')
                borderColor.push('rgba(255, 99, 132, 1)')
                break
        }
    }

    // use arrays of chart info to build chart
    var ctx = document.getElementById('performance-score-canvas').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Grade 8 Math Test Scores',
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function drawBudgetChart(budgetData) {
    // delete unnecessary keys
    delete budgetData[0]["index"]
    delete budgetData[0]["Year"]
    delete budgetData[0]["STATE OF COLORADO"]
    delete budgetData[0]["Category"]

    // create variables to store arrays of chart info
    var labels = []
    var data = []
    var backgroundColor = []
    var borderColor = []

    // use Object.keys() method return an array of a given object's own enumerable property names
    var labels = Object.keys(budgetData[0])

    // use Object.values() method return an array of a given object's own enumerable property values
    var data = Object.values(budgetData[0])

    // loop through the labels array to build arrays of chart info
    for (var i = 0; i < labels.length; i++) {
        switch (i % 5) {
            case 1:
                backgroundColor.push('rgba(54, 162, 235, 0.2)')
                borderColor.push('rgba(54, 162, 235, 1)')
                break
            case 2:
                backgroundColor.push('rgba(255, 206, 86, 0.2)')
                borderColor.push('rgba(255, 206, 86, 1)')
                break
            case 3:
                backgroundColor.push('rgba(75, 192, 192, 0.2)')
                borderColor.push('rgba(75, 192, 192, 1)')
                break
            case 4:
                backgroundColor.push('rgba(153, 102, 255, 0.2)')
                borderColor.push('rgba(153, 102, 255, 1)')
                break
            default:
                backgroundColor.push('rgba(255, 99, 132, 0.2)')
                borderColor.push('rgba(255, 99, 132, 1)')
                break
        }
    }

    // use arrays of chart info to build chart
    var ctx = document.getElementById('district-budget-canvas').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Program Budget After Negative Factor',
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function drawSalaryChart(salaryData) {
    // create variables to store arrays of chart info
    var labels = []
    var data = []
    var backgroundColor = []
    var borderColor = []

    // loop through the salaryData array and build arrays of chart info
    for (var i = 0; i < salaryData.length; i++) {
        labels.push(salaryData[i]["District_name"])
        data.push(parseInt(salaryData[i]["Combined_Aver_Salary"].replace(/,/g, "")))
        switch (i % 5) {
            case 1:
                backgroundColor.push('rgba(54, 162, 235, 0.2)')
                borderColor.push('rgba(54, 162, 235, 1)')
                break
            case 2:
                backgroundColor.push('rgba(255, 206, 86, 0.2)')
                borderColor.push('rgba(255, 206, 86, 1)')
                break
            case 3:
                backgroundColor.push('rgba(75, 192, 192, 0.2)')
                borderColor.push('rgba(75, 192, 192, 1)')
                break
            case 4:
                backgroundColor.push('rgba(153, 102, 255, 0.2)')
                borderColor.push('rgba(153, 102, 255, 1)')
                break
            default:
                backgroundColor.push('rgba(255, 99, 132, 0.2)')
                borderColor.push('rgba(255, 99, 132, 1)')
                break
        }
    }

    // use arrays of chart info to build chart
    var ctx = document.getElementById('teacher-salaries-canvas').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Combined Average Salary',
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

// This indicates which screen will present by default: Flex option
d3.select('.teacher-turnover').style('display', 'none')
d3.select('.performance-scores').style('display', 'flex')
d3.select('.teacher-salaries').style('display', 'none')
d3.select('.district-budget').style('display', 'none')

d3.select('nav').on('click', (event) => {
    if (d3.event.target.text === 'Turnover') {
        d3.select('.teacher-turnover').style('display', 'flex')
        d3.select('.performance-scores').style('display', 'none')
        d3.select('.teacher-salaries').style('display', 'none')
        d3.select('.district-budget').style('display', 'none')

    } else if (d3.event.target.text === 'Scores') {
        d3.select('.performance-scores').style('display', 'flex')
        d3.select('.teacher-turnover').style('display', 'none')
        d3.select('.teacher-salaries').style('display', 'none')
        d3.select('.district-budget').style('display', 'none')

    } else if (d3.event.target.text === 'Salaries') {
        d3.select('.performance-scores').style('display', 'none')
        d3.select('.teacher-turnover').style('display', 'none')
        d3.select('.teacher-salaries').style('display', 'flex')
        d3.select('.district-budget').style('display', 'none')

    } else if (d3.event.target.text === 'Budget') {
        d3.select('.performance-scores').style('display', 'none')
        d3.select('.teacher-turnover').style('display', 'none')
        d3.select('.teacher-salaries').style('display', 'none')
        d3.select('.district-budget').style('display', 'flex')
    }
})