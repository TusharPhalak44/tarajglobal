// vite.config.js
import { defineConfig } from "file:///C:/Users/HP/Desktop/TGS/Taraj_Globall/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/HP/Desktop/TGS/Taraj_Globall/client/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\HP\\Desktop\\TGS\\Taraj_Globall\\client";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
      "@layouts": path.resolve(__vite_injected_original_dirname, "./src/layouts"),
      "@api": path.resolve(__vite_injected_original_dirname, "./src/api"),
      "@routes": path.resolve(__vite_injected_original_dirname, "./src/routes"),
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
      "@utils": path.resolve(__vite_injected_original_dirname, "./src/utils"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@context": path.resolve(__vite_injected_original_dirname, "./src/context"),
      "@config": path.resolve(__vite_injected_original_dirname, "./src/config"),
      "@constants": path.resolve(__vite_injected_original_dirname, "./src/constants"),
      "@services": path.resolve(__vite_injected_original_dirname, "./src/services"),
      "@store": path.resolve(__vite_injected_original_dirname, "./src/store"),
      "@styles": path.resolve(__vite_injected_original_dirname, "./src/styles"),
      "@seo": path.resolve(__vite_injected_original_dirname, "./src/seo")
    }
  },
  server: {
    host: true,
    port: 3e3,
    strictPort: false,
    // allow fallback to 3001, 3002 etc. if 3000 is taken
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.error("[proxy error]", err.message);
          });
        }
      },
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxIUFxcXFxEZXNrdG9wXFxcXFRHU1xcXFxUYXJhal9HbG9iYWxsXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcRGVza3RvcFxcXFxUR1NcXFxcVGFyYWpfR2xvYmFsbFxcXFxjbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0hQL0Rlc2t0b3AvVEdTL1RhcmFqX0dsb2JhbGwvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6KHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgICdAY29tcG9uZW50cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzJyksXG4gICAgICAnQHBhZ2VzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3BhZ2VzJyksXG4gICAgICAnQGxheW91dHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvbGF5b3V0cycpLFxuICAgICAgJ0BhcGknOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvYXBpJyksXG4gICAgICAnQHJvdXRlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9yb3V0ZXMnKSxcbiAgICAgICdAYXNzZXRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cycpLFxuICAgICAgJ0B1dGlscyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy91dGlscycpLFxuICAgICAgJ0Bob29rcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9ob29rcycpLFxuICAgICAgJ0Bjb250ZXh0JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbnRleHQnKSxcbiAgICAgICdAY29uZmlnJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbmZpZycpLFxuICAgICAgJ0Bjb25zdGFudHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvY29uc3RhbnRzJyksXG4gICAgICAnQHNlcnZpY2VzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3NlcnZpY2VzJyksXG4gICAgICAnQHN0b3JlJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3N0b3JlJyksXG4gICAgICAnQHN0eWxlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9zdHlsZXMnKSxcbiAgICAgICdAc2VvJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3NlbycpLFxuICAgIH0sXG4gIH0pLFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiB0cnVlLFxuICAgIHBvcnQ6IDMwMDAsXG4gICAgc3RyaWN0UG9ydDogZmFsc2UsICAgLy8gYWxsb3cgZmFsbGJhY2sgdG8gMzAwMSwgMzAwMiBldGMuIGlmIDMwMDAgaXMgdGFrZW5cbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJlOiAocHJveHkpID0+IHtcbiAgICAgICAgICBwcm94eS5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbcHJveHkgZXJyb3JdJywgZXJyLm1lc3NhZ2UpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAnL3VwbG9hZHMnOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9VLFNBQVMsb0JBQW9CO0FBQ2pXLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFGakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxlQUFlLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUN6RCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsWUFBWSxLQUFLLFFBQVEsa0NBQVcsZUFBZTtBQUFBLE1BQ25ELFFBQVEsS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUMzQyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDakQsV0FBVyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ2pELFVBQVUsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMvQyxVQUFVLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsWUFBWSxLQUFLLFFBQVEsa0NBQVcsZUFBZTtBQUFBLE1BQ25ELFdBQVcsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNqRCxjQUFjLEtBQUssUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxNQUN2RCxhQUFhLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUNyRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsV0FBVyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ2pELFFBQVEsS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxJQUM3QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQTtBQUFBLElBQ1osT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsV0FBVyxDQUFDLFVBQVU7QUFDcEIsZ0JBQU0sR0FBRyxTQUFTLENBQUMsUUFBUTtBQUN6QixvQkFBUSxNQUFNLGlCQUFpQixJQUFJLE9BQU87QUFBQSxVQUM1QyxDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNWLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
