# Heart Disease Prediction Web App
### Early Detection of Cardiovascular Risk – Powered by Random Forest (85.39% Accuracy)

A full-stack web application that predicts heart disease risk using patient clinical data.  
Built with **React (Create React App)** frontend and **Flask** backend.  
**Random Forest** was selected after extensive benchmarking — delivering the **highest accuracy and reliability**.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Flask](https://img.shields.io/badge/Flask-Latest-green)
![React](https://img.shields.io/badge/React-18-blue)
![Create React App](https://img.shields.io/badge/Built%20with-CRA-61DAFB)
![Model](https://img.shields.io/badge/Model-Random%20Forest-orange)
![Accuracy](https://img.shields.io/badge/Test%20Accuracy-85.39%25-success)
![AUC](https://img.shields.io/badge/AUC-0.824-brightgreen)

## Why Random Forest Was Chosen

After training and tuning 6 models with GridSearchCV + 5-fold cross-validation:

| Model                | CV Accuracy | Test Accuracy | AUC    | F1-Score |
|----------------------|-------------|---------------|--------|----------|
| **Random Forest**    | **85.44%**  | **85.39%**    | 0.824  | 0.738    |
| XGBoost              | 84.27%      | 84.84%        | 0.829  | 0.736    |
| KNN                  | 81.49%      | 82.39%        | 0.803  | 0.710    |
| Gradient Boosting    | 76.48%      | 76.80%        | 0.789  | 0.466    |
| SVM                  | 72.09%      | 72.40%        | 0.633  | 0.224    |
| Logistic Regression  | 69.78%      | 69.95%        | 0.604  | 0.032    |

**Random Forest is the clear winner** - highest accuracy, best F1-score, and high AUC.

## Features

- Merged dataset from **UCI, Kaggle, and Framingham**
- Robust preprocessing: median imputation, IQR outlier capping, `StandardScaler`
- Stratified train-test split to preserve class distribution
- Model saved with **joblib** (`best_heart_model.pkl` + `scaler.pkl`)
- SHAP values for clinical interpretability
- Clean React frontend using **native `fetch`** (no Axios, no Vite)
- Flask REST API with prediction endpoint
- Production-ready folder structure

## Project Structure
```
heart-disease-prediction/
├── backend/
│   ├── app.py                      # Flask server
│   ├── models/
│   │   ├── best_heart_model.pkl    # Trained Random Forest
│   │   └── scaler.pkl              # Fitted StandardScaler    
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│
├── data/
│   └── cleaned_merged_heart_dataset.csv
│
└── README.md
```



## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/shakyarahul435/HeartDiseasePrediction.git
cd HeartDiseasePrediction
```
### 2. Run Backend (Flask)
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

python app.py
```
### 3. Run Frontend (React)
```bash
cd ../frontend
npm install
npm run dev
```

Model Performance (Final Results)

|Metric |Value |
|---|---|
|Test Accuracy|85.39%|
|Precision|79.95%|
|Recall|68.60%|
|F1-Score|73.84%|
|AUC|0.824|


### Top Risk Factors (from SHAP Analysis)

1. trestbps – Resting blood pressure
2. chol – Serum cholesterol
3. age – Age
4. sex – Gender
5. fbs – Fasting blood sugar

Authors

Rahul Shakya(st125982) – Asian Institute of Technology

Alston Alvares(st126488) – Asian Institute of Technology

AIT Academic Project: Heart Disease Prediction using Machine Learning