const scroll = new LocomotiveScroll({
    el: document.querySelector('body'),
    smooth: true,
    inertia: 0.8 // Adjust this to control the smoothness
});

let emissionData = [
    { activity: 'Excavation', emissions: 1000 },
    { activity: 'Transportation', emissions: 800 },
    { activity: 'Equipment Usage', emissions: 1200 },
    { activity: 'Processing', emissions: 600 },
];

let sinkData = [
    { type: 'Existing Forests', absorption: 500 },
    { type: 'Planned Afforestation', absorption: 300 },
];

let emissionsChart, sinksChart;

// Constants for CO2 absorption and tree planting
const CO2_ABSORPTION_PER_TREE_TON = 0.022; // Tons of CO2 absorbed by one tree per year
const TREES_PER_ACRE = 400; // Number of trees that can be planted per acre of land

function createCharts() {
    // Emissions Line Chart
    emissionsChart = new Chart(document.getElementById('emissionsChart'), {
        type: 'line', // Change to 'line'
        data: {
            labels: emissionData.map(d => d.activity),
            datasets: [{
                label: 'Emissions (tons CO2e)',
                data: emissionData.map(d => d.emissions),
                borderColor: function(context) {
                    let emissions = context.dataset.data[context.dataIndex];
                    return emissions > 1000 ? 'rgba(255, 99, 132, 0.8)' : 'rgba(75, 192, 192, 0.8)'; // Color changes based on emissions
                },
                fill: false,
                borderWidth: 2,
                tension: 0.4 // Smooth the line
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Carbon Sinks Line Chart
    sinksChart = new Chart(document.getElementById('sinksChart'), {
        type: 'line', // Change to 'line'
        data: {
            labels: sinkData.map(d => d.type),
            datasets: [{
                label: 'Absorption (tons CO2e)',
                data: sinkData.map(d => d.absorption),
                borderColor: 'rgba(153, 102, 255, 0.8)', // Fixed color for sinks
                fill: false,
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateCharts() {
    emissionsChart.data.labels = emissionData.map(d => d.activity);
    emissionsChart.data.datasets[0].data = emissionData.map(d => d.emissions);
    emissionsChart.update();

    sinksChart.data.labels = sinkData.map(d => d.type);
    sinksChart.data.datasets[0].data = sinkData.map(d => d.absorption);
    sinksChart.update();
}

function updateAnalysis() {
    const totalEmissions = emissionData.reduce((sum, item) => sum + item.emissions, 0);
    const totalAbsorption = sinkData.reduce((sum, item) => sum + item.absorption, 0);
    const netEmissions = totalEmissions - totalAbsorption;

    document.getElementById('totalEmissions').textContent = `Total Emissions: ${totalEmissions} tons CO2e`;
    document.getElementById('totalAbsorption').textContent = `Total Absorption: ${totalAbsorption} tons CO2e`;
    document.getElementById('netEmissions').textContent = `Net Emissions: ${netEmissions} tons CO2e`;

    const suggestions = document.getElementById('suggestions');
    
    if (netEmissions > 0) {
        const treesRequired = Math.ceil(netEmissions / CO2_ABSORPTION_PER_TREE_TON);
        const landRequired = (treesRequired / TREES_PER_ACRE).toFixed(2); // In acres

        suggestions.innerHTML = `
            <strong>Suggested actions to reduce emissions:</strong>
            <ul>
                <li><strong>Excavation:</strong> Consider using electric or more fuel-efficient equipment to reduce fuel consumption.</li>
                <li><strong>Transportation:</strong> Optimize logistics and switch to electric or hybrid vehicles to reduce transportation emissions.</li>
                <li><strong>Equipment Usage:</strong> Upgrade equipment to energy-efficient models and ensure regular maintenance to improve fuel efficiency.</li>
                <li><strong>Processing:</strong> Implement energy-saving techniques such as heat recovery systems or renewable energy sources to power operations.</li>
                <li><strong>Afforestation:</strong> Expand afforestation efforts and implement reforestation projects to increase carbon absorption.</li>
                <li><strong>Carbon Offsetting:</strong> Consider investing in carbon offset programs to compensate for remaining emissions.</li>
            </ul>
            <p><strong>To absorb the remaining emissions, you need to plant ${treesRequired} trees, which will require approximately ${landRequired} acres of land.</strong></p>
        `;
    } else {
        suggestions.textContent = 'Congratulations! Your mine is carbon neutral.';
    }
}

document.getElementById('emissionsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    emissionData = [
        { activity: 'Excavation', emissions: Number(document.getElementById('excavation').value) },
        { activity: 'Transportation', emissions: Number(document.getElementById('transportation').value) },
        { activity: 'Equipment Usage', emissions: Number(document.getElementById('equipment').value) },
        { activity: 'Processing', emissions: Number(document.getElementById('processing').value) },
    ];
    updateCharts();
    updateAnalysis();
});

document.getElementById('sinksForm').addEventListener('submit', function(e) {
    e.preventDefault();
    sinkData = [
        { type: 'Existing Forests', absorption: Number(document.getElementById('forests').value) },
        { type: 'Planned Afforestation', absorption: Number(document.getElementById('afforestation').value) },
    ];
    updateCharts();
    updateAnalysis();
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    if (tabName === 'Emissions') {
        document.getElementById('emissionsForm').style.display = 'block';
        document.getElementById('sinksForm').style.display = 'none';
    } else if (tabName === 'Sinks') {
        document.getElementById('emissionsForm').style.display = 'none';
        document.getElementById('sinksForm').style.display = 'block';
    } else {
        document.getElementById('emissionsForm').style.display = 'none';
        document.getElementById('sinksForm').style.display = 'none';
    }
}

document.getElementById("defaultOpen").click();
createCharts();
updateAnalysis();
