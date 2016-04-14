if [ "$GIT_SSH_KEY" != "" ]; then 
	echo "Detected SSH key for git. Launching ssh-agent and loading key"
	echo $GIT_SSH_KEY | base64 --decode > id_rsa
	# launch ssh-agent, we'll use it to serve our ssh key
	# and kill it towards the end of the buildpack's run
	eval `ssh-agent -s`
	# We're not supporting passphrases at this time.  We could pull that in
	# from config as well, but then we'd have to setup expect or some other
	# terminal automation tool to feed it into ssh-add.
	ssh-add id_rsa
	rm id_rsa
	# Add github to the list of known hosts - ignore the warning or else set -e will abort the deployment
	ssh -oStrictHostKeyChecking=no -T git@github.com || true
fi

npm install git+ssh://git@github.com/exacttarget/fuelux-minimal-lightning.git