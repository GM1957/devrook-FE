const appConfig =  {

    aws_amplify_config: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-west-2:8e67dffe-91e6-4afd-9c39-1f16aef5341c',

        // REQUIRED - Amazon Cognito Region
        region: 'us-west-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'us-west-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-west-2_ZAwqBki1X',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '20k2nme3ej8ujetc07k15gjip6',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        clientMetadata: { myCustomKey: 'myCustomValue' },

         // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: 'dev-prefixpostfix.auth.ap-southeast-1.amazoncognito.com',
            scope: ['phone', 'email', 'profile', 'zoneinfo', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'http://localhost:3000',
            redirectSignOut: 'http://localhost:3000',
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }
};

// You can get the current config object
export default appConfig 