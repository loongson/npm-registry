#!/usr/bin/env bash
#
## Export all environment variables used in deployment and activate gcloud
## service account

opskit_path="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd -P)"
source ${opskit_path}/lib/common.sh

## Check if vault command exists
if ! command_exists "vault"; then
        log_e 'vault Command Not Found'; exit 1
fi

## Check if jq command exists
if ! command_exists "jq"; then
        log_e 'jq Command Not Found'; exit 1
fi

deployment_name=${CI_BUILD_ENVIRONMENT}

## Login to vault server
export VAULT_TOKEN=$(vault write -field=token auth/approle/login \
        role_id=${ROLE_ID})

## Read deployment context
context=$(vault read -format json \
        secret/io-arisan-${CI_PROJECT_NAMESPACE}/${deployment_name}/context \
        | jq '.data')

## Load deployment variables
export ATLAS_TOKEN=$(echo ${context} | jq -r '.atlas_token')
export BUCKET_NAME=$(echo ${context} | jq -r '.bucket_name')
export CLIO_HEARTBEAT_INTERVAL=$(echo ${context} | jq -r '.clio_heartbeat_interval')
export CLIO_LOG_LEVEL=$(echo ${context} | jq -r '.clio_log_level')
export CLIO_LOGGLY_SUBDOMAIN=$(echo ${context} | jq -r '.clio_loggly_subdomain')
export CLIO_LOGGLY_TOKEN=$(echo ${context} | jq -r '.clio_loggly_token')
raw_oplog_url=$(echo ${context} | jq -r '.mongo_oplog_url')
escaped_oplog_url=$(printf '%s\n' "${raw_oplog_url}" | sed 's:[\/&]:\\&:g;$!s/$/\\/')
export MONGO_OPLOG_URL="${escaped_oplog_url}"
raw_mongo_url=$(echo ${context} | jq -r '.mongo_url')
escaped_mongo_url=$(printf '%s\n' "${raw_mongo_url}" | sed 's:[\/&]:\\&:g;$!s/$/\\/')
export MONGO_URL="${escaped_mongo_url}"
export CLIO_MONGO_URL="${MONGO_URL}"
torture_mongo_url=$(echo ${context} | jq -r '.torture_mongo_url')
esc_torture_mongo_url=$(printf '%s\n' "${torture_mongo_url}" | sed 's:[\/&]:\\&:g;$!s/$/\\/')
torture_mongo_oplog_url=$(echo ${context} | jq -r '.torture_mongo_oplog_url')
esc_torture_mongo_oplog_url=$(printf '%s\n' "${torture_mongo_oplog_url}" | sed 's:[\/&]:\\&:g;$!s/$/\\/')
export TORTURE_MONGO_URL=$esc_torture_mongo_url
export TORTURE_MONGO_OPLOG_URL=$esc_torture_mongo_oplog_url
export PROJECT_ID=$(echo ${context} | jq -r '.project_id')
export ROOT_URL=$(echo ${context} | jq -r '.root_url')
export ZONE=$(echo ${context} | jq -r '.zone')
export DATA_API_GROUP_SIZE=$(echo ${context} | jq -r '.data_api_group_size')
export DATA_API_MACHINE_TYPE=$(echo ${context} | jq -r '.data_api_machine_type')
export FRONT_END_GROUP_SIZE=$(echo ${context} | jq -r '.front_end_group_size')
export FRONT_END_MACHINE_TYPE=$(echo ${context} | jq -r '.front_end_machine_type')
export DEFAULT_MACHINE_TYPE=$(echo ${context} | jq -r '.default_machine_type')
export DEFAULT_GROUP_SIZE=$(echo ${context} | jq -r '.default_group_size')
export KADIRA_APP_ID=$(echo ${context} | jq -r '.kadira_app_id')
export KADIRA_APP_SECRET=$(echo ${context} | jq -r '.kadira_app_secret')
export KADIRA_OPTIONS_HOSTNAME=$(echo ${context} | jq -r '.kadira_options_hostname')
echo "${context}" > account.json

## Activate service account
gcloud auth activate-service-account --key-file account.json
gcloud config set project ${PROJECT_ID}
gcloud config set compute/zone ${ZONE}
