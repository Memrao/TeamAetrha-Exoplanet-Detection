import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import shap
import numpy as np

# Initialize app
app = Flask(__name__)
CORS(app)

# Paths to model and scaler
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "rf_koi_model.pkl")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "models", "rf_scaler.pkl")

# Load model and scaler
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# SHAP explainer
explainer = shap.TreeExplainer(model)

# Map numeric predictions to readable labels
PRED_LABELS = {
    0: "Candidate",
    1: "Exoplanet",
    2: "False Positive"
}

# All features used in training
FEATURES = [
    'koi_period', 'koi_duration', 'koi_depth', 'koi_prad', 'koi_model_snr',
    'koi_steff', 'koi_slogg', 'koi_srad', 'planet_star_radius_ratio',
    'transit_duty_cycle', 'snr_depth_product'
]

@app.route("/")
def home():
    return jsonify({"message": "Exoplanet Analysis API is running!"})

@app.route("/analyze", methods=["POST"])
def analyze():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    try:
        # Read CSV file
        df = pd.read_csv(file)

        # Check for missing columns
        missing_cols = [col for col in FEATURES if col not in df.columns]
        if missing_cols:
            return jsonify({"error": f"Missing columns: {missing_cols}"}), 400

        # Keep only expected columns and handle missing values
        df = df[FEATURES].fillna(0)

        # Scale features
        scaled_data = scaler.transform(df)

        # Predict
        preds = model.predict(scaled_data)
        preds_proba = model.predict_proba(scaled_data)

        # DEBUG: Let's check what SHAP is actually returning
        print("=== SHAP DEBUG INFO ===")
        shap_values = explainer.shap_values(scaled_data)
        
        print(f"Type of shap_values: {type(shap_values)}")
        if isinstance(shap_values, list):
            print(f"Number of classes: {len(shap_values)}")
            for i, arr in enumerate(shap_values):
                print(f"Class {i} shape: {arr.shape}")
                print(f"Class {i} sample values: {arr[0][:5]}")  # First 5 values of first row
        else:
            print(f"SHAP array shape: {shap_values.shape}")
            print(f"Sample values: {shap_values[0][:5]}")
        
        # Alternative SHAP calculation
        print("=== Trying alternative SHAP calculation ===")
        shap_summary = []
        
        # Method 1: Use the new SHAP API
        try:
            explanation = explainer(scaled_data)
            print(f"New API explanation type: {type(explanation)}")
            print(f"New API values shape: {explanation.values.shape}")
            
            for i in range(len(df)):
                row_shap = []
                pred_class = preds[i]
                
                # For multi-class, we need to get values for the predicted class
                if len(explanation.values.shape) == 3:
                    # Shape: (n_samples, n_features, n_classes)
                    for j, feature in enumerate(FEATURES):
                        importance = explanation.values[i, j, pred_class]
                        row_shap.append({
                            "feature": feature,
                            "importance": float(importance)
                        })
                else:
                    # Shape: (n_samples, n_features)
                    for j, feature in enumerate(FEATURES):
                        importance = explanation.values[i, j]
                        row_shap.append({
                            "feature": feature,
                            "importance": float(importance)
                        })
                shap_summary.append(row_shap)
                
        except Exception as e:
            print(f"New API failed: {e}")
            # Fallback to old method
            shap_summary = []
            for i in range(len(df)):
                row_shap = []
                pred_class = preds[i]
                
                if isinstance(shap_values, list) and len(shap_values) > pred_class:
                    # Get SHAP values for the predicted class
                    class_shap = shap_values[pred_class][i]
                    
                    for j, feature in enumerate(FEATURES):
                        if j < len(class_shap):
                            importance = class_shap[j]
                        else:
                            importance = 0.0
                        row_shap.append({
                            "feature": feature,
                            "importance": float(importance)
                        })
                else:
                    # Binary case or fallback
                    for j, feature in enumerate(FEATURES):
                        row_shap.append({
                            "feature": feature,
                            "importance": 0.0
                        })
                shap_summary.append(row_shap)

        # Map predictions to readable labels
        pred_labels = [PRED_LABELS.get(p, "Unknown") for p in preds]

        # Prepare probabilities with class labels
        probabilities = []
        for prob_row in preds_proba:
            prob_dict = {}
            for class_idx, prob in enumerate(prob_row):
                class_label = PRED_LABELS.get(class_idx, f"Class_{class_idx}")
                prob_dict[class_label] = float(prob)
            probabilities.append(prob_dict)

        response = {
            "predictions": pred_labels,
            "probabilities": probabilities,
            "shap": shap_summary,
            "success": True,
            "summary": {
                "total_rows": len(df),
                "exoplanets": pred_labels.count("Exoplanet"),
                "candidates": pred_labels.count("Candidate"),
                "false_positives": pred_labels.count("False Positive")
            }
        }
        return jsonify(response)

    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return jsonify({"error": str(e), "success": False}), 500

@app.route("/features", methods=["GET"])
def get_features():
    """Endpoint to get the required features"""
    return jsonify({
        "required_features": FEATURES,
        "num_features": len(FEATURES)
    })

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "model_loaded": True})

if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')