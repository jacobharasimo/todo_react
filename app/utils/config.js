const Config = {
  contentful: {
    messages: {
      space: '',
      accessToken: '',
      environment: '',
    },
  },
  baseApi: 'https://koru-todo-app-api.herokuapp.com'
};
if (typeof window !== 'undefined' && window.config) {
  Object.assign(Config, window.config);
}
export { Config };
