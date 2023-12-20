import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_4j5lb4aaM",
  ClientId: "571nlvpcmj9bduce83ld8vss9d",
};

export default new CognitoUserPool(poolData);
