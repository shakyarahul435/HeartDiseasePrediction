# Heart Disease Prediction Web App
### Early Detection of Cardiovascular Risk – Powered by Random Forest (98.15% Accuracy)

A full-stack web application that predicts heart disease risk using patient clinical data.  
Built with **React (Create React App)** frontend and **Flask** backend.  
**Random Forest** was selected after extensive benchmarking — delivering the **highest accuracy and reliability**.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Flask](https://img.shields.io/badge/Flask-Latest-green)
![React](https://img.shields.io/badge/React-18-blue)
![Create React App](https://img.shields.io/badge/Built%20with-CRA-61DAFB)
![Model](https://img.shields.io/badge/Model-Random%20Forest-orange)
![Accuracy](https://img.shields.io/badge/Test%20Accuracy-98.15%25-success)
![AUC](https://img.shields.io/badge/AUC-0.999-brightgreen)

## Why Random Forest Was Chosen

After training and tuning 6 models with GridSearchCV + 5-fold cross-validation:

| Model                | CV Accuracy | Test Accuracy | AUC    | F1-Score |
|----------------------|-------------|---------------|--------|----------|
| **Random Forest**    | **96.56%**  | **98.15%**    | 0.999  | 0.982    |
| XGBoost              | 95.63%      | 97.62%        | 0.998  | 0.977    |
| Gradient Boosting    | 93.64%      | 95.24%        | 0.990  | 0.954    |
| KNN                  | 93.84%      | 94.44%        | 0.975  | 0.949    |
| SVM                  | 93.84%      | 93.39%        | 0.977  | 0.938    |
| Logistic Regression  | 74.97%      | 74.87%        | 0.805  | 0.774    |

**Random Forest is the clear winner** - highest accuracy, best F1-score, near-perfect AUC, and only **7 misclassifications** on the test set.

## Features

- Merged dataset from **UCI, Kaggle, and Framingham** (1,888 high-quality samples)
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
│   ├── predict.py                  # Prediction route
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── PredictionForm.js   # User input form
│   │   ├── api/
│   │   │   └── api.js              # Native fetch calls
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md (CRA default)
│
├── data/
│   └── cleaned_merged_heart_dataset.csv
│
├── notebook/
│   └── app.ipynb                   # Full training, SHAP, PDF report
│
└── README.md
```



## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/heart-disease-prediction.git
cd heart-disease-prediction
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
|Test Accuracy|98.15%|
|Precision|97.49%|
|Recall|98.98%|
|F1-Score|98.23%|
|AUC|0.999|
|Misclassifications|7 out of 378|


### Top Risk Factors (from SHAP Analysis)

1. oldpeak – Exercise-induced ST depression
2. thalach – Maximum heart rate achieved
3. ca – Number of major vessels colored by fluoroscopy
4. cp – Chest pain type
5. thal – Thalassemia indicator

Authors

Rahul Shakya(st125982) – Asian Institute of Technology
Alston Alvares(st126488) – Asian Institute of Technology

AIT Academic Project: Heart Disease Prediction using Machine Learning