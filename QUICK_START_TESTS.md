# ⚡ TU Parking System - Quick Start Testing Guide

**ตรวจสอบระบบอย่างรวดเร็วใน 5 นาที**

---

## 🚀 Quick Test (5 Minutes)

### Step 1: ตรวจสอบระบบ (1 นาที)

```bash
# จากโฟลเดอร์โปรเจกต์หลัก
python system_check.py
```

**ต้องเห็น:** ✅ เครื่องหมายถูกทั้งหมด

---

### Step 2: เปิด Backend (2 นาที)

```bash
# Terminal 1 - เปิด Backend
python run.py
```

**ต้องเห็น:**
```
 * Running on http://0.0.0.0:5000
```

---

### Step 3: เปิด Frontend (1 นาที)

```bash
# Terminal 2 - เปิด Frontend
cd frontend
npm run dev
```

**ต้องเห็น:**
```
➜  Local:   http://localhost:5173/
```

---

### Step 4: ตรวจสอบหน้า Web (1 นาที)

```
เปิด browser ไปที่ http://localhost:5173/
```

**ต้องเห็น:**
- ✅ แผนที่แสดง
- ✅ รายชื่อที่จอดรถ 5 ที่
- ✅ ไม่มี Error ใน Console (F12)

---

## 🧪 Full System Testing (15 Minutes)

### Setup

```bash
# Terminal 1 - Backend
python run.py

# Terminal 2 - Frontend  
cd frontend
npm run dev

# Terminal 3 - Testing
```

### Test 1: API Integration (3 นาที)

```bash
python test_integration.py
```

**ต้องเห็น:**
```
✅ PASSED (4)
   • Backend alive
   • Get all areas
   • Get specific area (1)
   • Get slots
   • Data consistency

✅ ALL TESTS PASSED!
```

---

### Test 2: ML System (5 นาที)

```bash
python test_ml_system.py
```

**ต้องเห็น:**
```
✅ PASSED (9)
   • ML models import
   • MLManager import
   • DataPreparer import
   • ParkingPredictionService import
   • Database operations
   • Data preparation
   • Predictions
   • Training history
   • Prediction service

✅ ALL ML SYSTEM TESTS PASSED!
```

---

### Test 3: Manual API Testing (7 นาที)

#### Using PowerShell:

```powershell
# 1. Get all parking areas
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/parking/areas"
$response.Content | ConvertFrom-Json | ConvertTo-Json

# 2. Get specific area
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/parking/areas/1"
$response.Content | ConvertFrom-Json | ConvertTo-Json

# 3. Get slots
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/parking/areas/1/slots"
$response.Content | ConvertFrom-Json | ConvertTo-Json
```

**ต้องเห็น:**
- ✅ Status 200 (OK)
- ✅ JSON data ที่สมบูรณ์
- ✅ ข้อมูล 5 ที่จอดรถ

---

## ✅ Verification Checklist

Mark each as you verify:

### Backend
- [ ] `python system_check.py` ✅
- [ ] `python run.py` starts on port 5000
- [ ] Database created (instance/tu_parking.db)
- [ ] API responds to requests

### Frontend
- [ ] `npm run dev` starts on port 5173
- [ ] Page loads in browser
- [ ] Map displays
- [ ] 5 parking areas visible
- [ ] No console errors

### API
- [ ] GET /api/parking/areas → 200 OK
- [ ] GET /api/parking/areas/1 → 200 OK
- [ ] GET /api/parking/areas/1/slots → 200 OK
- [ ] All endpoints return valid JSON

### Integration
- [ ] `python test_integration.py` → All passed
- [ ] Frontend can load parking data
- [ ] Map shows all locations

### ML System
- [ ] `python test_ml_system.py` → All passed
- [ ] ML models can be added to database
- [ ] Predictions can be made
- [ ] Training history tracked

---

## 🔧 Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is used
netstat -ano | findstr :5000

# Kill process using port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port in run.py
```

### Frontend won't start

```bash
cd frontend

# Clean install
rm -r node_modules package-lock.json
npm install

# Try again
npm run dev
```

### API returns 404

```bash
# Verify backend is running
curl http://localhost:5000/api/parking/areas

# Check routes are registered in app/__init__.py
```

### ML tests fail

```bash
# Verify ML folder exists
ls -la ml/

# Verify imports
python -c "from app.models.ml_models import MLModel"
```

---

## 📊 Expected Results Summary

| Component | Status | Port | Command |
|-----------|--------|------|---------|
| Backend API | ✅ Running | 5000 | `python run.py` |
| Frontend Dev | ✅ Running | 5173 | `npm run dev` (frontend/) |
| Database | ✅ Created | - | Auto-created |
| Parking Areas | ✅ 5 areas | - | Seeded |
| API Endpoints | ✅ 3+ working | 5000 | Verified |
| ML System | ✅ Functional | - | `test_ml_system.py` |

---

## 🎯 Next Steps

After all tests pass:

1. **Deploy Frontend** → Build for production
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy Backend** → Use Docker or server
   ```bash
   docker-compose -f docker-compose.prod.yml up
   ```

3. **Add Real ML Models** → Replace mock predictions
   ```bash
   ml/services/parking_prediction_service.py
   ```

4. **Integrate with Real Data** → Connect to actual sensors/camera

---

## 📞 Support

If tests fail:
1. Read error message carefully
2. Check the full TESTING_GUIDE.md
3. Review relevant source files
4. Look at database (instance/tu_parking.db)

---

**Last Updated:** April 25, 2026  
**Version:** 1.0.0  
**Status:** ✅ Ready for Testing
