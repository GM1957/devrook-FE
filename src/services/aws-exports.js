const appConfig =
  process.env.NODE_ENV === "production"
    ? {
        aws_amplify_config: {
          identityPoolId: "ap-south-1:c536d043-9252-4973-9f30-a7d0848051f3",
          region: "ap-south-1",
          identityPoolRegion: "ap-south-1",
          userPoolId: "ap-south-1_1ZJno4tS0",
          userPoolWebClientId: "3gnupc2e0kferqfc75ktsi9iso",
          mandatorySignIn: false,
          authenticationFlowType: "USER_PASSWORD_AUTH",
          oauth: {
            domain: "prod-devrook-be.auth.ap-south-1.amazoncognito.com",
            scope: [
              "phone",
              "email",
              "profile",
              "openid",
              "aws.cognito.signin.user.admin",
            ],
            redirectSignIn: "https://gm1957.github.io/devrook-FE",
            redirectSignOut: "https://gm1957.github.io/devrook-FE",
            responseType: "code",
          },
        },
      }
    : {
        aws_amplify_config: {
          // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
          identityPoolId: "us-west-2:8e67dffe-91e6-4afd-9c39-1f16aef5341c",

          // REQUIRED - Amazon Cognito Region
          region: "us-west-2",

          // OPTIONAL - Amazon Cognito Federated Identity Pool Region
          // Required only if it's different from Amazon Cognito Region
          identityPoolRegion: "us-west-2",

          // OPTIONAL - Amazon Cognito User Pool ID
          userPoolId: "us-west-2_ZAwqBki1X",

          // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
          userPoolWebClientId: "20k2nme3ej8ujetc07k15gjip6",

          // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
          mandatorySignIn: false,

          authenticationFlowType: "USER_PASSWORD_AUTH",

          // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
          clientMetadata: { myCustomKey: "myCustomValue" },

          // OPTIONAL - Hosted UI configuration
          oauth: {
            domain: "dev-devrook-be.auth.us-west-2.amazoncognito.com",
            scope: [
              "phone",
              "email",
              "profile",
              "openid",
              "aws.cognito.signin.user.admin",
            ],
            redirectSignIn: "http://localhost:3000",
            redirectSignOut: "http://localhost:3000",
            responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
          },
        },
      };

// You can get the current config object
export default appConfig;
