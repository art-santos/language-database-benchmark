/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "express-sst-app",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MyVpc");
  
    const cluster = new sst.aws.Cluster("MyCluster", { vpc });

    const bucket = new sst.aws.Bucket("MyBucket", {
      public: true
    });
  
    cluster.addService("MyService", {
      public: {
        ports: [
          { listen: "80/http" },
        ],
      },
      link: [bucket],
    });
  }});
