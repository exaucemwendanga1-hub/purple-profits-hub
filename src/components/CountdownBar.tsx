import { useState, useEffect } from "react";

const CountdownBar = () => {
  const [seconds, setSeconds] = useState(45 * 60);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="bg-secondary border-b border-border py-2.5 px-4">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <span className="font-semibold">⚡ Price increasing in: <span className="text-primary-light font-bold">{m}:{s}</span></span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sale animate-pulse-dot inline-block" />
          <span className="text-muted-foreground"><span className="text-foreground font-semibold">73</span> live viewers</span>
        </span>
      </div>
    </div>
  );
};

export default CountdownBar;
