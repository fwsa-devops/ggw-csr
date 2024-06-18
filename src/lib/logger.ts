/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable @typescript-eslint/no-unsafe-member-access
const logger = (() => {
  const checkIfLogsEnabled = () => {
    if (process.browser) {
      const search = global?.window?.location?.search;
      const enabled =
        search && new URLSearchParams(search).get("debug") === "true";

      (global as any).areLogsEnabled = enabled || false;

      return (global as any).areLogsEnabled;
    }

    return false;
  };
  
  const isDev = process.env.NODE_ENV === "development";

  const print = (type: any, ...messages: any[]) => {
    if (typeof (global as any).areLogsEnabled === "undefined") {
      checkIfLogsEnabled();
    }

    if ((global as any).areLogsEnabled || isDev) {
      let colorCode = "";
      const resetColorCode = "\x1b[0m"; // Reset color code
      let logType = "";

      switch (type) {
        case "info":
          colorCode = "\x1b[32m"; // Green color code
          logType = "INFO";
          break;
        case "warn":
          colorCode = "\x1b[33m"; // Yellow color code
          logType = "WARN";
          break;
        case "error":
          colorCode = "\x1b[31m"; // Red color code
          logType = "ERROR";
          break;
        case "trace":
          colorCode = "\x1b[36m"; // Cyan color code
          logType = "TRACE";
          break;
        case "debug":
        default:
          colorCode = "\x1b[34m"; // Blue color code
          logType = "DEBUG";
          break;
      }

    const datetime = new Date().toISOString();

      console.log(`\x1b[31m[${datetime}] ${colorCode}[${logType}]`, ...messages, resetColorCode);
    }
  };

  return {
    debug: print.bind(null, "debug"),
    info: print.bind(null, "info"),
    warn: print.bind(null, "warn"),
    error: print.bind(null, "error"),
    trace: print.bind(null, "trace"),
  };
})();

export default logger;
