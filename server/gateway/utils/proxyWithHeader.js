import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl) => {
  const customHeaders = {
    proxyReqOptDecorator: (proxyReqOpts, scrReq) => {
      if (scrReq.user) {
        proxyReqOpts.headers["x-user-id"] = scrReq.user.userId;
      }
    },
  };
  return proxy(serviceUrl, customHeaders);
};
