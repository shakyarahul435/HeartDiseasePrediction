from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import numpy as np
import joblib
import shap
import base64
import os
import io
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

app = Flask(__name__, static_folder="assets")
CORS(app)

# Load model
MODEL_FILE = "best_heart_model.pkl"
model = joblib.load(MODEL_FILE)

# Load feature names (optional)
FEATURES = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs',
    'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
]



@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()
    features = data.get("features", {})

    # Convert to array in correct order
    x = np.array([features.get(f, 0) for f in FEATURES]).reshape(1, -1)

    # Prediction
    prob = float(model.predict_proba(x)[0][1])
    is_risk = prob > 0.5

    # SHAP explanation
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(x)

    # Create SHAP plot
    fig, ax = plt.subplots()
    shap.summary_plot(shap_values, x, feature_names=FEATURES, show=False)
    buf = io.BytesIO()
    plt.savefig(buf, format="png", bbox_inches="tight")
    buf.seek(0)

    shap_base64 = base64.b64encode(buf.getvalue()).decode("utf-8")
    plt.close()

    return jsonify({
        "prob": prob,
        "is_risk": is_risk,
        "shap_base64": shap_base64
    })


# Serve assets folder images
@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory("assets", filename)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
