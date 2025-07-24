# 🧩 Identity Reconciliation API - Bitespeed Assignment

This project implements a backend service to reconcile contact identities based on email and phone number inputs. The core logic is exposed via a single `/identify` endpoint.


## 🚀 Live API Endpoint

> 🔗 https://bitespeedassignment-production-6fb5.up.railway.app/identify

(Note: Free hosting services may take a few seconds to wake up after inactivity.)_

## 📦 Tech Stack

- Node.js
- Express.js
- PostgreSQL (hosted on Railway)
- Deployed on Railway.app

## 🔍 API Endpoint: `/identify`

### 🔸 Method: `POST`
### 🔸 Content-Type: `application/json`

### ✅ Request Body:
```json
{
  "email": "john@example.com",
  "phoneNumber": "1234567890"
}
