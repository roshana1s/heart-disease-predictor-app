# Heart Disease Predictor App

A full-stack web application for predicting heart disease risk using machine learning, built with React (frontend) and FastAPI (backend).

## 📈 Model Information

- **Algorithm**: Logistic Regression  
- **Test Accuracy**: 88%  
- **Cross-Validated Accuracy**: 84%  
- **Other Models Tested**: K-Nearest Neighbors (KNN), Random Forest Classifier  
- **Current Status**: Logistic Regression is the best performing model and is deployed. Models are still under experimentation for further improvements.
- **Dataset**: [UCI Heart Disease Dataset](https://archive.ics.uci.edu/dataset/45/heart+disease)

## 📊 Feature Description

| Feature    | Description | Values/Range | Clinical Significance |
|------------|-------------|--------------|-----------------------|
| **age**    | Age in years | 1-120 | Risk increases with age |
| **sex**    | Gender | 1 = Male<br>0 = Female | Males generally higher risk |
| **cp**     | Chest pain type | 0: Typical angina (heart-related)<br>1: Atypical angina<br>2: Non-anginal pain<br>3: Asymptomatic | Type indicates likelihood of cardiac origin |
| **trestbps** | Resting blood pressure (mmHg) | 80-250 | >130-140 mmHg = hypertensive |
| **chol**   | Serum cholesterol (mg/dL) | 100-600 | >200 mg/dL = hyperlipidemic<br>(Calculated: LDL + HDL + 0.2*triglycerides) |
| **fbs**    | Fasting blood sugar >120 mg/dL | 1 = True<br>0 = False | >126 mg/dL suggests diabetes |
| **restecg** | Resting ECG results | 0: Normal<br>1: ST-T wave abnormality<br>2: LV hypertrophy | Abnormalities indicate cardiac stress |
| **thalach** | Max heart rate achieved | 60-220 bpm | Lower values may indicate poor cardiovascular fitness |
| **exang**  | Exercise-induced angina | 1 = Yes<br>0 = No | Suggests coronary artery disease |
| **oldpeak** | ST depression induced by exercise | 0.0-6.2 | Higher values indicate cardiac stress |
| **slope**  | Peak exercise ST segment slope | 0: Upsloping (healthy)<br>1: Flat<br>2: Downsloping (unhealthy) | Slope direction correlates with ischemia |
| **ca**     | Number of major vessels colored by fluoroscopy | 0-3 | 0 = best (no blockage)<br>3 = worst |
| **thal**   | Thallium stress result | 1,3: Normal<br>6: Fixed defect<br>7: Reversible defect | Reversible defects indicate active ischemia |

## 🎯 Target Variable (Prediction Output)

| Feature | Description | Values | Meaning |
|---------|-------------|--------|---------|
| **target** | Presence of heart disease | 0 = No disease<br>1 = Disease detected | Binary classification output |

## 🚀 Project Structure

```
heart-disease-predictor-app/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── schemas/
│   │   ├── ml_models/
│   │   └── services/
│   └── requirements.txt
├── model/                    # Model development & data
│   ├── data/
│   ├── notebooks/
│   └── environment.yml       # Conda environment dependencies
└── README.md
```

## 🛠 Prerequisites

- **Git**  
- **Node.js** (v14+) & **npm**  
- **Python** (3.8+)  
- **Conda** (optional, for model development)

---

## 🧪 Experiment & Develop Model (Optional)

To explore data, tweak features, or train new models:

1. **Clone the repository**
   ```bash
   git clone https://github.com/roshana1s/heart-disease-predictor-app.git
   cd heart-disease-predictor-app
   ```
2. **Create & activate Conda environment**  
   ```bash
   cd model
   conda env create -f environment.yml -n env
   conda activate env
   ```
3. **Launch Jupyter Notebook**  
   ```bash
   jupyter notebook
   ```  
   - Open notebooks in the `model/notebooks/` folder and experiment.

---

## ⚙️ Run the Deployed Version Locally

To start the currently deployed model and webapp without retraining:

1. **Clone the repository**
   ```bash
   git clone https://github.com/roshana1s/heart-disease-predictor-app.git
   cd heart-disease-predictor-app
   ```

2. **Install and start the FastAPI backend**
   ```bash
   cd backend/app
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
   Backend: `http://localhost:8000`

3. **Install and start the React frontend**
   Open a new terminal
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend: `http://localhost:3000`

---
