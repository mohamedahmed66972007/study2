import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import FileStore from "session-file-store";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();

// ✅ إعداد التخزين للجلسات في ملفات بدل MemoryStore
const FileStoreSession = FileStore(session);

app.use(session({
  store: new FileStoreSession({
    path: path.resolve(__dirname, "../sessions"),
    retries: 0,
  }),
  secret: process.env.SESSION_SECRET || "my_super_secret_key_123", // 🔐 يفضل تغييره من Render env vars
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // خليها true لو عندك HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // يوم
  }
}));

// ✅ CORS
app.use((req, res, next) => {
  const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://study2.onrender.com']
    : ['http://localhost:5000'];

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Logging لكل API request
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

// ✅ Main async block
(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = 5000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
  });
})();
