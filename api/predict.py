import json
import pickle
import pandas as pd
import os
import traceback
from http.server import BaseHTTPRequestHandler

# Global model variable
model = None

def load_model():
    """Load the model with proper error handling"""
    global model
    if model is None:
        try:
            model_path = os.path.join(os.path.dirname(__file__), 'champion_model.pkl')
            with open(model_path, 'rb') as file:
                model = pickle.load(file)
            print(f"Model loaded successfully from {model_path}")
        except FileNotFoundError:
            raise Exception(f"Model file not found at {model_path}")
        except Exception as e:
            raise Exception(f"Error loading model: {str(e)}")
    return model

class handler(BaseHTTPRequestHandler):
    def send_json_response(self, status_code, data):
        """Helper to send JSON responses"""
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        try:
            self.send_json_response(200, {"message": "CORS preflight successful"})
        except Exception as e:
            self.send_json_response(500, {"error": f"CORS error: {str(e)}"})

    def do_GET(self):
        """Handle GET requests for testing"""
        try:
            self.send_json_response(200, {
                "message": "CTCL Risk Prediction API is running",
                "status": "healthy",
                "method": "POST",
                "endpoint": "/api/predict"
            })
        except Exception as e:
            self.send_json_response(500, {"error": f"GET error: {str(e)}"})

    def do_POST(self):
        """Handle POST requests for predictions"""
        try:
            # Load model first
            try:
                current_model = load_model()
            except Exception as e:
                self.send_json_response(500, {
                    "error": "Model loading failed",
                    "details": str(e),
                    "type": "model_error"
                })
                return

            # Parse request body
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                if content_length == 0:
                    self.send_json_response(400, {
                        "error": "Empty request body",
                        "type": "request_error"
                    })
                    return
                
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
            except json.JSONDecodeError as e:
                self.send_json_response(400, {
                    "error": "Invalid JSON in request body",
                    "details": str(e),
                    "type": "json_error"
                })
                return
            except Exception as e:
                self.send_json_response(400, {
                    "error": "Error parsing request",
                    "details": str(e),
                    "type": "request_error"
                })
                return

            # Validate input data
            required_features = [
                'multiple_biopsies', 'failed_steroids', 'otherrash',
                'scaly_patch_plaque', 'erythema', 'xerosis', 
                'pruritus', 'other_failed_therapies'
            ]
            
            missing_features = [f for f in required_features if f not in data]
            if missing_features:
                self.send_json_response(400, {
                    "error": "Missing required features",
                    "missing_features": missing_features,
                    "required_features": required_features,
                    "type": "validation_error"
                })
                return

            # Create feature vector
            try:
                feature_vector = [1 if data.get(feature, False) else 0 for feature in required_features]
                feature_df = pd.DataFrame([feature_vector], columns=required_features)
                
                # Validate feature vector
                if len(feature_vector) != len(required_features):
                    raise ValueError(f"Feature vector length mismatch: expected {len(required_features)}, got {len(feature_vector)}")
                    
            except Exception as e:
                self.send_json_response(500, {
                    "error": "Error creating feature vector",
                    "details": str(e),
                    "type": "preprocessing_error"
                })
                return

            # Make prediction
            try:
                risk_proba = current_model.predict_proba(feature_df)
                
                # Validate prediction output
                if risk_proba.shape != (1, 2):
                    raise ValueError(f"Unexpected prediction shape: {risk_proba.shape}")
                
                risk_score = float(risk_proba[0, 1])
                
                # Validate risk score range
                if not (0 <= risk_score <= 1):
                    raise ValueError(f"Risk score out of range [0,1]: {risk_score}")
                    
            except Exception as e:
                self.send_json_response(500, {
                    "error": "Error making prediction",
                    "details": str(e),
                    "type": "prediction_error"
                })
                return

            # Success response
            self.send_json_response(200, {
                "risk_score": risk_score,
                "features_processed": len(required_features),
                "features_selected": sum(feature_vector),
                "status": "success"
            })

        except Exception as e:
            # Catch-all error handler
            error_details = {
                "error": "Unexpected server error",
                "details": str(e),
                "traceback": traceback.format_exc(),
                "type": "server_error"
            }
            
            try:
                self.send_json_response(500, error_details)
            except:
                # If even sending the error response fails
                print(f"Critical error: {error_details}")

    def log_message(self, format, *args):
        """Override to control logging"""
        print(f"API Request: {format % args}")
