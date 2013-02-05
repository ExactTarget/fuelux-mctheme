#make sure we are in the root dir
pwd=$(pwd | grep "util")
if [ -n "$pwd" ];then
	cd ..
fi

./util/update-bootstrap.sh
echo "------------------------------------------------------------------------------------"

./util/update-fuelux.sh
echo "------------------------------------------------------------------------------------"


echo
echo
echo "running git status"
echo "(this shows you what changes were brought in by volo)"
git status
echo
echo "Commit changes? yN"
read yN
if [ "$yN" = "y" ] || [ "$yN" = "Y" ]; then
	echo "committing changes!"
	git add -A
	git commit -m "updated bootstrap and fuelux"
	git status
else
	echo "not committing changes"
fi

echo
echo "NOTICE::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
echo
echo "You will need to checkout the latest >2.2 tag from fuelux "
echo "and copy over the test/* files in order for unit tests to run properly."
echo ""
echo "Make sure you update the path to fuelux in test/fuelux.html."
echo "Path will change from '../src' to '../lib/fuelux'"
echo
echo "NOTICE::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
echo
echo "If you didn't see any errors above, you are probably good to go! ;)"