// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
const awsConfig = {
	aws_app_analytics: "enable",
	aws_cloud_logic: "enable",
	aws_appsync_graphqlEndpoint:
		// 'https://z5rerx23hbaynm55bmwki7jmjy.appsync-api.us-west-2.amazonaws.com/graphql',
		"https://guu5lf5ffffplfduaeexjp2c24.appsync-api.us-west-2.amazonaws.com/graphql",
	aws_appsync_region: "us-west-2",
	aws_appsync_authenticationType: "AWS_IAM",
	aws_cloud_logic_custom: [
		{
			name: "dev-sock-box-manager",
			endpoint: "https://devapi.siren9.com/box",
			region: "us-west-2",
			paths: ["/boxes/register"],
		},
		{
			name: "dev-sock-manager",
			endpoint: "https://devapi.siren9.com/sock",
			region: "us-west-2",
			paths: ["/getRegisteredSocks"],
		},
		{
			name: "dev-batch-to-kinesis",
			endpoint: "https://devapi.siren9.com/data",
			region: "us-west-2",
			paths: ["sockBatchZipData"],
		},
		{
			name: "dev-iot-register-api",
			endpoint: "https://devapi.siren9.com/iot",
			region: "us-west-2",
			paths: [
				"/users",
				"/users/me",
				"/users/registerHub",
				"/users/live",
				"/users/upgradeSock",
			],
		},
	],
	aws_cognito_identity_pool_id:
		"us-west-2:a03df0d4-22a0-4645-b328-4ec443a28f90",
	aws_cognito_region: "us-west-2",
	aws_mandatory_sign_in: true,
	// aws_mobile_analytics_app_id: 'a36f34e1a15d47bebcc1dd8ed9a57deb',
	// aws_mobile_analytics_app_region: 'us-east-1',
	aws_project_id: "4e64c4cd-4436-4715-abc8-f0c379d9efd9",
	aws_project_name: "SirenAmplifyDev",
	aws_project_region: "us-west-2",
	aws_push_apns: "enable",
	aws_push_pinpoint: "enable",
	aws_resource_name_prefix: "sirenamplifydev-mobilehub-447160950",
	aws_sign_in_enabled: "enable",
	aws_user_files: "enable",
	aws_user_files_s3_bucket: "sirenamplifydev-userfiles-mobilehub-447160950",
	aws_user_files_s3_bucket_region: "us-west-2",
	aws_user_pools: "enable",
	aws_user_pools_id: "us-west-2_S11hEqrpc",
	aws_user_pools_mfa_type: "OPTIONAL",
	aws_user_pools_web_client_id: "760ila829pdo23f11kelb1c5q4",
};

export default awsConfig;
