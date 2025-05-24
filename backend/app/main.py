from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.predictApi import router as predict_router

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router
app.include_router(predict_router, prefix="/api/v1", tags=["predictions"])

@app.get("/")
def read_root():
    return {"message": "Heart Disease Prediction API"}