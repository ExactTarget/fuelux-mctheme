#!/bin/sh

#make sure we are in the root dir
pwd=$(pwd | grep "util")
if [ -n "$pwd" ];then
	cd ..
fi

./util/update-bootstrap.sh < /dev/null
echo "------------------------------------------------------------------------------------"

./util/update-fuelux.sh < /dev/null
echo "------------------------------------------------------------------------------------"


echo
echo "grunt"
grunt < /dev/null
echo
echo "NOTICE::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
echo
echo "You may need to checkout the latest >2.2 tag from fuelux (especially if grunt failed "
echo "just now) and copy over the test/* files in order for unit tests to run properly."
echo ""
echo "Make sure you update the path to fuelux in test/fuelux.html."
echo "Path will change from '../src' to '../lib/fuelux'"
echo
echo "NOTICE::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
echo
echo "If you didn't see any errors above, you are probably good to go! ;)"

echo
echo
echo "run git status? yN"
echo "(this shows you what changes were brought in by volo)"
read runstatus
if [ "$runstatus" = "y" ] || [ "$runstatus" = "Y" ]; then
	echo "git status"
	git status
	echo
	echo "add and commit all changes? yN"
	read yN
	if [ "$yN" = "y" ] || [ "$yN" = "Y" ]; then
		echo "committing changes!"
		echo "git add -A"
		git add -A
		echo
		echo "git commit -m \"updated bootstrap and fuelux\""
		git commit -m "updated bootstrap and fuelux"
		echo
		echo "git status"
		git status
	else
		echo "not committing changes"
	fi
fi
echo "------------------------------------------------------------------------------------"