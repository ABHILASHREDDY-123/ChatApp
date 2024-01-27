const  errorHandler = (err) =>{
    if(err)
    console.log("Custom Error message : ",err);
}

module.exports  = errorHandler;