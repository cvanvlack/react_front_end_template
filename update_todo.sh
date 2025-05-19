#!/bin/bash
# Script to update all checkboxes in todo.md

file="todo.md"
# Replace all "* [ ]" with "* [x]"
sed -i 's/\* \[ \]/\* \[x\]/g' "$file"

echo "Updated all checkboxes in $file"