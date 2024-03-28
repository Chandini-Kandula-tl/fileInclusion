#  File Inclusion Tech Document

## Approach
* import fs module to perform read and write operations on source file
* create object for class FileInclusion
* getDestinationFilePath method is used to get the destination file path from user
* read the content of the file (readFile method)
    1.  if the first lines of the file contains import statement then call the read function recursively
    1.  if not read the content of the file 
* call the write method to write the source file content into the destination file. (writeFile method)

## class fileInclusion

    class FileInclusion{
        constructor(){
            //variables in constructor
            this.tempArr = [];//used to store the content of file 
            this.destinationFielPath = 'dest.txt'; //used to store the destination path
        }

        getDestinationFilePath()
        {
            // this function will loop until user enters valid input
        }

        readFile(filePath)
        {
            //readFileSync method will read the content of the file using fs module methods
            let arr = [ //split the file content by "\n"];
            //logic to check for import statements from the begining of the file content
            //remove the first line from the arr and then push it into this.tempArr
            //if import statement exist then get the path from import statement 
            //call the readFile(path) recursively
            //else call the write method to write the content of file from source to destination

            
        }

        writeFile()
        {
            //append the file content to destination file
            usigng the writFileSync method
        }

        getPath()
        {
            //get path from the import statement
            return path;
        }
    }

    const fileInclusion = new FileInclusion(); //object creation for FileInclusion class
    fileInclusion.getdestinationFilePath();





