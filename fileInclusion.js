const fs = require("fs");
class Constants {
  static IMPORT = "import ";
}
class FileInclusion {
  constructor() {
    this.destinationFilePath = "dest.txt";
  }

  getDestinationFilePath() {
    let prompt = require("prompt-sync")();
    let path = prompt("enter the source file path with .js extension: ");
    try {
      if (fs.existsSync(path)) {
      } else {
        console.log("invalid file");
      }
    } catch (err) {
      console.log("invalid file path");
    }
    let temp = prompt("enter destination file path : ");
    while (temp === " " || !temp.endsWith(".txt")) {
      console.log("please enter valid file path with .txt extension");
      temp = prompt("enter destination file path : ");
    }
    this.destinationFilePath = temp;
    fs.writeFileSync(this.destinationFilePath, " ");
    this.readFile(path, []);
  }
  readFile(path, fileNames) {
    let fileNamesArr = [...fileNames];
    if (!fileNamesArr.includes(path)) {
      fileNamesArr.push(path);
      let fileLines = fs.readFileSync(path, "utf8");
      let fileArr = fileLines.split("\n");
      this.recursiveInclusion(fileArr, fileNamesArr);
    }
  }

  recursiveInclusion(fileArr, fileNames) {
    let multiLineComment = 0;
    for (let line of fileArr) {
      let comment = 0;
      let importStatement = 0;
      let index;
      for (let i = 0; i < line.length; i++) {
        let char = line[i];
        let nextChar = line[i + 1];
        if (char === "/" && nextChar === "/") {
          comment = 1;
          this.writeFile(line.slice(i));
          break;
        } else if (char === "/" && nextChar === "*") {
          multiLineComment = 1;
          index = i;
          continue;
        } else if (char === "*" && nextChar === "/") {
          multiLineComment = 0;
          this.writeFile(line.slice(0, i + 2));
          i++;
          continue;
        }
        if (!comment && !multiLineComment) {
          if (line.substring(i, i + 7) === Constants.IMPORT) {
            let temp = line.slice(i + 6).trim();
            this.checkStatement(temp, fileNames);
            importStatement = 1;
            break;
          }
        }
      }
      if (!comment && !multiLineComment && !importStatement) {
        this.writeFile(line);
      } else if (multiLineComment) {
        this.writeFile(line.slice(index));
      }
    }
  }

  checkStatement(line, fileNames) {
    let paths = this.getPath(line);
    if (paths.length > 0) {
      for (let path of paths) {
        if (path) {
          this.readFile(path, fileNames);
        }
      }
    }
  }

  getPath(line) {
    let paths = [];
    let quote = 0;
    let currentPath = "";
    for (let char of line) {
      if (char === '"' || char === "'") {
        if (!quote) {
          quote = 1;
        } else {
          paths.push(currentPath.trim());
          currentPath = "";
          quote = 0;
        }
      } else if (quote) {
        currentPath += char;
      }
    }
    return paths;
  }

  writeFile(data) {
    let content = data + "\n";
    fs.appendFileSync(this.destinationFilePath, content);
  }
}

let fileInclusion = new FileInclusion();
fileInclusion.getDestinationFilePath();
