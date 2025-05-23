import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./HeartDiseaseForm.css";

const fieldTooltips = {
    age: "Age in years",
    sex: "1 = male; 0 = female",
    cp: "Chest pain type: 0=Typical angina, 1=Atypical angina, 2=Non-anginal pain, 3=Asymptomatic",
    trestbps:
        "Resting blood pressure (mm Hg). Above 130-140 is cause for concern.",
    chol: "Serum cholesterol in mg/dl. Above 200 is cause for concern.",
    fbs: "Fasting blood sugar > 120 mg/dl (1 = true; 0 = false)",
    restecg:
        "Resting ECG: 0=Normal, 1=ST-T abnormality, 2=Left ventricular hypertrophy",
    thalach: "Maximum heart rate achieved",
    exang: "Exercise induced angina (1 = yes; 0 = no)",
    oldpeak: "ST depression induced by exercise relative to rest",
    slope: "Slope of peak exercise ST segment: 0=Upsloping, 1=Flatsloping, 2=Downsloping",
    ca: "Number of major vessels (0-3) colored by flourosopy",
    thal: "Thalium stress result: 1,3=normal, 6=fixed defect, 7=reversible defect",
};

const numericFields = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal",
];

const HeartDiseaseForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: "",
        sex: "",
        cp: "",
        trestbps: "",
        chol: "",
        fbs: "",
        restecg: "",
        thalach: "",
        exang: "",
        oldpeak: "",
        slope: "",
        ca: "",
        thal: "",
    });
    const [loading, setLoading] = useState(false);

    const optionMaps = {
        sex: [
            { label: "Female", value: 0 },
            { label: "Male", value: 1 },
        ],
        cp: [
            { label: "Typical Angina", value: 0 },
            { label: "Atypical Angina", value: 1 },
            { label: "Non-anginal Pain", value: 2 },
            { label: "Asymptomatic", value: 3 },
        ],
        restecg: [
            { label: "Normal", value: 0 },
            { label: "ST-T Wave Abnormality", value: 1 },
            { label: "Left Ventricular Hypertrophy", value: 2 },
        ],
        exang: [
            { label: "No", value: 0 },
            { label: "Yes", value: 1 },
        ],
        slope: [
            { label: "Upsloping", value: 0 },
            { label: "Flatsloping", value: 1 },
            { label: "Downsloping", value: 2 },
        ],
        thal: [
            { label: "Normal", value: 1 },
            { label: "Fixed Defect", value: 6 },
            { label: "Reversible Defect", value: 7 },
        ],
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Convert numeric fields to numbers
        const dataToSend = { ...formData };
        numericFields.forEach((field) => {
            if (dataToSend[field] !== "") {
                if (field === "oldpeak") {
                    dataToSend[field] = parseFloat(dataToSend[field]);
                } else {
                    dataToSend[field] = Number(dataToSend[field]);
                }
            }
        });

        try {
            const response = await axios.post("http://localhost:8000/api/v1/predict", dataToSend);
            navigate("/results", {
                state: {
                    result: response.data,
                    formData: dataToSend,
                    optionMaps,
                },
            });
            toast.success("Prediction completed successfully!");
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to get prediction. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-bg">
            <div className="form-container">
                <h1 className="form-title">Heart Disease Risk Assessment</h1>
                <p className="form-desc">
                    Fill in your details below to assess your heart disease
                    risk.
                </p>
                <form onSubmit={handleSubmit} className="assessment-form">
                    <div className="form-grid">
                        {/* Age */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.age}
                            >
                                Age
                            </label>
                            <input
                                type="number"
                                name="age"
                                min="0"
                                max="120"
                                required
                                className="form-input"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Enter your age"
                            />
                        </div>
                        {/* Sex */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.sex}
                            >
                                Sex
                            </label>
                            <div className="select-wrapper">
                                <select
                                    name="sex"
                                    required
                                    className="form-select"
                                    value={formData.sex}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    {optionMaps.sex.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* Chest Pain Type */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.cp}
                            >
                                Chest Pain Type
                            </label>
                            <div className="select-wrapper">
                                <select
                                    name="cp"
                                    required
                                    className="form-select"
                                    value={formData.cp}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select Chest Pain Type
                                    </option>
                                    {optionMaps.cp.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* Resting Blood Pressure */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.trestbps}
                            >
                                Resting Blood Pressure (mm Hg)
                            </label>
                            <input
                                type="number"
                                name="trestbps"
                                min="80"
                                max="250"
                                required
                                className="form-input"
                                value={formData.trestbps}
                                onChange={handleChange}
                                placeholder="e.g., 120"
                            />
                        </div>
                        {/* Serum Cholesterol */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.chol}
                            >
                                Serum Cholesterol (mg/dl)
                            </label>
                            <input
                                type="number"
                                name="chol"
                                min="100"
                                max="600"
                                required
                                className="form-input"
                                value={formData.chol}
                                onChange={handleChange}
                                placeholder="e.g., 200"
                            />
                        </div>
                        {/* Fasting Blood Sugar */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.fbs}
                            >
                                Fasting Blood Sugar &gt; 120 mg/dl
                            </label>
                            <div className="select-wrapper">
                                <select
                                    name="fbs"
                                    required
                                    className="form-select"
                                    value={formData.fbs}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="1">
                                        True (&gt;120 mg/dl)
                                    </option>
                                    <option value="0">
                                        False (≤120 mg/dl)
                                    </option>
                                </select>
                            </div>
                        </div>
                        {/* Resting ECG */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.restecg}
                            >
                                Resting ECG
                            </label>
                            <div className="select-wrapper">
                                <select
                                    name="restecg"
                                    required
                                    className="form-select"
                                    value={formData.restecg}
                                    onChange={handleChange}
                                >
                                    <option value="">Select ECG Result</option>
                                    {optionMaps.restecg.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* Max Heart Rate Achieved */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.thalach}
                            >
                                Max Heart Rate Achieved
                            </label>
                            <input
                                type="number"
                                name="thalach"
                                min="60"
                                max="250"
                                required
                                className="form-input"
                                value={formData.thalach}
                                onChange={handleChange}
                                placeholder="e.g., 150"
                            />
                        </div>
                        {/* Exercise Induced Angina */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.exang}
                            >
                                Exercise Induced Angina
                            </label>
                            <div className="select-wrapper">
                                <select
                                    name="exang"
                                    required
                                    className="form-select"
                                    value={formData.exang}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    {optionMaps.exang.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* Oldpeak */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.oldpeak}
                            >
                                ST Depression (Oldpeak)
                            </label>
                            <input
                                type="number"
                                name="oldpeak"
                                step="0.1"
                                min="0"
                                max="10"
                                required
                                className="form-input"
                                value={formData.oldpeak}
                                onChange={handleChange}
                                placeholder="e.g., 2.5"
                            />
                        </div>
                        {/* Slope */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.slope}
                            >
                                Slope of Peak Exercise ST Segment
                            </label>
                            <div className="select-wrapper">
                                <select
                                    name="slope"
                                    required
                                    className="form-select"
                                    value={formData.slope}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Slope</option>
                                    {optionMaps.slope.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* Number of Major Vessels */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.ca}
                            >
                                Number of Major Vessels Colored by Flourosopy
                                (0-3)
                            </label>
                            <input
                                type="number"
                                name="ca"
                                min="0"
                                max="3"
                                required
                                className="form-input"
                                value={formData.ca}
                                onChange={handleChange}
                                placeholder="0, 1, 2, or 3"
                            />
                        </div>
                        {/* Thalium Stress Result */}
                        <div className="form-group">
                            <label
                                className="form-label"
                                title={fieldTooltips.thal}
                            >
                                Thalium Stress Result
                            </label>
                            <div className="select-wrapper">
                                <select
                                    name="thal"
                                    required
                                    className="form-select"
                                    value={formData.thal}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select Thalium Result
                                    </option>
                                    {optionMaps.thal.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`submit-button ${
                                loading ? "loading" : ""
                            }`}
                        >
                            {loading ? "Predicting..." : "Assess Risk"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HeartDiseaseForm;
