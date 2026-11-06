"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  Headphones, 
  Radio, 
  Lock 
} from "lucide-react";

export default function CompoundAlgo() {
  const [activeTab, setActiveTab] = useState("Currencies");
  const [asset, setAsset] = useState("USD/ARS (OTC)");
  const [timeframe, setTimeframe] = useState("5 sec");
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [signal, setSignal] = useState("CALL");

  // Web Audio chime generator
  const playBeep = (freq = 880, type = "sine") => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (_) {}
  };

  const generateNewSignal = () => {
    if (analyzing) return;
    setAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          const nextSig = Math.random() > 0.5 ? "CALL" : "PUT";
          setSignal(nextSig);
          playBeep(nextSig === "CALL" ? 950 : 450, "triangle");
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  return (
    <main className="min-h-screen bg-[#07090e] text-white flex justify-center p-3 sm:p-4">
      <div className="w-full max-w-sm bg-[#0e131b] border border-[#1b2230] rounded-3xl p-4 flex flex-col justify-between shadow-2xl">
        
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-wider text-white">
                COMPOUND ALGO ⚡
              </span>
            </div>
            <span className="text-[11px] bg-[#1a2332] text-gray-400 px-2.5 py-0.5 rounded-full">
              mini app
            </span>
          </div>

          {/* Broker Status Banner */}
          <div className="mt-3 bg-[#131a26] border border-[#1f293d] rounded-2xl p-2.5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="text-emerald-400 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-200">BROKER VERIFICATION</p>
                <p className="text-[10px] text-gray-400">Broker account connected & verified</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 inline mr-1" />
              AUTHORIZED
            </span>
          </div>

          {/* Asset Category Tabs */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {["Currencies", "Crypto", "Commodities"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-1.5 text-xs font-medium rounded-xl transition ${
                  activeTab === tab
                    ? "bg-[#2563eb] text-white shadow-lg shadow-blue-500/20"
                    : "bg-[#161c28] text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Selected Pair & Timeframe */}
          <div className="flex justify-between items-center mt-3 bg-[#131a26] px-3 py-2 rounded-xl border border-gray-800">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-medium text-gray-200">{asset}</span>
            </div>
            <span className="text-xs text-gray-400 bg-[#1c2436] px-2 py-0.5 rounded-md">
              {timeframe}
            </span>
          </div>

          {/* Signal Card or Loading Circle */}
          <div className="mt-6 flex flex-col items-center justify-center min-h-[220px]">
            {analyzing ? (
              <div className="flex flex-col items-center">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      stroke="#1e293b"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      stroke="#38bdf8"
                      strokeWidth="8"
                      strokeDasharray="301.6"
                      strokeDashoffset={301.6 - (301.6 * progress) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-150"
                    />
                  </svg>
                  <span className="absolute text-xl font-bold">{progress}%</span>
                </div>
                <p className="mt-3 text-xs text-gray-400 animate-pulse">
                  Analyzing indicators & order flow...
                </p>
              </div>
            ) : (
              <div
                className={`w-full py-7 rounded-2xl flex flex-col items-center justify-center shadow-lg transition-all ${
                  signal === "CALL"
                    ? "bg-gradient-to-b from-[#00c853]/25 to-[#00c853]/5 border border-[#00c853]/40"
                    : "bg-gradient-to-b from-[#ff1744]/25 to-[#ff1744]/5 border border-[#ff1744]/40"
                }`}
              >
                <span
                  className={`text-4xl font-extrabold tracking-widest ${
                    signal === "CALL" ? "text-[#00e676]" : "text-[#ff5252]"
                  }`}
                >
                  {signal}
                </span>
                <span className="text-xs mt-2 text-gray-300 font-medium">
                  Your signal is {signal === "CALL" ? "UP" : "DOWN"}
                </span>
              </div>
            )}
          </div>

          {/* Indicators Info */}
          <div className="flex justify-between items-center text-[10px] text-gray-400 mt-4 px-2">
            <span>• Relative Strength Index</span>
            <span>• Money Flow Index</span>
            <span className="text-emerald-400 font-medium">• 98% Accuracy</span>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateNewSignal}
            disabled={analyzing}
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-3 rounded-2xl font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${analyzing ? "animate-spin" : ""}`} />
            <span>Generate New Signal</span>
          </button>
        </div>

        {/* Bottom Nav */}
        <div className="grid grid-cols-2 gap-2 pt-4 mt-4 border-t border-gray-800/80">
          <button className="flex flex-col items-center text-blue-400">
            <Radio className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">Signals</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-white">
            <Headphones className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-medium">Support</span>
          </button>
        </div>

      </div>
    </main>
  );
}
