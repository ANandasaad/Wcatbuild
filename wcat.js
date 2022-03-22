// 1). Node wcat.js filepath =>display the  contents of a file in terminal

// 2). node wcat.js filepath1 filepath2 filepath3 => displays the content of all files in terminal in concatinated form in 
// given order
// node wcat.js f1.txt
// node wcat.js f1.txt f2.txt f3.txt
const fs= require("fs");

let inputArr = process.argv.slice(2);
console.log(inputArr);
//console.log(input);


let filesArr =[];
let optionsArr=[];
//Placed files path in filesArr

for(let i=0;i<inputArr.length; i++)
{
    let firstChar=inputArr[i].charAt(0);
    if(firstChar == '-')
    {
        optionsArr.push(inputArr[i]);
    }
    else
    {
        filesArr.push(inputArr[i]);
    }
}
// Check if all the files are present

for(let i=0;i<filesArr.length; i++)
{
    let doesExist = fs.existsSync(filesArr[i]);
    if(!doesExist){
       console.log("file does not exist");
       break;
    }

}

//content read and appending starts//

let content="";

for(let i=0; i<filesArr.length; i++)
{
    let fileContent = fs.readFileSync(filesArr[i]);
    content +=fileContent+"\n";
}

console.log(content);

let contentArr= content.split("\n");
console.log(contentArr);

// Check if -s present or not

let isSPresent =optionsArr.includes("-s");
if(isSPresent)
{
    for(let i=1;i<contentArr.length; i++)
    {
        if(contentArr[i]=="" && contentArr[i-1]=="")
        {
            contentArr[i]==null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null)
        {
            contentArr[i]=null;
        }
    }
}
    console.table(contentArr);

    let tempArr=[];
    //Push everthing in tempArr execpt null

    for(let i=0; i<contentArr.length; i++)
    {
        if(contentArr[i]!=null)
        {
            tempArr.push(contentArr[i]);
        }
    }
    console.log("data after removing extra lines\n"+tempArr);



    let indexOfN = optionsArr.indexOf("-n");
    let indexOfB = optionsArr.indexOf("-b");

    let finalOption ="";

    // if both -n and -b is present
    if(indexOfN != -1 && indexOfB != -1)
    {

    if(indexOfN<indexOfB)
    {
        finalOption = "-n";
    }
    else{
        finalOption = "-b";
    }
    }
// either -n is present or -b is present
    else{
         if(indexOfN !=-1)
    {
        finalOption = "-n";
    }
    else if (indexOfB !=-1){
        finalOption = "-b";
    }
}  
// calling of functions by  evaluating finalOptions
    if(finalOption == "-n")
    {
        modifiyContentByN();
    }
    else if(finalOption == "-b")
    {
        modifiyContentByB();
    }


    function modifiyContentByN()
    {
        for(let i=0; i<contentArr.length; i++)
        {
          contentArr[i]=((i+1)+")"+contentArr[i]);
        }

    }

    function modifiyContentByB()
    {
        let count =1;
        for(let i=0; i<contentArr.length;i++)
        {
            if(contentArr[i]!="")
            {
                contentArr[i]=count+")"+contentArr[i];
                count++;
            }
        }

    }
    console.log(contentArr);
