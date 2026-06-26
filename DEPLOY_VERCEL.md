# Vercel Deploy Checklist

Frontend ของโปรเจกต์นี้ deploy บน Vercel ส่วน backend deploy บน Render

## Build settings

Vercel จะอ่านค่าจาก `package.json` และ `vercel.json` ได้เลย:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Environment Variables

ต้องตั้งใน Vercel:

```env
VITE_BACKEND_URL=https://<backend-service>.onrender.com
```

ใช้ URL จริงของ backend บน Render และไม่ต้องใส่ `/` ท้าย URL

ตัวอย่าง:

```env
VITE_BACKEND_URL=https://report-service-react-backend.onrender.com
```

หลังแก้ Environment Variables ใน Vercel ต้อง Redeploy ใหม่ 1 รอบ

## Routing

ไฟล์ `vercel.json` มี rewrite ไป `/index.html` แล้ว จึงรองรับหน้าเว็บ React/Hash route เช่น `/#admin`
