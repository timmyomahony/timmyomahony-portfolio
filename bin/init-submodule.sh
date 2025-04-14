#!/bin/bash

set -e

# Start the SSH agent
eval "$(ssh-agent -s)"

# Add SSH key from env, converting \n to real newlines and removing stray \r
echo -e "$GIT_SSH_KEY" | tr -d '\r' | ssh-add - > /dev/null

# Ensure .ssh dir and known_hosts file exist and are secure
mkdir -p ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/known_hosts
chmod 600 ~/.ssh/known_hosts

# Trust GitHub's SSH host key
ssh-keyscan github.com >> ~/.ssh/known_hosts

# Clone the submodule repo
git clone --recurse-submodules git@github.com:timmyomahony/timmyomahony-content.git content