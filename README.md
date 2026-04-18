#  TUparkingLocation

เว็บแอปพลิเคชันสมัยใหม่ที่ตอบสนองรวดเร็ว (Responsive) สำหรับค้นหาที่จอดรถว่างภายในมหาวิทยาลัยธรรมศาสตร์

ระบบนี้ถูกพัฒนาโดยใช้สถาปัตยกรรมแบบ **Decoupled Architecture (แยกส่วน Frontend/Backend)** โดยมี Backend เป็น Python (Flask) แบบ RESTful API และ Frontend เป็น TypeScript (React + Vite)

---

## System Architecture

โปรเจกต์นี้แยกส่วนระหว่าง UI (Frontend) และ Logic/Data (Backend) อย่างชัดเจน

```mermaid
graph TD
    subgraph Frontend [TypeScript / React]
        UI[Vite React App]
        Router[React Router]
        Tailwind[Tailwind CSS]
        
        UI --> Router
        UI --> Tailwind
    end

    subgraph Backend [Python / Flask]
        API[Flask API Routes]
        Service[Business Logic Services]
        Model[SQLAlchemy Models]
        DB[(SQLite Database)]

        API --> Service
        Service --> Model
        Model --> DB
    end

    Frontend -- "HTTP GET (JSON)" --> API

```

### 📁 Project Structure

```text
TUparkingLocation/
├── app/                  # Backend (Python Flask)
│   ├── routes/           # Controller: จัดการ API request
│   ├── services/         # Business Logic: query DB และจัดรูปแบบข้อมูล
│   ├── models/           # Data Models: โครงสร้างข้อมูล (SQLAlchemy)
│   └── __init__.py       # Factory: ตั้งค่า Flask และ seed ข้อมูล
├── frontend/             # Frontend (TypeScript React + Vite)
│   ├── src/pages/        # หน้า React (List และ Detail)
│   └── src/index.css     # Tailwind สำหรับ styling ทั้งระบบ
├── tu_parking.db         # ไฟล์ฐานข้อมูล SQLite
├── requirements.txt      # dependencies ของ Python
└── run.py                # จุดเริ่มต้นรัน backend
```

---

## 🚀 Getting Started

เนื่องจากเป็นสถาปัตยกรรมแบบแยกส่วน (Decoupled) จำเป็นต้องรันทั้ง Backend และ Frontend พร้อมกัน.

### 1. รัน Python Backend (API)

เปิด Terminal แรกและรัน Flask application:

```powershell
pip install -r requirements.txt
python run.py
```
*Backend API จะรันที่ `http://127.0.0.1:5000`*

### 2. รัน React Frontend (UI)

เปิด Terminal ที่สอง ไปที่โฟลเดอร์ frontend และรัน Vite dev server:

```powershell
cd frontend
npm install
npm run dev
```
*Frontend จะรันที่ `http://localhost:5173`*

จากนั้นเปิด `http://localhost:5173` ในเบราว์เซอร์เพื่อใช้งานระบบ
---

## 🛠️ How to Extend

- **เพิ่ม Machine Learning**: แก้ไขไฟล์ `app/services/parking_service.py` เพื่อดักจับการ query ฐานข้อมูลและใช้โมเดลการทำนาย.
- **Real-Time Data**: Integrate `Flask-SocketIO` เพื่อสตรีมการเปลี่ยนแปลงสถานะช่องจอดไปยัง React frontend แบบเรียลไทม์
- **Production Deployment**: 
  - Backend: รัน Flask โดยใช้ WSGI server เช่น `Gunicorn` และเปลี่ยน SQLite เป็น PostgreSQL.
  - Frontend: Build the static bundle (`npm run build`) และ deploy ผ่าน Nginx.