function promiseTest()
{
    return new Promise((resolve,reject)=>{
        if (!randomInt(0,5))
        {
            console.log("done");
            resolve();
            return;
        }

        console.log("fail");
        reject();
    });
}

// give it a async function to try. the function cannot take anything so a callback is recommended.
async function retryPromise(tryFunction,delay=200,maxRetries=4,currentRetry=0)
{
    try
    {
        await tryFunction();
    }

    catch(e)
    {
        if (currentRetry>=maxRetries)
        {
            return;
        }

        setTimeout(()=>{
            return retryPromise(tryFunction,delay,maxRetries,++currentRetry);
        },delay);
    }
}

async function promiseTestMain()
{
    var test=promiseTest();
    await retryPromise(async ()=>{
        await promiseTest();
    },200,10,0);
}

function randomInt(low,high)
{
    low=Math.ceil(low);
    high=Math.floor(high);
    return Math.floor(Math.random()*(high-low+1))+low;
}