import pickle
from fastapi import HTTPException
import pandas as pd

from schemas.predictionData import PredictionData


def predict_heart_disease(patient_data):
    """
    Predicts heart disease based on the provided patient data.

    Args:
        patient_data (dict): The patient data containing various health metrics.

    Returns:
        dict: The prediction result containing the prediction and probability.
    """
    try:
        # Load the trained model using pickle
        with open('ml_models/model.pkl', 'rb') as f:
            model = pickle.load(f)

        patient_data = patient_data.model_dump()

        # Convert input data to numpy array in correct order
        features = [
            patient_data['age'],
            patient_data['sex'],
            patient_data['cp'],
            patient_data['trestbps'],
            patient_data['chol'],
            patient_data['fbs'],
            patient_data['restecg'],
            patient_data['thalach'],
            patient_data['exang'],
            patient_data['oldpeak'],
            patient_data['slope'],
            patient_data['ca'],
            patient_data['thal']
        ]

        # Define the column names in the same order as features
        columns = [
            'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
            'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
        ]

        # Create a DataFrame from features
        input_df = pd.DataFrame([features], columns=columns)
        print(input_df)
        probability = model.predict_proba(input_df)[0][1]
        result = int(probability >= 0.5)

        prediction = PredictionData(
            probability=probability,
            result=result
        )
        
        return prediction.model_dump()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )