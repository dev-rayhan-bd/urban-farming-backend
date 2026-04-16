import { Request, Response, NextFunction } from "express";

const apiBenchmark = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const timeInMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3);

    console.log(`[BENCHMARK] ${req.method} ${req.originalUrl} - ${timeInMs}ms`);

    res.setHeader("X-Response-Time", `${timeInMs}ms`);
  });

  next();
};

export default apiBenchmark;
