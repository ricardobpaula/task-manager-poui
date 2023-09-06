$PROJECT_NAME="task-manager-poui"

ng build

$FILE_EXISTS = Test-Path ".\$PROJECT_NAME" -PathType Leaf

If ($FILE_EXISTS)
{
  Remove-Item  -Path ".\$PROJECT_NAME.app"  -Force -Recurse

}

cd .\dist

Compress-Archive -Path ".\$PROJECT_NAME" -DestinationPath "$PROJECT_NAME.zip"

Rename-Item -Path "$PROJECT_NAME.zip" -NewName "$PROJECT_NAME.app"

Remove-Item -Path ".\$PROJECT_NAME" -Force -Recurse


cd ..
