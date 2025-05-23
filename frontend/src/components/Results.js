import { useLocation, useNavigate } from "react-router-dom";
import "./HeartDiseaseForm.css";

const fieldLabels = {
    age: "Age",
    sex: "Sex",
    cp: "Chest Pain Type",
    trestbps: "Resting Blood Pressure (mm Hg)",
    chol: "Serum Cholesterol (mg/dl)",
    fbs: "Fasting Blood Sugar > 120 mg/dl",
    restecg: "Resting ECG",
    thalach: "Max Heart Rate Achieved",
    exang: "Exercise Induced Angina",
    oldpeak: "ST Depression (Oldpeak)",
    slope: "Slope of Peak Exercise ST Segment",
    ca: "Number of Major Vessels (0-3)",
    thal: "Thalium Stress Result",
};

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { result, formData, optionMaps } = location.state || {};

    if (!result || !formData) {
        return (
            <div className="form-container">
                <h2 className="form-title">No Results</h2>
                <button
                    className="new-assessment-button"
                    onClick={() => navigate("/")}
                >
                    Back to Form
                </button>
            </div>
        );
    }

    const getDisplayValue = (field, value) => {
        if (optionMaps && optionMaps[field]) {
            const option = optionMaps[field].find(
                (opt) => String(opt.value) === String(value)
            );
            return option ? option.label : value;
        }
        if (field === "fbs") {
            return value === 1 ? "True (>120 mg/dl)" : "False (≤120 mg/dl)";
        }
        return value;
    };

    return (
        <div className="page-bg">
            <div className="results-container">
                <h1 className="form-title">Assessment Results</h1>
                <div
                    className={`result-card ${
                        result.result === 1 ? "risk-detected" : "no-risk"
                    }`}
                >
                    <div className="result-icon">
                        {result.result === 1 ? "⚠️" : "✅"}
                    </div>
                    <p className="result-text">
                        {result.result === 1
                            ? "Heart Disease Detected"
                            : "No Heart Disease Detected"}
                    </p>
                    <p className="probability-text">
                        Probability of heart disease: {(result.probability * 100).toFixed(1)}%
                    </p>
                </div>
                <h2 className="results-title">Your Input Data</h2>
                <div className="results-content">
                    {Object.entries(formData).map(([field, value]) => (
                        <div key={field} className="input-summary-row">
                            <span className="input-summary-label">
                                {fieldLabels[field] || field}:
                            </span>
                            <span className="input-summary-value">
                                {getDisplayValue(field, value)}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="form-actions">
                    <button
                        className="new-assessment-button"
                        onClick={() => navigate("/")}
                    >
                        &#8592; Back to Form
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;
