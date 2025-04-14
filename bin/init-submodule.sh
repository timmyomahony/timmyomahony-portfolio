#!/bin/bash

set -e

# SSH setup for GitHub (if needed)
eval "$(ssh-agent -s)"
echo "$GIT_SSH_KEY" | tr -d '\r' | ssh-add - > /dev/null
mkdir -p ~/.ssh
ssh-keyscan github.com >> ~/.ssh/known_hosts

# Fetch the submodule
git clone --recurse-submodules git@github.com:timmyomahony/timmyomahony-content.git content