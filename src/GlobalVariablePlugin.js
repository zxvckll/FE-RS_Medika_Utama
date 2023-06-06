export default {
    
  install: (app) => {
    const url = 'https://api.rawatjalan.site:8080';
    // const url = 'http://localhost:5000';
    app.config.globalProperties.$url = url;
  },
};