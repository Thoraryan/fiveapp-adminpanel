// =====================  Engagement Overview pie chart  =======================================
var dataset = [
    { name: "Direct", count: 2742 },
    { name: "Facebook", count: 2242 },
    { name: "Pinterest", count: 3112 },
    { name: "Search", count: 937 },
    { name: "Others", count: 1450 },
];

var total = 0;

dataset.forEach(function (d) {
    total += d.count;
});

var pie = d3.layout.pie()
    .value(function (d) {
        return d.count;
    })
    .sort(null);
var w, h;
console.log(window.innerWidth)
if (window.innerWidth <= 768) {
    w = 120; // Set width for tablet view
    h = 120; // Set height for tablet view
} else if (window.innerWidth <= 425) {
    w = 50;
    h = 100;
} else {
    w = 200; // Default width
    h = 200; // Default height
}

var outerRadiusArc = w / 2;
var innerRadiusArc = 50;
var shadowWidth = 10;

var outerRadiusArcShadow = innerRadiusArc + 1;
var innerRadiusArcShadow = innerRadiusArc - shadowWidth;

var color = d3.scale
    .ordinal()
    .range(["rgba(255, 91, 90, 1)", "rgba(0, 162, 138, 1)", "rgba(171, 83, 219, 1)", "rgba(74, 82, 255, 1)", "#ffd6e0"]);

var svg = d3
    .select("#chart")
    .append("svg")
    .attr({
        width: w,
        height: h,
    })
    .append("g")
    .attr({
        transform: "translate(" + w / 2 + "," + h / 2 + ")",
    });

var createChart = function (
    svg,
    outerRadius,
    innerRadius,
    fillFunction,
    className
) {
    var arc = d3.svg.arc().innerRadius(outerRadius).outerRadius(innerRadius);

    var path = svg
        .selectAll("." + className)
        .data(pie(dataset))
        .enter()
        .append("path")
        .attr({
            class: className,
            d: arc,
            fill: fillFunction,
        });

    path
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
            var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return function (t) {
                return arc(interpolate(t));
            };
        });
};

createChart(
    svg,
    outerRadiusArc,
    innerRadiusArc,
    function (d, i) {
        return color(d.data.name);
    },
    "path1"
);

createChart(
    svg,
    outerRadiusArcShadow,
    innerRadiusArcShadow,
    function (d, i) {
        var c = d3.hsl(color(d.data.name));
        return d3.hsl(c.h + 5, c.s - 0.07, c.l - 0.15);
    },
    "path2"
);

var addText = function (text, y, size) {
    svg
        .append("text")
        .text(text)
        .attr({
            "text-anchor": "middle",
            y: y,
        })
        .style({
            fill: "#000",
            "font-size": size,
        });
};

var restOfTheData = function () {
    addText(
        function () {
            return numberWithCommas(total);
        },
        0,
        "18px"
    );

    addText(
        function () {
            return "Page View";
        },
        25,
        "10px"
    );
};

setTimeout(restOfTheData, 1000);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// ============ users pie Chart =========================
$(document).ready(function () {
    const data = {
        labels: ['20% InActive Users', '30% New Users', '50% Active Users'],
        datasets: [{
            label: 'My First Dataset',
            size: 12,
            data: [50, 100, 120],
            backgroundColor: [
                'rgba(229, 25, 85, 1)',
                'rgba(255, 91, 90, 1)',
                'rgba(0, 162, 138, 1)',
            ],
            borderColor: [
                'rgba(229, 25, 85, 1)',
                'rgba(255, 91, 90, 1)',
                'rgba(0, 162, 138, 1)',
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    };

    new Chart($('#myPieChart'), config);
});
// ===================   line chart      ==============================================
/* line chart */
$(document).ready(function () {
    var xValues = [];
    var yValues = { sin: [], cos: [], tan: [] };

    function generateData(expression, yVals, i1, i2, step = 1) {
        for (let x = i1; x <= i2; x += step) {
            yVals.push(eval(expression));
            if (xValues.length < yVals.length) {
                xValues.push(x);
            }
        }
    }

    generateData("Math.sin(x)", yValues.sin, 0, 5, 0.5);
    generateData("Math.cos(x)", yValues.cos, 0, 6, 0.5);
    generateData("Math.tan(x)", yValues.tan, 2, 7, 0.5);

    new Chart($("#myChart"), {
        type: "line",
        data: {
            labels: xValues,
            datasets: [
                {
                    label: "user",
                    fill: true,
                    pointRadius: 2,
                    borderColor: "rgba(255, 91, 90, 1)",
                    data: yValues.sin
                },
                {
                    label: "admin",
                    fill: true,
                    pointRadius: 2,
                    borderColor: "rgba(229, 25, 85, 1)",
                    data: yValues.cos
                },
                {
                    label: "in progress",
                    fill: true,
                    pointRadius: 2,
                    borderColor: "rgba(0, 162, 138, 1)",
                    data: yValues.tan
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
// ======================== bar chart =======================================================
$(document).ready(function () {
    var labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    var dataset1 = [65, 59, 80, 81, 56, 55, 40];
    var dataset2 = [28, 48, 40, 19, 86, 27, 90];
    var dataset3 = [18, 48, 77, 9, 100, 27, 40];

    new Chart($("#myBarChart"), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Active',
                    backgroundColor: 'rgba(255, 91, 90, 1)',
                    data: dataset1
                },
                {
                    label: 'in Active',
                    backgroundColor: 'rgba(229, 25, 85, 1)',
                    data: dataset2
                },
                {
                    label: 'user ',
                    backgroundColor: 'rgba(0, 162, 138, 1)',
                    data: dataset3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
// side bar button toggle
var btn = document.querySelector('.toggle');
btn.onclick = function () {
    document.querySelector('.toggle span').classList.toggle('toggle');
    $('.admin_siderbarr')[0].classList.toggle('sidebarshow');
    $('.admin_contentpart')[0].classList.toggle('content-part-width');
}
$(document).ready(function () {
    var selector = $('.admin_siderbarr a');
    $(selector).on('click', function () {
        $(selector).removeClass('active');
        $(this).addClass('active');

        // var target = $(this).data('target');
        // $('.profile-content').removeClass('active');
        // $(target).addClass('active');
    });
    // $(selector).first().trigger('click');
});