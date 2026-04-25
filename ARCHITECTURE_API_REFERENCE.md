# 📐 TU Parking System - Architecture & API Reference

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Port 5173)                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  React + TypeScript + Vite                                │  │
│  │  - ParkingList.tsx      (List view)                        │  │
│  │  - ParkingDetail.tsx    (Detail view)                      │  │
│  │  - Map Component        (Leaflet)                          │  │
│  │  - Router              (React Router)                      │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────┬────────────────────────────────────────┘
                           │ HTTP/REST
                           │ (http://localhost:5000/api)
┌──────────────────────────┴────────────────────────────────────────┐
│                    BACKEND API (Port 5000)                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Flask + Python + SQLAlchemy                              │  │
│  │                                                            │  │
│  │  Routes (app/routes/)                                     │  │
│  │  ├── GET  /api/parking/areas          (All areas)         │  │
│  │  ├── GET  /api/parking/areas/<id>     (Specific area)    │  │
│  │  └── GET  /api/parking/areas/<id>/slots (Slots)         │  │
│  │                                                            │  │
│  │  Services (app/services/)                                 │  │
│  │  ├── ParkingManager          (Business logic)            │  │
│  │  ├── MLManager               (ML operations)             │  │
│  │  └── ParkingPredictionService (Predictions)             │  │
│  │                                                            │  │
│  │  Models (app/models/)                                     │  │
│  │  ├── ParkingArea  (Parking location)                     │  │
│  │  ├── ParkingSlot  (Individual spot)                      │  │
│  │  ├── MLModel      (Model metadata)                       │  │
│  │  ├── Prediction   (Prediction result)                    │  │
│  │  └── TrainingHistory (Training log)                      │  │
│  │                                                            │  │
│  │  ML Module (ml/)                                          │  │
│  │  ├── services/                                            │  │
│  │  │   └── parking_prediction_service.py                   │  │
│  │  └── utils/                                              │  │
│  │      └── data_preparer.py                                │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────┬────────────────────────────────────────┘
                           │ SQLAlchemy ORM
┌──────────────────────────┴────────────────────────────────────────┐
│                 DATABASE (SQLite)                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  instance/tu_parking.db                                   │  │
│  │                                                            │  │
│  │  Tables:                                                  │  │
│  │  ├── parking_areas                                        │  │
│  │  ├── parking_slots                                        │  │
│  │  ├── ml_models                                            │  │
│  │  ├── predictions                                          │  │
│  │  └── training_history                                     │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## API Reference

### 1. Get All Parking Areas

**Endpoint:**
```
GET /api/parking/areas
```

**Description:** ดึงข้อมูลพื้นที่จอดรถทั้งหมด

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "GYM 7",
    "address": "Tambon Khlong Nueng, Amphoe Khlong Luang, Pathum Thani 12120",
    "latitude": 14.0754,
    "longitude": 100.6041,
    "total_slots": 60,
    "available_slots": 22,
    "unavailable_slots": 38
  },
  {
    "id": 2,
    "name": "Parking 1",
    "address": "99 Moo 18 Paholyothin Road, Khlong Nueng",
    "latitude": 14.0700,
    "longitude": 100.6000,
    "total_slots": 120,
    "available_slots": 8,
    "unavailable_slots": 112
  }
  // ... more areas
]
```

**Example Usage:**
```bash
# cURL
curl http://localhost:5000/api/parking/areas

# PowerShell
Invoke-WebRequest -Uri "http://localhost:5000/api/parking/areas" | ConvertFrom-Json

# JavaScript/Fetch
fetch('http://localhost:5000/api/parking/areas')
  .then(res => res.json())
  .then(data => console.log(data))
```

---

### 2. Get Specific Parking Area

**Endpoint:**
```
GET /api/parking/areas/{id}
```

**Parameters:**
- `id` (path): Parking area ID

**Description:** ดึงข้อมูลพื้นที่จอดรถเฉพาะ

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "GYM 7",
  "address": "Tambon Khlong Nueng, Amphoe Khlong Luang, Pathum Thani 12120",
  "latitude": 14.0754,
  "longitude": 100.6041,
  "total_slots": 60,
  "available_slots": 22,
  "unavailable_slots": 38
}
```

**Error Cases:**
- `404 Not Found` - Area doesn't exist

**Example Usage:**
```bash
# Get area ID 1
curl http://localhost:5000/api/parking/areas/1

# JavaScript
fetch('http://localhost:5000/api/parking/areas/1')
  .then(res => res.json())
  .then(area => console.log(area))
```

---

### 3. Get Parking Slots for Area

**Endpoint:**
```
GET /api/parking/areas/{id}/slots
```

**Parameters:**
- `id` (path): Parking area ID

**Description:** ดึงข้อมูลช่องจอดรถทั้งหมดในพื้นที่

**Response:** `200 OK`
```json
[
  {
    "name": "A1",
    "status": "available"
  },
  {
    "name": "A2",
    "status": "occupied"
  },
  {
    "name": "A3",
    "status": "available"
  },
  {
    "name": "A4",
    "status": "maintenance"
  }
  // ... more slots
]
```

**Status Values:**
- `available` - ช่องว่าง
- `occupied` - มีรถจอด
- `maintenance` - ซ่อมแซม

**Error Cases:**
- `404 Not Found` - Area doesn't exist

**Example Usage:**
```bash
# Get all slots in area 1
curl http://localhost:5000/api/parking/areas/1/slots

# JavaScript
fetch('http://localhost:5000/api/parking/areas/1/slots')
  .then(res => res.json())
  .then(slots => {
    const available = slots.filter(s => s.status === 'available')
    console.log(`${available.length} slots available`)
  })
```

---

## Database Schema

### Table: parking_areas
```sql
CREATE TABLE parking_areas (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    total_slots INTEGER NOT NULL,
    available_slots INTEGER NOT NULL
)
```

**Fields:**
- `id` - Area ID
- `name` - Area name
- `address` - Physical address
- `latitude`, `longitude` - GPS coordinates
- `total_slots` - Total parking slots
- `available_slots` - Currently available slots

---

### Table: parking_slots
```sql
CREATE TABLE parking_slots (
    id INTEGER PRIMARY KEY,
    area_id INTEGER NOT NULL,
    name VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    updated_at DATETIME
)
```

**Fields:**
- `id` - Slot ID
- `area_id` - Parent area ID (foreign key)
- `name` - Slot name (e.g., A1, B2)
- `status` - available, occupied, or maintenance
- `updated_at` - Last update timestamp

---

### Table: ml_models
```sql
CREATE TABLE ml_models (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    model_type VARCHAR(50) NOT NULL,
    version VARCHAR(20) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    accuracy FLOAT,
    precision FLOAT,
    recall FLOAT,
    f1_score FLOAT,
    created_at DATETIME,
    updated_at DATETIME,
    is_active BOOLEAN DEFAULT FALSE,
    description TEXT
)
```

**Fields:**
- `id` - Model ID
- `name` - Unique model name
- `model_type` - Type (RandomForest, Neural Network, etc)
- `version` - Version string
- `file_path` - Path to saved model artifact
- `accuracy`, `precision`, `recall`, `f1_score` - Performance metrics
- `is_active` - Current production model
- `created_at`, `updated_at` - Timestamps

---

### Table: predictions
```sql
CREATE TABLE predictions (
    id INTEGER PRIMARY KEY,
    model_id INTEGER NOT NULL,
    parking_area_id INTEGER NOT NULL,
    prediction_value VARCHAR(50) NOT NULL,
    confidence_score FLOAT NOT NULL,
    predicted_available_slots INTEGER,
    input_features TEXT,
    created_at DATETIME,
    is_accurate BOOLEAN
)
```

**Fields:**
- `id` - Prediction ID
- `model_id` - Foreign key to ml_models
- `parking_area_id` - Foreign key to parking_areas
- `prediction_value` - Prediction (likely_full, moderate, available)
- `confidence_score` - 0.0 to 1.0
- `predicted_available_slots` - Expected available slots
- `input_features` - JSON string of input features
- `is_accurate` - Validation flag

---

### Table: training_history
```sql
CREATE TABLE training_history (
    id INTEGER PRIMARY KEY,
    model_id INTEGER NOT NULL,
    training_start_time DATETIME,
    training_end_time DATETIME,
    training_duration_seconds FLOAT,
    training_samples_count INTEGER,
    training_accuracy FLOAT,
    validation_accuracy FLOAT,
    training_loss FLOAT,
    validation_loss FLOAT,
    status VARCHAR(20),
    error_message TEXT,
    notes TEXT
)
```

**Fields:**
- `id` - Training session ID
- `model_id` - Foreign key to ml_models
- `training_start_time`, `training_end_time` - Duration
- `training_samples_count` - Number of samples used
- `training_accuracy`, `validation_accuracy` - Accuracy metrics
- `training_loss`, `validation_loss` - Loss metrics
- `status` - in_progress, completed, or failed
- `error_message` - Error details if failed
- `notes` - Training notes/hyperparameters

---

## Component Interactions

### Request Flow: Get Parking Areas

```
Browser Request
    ↓
Frontend (React)
    ↓ Fetch HTTP GET
Backend Route Handler
    ↓ app/routes/parking_routes.py
Business Logic Layer
    ↓ app/services/parking_service.py
    ↓ ParkingManager class
Database Queries
    ↓ SQLAlchemy ORM
Database (SQLite)
    ↓ SELECT query
Database Tables
    ↓
Backend Response
    ↓ JSON
Frontend Component
    ↓ Update state
Browser Display
    ↓
User sees parking list
```

---

### ML Prediction Flow

```
User requests prediction
    ↓
ParkingPredictionService.make_prediction()
    ↓
DataPreparer.get_parking_area_features()
    ↓ Extract from database
Get occupancy rate, slot info
    ↓
Load active ML model
    ↓ MLManager.get_active_model()
    ↓ from ml/models/
Run prediction
    ↓
MLManager.add_prediction()
    ↓ Store in database
Save to predictions table
    ↓
Return prediction to user
    ↓
[Prediction Value, Confidence Score]
```

---

## File Structure with Functions

```
CS242_TUParkingLocation/
├── app/
│   ├── __init__.py
│   │   └── create_app()           # Flask app factory
│   │   └── seed_mock_data()       # Seed initial data
│   ├── extensions.py
│   │   └── db                     # SQLAlchemy instance
│   ├── models/
│   │   ├── parking.py
│   │   │   ├── ParkingArea
│   │   │   │   ├── is_full()
│   │   │   │   └── available_slots()
│   │   │   └── ParkingSlot
│   │   │       ├── is_available()
│   │   │       └── update_status()
│   │   └── ml_models.py
│   │       ├── MLModel
│   │       ├── Prediction
│   │       └── TrainingHistory
│   ├── routes/
│   │   └── parking_routes.py
│   │       ├── @get("/areas")
│   │       ├── @get("/areas/<id>")
│   │       └── @get("/areas/<id>/slots")
│   └── services/
│       ├── parking_service.py
│       │   └── ParkingManager
│       │       ├── get_all_parking_areas()
│       │       ├── get_parking_area_by_id()
│       │       ├── get_parking_slots()
│       │       └── (CRUD operations)
│       └── ml_manager.py
│           └── MLManager
│               ├── add_ml_model()
│               ├── get_active_model()
│               ├── add_prediction()
│               ├── start_training_session()
│               └── (ML operations)
├── ml/
│   ├── services/
│   │   └── parking_prediction_service.py
│   │       └── ParkingPredictionService
│   │           ├── make_prediction()
│   │           ├── predict_all_areas()
│   │           └── get_prediction_history()
│   └── utils/
│       └── data_preparer.py
│           └── DataPreparer
│               ├── get_parking_area_features()
│               ├── prepare_training_data()
│               └── normalize_features()
├── frontend/
│   ├── src/
│   │   ├── main.tsx              # Entry point
│   │   ├── App.tsx               # Main component
│   │   └── pages/
│   │       ├── ParkingList.tsx    # List view
│   │       └── ParkingDetail.tsx  # Detail view
│   └── package.json              # Dependencies
├── run.py                         # Flask entry point
├── requirements.txt               # Python dependencies
├── system_check.py                # System health check
├── test_integration.py            # Integration tests
├── test_ml_system.py              # ML system tests
├── TESTING_GUIDE.md               # Full testing guide
└── QUICK_START_TESTS.md           # Quick start guide
```

---

## Technology Stack

### Backend
- **Framework:** Flask 3.1.0
- **Database ORM:** SQLAlchemy 3.1.1
- **Database:** SQLite
- **CORS:** Flask-CORS 5.0.0
- **Language:** Python 3.8+

### Frontend
- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router 7
- **Maps:** Leaflet + React-Leaflet
- **Styling:** Tailwind CSS

### ML (Optional)
- **scikit-learn** - ML models
- **pandas** - Data manipulation
- **numpy** - Numerical operations

---

## Performance Characteristics

| Operation | Time | Complexity |
|-----------|------|-----------|
| Get all areas | <10ms | O(n) |
| Get area details | <5ms | O(1) |
| Get slots | <10ms | O(n) |
| Make prediction | <50ms | O(m) |
| Add to database | <5ms | O(1) |

*Note: Times are approximate and depend on data size and system resources*

---

## Security Considerations

1. **CORS Enabled** - Frontend can access backend API
2. **Input Validation** - Should validate API inputs
3. **Database** - SQLite (file-based, local only)
4. **No Authentication** - Add if needed for production
5. **Error Handling** - Graceful error responses

---

## Scalability Notes

### Current Limitations
- SQLite (single-file database)
- No connection pooling
- No caching layer
- Synchronous processing

### For Production Deployment
1. **Use PostgreSQL/MySQL** instead of SQLite
2. **Add Redis** for caching
3. **Implement authentication** (JWT/OAuth)
4. **Add rate limiting** for API
5. **Use async workers** (Celery)
6. **Containerize** (Docker)
7. **Add monitoring/logging**

---

**Last Updated:** April 25, 2026  
**Version:** 1.0.0
