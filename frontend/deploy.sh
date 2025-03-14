#!/bin/bash

# ----------------------
# KUDU Deployment Script
# ----------------------

# Helpers
# -------

exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "An error has occurred during web site deployment."
    echo $1
    exit 1
  fi
}

# Prerequisites
# ------------

# Verify node.js installed
hash node 2>/dev/null
exitWithMessageOnError "Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment."

# Setup
# -----

SCRIPT_DIR="${BASH_SOURCE[0]%\\*}"
SCRIPT_DIR="${SCRIPT_DIR%/*}"
ARTIFACTS=$SCRIPT_DIR/../artifacts
KUDU_SYNC_CMD=${KUDU_SYNC_CMD//\"}

if [[ ! -n "$DEPLOYMENT_SOURCE" ]]; then
  DEPLOYMENT_SOURCE=$SCRIPT_DIR
fi

if [[ ! -n "$NEXT_MANIFEST_PATH" ]]; then
  NEXT_MANIFEST_PATH=$ARTIFACTS/manifest

  if [[ ! -n "$PREVIOUS_MANIFEST_PATH" ]]; then
    PREVIOUS_MANIFEST_PATH=$NEXT_MANIFEST_PATH
  fi
fi

if [[ ! -n "$DEPLOYMENT_TARGET" ]]; then
  DEPLOYMENT_TARGET=$ARTIFACTS/wwwroot
else
  KUDU_SERVICE=true
fi

if [[ ! -n "$KUDU_SYNC_CMD" ]]; then
  # Install kudu sync
  echo Installing Kudu Sync
  npm install kudusync -g --silent
  exitWithMessageOnError "npm failed"

  if [[ ! -n "$KUDU_SERVICE" ]]; then
    # In case we are running locally, we need to set these
    KUDU_SYNC_CMD=kudusync
  else
    # In case we are running on kudu service this is the URL to download kudu sync from
    KUDU_SYNC_CMD=$APPDATA/npm/node_modules/kudusync/bin/kudusync
  fi
fi

# Node Helpers
# ------------

selectNodeVersion () {
  if [[ -n "$KUDU_SELECT_NODE_VERSION_CMD" ]]; then
    SELECT_NODE_VERSION="$KUDU_SELECT_NODE_VERSION_CMD \"$DEPLOYMENT_SOURCE\" \"$DEPLOYMENT_TARGET\" \"$DEPLOYMENT_TEMP\""
    eval $SELECT_NODE_VERSION
    exitWithMessageOnError "select node version failed"

    if [[ -e "$DEPLOYMENT_TEMP/node_modules" ]]; then
      cd "$DEPLOYMENT_TEMP"
      npm install --production
      exitWithMessageOnError "npm failed"
      cd - > /dev/null
    fi
  fi
}

##################################################################################################################################
# Deployment
# ----------

echo Handling node.js deployment.

# 1. Select node version
selectNodeVersion

# 2. Install npm packages
if [ -e "$DEPLOYMENT_SOURCE/package.json" ]; then
  cd "$DEPLOYMENT_SOURCE"
  npm install
  exitWithMessageOnError "npm failed"
  cd - > /dev/null
fi

# 3. Build the React app
if [ -e "$DEPLOYMENT_SOURCE/package.json" ]; then
  cd "$DEPLOYMENT_SOURCE"
  npm run build
  exitWithMessageOnError "React build failed"
  cd - > /dev/null
fi

# 4. KuduSync to deploy files
if [[ "$IN_PLACE_DEPLOYMENT" -ne "1" ]]; then
  "$KUDU_SYNC_CMD" -v 50 -f "$DEPLOYMENT_SOURCE/build" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" -i ".git;.hg;.deployment;deploy.sh"
  exitWithMessageOnError "Kudu Sync failed"
fi

##################################################################################################################################
echo "Finished successfully." 