from fastapi import APIRouter
from schemas.patientData import PatientData
from schemas.predictionData import PredictionData
from services.predictServices import predict_heart_disease

router = APIRouter()

@router.post("/predict", response_model=PredictionData)
def predict(data: PatientData):
    return predict_heart_disease(data)