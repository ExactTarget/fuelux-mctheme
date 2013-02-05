#!/bin/sh

rm -rf lib/fuelux

echo "running volo add -nostamp ExactTarget/fuelux/>2.2"
echo "(if you want a version of fuelux later than 2.x you will need to update this command!)"
volo add -nostamp ExactTarget/fuelux/>2.2
echo "command presumably executed correctly, continuing..."
echo
