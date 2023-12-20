import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_6wnbGogRx",
  ClientId: "jqa5scj38l9s4jl8c9f9p3amt",
};

export default new CognitoUserPool(poolData);
