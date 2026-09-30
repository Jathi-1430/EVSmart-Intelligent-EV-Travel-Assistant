async function calculateRange(){
    const battery = Number(document.getElementById("battery").value);
    const efficiency = Number(document.getElementById("efficiency").value);
    const result = document.getElementById("rangeResult");
    const message = document.getElementById("tripMessage");

    if(battery < 1 || battery > 100 || efficiency <= 0){
        message.textContent = "Please enter valid battery and efficiency values.";
        return;
    }

    // Computed in the browser so the site works as a static site (e.g. on Netlify)
    const data = { range: Math.round(battery * efficiency * 10) / 10 };
    result.textContent = data.range + " km";
    message.textContent = "Prototype estimate calculated successfully. Real route distance and traffic data will be connected in the next version.";
}

function batteryHealth(){
    const cycles = Number(document.getElementById("cycles").value);
    const temperature = Number(document.getElementById("temperature").value);
    let health = 100 - Math.max(0, cycles - 100) * 0.025 - Math.max(0, temperature - 30) * 0.5;
    health = Math.max(50, Math.min(100, health));
    document.getElementById("healthResult").textContent = health.toFixed(1) + "%";
    document.getElementById("healthMessage").textContent =
        health >= 80 ? "Good condition. Continue regular charging and maintenance." :
        health >= 65 ? "Moderate condition. Monitor battery performance." :
        "Battery health is reduced. Consider professional inspection.";
}

function emergencyCheck(){
    const battery = Number(document.getElementById("emergencyBattery").value);
    const box = document.getElementById("emergencyResult");
    if(battery <= 10) box.textContent = "CRITICAL: Find the nearest reachable charger or contact roadside assistance immediately.";
    else if(battery <= 20) box.textContent = "WARNING: Drive efficiently and locate a nearby charging station now.";
    else box.textContent = "Battery level is not currently in the critical range.";
}
