// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: { port: 3000 },
//   define: {
//     "import.meta.env.VITE_TOKEN": JSON.stringify(env.VITE_TOKEN)
//   }
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: { port: 3000 },
    define: {
      "import.meta.env.VITE_TOKEN": JSON.stringify(env.VITE_TOKEN) //Expose VITE_TOKEN specifically
    }
  };
});
