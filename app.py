from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/planner")
def planner():
    return render_template("planner.html")

@app.route("/charging")
def charging():
    return render_template("charging.html")

@app.route("/battery")
def battery():
    return render_template("battery.html")

@app.route("/emergency")
def emergency():
    return render_template("emergency.html")

@app.route("/api/range", methods=["POST"])
def estimate_range():
    data = request.get_json()
    battery = float(data.get("battery", 0))
    efficiency = float(data.get("efficiency", 6))  # km per 1% battery
    range_km = round(battery * efficiency, 1)
    return jsonify({"range": range_km})

if __name__ == "__main__":
    app.run(debug=True)
